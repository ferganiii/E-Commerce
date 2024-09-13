
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Loding from "../Loding/Loding";
export default function CategorySlider() {



  const [categories, setCategories] = useState([]);

 

   async function getCategories(){
    const {data} = await  axios.get('https://ecommerce.routemisr.com/api/v1/categories')


    setCategories(data?.data)
    
    }

    useEffect(()=> {
      console.log('Mounting CategorySlider');
      getCategories();
  } , [])

  if(categories.length === 0) {
      return <Loding />
  }
 
  

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    arrows:false,
    
    slidesToShow: 6,

    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }
      ]
  };
  return (
    <>
   <Slider {...settings} >
            {
                categories.map((c)=> <div key={c._id} className='p-2'>
                    <img className='h-[200px] w-full object-cover' src={c.image} alt="" />
                    <h3 className='text-sm text-blue-600 mt-3'>{c.name}</h3>

                </div>)
            }
        </Slider>
    </>
  )
}
