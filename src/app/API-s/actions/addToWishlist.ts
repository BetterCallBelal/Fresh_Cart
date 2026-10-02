"use server"
import { revalidatePath } from "next/cache"
import { getTokenFun } from "@/app/Uti/GetTokenData" 

const BASE = "https://ecommerce.routemisr.com/api/v1/wishlist"

export async function addToWishlistAction(productId: string) {
  const token = await getTokenFun()
  if (!token) {
    throw new Error("hkata2")
  }
  

  const res = await fetch(BASE, {
    method: "POST",
    headers: { token: token as string, "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  })


  revalidatePath("/wishlist")
  return res.json()
}

export async function getWishlistAction() {
  const token = await getTokenFun()
  if (!token) {
    throw new Error("hkata2")
  }

  const res = await fetch(BASE, {
    headers: { token: token as string },
    cache: "no-store",
  })
  const json = await res.json()
  return json.data ?? []
}

export async function removeFromWishlistAction(productId: string) {
  const token = await getTokenFun()
  if (!token) {
    throw new Error("hkata2")
  }

  const res = await fetch(`${BASE}/${productId}`, {
    method: "DELETE",
    headers: { token: token as string },
  })
  revalidatePath("/wishlist")
  return res.json()
}