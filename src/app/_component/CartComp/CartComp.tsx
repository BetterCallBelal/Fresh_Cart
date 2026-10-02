'use client'
import DeleteoneCart from '@/app/API-s/actions/DeleteSCart'
import DispalyCard from '@/app/API-s/actions/GetCard'
import UpdataCart from '@/app/API-s/actions/updataCartitem'
import { toast } from '@/components/ui/toast'
import { CartType } from '@/types/cartType'
import { Button } from '@base-ui/react'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation';
import DeleteAllCart from '@/app/API-s/actions/Clearcart'
import Link from 'next/link'

export default  function CartComp() {
     const router = useRouter();

    const  query =useQueryClient()
const {data :cartData}= useQuery<CartType>({
    queryKey:['getcart'],
    queryFn : async()=>{
        const response = await fetch ('/api/cart')
        if(!response.ok){
            throw new Error('failed fetch')
        }
        return response.json()
    } 
    
    
})
const totalItems =
  cartData?.data.products.reduce((acc, product) => acc + product.count, 0) ?? 0
console.log('cartdata',cartData);
const { data: delData, mutate: delcartMutate } = useMutation({
  mutationFn: DeleteoneCart,
  onSuccess: () => {
    toast.add({
      type: 'success',
      description: 'Item Deleted successfully From Your Cart',
    });
    query.invalidateQueries({queryKey:['getcart']})
  },
  onError: () => {
    toast.add({
      type: 'error',
      description: 'Item Deleted Failed',
    });
  },
});  
const { data: delAllData, mutate: delallcartMutate } = useMutation({
  mutationFn: DeleteAllCart,
  onSuccess: () => {
    toast.add({
      type: 'success',
      description: 'Items Deleted successfully From Your Cart',
    });
    query.invalidateQueries({queryKey:['getcart']})
  },
  onError: () => {
    toast.add({
      type: 'error',
      description: 'Items Deleted Failed',
    });
  },
});  
function handleDeleteAll() {
    delallcartMutate()
}
const { data: UpdData, mutate: UpdcartMutate } = useMutation({
  mutationFn: UpdataCart,
  onSuccess: () => {
    toast.add({
      type: 'success',
      description: 'Quantity Changed successfully ',
    });
    query.invalidateQueries({queryKey:['getcart']})
  },
  onError: () => {
    toast.add({
      type: 'error',
      description: ' Changing Quantity Failed',
    });
  },
});  
function HandleUpdCart (prodId:string , count :number){
   if (count < 1) return   
  UpdcartMutate({ prodId, count })
}
    return (<>
    
    {cartData?.numOfCartItems===0?
    <div className=' mt-44 flex justify-center pb-4 items-center flex-col'>
        <h1 className='text-6xl flex justify-center items-center'>No Items Selected Yet...</h1>
 <Button 
   onClick={() => router.push('/')}
  className="px-8 mt-5 py-3.5 cursor-pointer bg-[#f2f2f2] rounded-[43px] 
             text-[#4c4c4c] text-sm font-semibold leading-[16px]"
>
 Go Pick Some Offers!
</Button>    </div>
   
    
   :<section className="w-full bg-white dark:bg-[#0A2025] py-9 px-8">
  <h1 className="text-center text-[#191919] dark:text-white text-[32px] font-semibold leading-[38px]">
    My Shopping Cart
  </h1>
  <div className="flex items-start mt-8 gap-6">
    <div className="bg-white p-4 w-[800px] rounded-xl">
      <table className="w-full bg-white rounded-xl">
        <thead>
          <tr className="text-center border-b border-gray-400 w-full text-[#7f7f7f] text-sm font-medium uppercase leading-[14px] tracking-wide">
            <th className="text-left px-2 py-2">Product</th>
            <th className="px-2 py-2">price</th>
            <th className="px-2 py-2">Quantity</th>
            <th className="px-2 py-2">Subtotal</th>
            <th className="w-7 px-2 py-2" />
          </tr>
        </thead>
        <tbody>
        {cartData?.data.products.map((product)=>    <tr key={product._id} className="text-center">
            <td className="px-2 py-2 text-left align-top">
              <Image width={100} height={100} alt={product.product.title} src={product.product.imageCover}  className=" mr-2 inline-block h-[100px]" /><span>Green Capsicum</span>
            </td>
            <td className="px-2 py-2">{product.price} EGP</td>
            <td className="p-2 mt-9 bg-white rounded-[170px] border border-[#a0a0a0] justify-around items-center flex">
              <button
      type="button"
      disabled={product.count <= 1}
      onClick={() => HandleUpdCart(product.product._id, product.count - 1)}
      className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
    >
      <svg width={14} height={15} viewBox="0 0 14 15" fill="none">
        <path d="M2.33398 7.5H11.6673" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>

    <span className="w-10 text-center">{product.count}</span>

    <button
      type="button"
      onClick={() => HandleUpdCart(product.product._id, product.count + 1)}
      className="cursor-pointer"
    >
      <svg width={14} height={15} viewBox="0 0 14 15" fill="none">
        <path d="M2.33398 7.5H11.6673M7 2.83331V12.1666" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
            </td>
            <td className="px-2 py-2">{product.count * product.price} EGP</td>
            <td className="px-2 py-2">
              <svg onClick={()=>{delcartMutate(product.product._id)}} width={24} className="cursor-pointer" height={25} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z" stroke="#CCCCCC" strokeMiterlimit={10} />
                <path d="M16 8.5L8 16.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 16.5L8 8.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </td>
          </tr>)}
      
      
        </tbody>
        <tfoot >
        
  
  <Button 
   onClick={handleDeleteAll}
  className="px-8 ms-6 mt-5 py-3.5 cursor-pointer bg-[#f2f2f2] rounded-[43px] 
             text-[#4c4c4c] text-sm font-semibold leading-[16px]"
>
 Clear Cart
</Button>

        </tfoot>
      </table>
      
    </div>
    <div className="w-[424px] bg-white rounded-lg p-6">
      <h2 className="text-[#191919] mb-2 text-xl font-medium leading-[30px]">
        Cart Total
      </h2>
      <div className="w-[376px] py-3 justify-between items-center flex">
        <span className="text-[#4c4c4c] text-base font-normal leading-normal">Total:</span><span className="text-[#191919] text-base font-semibold leading-tight">{cartData?.data.totalCartPrice} EGP</span>
      </div>
      <div className="w-[376px] py-3 shadow-[0px_1px_0px_0px_rgba(229,229,229,1.00)] justify-between items-center flex">
        <span className="text-[#4c4c4c] text-sm font-normal leading-[21px]">Shipping:</span><span className="text-[#191919] text-sm font-medium leading-[21px]">Free</span>
      </div>
      <div className="w-[376px] py-3 shadow-[0px_1px_0px_0px_rgba(229,229,229,1.00)] justify-between items-center flex">
        <span className="text-[#4c4c4c] text-sm font-normal leading-[21px]">Cart Items</span><span className="text-[#191919] text-sm font-medium leading-[21px]">{totalItems}</span>
      </div>
     <div className='mt-2 text-md' >Payment Method:</div>
 <div>
  <Link
    href={`/CheckOutCash/${cartData?.cartId}`}
    className="mt-5 flex w-[376px] items-center justify-center gap-4 rounded-[44px] bg-[#00b206] px-10 py-4 text-base font-semibold leading-tight text-white"
  >
    Pay cash
  </Link>
  <Link
    href={`/CheckOutOnline/${cartData?.cartId}`}
    className="mt-5 flex w-[376px] items-center justify-center gap-4 rounded-[44px] bg-[#00b291] px-10 py-4 text-base font-semibold leading-tight text-white"
  >
    Pay Online
  </Link>
 </div>
    </div>
  </div>
  
</section>}


    
    
    
    </>
 
  )
}
