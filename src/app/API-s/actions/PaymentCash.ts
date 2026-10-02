'use server'
import { ShippingData } from '@/app/CheckOutCash/CheckOutFrom';
import { getTokenFun } from '@/app/Uti/GetTokenData';
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

import React from 'react'

export default  async function PaymentCash(cartId:string , shippingAddress : ShippingData) {

 const token = await getTokenFun()
if (!token) {
throw new Error('hkata2')}

try {
     const response  = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,{
    method :'POST',
    body:JSON.stringify({
        shippingAddress : shippingAddress
    }),
    headers:{
        token :token , 
       "Content-Type": 'application/json' 
    }
 }
   
 )


 if (!response.ok) {

    
 }
 const payload = await response.json()
console.log(payload);
return payload
} catch (error) {
    throw new Error('hkata2')
}

}

