"use client"
import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { removeFromWishlistAction } from "@/app/API-s/actions/addToWishlist"

export default function RemoveWishBtn({ prodId }: { prodId: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    startTransition(async () => {
      await removeFromWishlistAction(prodId)
      router.refresh()
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="mt-3 w-full py-2 rounded-md border border-red-300 text-red-500 hover:bg-red-50 duration-200 disabled:opacity-50"
    >
      {isPending ? "Removing..." : "Remove"}
    </button>
  )
}
