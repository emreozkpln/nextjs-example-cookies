"use client"
import React, { useState } from 'react'
import { createContact } from '@/services/contactService'
import { useCookies } from 'next-client-cookies';
import toast from "react-hot-toast"
import { useRouter } from 'next/navigation';

function CreateContact() {

    const router = useRouter()
    const cookies = useCookies()
    const token = cookies.get('token')

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleCreate = async () => {
        const data = await createContact({ token, username, email, phone })
        if (data.success === true) {
            toast.success("Created")
        }
        router.refresh()
    }

    return (
        <div className=" flex items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
                <input className="max-w-[400px] outline-none border-2 border-solid border-purple-700 p-2 rounded-lg" placeholder='Username' value={username} onChange={e => { setUsername(e.target.value) }} />
                <input className="max-w-[400px] outline-none border-2 border-solid border-purple-700 p-2 rounded-lg" placeholder='Email' value={email} onChange={e => { setEmail(e.target.value) }} />
                <input className="max-w-[400px] outline-none border-2 border-solid border-purple-700 p-2 rounded-lg" placeholder='Phone' value={phone} onChange={e => { setPhone(e.target.value) }} />
                <button disabled={!username || !email || !phone} type="submit" className="p-2 w-32 rounded-full bg-pink-500 disabled:bg-gray-300" onClick={handleCreate}>Create</button>
            </form>
        </div>
    )
}

export default CreateContact