import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Foteer from '../Foteer/Foteer'

export default function Layout() {

    const [count, setcount] = useState(0)
  return (
    <>
    <div className='container pt-20 '>

       <Navbar/>
        <Outlet/>

    </div>
   
 
    </>
  )
}
