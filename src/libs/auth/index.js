import { jwtVerify } from "jose"

export const getSecretKey = () => {
    const secretKey = process.env.NEXT_PUBLIC_TOKEN_SECURITY

    if (!secretKey) {
        throw new Error('Secret key dont found')
    }

    const textEncoder = new TextEncoder()
    const encoded = textEncoder.encode(secretKey)
    return encoded
}

export const verifyJwtToken = async (token) => {
    try {

        const { payload } = await jwtVerify(token, getSecretKey())
        return payload

    } catch (error) {
        console.log(error);
    }
}