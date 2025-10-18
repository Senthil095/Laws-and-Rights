"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if admin is authenticated
    if (isAdminAuthenticated()) {
      // Redirect to feedback dashboard
      router.push('/admin/feedback')
    } else {
      // Redirect to login
      router.push('/admin/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}
