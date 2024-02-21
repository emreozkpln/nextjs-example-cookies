import { cookies } from "next/headers"

export const getCookie = () => {
    const cookieStore = cookies()
    let token
    cookieStore.getAll().map(cookie => (
        token = cookie.value
    ))

    return token
}