import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext';
import { Cartcontext } from '../Context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';


export default function Navbar() {
  const { token , setToken}= useContext(UserContext);
    const [count, setcount] = useState(0)
 const {cartItem}= useContext(Cartcontext)

    const navigate=useNavigate();
    function logout(){
      setToken (null)
      navigate('/login')
    }
  return (
    <>
 

<div className='mb-24'>
<nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a to="" className="flex items-center space-x-3 rtl:space-x-reverse">
     
      <span className="self-center ms-7 text-blue-600 text-3xl font-semibold whitespace-nowrap dark:text-white"><FaShoppingCart className='text-6xl text-blue-400 inline-block relative' /> E-Commerce</span>
    </a>
    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

   <ul>
       {!token && <>
        <li>
          <Link to="/login" className="block py-2 text-xl px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Login</Link>
        </li>
        <li>
          <Link to="/register" className="block py-2 px-3 text-xl text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Register</Link>
        </li>
       </>}
         {token && <>
          <li className="relative">
  <Link to="/" className="block py-2 px-3 text-xl text-white bg-blue-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark:text-blue-500" aria-current="page">

    <FaShoppingCart className='text-3xl text-blue-500 inline-block relative' />
    
   
    <span className='absolute top-1 right-7 translate-x-1/2 -translate-y-1/2 bg-blue-950 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
      {cartItem}
    </span>
  </Link>
</li>

          <li onClick={logout}>
          <Link to="/" className="block py-2 px-3 text-xl text-white bg-blue-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark:text-blue-500" aria-current="page">  Logout </Link>
        </li>
         </>}
   </ul>
   
      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
    </div>
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
       {token && <>
        <li>
          <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
        </li>
        <li>
          <Link to="/wishlist" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">wishList</Link>
        </li>
        <li>
          <Link to="/products" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Products</Link>
        </li>
        <li>
          <Link to="/cart" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Carts</Link>
        </li>
        <li>
          <Link to="/category" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Category</Link>
        </li>
        <li>
          <Link to="/brand" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Brands</Link>
        </li>
       </>}
       
      
      </ul>
    </div>
  </div>
</nav>
</div>

    </>
  )
}
