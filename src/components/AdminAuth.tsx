'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { adminService, type AdminUser } from '@/lib/admin'

interface AdminAuthProps {
  children: React.ReactNode
  requiredPermissions?: string[]
}

export default function AdminAuth({ children, requiredPermissions = [] }: AdminAuthProps) {
  const [loading, setLoading] = useState(true)
  const [adminData, setAdminData] = useState<AdminUser | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (authLoading) return

      if (!user) {
        router.push('/login')
        return
      }

      try {
        const { isAdmin, adminData } = await adminService.checkAdminPermission(user.id)
        
        if (!isAdmin || !adminData) {
          setError('관리자 권한이 없습니다.')
          setLoading(false)
          return
        }

        // Check specific permissions if required
        if (requiredPermissions.length > 0) {
          const hasPermission = requiredPermissions.every(permission =>
            adminData.permissions.includes(permission)
          )
          
          if (!hasPermission) {
            setError('필요한 권한이 없습니다.')
            setLoading(false)
            return
          }
        }

        setAdminData(adminData)
        setError(null)
      } catch (err) {
        console.error('Admin access check error:', err)
        setError('권한 확인 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    checkAdminAccess()
  }, [user, authLoading, router, requiredPermissions])

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="animate-spin mx-auto h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">권한 확인 중</h2>
          <p className="text-gray-600">잠시만 기다려주세요...</p>
        </div>
      </div>
    )
  }

  if (error || !adminData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">접근 권한 없음</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="btn-touch bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-context" data-admin-role={adminData.role}>
      {children}
    </div>
  )
}
