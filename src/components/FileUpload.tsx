'use client'

import { useState, useRef, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { fileUploadService, formatFileSize, getFileIcon, type UploadedFile } from '@/lib/fileUpload'

interface FileUploadProps {
  onUploadComplete?: (file: UploadedFile) => void
  onUploadError?: (error: string) => void
  maxFiles?: number
  className?: string
}

export default function FileUpload({ 
  onUploadComplete, 
  onUploadError, 
  maxFiles = 1,
  className = '' 
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [error, setError] = useState<string | null>(null)

  const { user } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || !user) return

    if (uploadedFiles.length + files.length > maxFiles) {
      const errorMsg = `최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`
      setError(errorMsg)
      onUploadError?.(errorMsg)
      return
    }

    setError(null)
    setIsUploading(true)
    setUploadProgress(0)

    try {
      const file = files[0] // Currently supporting single file upload
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90))
      }, 100)

      const { data: uploadedFile, error: uploadError } = await fileUploadService.uploadFile(file, user.id)

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (uploadError) {
        setError(uploadError)
        onUploadError?.(uploadError)
      } else if (uploadedFile) {
        setUploadedFiles(prev => [...prev, uploadedFile])
        onUploadComplete?.(uploadedFile)
        setError(null)
      }
    } catch (err) {
      const errorMsg = '파일 업로드 중 오류가 발생했습니다.'
      setError(errorMsg)
      onUploadError?.(errorMsg)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }, [user, uploadedFiles.length, maxFiles, onUploadComplete, onUploadError])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }, [handleFileSelect])

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files)
  }, [handleFileSelect])

  const handleRemoveFile = useCallback(async (fileId: string) => {
    if (!user) return

    try {
      const { error } = await fileUploadService.deleteFile(fileId, user.id)
      if (error) {
        setError(error)
      } else {
        setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
      }
    } catch (err) {
      setError('파일 삭제 중 오류가 발생했습니다.')
    }
  }, [user])

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  if (!user) {
    return (
      <div className={`p-8 text-center border-2 border-gray-300 border-dashed rounded-lg ${className}`}>
        <p className="text-gray-500">파일을 업로드하려면 먼저 로그인해주세요.</p>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`relative p-8 border-2 border-dashed rounded-lg text-center transition-colors ${
          isDragOver
            ? 'border-primary-500 bg-primary-50'
            : error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileSelect}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.psd,.ai,.png,.jpg,.jpeg"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isUploading || uploadedFiles.length >= maxFiles}
        />

        {isUploading ? (
          <div className="space-y-4">
            <div className="animate-spin mx-auto h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">업로드 중...</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{uploadProgress}%</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 48 48" aria-hidden="true">
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                파일을 드래그하거나 클릭하여 업로드
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, PSD, AI, PNG, JPG, JPEG 파일 지원 (최대 10MB)
              </p>
              <p className="text-xs text-gray-400 mt-1">
                A3 사이즈까지 지원 (최대 4961x3508 픽셀)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p>{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">업로드된 파일</h4>
          {uploadedFiles.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getFileIcon(file.type)}</span>
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)} • {file.type.toUpperCase()}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveFile(file.id)
                }}
                className="btn-touch p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Mobile specific instructions */}
      <div className="md:hidden bg-blue-50 border border-blue-200 rounded-md p-3">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              모바일에서는 파일 앱이나 갤러리에서 파일을 선택할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
