'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function BottomNavigation() {
  const pathname = usePathname()
  const { user } = useAuth()

  // Don't show bottom navigation on admin pages or auth pages
  if (pathname.startsWith('/admin') || pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    return null
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  // Bottom navigation is hidden for character-only version
  const navItems: any[] = []

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 btn-touch transition-colors ${
                active ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {item.icon(active)}
              <span className={`text-xs font-medium ${active ? 'text-primary-600' : 'text-gray-400'}`}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
