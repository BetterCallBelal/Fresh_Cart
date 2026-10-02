import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Star, Heart, ShoppingCart, ChevronRight, Check, X } from "lucide-react"

import { GetSingleProduct } from "@/app/API-s/Services/ProductsApi"
import Slider from "../../_component/Slider/Slider"
import AddBtn from "../../_component/AddBtn/AddBtn"

export default async function ProductDetails(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params
  const data = await GetSingleProduct(id)

  if (!data) notFound()

const rating = Math.round(data.ratingsAverage ?? 0)
const discounted = data.priceAfterDiscount // number | undefined
const hasDiscount = discounted !== undefined && discounted > 0
const discountPercent = hasDiscount
  ? Math.round(((data.price - discounted) / data.price) * 100)
  : 0
const finalPrice = hasDiscount ? discounted : data.price
const inStock = data.quantity > 0

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <ChevronRight size={14} />
           <Link href="/Categories" className="hover:text-gray-900">Categories</Link>
          <ChevronRight size={14} />
         
          <span className="line-clamp-1 text-gray-900">{data.title}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Images */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
                {hasDiscount && (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow">
                    -{discountPercent}%
                  </span>
                )}
                <Image
                  src={data.imageCover}
                  alt={data.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-4"
                />
              </div>
              <div className="mt-4">
                <Slider spaceBetween={12} slidesPerView={4} pageList={data.images} />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
            {/* Category + Brand */}
            <div className="flex flex-wrap items-center gap-2">
              {data.category?.name && (
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                  {data.category.name}
                </span>
              )}
              {data.brand?.name && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {data.brand.name}
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900">
              {data.title}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {data.ratingsAverage} · {data.ratingsQuantity} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-end gap-3">
  <span className="text-4xl font-bold text-gray-900">
    {finalPrice}
    <span className="ml-1 text-lg font-medium text-gray-500">EGP</span>
  </span>
  {hasDiscount && (
    <span className="mb-1 text-lg text-gray-400 line-through">
      {data.price} EGP
    </span>
  )}
</div>

            {/* Description */}
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Description
              </h2>
              <p className="leading-relaxed text-gray-700">{data.description}</p>
            </div>

            {/* Stock */}
            <div className="mt-6">
              {inStock ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                  <Check size={16} /> In stock ({data.quantity})
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
                  <X size={16} /> Out of stock
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AddBtn
                prodId={data._id}
                child={
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
                }
                cls="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              />
              <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                <Heart size={20} />
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}