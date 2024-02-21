"use client"

import { useFormStatus } from "react-dom";
import { deleteContact } from "@/services/contactService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"

function DeleteContact({ id, token }) {
  const router = useRouter()

  const handleDelete = async () => {
    const data = await deleteContact({ id, token })
    if (data.success == true) {
      toast.success("Deleted")
    }
    router.refresh()
  }

  const { pending } = useFormStatus();

  return (
    <button type="submit" className="p-3 bg-pink-500 text-white rounded-lg" onClick={() => { handleDelete() }} aria-disabled={pending}>
      Delete
    </button>
  );
}

export default DeleteContact