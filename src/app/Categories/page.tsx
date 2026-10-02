import React from 'react'
import { GetAllProducts } from '@/app/API-s/Services/ProductsApi';

import { GetAllCategories } from '../API-s/Services/AllCategoriesApi';

import Image from 'next/image';
import Link from 'next/link';

export default async function Categories() {
  const data = await GetAllCategories()
console.log('cate',data);

  return (<>
 <div className="w-full pt-2 py-6">
      {/* Header */}
      <div className="flex pt-2.5 py-3.5">
        <div className="h-10 w-2 bg-green-700 ms-8 mt-11"></div>
        <div className="ms-2 mt-11 text-3xl">
          <h2>Categories</h2>
        </div>
      </div>

      {/* Grid */}
      <div className="gap-7 cursor-pointer px-3 ps-3.5 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((cat) => (
          <Link key={cat._id} href={`/SubCat/${cat._id}`}>
            <div className="h-80 w-80 rounded-2xl shadow-2xl transition-transform duration-300 ease-in-out hover:-translate-y-2.5 pt-4 flex flex-col gap-2">
              <Image
                width={200}
                height={200}
                src={cat.image}
                alt={cat.name}
                className="w-50 h-50 rounded-full mx-auto mt-2 object-cover"
              />
              <div>
                <h1 className="items-center text-2xl pt-4 flex justify-center">
                  {cat.name}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
</>

  )
}
