import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { GetAllProducts } from '@/app/API-s/Services/ProductsApi';
import { Query, useQueryClient } from '@tanstack/react-query';

export default async function FeaturedProducts() {
  const data = await GetAllProducts()

  return (<>
  <div className='flex'>
    <div className='h-10 w-2 bg-green-700 ms-8 mt-11'></div>
    <div className='ms-2 mt-11 text-3xl'><h2>Featured Products</h2></div>
  </div>
  <div className='mt-6 mx-7 grid gap-5 md:grid-cols-2 pb-7 sm:grid-cols-1  lg:grid-cols-3 xl:grid-cols-5'>
    {data.map((product)=>{return <ProductCard product={product} key={product._id}/>})}
    </div>
</>

  )
}
