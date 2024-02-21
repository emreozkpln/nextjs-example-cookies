const baseUrl = process.env.NEXT_PUBLIC_LOCAL_URL

export const registerFunc = async ({ username, email, password }) => {
    try {
        const response = await fetch(`${baseUrl}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error);
    }
}

export const loginFunc = async ({ email, password }) => {
    try {
        const response = await fetch(`${baseUrl}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const result = await response.json()
        return { result, status: 200 }
    } catch (error) {
        console.log(error);
    }
}