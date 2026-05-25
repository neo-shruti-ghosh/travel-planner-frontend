'use client'

import { logoutUser } from "@/app/(auth)/api/auth.api";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter()

    const logout = async () => {
        try {
            await logoutUser()
            router.push('/login')
        } catch (error) {
            console.log('Could not logout')
        }
    }
    return (
        <ProtectedRoute>
            <div>
                Dashboard
                <Button onClick={logout}>Logout</Button>
            </div>
        </ProtectedRoute>
    )
}