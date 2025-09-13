import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

// 환경 변수에서 Supabase 설정을 가져옵니다
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rzyqldiycdzcwvzlmmkq.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6eXFsZGl5Y2R6Y3d2emxtbWtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NjE5MTMsImV4cCI6MjA3MzMzNzkxM30.Pp0DEFUUFb0DcArzjF3qxQ8WaVEylZsH8DGUJdv0-NM'

// 클라이언트 사이드용 Supabase 클라이언트
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 브라우저용 SSR 클라이언트
export const createSupabaseClient = () =>
  createBrowserClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  file_url: string
  file_name: string
  file_type: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  total_amount: number
  payment_id?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  order_id: string
  payment_key: string
  amount: number
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  method: string
  created_at: string
  updated_at: string
}

export interface Admin {
  id: string
  user_id: string
  role: 'admin' | 'super_admin'
  permissions: string[]
  created_at: string
  updated_at: string
}
