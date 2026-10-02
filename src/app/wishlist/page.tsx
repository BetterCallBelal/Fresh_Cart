import React from "react"
import Image from "next/image"
import Link from "next/link"
import { getWishlistAction } from "@/app/API-s/actions/addToWishlist"
import RemoveWishBtn from "@/app/WishBtn/WishBtn"

interface WishItem {
  id: string
  title: string
  imageCover: string
  price: number
  category?: { name: string }
}

export default async function WishlistPage() {
  const items: WishItem[] = await getWishlistAction()

  if (items.length === 0) {
    return (
      <p className="text-center py-10 text-gray-600">
        Your wishlist is empty. Tap the heart on a product to save it here.
      </p>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <h1 className="text-4xl pb-2.5 font-extralight">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="w-70 border border-blue-200 rounded-lg shadow-md p-4 bg-white"
          >
            <Link href={`/ProductDetails/${item.id}`}>
              <Image
                width={300}
                height={200}
                src={item.imageCover}
                alt={item.title}
                className="object-contain w-full h-67.5"
              />
              <h3 className="mt-4 text-gray-800 font-medium line-clamp-1">
                {item.title}
              </h3>
              <p className="uppercase text-green-600 text-xs font-medium">
                {item.category?.name}
              </p>
              <p dir="ltr" className="mt-2 text-blue-600 text-xl font-semibold text-left">
                ${item.price.toLocaleString("en-US")}
              </p>
            </Link>
          <RemoveWishBtn
  prodId={item.id}
  child={
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  }
/>
          </div>
        ))}
      </div>
    </div>
  )
}