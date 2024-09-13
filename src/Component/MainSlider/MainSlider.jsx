import React, { useState } from 'react'
import img1 from '../../assets/main-slider-1.jpeg'
import img2 from '../../assets/main-slider-2.jpeg'
import img3 from '../../assets/main-slider-3.jpeg'
import Slider from 'react-slick'
export default function MainSlider() {

    const [count, setcount] = useState(0)

    var settings = {
      dots: false,
      arrows:false ,
      // infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  return (
    <>
    
    <div className='grid grid-cols-12 mb-4 container'>
            {/* <div className="md:col-span-8 "> */}
            <Slider {...settings} className=' col-span-12 md:col-span-8 '>
               
               <img className='h-[400px] w-full object-cover object-right' src={img1} alt="" />  
               <img className='h-[400px] w-full object-cover object-right' src={img1} alt="" />
             
               
               <img className='h-[400px] w-full object-cover object-right' src={img1} alt="" />
             
                
            </Slider>
            {/* </div> */}
            <div className=" col-span-12 md:col-span-4   bg-sky-400">
                <img className='md:h-[200px] w-full ' src={img2} alt="" />
                <img className='md:h-[200px] w-full ' src={img3} alt="" />

            </div>
        </div>
    </>
  )
}
