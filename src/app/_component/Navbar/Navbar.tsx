"use client"

import * as React from "react"
import Link from "next/link"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
} from "lucide-react"
import FreshPh from '../../../Assets/assets/images/freshcart-logo.svg'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@base-ui/react"
import Image from "next/image"
import Firstnav from "../Firstnav/Firstnav"
import { Searchbar } from "../Searchbar/Searchbar"
import { signOut, useSession } from "next-auth/react"
import { log } from "console"
import { logDisallowedDynamicError } from "next/dist/server/app-render/dynamic-rendering"
import { useQuery } from "@tanstack/react-query"
import { CartType } from "@/types/cartType"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function Navbar() {
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


  
  function handledelete(){
  signOut({ callbackUrl: '/register' })
  }
  const {status , data:sessionData} = useSession()
  console.log(status);
  
  return (
    <>
    <Firstnav/>
    
<NavigationMenu className='bg-gray-200/70 backdrop-blur-sm max-w-full rounded-b-4xl z-50 flex justify-between sticky top-0'>     
      <NavigationMenuList className='justify-between p-3 items-center'>
       <div className="flex gap-8 ">
       <Image src={FreshPh} alt='cart'/>
         </div> 
      
        <div className='md:flex gap-5 hidden'>
           <NavigationMenuItem >
            
          <Link className="font-bold hover:text-green-400 duration-200 hover:scale-110" href={'/'}>home</Link>
        </NavigationMenuItem>
         <NavigationMenuItem className='flex gap-5'>
            
          {/* <Link className="font-bold hover:text-green-400 duration-200 hover:scale-110" href={'/Shop'}>Shop</Link>
        </NavigationMenuItem>
         <NavigationMenuItem className='flex gap-5'> */}
            
          <Link className="font-bold hover:text-green-400 duration-200 hover:scale-110" href={'/brands'}>Brands</Link>
        </NavigationMenuItem>
         <NavigationMenuItem className='flex gap-5'>
              
          <Link className="font-bold hover:text-green-400 duration-200 hover:scale-110" href={'/Categories'}>Categories</Link>
        </NavigationMenuItem>
        </div>
        {status==='authenticated'?        <div className="md:flex gap-5 hidden items-center ">
<Link href={'/cart'}>          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-green-400 relative">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg></Link>
{cartData?.numOfCartItems===0?null:<span className="text-sm px-2 py-0.5 top-3 right-40  absolute rounded-full bg-green-400">{cartData?.numOfCartItems}</span>}


<Link href={ '/wishlist'}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-green-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg></Link>


<Button onClick={() => handledelete()}
  
  className="   py-3 px-4 rounded-2xl  bg-[#0AAD0A] font-bold text-[#21313C] hover:bg-[#024f02] duration-200 cursor-pointer  inline-block text-center"
>
  Sign Out
</Button>
        </div>:
        
          <Link href={'/login'}><Button 
    
    className="   py-3 px-8 rounded-2xl bg-[#0AAD0A]  hover:bg-[#024f02] duration-200 cursor-pointer  inline-block text-center"
  >
    Login
  </Button></Link>
        
        }

       
         
          




        <NavigationMenuItem className='md:hidden'>
          <NavigationMenuTrigger><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
</svg>
</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              <ListItem href="/" title="Home">
                Main page
              </ListItem>
              <ListItem href="/brands" title="Brands">
                Most known Brands
              </ListItem>
              <ListItem href="/Shop" title="Shop">
                What you decide to take with
              </ListItem>
              <ListItem href="/Categories" title="categories">
                Sorts of items
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>




      


        
     






       
      </NavigationMenuList>
    </NavigationMenu>
 </> )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink render={<Link href={href}><div className="flex flex-col gap-1 text-sm">
          <div className="leading-none font-medium">{title}</div>
          <div className="line-clamp-2 text-muted-foreground">{children}</div>
        </div></Link>} />
    </li>
    
  )
  
}

