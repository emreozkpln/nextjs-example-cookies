import 'server-only'
import Link from "next/link"
import { getCookie } from "@/libs/cookies";

function Header() {
    const token = getCookie()

    const header = [
        {
            'path': '/',
            'title': 'Home'
        },
        {
            'path': '/panel',
            'title': 'Protected panel'
        },
        {
            'path': '/login',
            'title': 'Login'
        },
        {
            'path': '/register',
            'title': 'Register'
        },
        {
            'path': '/create-contact',
            'title': 'Create Contact',
            requiresAuth: true
        }

    ]

    return (
        <div className='h-16 bg-[#010203] flex items-center justify-center'>
            <div className="flex gap-4 text-white">
                {
                    header.map(({ path, title, requiresAuth }) => {
                        if (requiresAuth && !token) {
                            return null
                        }
                        return (
                            <div key={path}>
                                <Link href={path}>{title}</Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Header