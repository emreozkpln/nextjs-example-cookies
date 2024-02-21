import { verifyJwtToken } from "./libs/auth"
import { NextResponse } from "next/server"

const AUTH_PAGES = ['/login', '/register']

const isAuthPages = (url) => {
    return AUTH_PAGES.some((page) => page.startsWith(url))
}

export async function middleware(request) {
    const { url, nextUrl, cookies } = request
    const { value: token } = cookies.get('token') ?? { value: null }
    const hasVerifiedJwtToken = token && await verifyJwtToken(token)
    const isAuthPagesRequested = isAuthPages(nextUrl.pathname)

    if (isAuthPagesRequested) {
        if (!hasVerifiedJwtToken) {
            const response = NextResponse.next()
            return response
        }
        const response = NextResponse.redirect(new URL('/', url))
        return response
    }

    if (!hasVerifiedJwtToken) {
        const searchParams = new URLSearchParams(nextUrl.searchParams)
        searchParams.set('next', nextUrl.pathname)
        const response = NextResponse.redirect(new URL(`/login?${searchParams}`, url))
        return response
    }

    const response = NextResponse.next()
    return response
}

export const config = {
    matcher: ['/login', '/panel', '/create-contact']
}