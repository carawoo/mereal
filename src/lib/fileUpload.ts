import { createSupabaseClient } from './supabase'

export interface FileUploadConfig {
  maxSizeBytes: number
  allowedTypes: string[]
  maxWidth?: number // for images (A3 size consideration)
  maxHeight?: number // for images (A3 size consideration)
}

export interface UploadedFile {
  id: string
  url: string
  name: string
  type: string
  size: number
  userId: string
}

export const FILE_UPLOAD_CONFIG: FileUploadConfig = {
  maxSizeBytes: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['pdf', 'psd', 'ai', 'png', 'jpg', 'jpeg'],
  maxWidth: 4961, // A3 at 300 DPI (11.7 * 16.5 inches)
  maxHeight: 3508,
}

export class FileUploadService {
  private supabase = createSupabaseClient()

  private validateFile(file: File): { isValid: boolean; error?: string } {
    // Check file size
    if (file.size > FILE_UPLOAD_CONFIG.maxSizeBytes) {
      return {
        isValid: false,
        error: `파일 크기는 ${FILE_UPLOAD_CONFIG.maxSizeBytes / (1024 * 1024)}MB를 초과할 수 없습니다.`
      }
    }

    // Check file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    if (!fileExtension || !FILE_UPLOAD_CONFIG.allowedTypes.includes(fileExtension)) {
      return {
        isValid: false,
        error: `지원하지 않는 파일 형식입니다. 지원 형식: ${FILE_UPLOAD_CONFIG.allowedTypes.join(', ')}`
      }
    }

    return { isValid: true }
  }

  private async validateImageDimensions(file: File): Promise<{ isValid: boolean; error?: string }> {
    if (!file.type.startsWith('image/')) {
      return { isValid: true } // Not an image, skip dimension check
    }

    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const { maxWidth = Infinity, maxHeight = Infinity } = FILE_UPLOAD_CONFIG
        
        if (img.width > maxWidth || img.height > maxHeight) {
          resolve({
            isValid: false,
            error: `이미지 크기는 최대 ${maxWidth}x${maxHeight} 픽셀까지 지원됩니다. (A3 사이즈 기준)`
          })
        } else {
          resolve({ isValid: true })
        }
      }
      img.onerror = () => {
        resolve({
          isValid: false,
          error: '이미지 파일이 손상되었습니다.'
        })
      }
      img.src = URL.createObjectURL(file)
    })
  }

  async uploadFile(file: File, userId: string): Promise<{ data: UploadedFile | null; error: string | null }> {
    try {
      // Validate file
      const validation = this.validateFile(file)
      if (!validation.isValid) {
        return { data: null, error: validation.error! }
      }

      // Validate image dimensions if it's an image
      const dimensionValidation = await this.validateImageDimensions(file)
      if (!dimensionValidation.isValid) {
        return { data: null, error: dimensionValidation.error! }
      }

      // Generate unique file name
      const fileExtension = file.name.split('.').pop()
      const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await this.supabase.storage
        .from('uploads')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        return { data: null, error: '파일 업로드 중 오류가 발생했습니다.' }
      }

      // Get public URL
      const { data: { publicUrl } } = this.supabase.storage
        .from('uploads')
        .getPublicUrl(fileName)

      // Save file info to database
      const { data: dbData, error: dbError } = await this.supabase
        .from('file_uploads')
        .insert({
          user_id: userId,
          file_url: publicUrl,
          file_name: file.name,
          file_type: fileExtension,
          file_size: file.size,
          upload_session_id: `session-${Date.now()}`
        })
        .select()
        .single()

      if (dbError) {
        console.error('Database error:', dbError)
        // Try to clean up uploaded file
        await this.supabase.storage.from('uploads').remove([fileName])
        return { data: null, error: '파일 정보 저장 중 오류가 발생했습니다.' }
      }

      const uploadedFile: UploadedFile = {
        id: dbData.id,
        url: publicUrl,
        name: file.name,
        type: fileExtension!,
        size: file.size,
        userId: userId
      }

      return { data: uploadedFile, error: null }

    } catch (error) {
      console.error('Unexpected upload error:', error)
      return { data: null, error: '예상치 못한 오류가 발생했습니다.' }
    }
  }

  async deleteFile(fileId: string, userId: string): Promise<{ error: string | null }> {
    try {
      // Get file info first
      const { data: fileData, error: fetchError } = await this.supabase
        .from('file_uploads')
        .select('*')
        .eq('id', fileId)
        .eq('user_id', userId)
        .single()

      if (fetchError || !fileData) {
        return { error: '파일을 찾을 수 없습니다.' }
      }

      // Extract file path from URL
      const url = new URL(fileData.file_url)
      const filePath = url.pathname.split('/storage/v1/object/public/uploads/')[1]

      // Delete from storage
      const { error: storageError } = await this.supabase.storage
        .from('uploads')
        .remove([filePath])

      if (storageError) {
        console.error('Storage deletion error:', storageError)
      }

      // Delete from database
      const { error: dbError } = await this.supabase
        .from('file_uploads')
        .delete()
        .eq('id', fileId)
        .eq('user_id', userId)

      if (dbError) {
        console.error('Database deletion error:', dbError)
        return { error: '파일 삭제 중 오류가 발생했습니다.' }
      }

      return { error: null }

    } catch (error) {
      console.error('Unexpected deletion error:', error)
      return { error: '예상치 못한 오류가 발생했습니다.' }
    }
  }

  async getUserFiles(userId: string): Promise<{ data: UploadedFile[] | null; error: string | null }> {
    try {
      const { data, error } = await this.supabase
        .from('file_uploads')
        .select('*')
        .eq('user_id', userId)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Fetch files error:', error)
        return { data: null, error: '파일 목록을 불러오는 중 오류가 발생했습니다.' }
      }

      const files: UploadedFile[] = data.map(item => ({
        id: item.id,
        url: item.file_url,
        name: item.file_name,
        type: item.file_type,
        size: item.file_size,
        userId: item.user_id
      }))

      return { data: files, error: null }

    } catch (error) {
      console.error('Unexpected fetch error:', error)
      return { data: null, error: '예상치 못한 오류가 발생했습니다.' }
    }
  }

  // Clean up expired files (should be called periodically)
  async cleanupExpiredFiles(): Promise<void> {
    try {
      const { data: expiredFiles } = await this.supabase
        .from('file_uploads')
        .select('*')
        .lt('expires_at', new Date().toISOString())

      if (expiredFiles && expiredFiles.length > 0) {
        // Delete files from storage
        const filePaths = expiredFiles.map(file => {
          const url = new URL(file.file_url)
          return url.pathname.split('/storage/v1/object/public/uploads/')[1]
        }).filter(Boolean)

        if (filePaths.length > 0) {
          await this.supabase.storage.from('uploads').remove(filePaths)
        }

        // Delete from database
        const fileIds = expiredFiles.map(file => file.id)
        await this.supabase
          .from('file_uploads')
          .delete()
          .in('id', fileIds)
      }
    } catch (error) {
      console.error('Cleanup error:', error)
    }
  }
}

export const fileUploadService = new FileUploadService()

// Utility functions
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const getFileIcon = (fileType: string): string => {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return '📄'
    case 'psd':
      return '🎨'
    case 'ai':
      return '✨'
    case 'png':
    case 'jpg':
    case 'jpeg':
      return '🖼️'
    default:
      return '📁'
  }
}
