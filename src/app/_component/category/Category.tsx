import { GetAllCategories } from "@/app/API-s/Services/AllCategoriesApi"
import Image from "next/image"
import Link from "next/link"

export default async function Categories() {
  const data = await GetAllCategories()

  return (
    <div className="w-full pt-2">
      {/* Header */}
      <div className="flex pt-2.5 py-3.5">
        <div className="h-10 w-2 bg-green-700 ms-8 mt-11"></div>
        <div className="ms-2 mt-11 text-3xl">
          <h2>Categories</h2>
        </div>
      </div>

      {/* Grid */}
      <div className="gap-3.5 px-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {data.map((cat) => (
          <Link key={cat._id} href={`/SubCat/${cat._id}`}>
            <div className="h-40 w-60 rounded-2xl shadow-2xl transition-transform duration-300 ease-in-out hover:-translate-y-2.5 pt-4 flex flex-col gap-2">
              <Image
                width={100}
                height={100}
                src={cat.image}
                alt={cat.name}
                className="w-20 h-20 bg-amber-900 rounded-full mx-auto mt-2 object-cover"
              />
              <div>
                <h1 className="items-center flex justify-center">
                  {cat.name}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}