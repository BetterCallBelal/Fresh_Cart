import Image from 'next/image'
import React from 'react'
import FreshPh from '../../../Assets/assets/images/freshcart-logo.svg'
import Link from 'next/link'
export default function Footer() {
  return (
<footer className="border-t border-neutral-700/20 py-10 px-6 bg-white">
  <div className="mx-auto max-w-7xl">
    <div className="flex flex-wrap items-center justify-between gap-10 md:items-start lg:flex-nowrap">
      <div className="w-full sm:w-1/2 lg:w-1/3">
        <a href="/">
           <Image className="mb-5"  src={FreshPh} alt='cart'/> 
        </a>
        <p className="my-4 text-gray-700">
         Your one-stop destination for the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.
        </p>
      </div>
      <div className="w-full md:w-2/3">
        <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3 sm:gap-10 md:grid-cols-4">
          <div>
            <h3 className=" uppercase text-gray-700">Pages</h3>
            <ul className="mt-4 space-y-2 text-gray-700">
               <li>          <Link className="font-bold hover:text-green-400 duration-200 hover:scale-110" href={'/'}>Home</Link>
</li>
              <li>          <Link className="font-bold hover:text-green-400 duration-200 hover:scale-110" href={'/brands'}>Brands</Link>
</li>
 <li>          <Link className="font-bold hover:text-green-400 duration-200 hover:scale-110" href={'/Categories'}>Categories</Link>
</li>
              
            </ul>
          </div>
          <div>
            <h3 className=" uppercase text-gray-700">Support</h3>
            <ul className="font-bold mt-4 space-y-2 text-gray-700">
              <li><a href="mailto:support@yourservice.io">Request Feedback</a></li>
              <li><a href="mailto:support@yourservice.io">Submit Bugs</a></li>
              <li><a href="/contact-us">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className=" uppercase  text-gray-700">Legal</h3>
            <ul className="mt-4 font-bold space-y-2 text-gray-700">
              <li><a href="/privacy-policy">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className=" uppercase text-gray-700">Contact</h3>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <a href="mailto:hello@yourservice.io" className="inline-link flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-mail">
                    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                    <path d="M3 7l9 6l9 -6" />
                  </svg>FreshCart@gmail.com
                </a>
              </li>
              <li className="flex w-auto items-center justify-start gap-2">
                <a href="https://twitter.com/yourserviceio" className="inline-link flex gap-2" target="_blank" rel="noreferrer">
<div className='flex gap-1'>
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone preview-icon"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" /></svg>(+20) 01093333333
</div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</footer>

  )
}
