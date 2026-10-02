import Image from "next/image";
import { Button } from "@/components/ui/button"
import FeaturedProducts from "./_component/Featured Products/FeaturedProducts";
import Slider from "./_component/Slider/Slider";
import { GetAllProducts } from "./API-s/Services/ProductsApi";
import img1 from '../Assets/assets/images/banner-4.jpeg'
import img2 from '../Assets/assets/images/blog-img-1.jpeg'
import img3 from '../Assets/assets/images/blog-img-2.jpeg'

import dynamic from 'next/dynamic'
export  default  function Home() {
  const Category = dynamic(() => import("./_component/category/Category"),{
    loading:()=><div className="bg-red-400 h-20">Loading</div>
  })

  return (
  <>

<div >
  <Slider spaceBetween={0} slidesPerView={1} pageList={[img1.src , img2.src , img3.src]}/>
  <Category/>
  <FeaturedProducts/>
</div>
  
  </>
  );
}
