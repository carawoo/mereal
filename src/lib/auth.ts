import { createSupabaseClient } from './supabase'
import type { User } from '@supabase/supabase-js'

export interface AuthUser extends User {
  name?: string
  phone?: string
}

export interface SignUpData {
  email: string
  password: string
  name: string
  phone?: string
}

export interface SignInData {
  email: string
  password: string
}

export class AuthService {
  private supabase = createSupabaseClient()

  async signUp(data: SignUpData) {
    try {
      const { data: authData, error } = await this.supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            phone: data.phone,
          },
        },
      })

      if (error) throw error

      return { user: authData.user, error: null }
    } catch (error) {
      return { user: null, error: error as Error }
    }
  }

  async signIn(data: SignInData) {
    try {
      const { data: authData, error } = await this.supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) throw error

      return { user: authData.user, error: null }
    } catch (error) {
      return { user: null, error: error as Error }
    }
  }

  async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await this.supabase.auth.getUser()
      if (error) throw error
      return { user, error: null }
    } catch (error) {
      return { user: null, error: error as Error }
    }
  }

  async updatePassword(newPassword: string) {
    try {
      const { data, error } = await this.supabase.auth.updateUser({
        password: newPassword
      })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error as Error }
    }
  }

  async resetPassword(email: string) {
    try {
      const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error as Error }
    }
  }

  async deleteAccount() {
    try {
      // Note: Supabase doesn't have a direct user deletion method
      // This would need to be implemented via a server-side function
      const { data, error } = await this.supabase.rpc('delete_user_account')
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error as Error }
    }
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    return this.supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null)
    })
  }
}

export const authService = new AuthService()
