import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import BottomNavigation from '@/components/BottomNavigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mereal | 메리얼 - 프리미엄 굿즈 서비스',
  description: '고품질 굿즈 제작 서비스 메리얼에서 나만의 특별한 제품을 만들어보세요.',
  keywords: '굿즈, 인쇄, 제작, 커스텀, 메리얼',
  authors: [{ name: 'Mereal Team' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#0ea5e9',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mereal',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-1 pb-16 md:pb-0">
              {children}
            </main>
            <BottomNavigation />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
