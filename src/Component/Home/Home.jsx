import React, { useState } from 'react'
import { UserContext } from '../Context/UserContext'
import Products from '../Products/Products'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'


export default function Home() {


  return (
    <>
    <MainSlider/>
    <CategorySlider/>
     <Products/>
    </>
  )
}
