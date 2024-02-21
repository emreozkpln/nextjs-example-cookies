"use client"

import { useState } from "react"
import { registerFunc } from "@/services/userService"
import { navigate } from "../../libs/route/action"
import toast from "react-hot-toast"

function RegisterPage() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleRegister = async () => {
        const data = await registerFunc({ username, email, password })
        if (data.message) {
            toast.error(data.message)
        }
        else {
            toast.success("Good")
            navigate('login')
        }
    }

    return (
        <div className=" flex items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
                <input className="max-w-[400px] outline-none border-2 border-solid border-purple-700 p-2 rounded-lg" placeholder='Username' value={username} onChange={e => { setUsername(e.target.value) }} />
                <input className="max-w-[400px] outline-none border-2 border-solid border-purple-700 p-2 rounded-lg" placeholder='Email' value={email} onChange={e => { setEmail(e.target.value) }} />
                <input className="max-w-[400px] outline-none border-2 border-solid border-purple-700 p-2 rounded-lg" placeholder='Password' type="password" value={password} onChange={e => { setPassword(e.target.value) }} />
                <button disabled={!username || !email || !password} type="submit" className="p-2 w-32 rounded-full bg-pink-500 disabled:bg-gray-300" onClick={handleRegister}>Register</button>
            </form>
        </div>
    )
}

export default RegisterPage