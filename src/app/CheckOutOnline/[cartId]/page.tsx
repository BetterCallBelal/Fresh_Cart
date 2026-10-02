import React from 'react'

import CheckOutOnline from '../CheckoutOnline'
type props ={
  params :{
    cartId:string
  }
 }



export default async function CheckOut(props :props ) {
 
  const params = await props.params
  const {cartId} = params
  console.log(cartId)
  
  return (<>
   
     <CheckOutOnline cartId={cartId}/>
  </>)
}
