'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { getCurrentUser } from '@/app/(auth)/api/auth.api'

interface User {
  id: number
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  setUser: (user: User | null) => void
}

const AuthContext =
  createContext<AuthContextType | null>(
    null
  )

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] =
    useState<User | null>(null)

  const [isLoading, setIsLoading] =
    useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response =
          await getCurrentUser()

        setUser(response.user)
      } catch (error) {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context =
    useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    )
  }

  return context
}