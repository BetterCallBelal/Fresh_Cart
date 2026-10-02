import React from 'react'


import Image from 'next/image';
import Link from 'next/link';
import { GetAllBrands } from '../API-s/Services/BrandsApi';

export default async function Brands() {
  const data = await GetAllBrands()
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
        {data.map((brand) => (
          <Link key={brand._id} href={`/SubBrand/${brand._id}`}>
            <div className="h-80 w-80  shadow-2xl transition-transform duration-300 ease-in-out hover:-translate-y-2.5 pt-4 flex flex-col gap-2">
              <Image
                width={300}
                height={200}
                src={brand.image}
                alt={brand.name}
                className="w-50 h-50  mx-auto mt-2 object-contain"
              />
              <div>
                <h1 className="items-center text-2xl pt-4 flex justify-center">
                  {brand.name}
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
