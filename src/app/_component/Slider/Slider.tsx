// Import Swiper React components
"use client"
import { Swiper, SwiperSlide  } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import Image from 'next/image';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export default function slider({spaceBetween  ,slidesPerView , pageList }:{
spaceBetween: number , 
slidesPerView: number,
pageList : string[]

}) {
  return (
    <Swiper
    loop={true}
    modules={[Navigation, Pagination]}
     navigation 
      pagination={{ clickable: true }}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
     
  {pageList.map((image)=>{return  <SwiperSlide> 
    <Image className='w-full h-80' width={400} height={300} src={image} alt='' />
    </SwiperSlide>})}
      

 
    </Swiper>
  );
};