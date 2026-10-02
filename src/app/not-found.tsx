import React from 'react'
import FreshPh from '../Assets/assets/images/freshcart-logo.svg'
import Image from 'next/image'
export default function notFound() {
  return (<>
   <div className='flex gap-5 flex-col  justify-center items-center mx-auto h-svh'>
     <Image width={400} height={400} className="relative"  src={FreshPh} alt='cart'/> 
    <div className=' absolute top-122 right-99 font-bold text-3xl '>.NOT FOUND</div>
   </div>
 </> )
}
