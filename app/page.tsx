'use client'

import Link from 'next/link'

import { useAuth } from '@/providers/AuthProvider'

export default function HomePage() {
  const { isAuthenticated } =
    useAuth()

  return (
    <div>
      <h1>Home Page</h1>

      <Link
        href={
          isAuthenticated
            ? '/dashboard'
            : '/login'
        }
      >
        {isAuthenticated
          ? 'Dashboard'
          : 'Login'}
      </Link>
    </div>
  )
}