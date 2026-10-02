import { notFound } from "next/navigation"
import Image from "next/image"

import AddBtn from "@/app/_component/AddBtn/AddBtn"
import Link from "next/link"
import { GetSubBrandProduct } from "@/app/API-s/Services/BrandsApi"

export default async function SubBrand(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params
  const products = await GetSubBrandProduct(id)

  if (!products || products.length === 0) notFound()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products :</h1>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      
      {products.map((product) => (
  <Link
    key={product._id}                        
    href={`/ProductDetails/${product._id}`}
  >
    <div className="w-70 border border-blue-200 rounded-lg shadow-md p-4 hover:bg-gray-200 hover:scale-105 duration-300">
      {/* Discount Badge */}
      <div className="relative">
        {product.priceAfterDiscount ? (
          <span className="absolute top-2 z-20 left-2 bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
            -{Math.round(
              ((product.price - product.priceAfterDiscount) / product.price) * 100
            )}%
          </span>
        ) : null}

        <Image
          width={300}
          height={200}
          src={product.imageCover}
          alt={product.title}
          className="object-contain w-full h-60"
        />
      </div>

      {/* Details */}
      <div className="mt-4">
        <h3 className="text-gray-800 font-medium text-base line-clamp-1">
          {product.title}
        </h3>
        <p className="uppercase text-green-600 text-xs font-medium">
          {product.category?.name}
        </p>

        {/* Ratings */}
        <div className="flex items-center gap-1 text-orange-500 text-sm mt-1">
          <span>⭐</span>
          <span>{product.ratingsAverage}</span>
        </div>

        {/* Pricing */}
        <div className="flex justify-between items-baseline gap-2 mt-2">
          <span className="text-blue-600 text-xl font-semibold">
            {product.priceAfterDiscount ?? product.price}
          </span>
          {product.priceAfterDiscount && (
            <span className="text-gray-400 text-sm line-through">
              {product.price}
            </span>
          )}
          <AddBtn
            prodId={product._id}
            child={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
              </svg>
            }
            cls="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:-translate-y-0.5 duration-200 hover:bg-blue-800 shadow text-white"
          />
        </div>
      </div>
    </div>
  </Link>                                    
))}
       
      </div>
      
    </div>
  )
}