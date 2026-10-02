"use client"
import React from "react"
import { addToWishlistAction } from "@/app/API-s/actions/addToWishlist"

export default function WishBtn({
  prodId,
  child,
  cls,
}: {
  prodId: string
  child: React.ReactNode
  cls?: string
}) {
  async function handleClick(e: React.MouseEvent) {
    e.preventDefault() // الكارت كله جوه Link
    e.stopPropagation()
    const data = await addToWishlistAction(prodId)
    console.log(data) // هنا ممكن تحط toast
  }

  return (
    <button onClick={handleClick} className={cls}>
      {child}
    </button>
  )
}