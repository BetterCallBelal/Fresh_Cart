'use client'
import addToCart from '@/app/API-s/actions/addToCart'
import { toast } from '@/components/ui/toast'
import { Button } from '@base-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { ReactNode } from 'react'


export default function AddBtn({cls , child , prodId}:{cls:string, child:ReactNode , prodId:string}) {
 const  query =useQueryClient()
 query.invalidateQueries({queryKey:['getcart']})
const {data , mutate} = useMutation({
  mutationFn : addToCart ,
  onSuccess:()=>{
toast.add({
    type:'success',
    description:'Item Added successfully To Your Cart'
  })
  },
  onError:()=>{
    toast.add({
    type:'error',
    description:'Login First'
  })
    console.log(data);
  }

  
})


  async function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
       e.preventDefault()   
    e.stopPropagation()  
    mutate(prodId)
//  const data= await addToCart(prodId)
//  if(data.message==='Product added successfully to your cart'){
//   toast.add({
//     type:'success',
//     description:'Item Added successfully To Your Cart'
//   })
//  }else{
//   toast.add({
//     type:'error',
//     description:'Item Not Exist...'
//   })
//  }
}
  return (
   <>
   <Button  onClick={handleAddToCart} className={cls} >{child}</Button>
   
           
          
   </>
    
  )
}
