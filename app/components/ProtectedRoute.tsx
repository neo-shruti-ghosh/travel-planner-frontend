'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/providers/AuthProvider'

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const {
    isAuthenticated,
    isLoading,
  } = useAuth()

  useEffect(() => {
    if (
      !isLoading &&
      !isAuthenticated
    ) {
      router.replace('/login')
    }
  }, [
    isAuthenticated,
    isLoading,
    router,
  ])

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return children
}