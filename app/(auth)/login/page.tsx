'use client'

import Image from "next/image";
import loginImage from "../../../assets/login.jpg";
import Input from "@/components/Input";
import Button from "@/components/button";
import { useEffect, useState } from "react";
import { loginUser, getCurrentUser } from "../api/auth.api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await getCurrentUser()
                router.push('/dashboard')
            } catch (error) {
                console.log('Not logged in')
            }
        }

        checkAuth()
    }, [])
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setLoading] = useState(false)
    const [errorData, setErrorData] = useState({ email: '', password: '', common: '' })
    const completeForm = (value: any, key: string) => {
        setErrorData((prevData) => ({
            ...prevData,
            [key]: '',
            common: ''
        }))
        const updatedFormData = {
            ...formData,
            [key]: value
        }
        setFormData(updatedFormData);
    }

    const onConfirmClick = async () => {
        if (!formData.email) {
            setErrorData((prevData) => ({
                ...prevData,
                email: 'Email is Required'
            }))
        }

        if (!formData.password) {
            setErrorData((prevData) => ({
                ...prevData,
                password: 'Password is Required'
            }))
        }

        if (!formData.email || !formData.password) {
            return
        }

        try {
            setLoading(true);
            const response = await loginUser({
                email: formData.email,
                password: formData.password,
            });
            setLoading(false);

        } catch (error: any) {
            setErrorData((prevData) => ({
                ...prevData,
                common: String(error.response.data.message)
            }))
            setLoading(false);
        }
    }
    return (
        <div className="flex h-screen">
            <div className="relative w-1/2">
                <Image
                    src={loginImage}
                    alt="login"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col items-center justify-center bg-surface px-40">
                <h1 className="text-4xl font-bold text-text-primary">
                    Welcome Back
                </h1>

                <h2 className="mt-4 text-lg text-text-secondary text-center">
                    Enter your credentials to access your premium
                    travel dashboard.
                </h2>
                <div className="flex flex-col w-full py-10 gap-5">
                    <Input
                        error={errorData.email}
                        value={formData.email}
                        label="Email Address"
                        type="email"
                        onChange={(e) => completeForm(e.target.value, 'email')} />
                    <Input
                        error={errorData.password}
                        value={formData.password}
                        label="Password"
                        type="password"
                        onChange={(e) => completeForm(e.target.value, 'password')} />
                    {errorData.common && (<span className="text-red-500">{errorData.common}</span>)}
                    <Button
                        fullWidth
                        showLoader={isLoading}
                        onClick={onConfirmClick}
                    >
                        Sign In
                    </Button>
                </div>
            </div>
        </div>
    );
}