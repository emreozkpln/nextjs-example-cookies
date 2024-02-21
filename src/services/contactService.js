const baseUrl = process.env.NEXT_PUBLIC_LOCAL_URL

export const getAllContact = async ({ token }) => {
    try {
        const response = await fetch(`${baseUrl}/contact`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error);
    }
}

export const createContact = async ({ token, username, email, phone }) => {
    try {
        const response = await fetch(`${baseUrl}/contact`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                phone
            })
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.log(error);
    }
}

export const deleteContact = async ({ id, token }) => {
    try {
        const response = await fetch(`${baseUrl}/contact/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error);
    }
}