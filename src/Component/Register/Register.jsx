import React, { useContext, useState } from 'react'
import { useFormik, yupToFormErrors } from 'formik'
import * as  Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import axios from"axios"
import { FaSpinner } from "react-icons/fa";
import { UserContext } from '../Context/UserContext'

export default function Register() {
const {settoken}= useContext(UserContext);



    const [count, setcount] = useState(0)
    const [error, seterror] = useState('')
    const [isLoding, setisLoding] = useState(false)

    const navigate =useNavigate()
    const Schema= Yup.object().shape({
      name: Yup.string().required().min(3).max(18),
      email:Yup.string().required().email("email is not valid"),
      password: Yup.string()
      .required("pass is required")
      .matches(
        /^[A-Z].{5,}/,
        "must be start with uppercase then at least 5 chars"
      ),
      rePassword: Yup.string()
         .required("rePassword is required")
         .oneOf([Yup.ref("password")], "password must be match rePassword"),
         phone: Yup.string()
         .required("phone is required")
         .matches(/^01[0125][0-9]{8}$/, "phone must be valid egyptian num"),
   
   
      })
     
      
    const formik= useFormik({
      initialValues:{
              name:'',
              email:"",
              password:"",
              rePassword:"",
              phone:""
          },
          onSubmit:handleRegister,
          validationSchema:Schema
         
      })
     
      async function handleRegister(values) {
        setisLoding(true);
        try {
            const {data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/auth/signup",
                values
            );
    
            if (data.message === 'success') {
                navigate('/');
                settoken(data.token)
            } else {
                seterror('An unknown error occurred.');
            }
        } catch (error) {
          seterror(error.response.data.message)



        } finally {
            setisLoding(false);
           
        }
    }
    
    
        


       
  return (
    <>
        <div>
        <h2 className='text-2xl text-blue-600 text-center mb-32 mt-8'>register</h2>
        {error ?(
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">{error} </span> 
</div>
        ):null}
           
<form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
  <div className="relative z-0 w-full mb-5 group">
    <input
     value={formik.values.email}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
    type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  
    {formik.errors.email&&formik.touched.email ? 
    <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-blue-400" role="alert">
  <span className="font-medium">{formik.errors.email}</span> 
</div>
:null} 
  </div>


  <div className="relative z-0 w-full mb-5 group">
    <input
      value={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
   type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />

{formik.errors.password&&formik.touched.password ? <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-blue-400" role="alert">
  <span className="font-medium">{formik.errors.password}</span> 
</div>
:null}
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
 
 
  </div>


  <div className="relative z-0 w-full mb-5 group">
    <input 
     value={formik.values.rePassword}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
    type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
    {formik.errors.rePassword&&formik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-blue-400" role="alert">
  <span className="font-medium">{formik.errors.rePassword}</span> 
</div>
:null}
  </div>
    <div className="relative z-0 w-full mb-5 group">
      <input 
      value={formik.values.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> name</label>
   
      {formik.errors.name&&formik.touched.name ? <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-blue-400" role="alert">
  <span className="font-medium">{formik.errors.name}</span> 
</div>
:null}
    </div>


  
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
      <input 
        {...formik.getFieldProps("phone")}
      type="tel"  name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
      {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-blue-400" role="alert">
  <span className="font-medium">{formik.errors.phone}</span> 
</div>
:null}
    </div>


  

      
  </div>
  
  <button
   disabled={isLoding}
  type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {isLoding ? <FaSpinner className=" animate-spin" /> : "submit" }


    
    </button>
</form>
          </div>  



    </>
  )
}
