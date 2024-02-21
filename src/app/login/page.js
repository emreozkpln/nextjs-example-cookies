"use client"

import { useState } from "react"
import { loginFunc } from "@/services/userService"
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import toast from "react-hot-toast"

function LoginPage() {
    const cookies = useCookies();
    const router = useRouter()
    const searchParams = useSearchParams()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleLogin = async () => {
        const data = await loginFunc({ email, password })
        if (data.result.accessToken === undefined) {
            toast.error("Something went wrong")
            setEmail("")
            setPassword("")
            return null
        }
        if (data.status == 200) {
            cookies.set('token', data.result.accessToken)
            const search = searchParams.get('next')
            router.push(search ? search : '/')
            toast.success("Logged")
            router.refresh()
        }
    }

    return (
        <div className=" flex items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
                <input className="max-w-[400px] outline-none border-2 border-solid border-purple-700 p-2 rounded-lg" placeholder="Email" value={email} onChange={e => { setEmail(e.target.value) }} />
                <input className="max-w-[400px] outline-none border-2 border-solid border-purple-700 p-2 rounded-lg" placeholder="Password" type="password" value={password} onChange={e => { setPassword(e.target.value) }} />
                <button disabled={!email || !password} type="submit" className="p-2 w-32 rounded-full bg-pink-500 disabled:bg-gray-300" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}

export default LoginPage