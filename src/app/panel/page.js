
import { getAllContact } from "@/services/contactService"
import { getCookie } from '@/libs/cookies';
import DeleteContact from "../delete-contact";

export default async function ProtectedPage() {
    const token = getCookie()
    const data = await getAllContact({ token })

    return (
        <div>
            <div>ProtectedPage</div>
            <div className="grid grid-cols-3 gap-5">
                {data && data.map((user, index) => (
                    <div key={index}>
                        <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                            <div className="p-6">
                                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                    Contact User
                                </h5>
                                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                    {user.username}
                                </p>
                                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                    {user.email}
                                </p>
                                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                    {user.phone}
                                </p>
                            </div>
                            <div className="p-6 pt-0">
                                <DeleteContact token={token} id={user._id} />
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}
