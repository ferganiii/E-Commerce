
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { Cartcontext } from "../Context/CartContext";
import { useParams } from "react-router-dom";



function CheakOut() {
const {cartId} = useParams()
  const{cheakOut} = useContext(Cartcontext)
  const [isLoading, setIsLoading] = useState(false);



  const formik = useFormik({
    
    initialValues: {
     
      "details": "",
      "phone": "",
      "city": ""
     
    },

    
    onSubmit: handleSubmit,

    
 
  
  
 
  });
  
  async function handleSubmit(values) {
    setIsLoading(true);
   console.log(values);
 const response= await cheakOut(cartId, values)
   console.log(response.data.session.url);
   window.location.href=response.data.session.url
  }

  
  useEffect(() => {
    console.log("Mounting Login");
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
    <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">CheakOut</h2>


    <form onSubmit={formik.handleSubmit}>
      <div className="relative z-0 w-full mb-5 group">
        <input
          {...formik.getFieldProps("phone")}
          type="tel"
          name="tel"
          id="tel"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="tel"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone:
        </label>
        {formik.errors.email && formik.touched.email ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.phone}
          </div>
        ) : null}
      </div>


      <div className="relative z-0 w-full mb-5 group">
        <input
          {...formik.getFieldProps("details")}
          type="text"
          name="details"
          id="details"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="details"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Details:
        </label>
       
      </div>


      <div className="relative z-0 w-full mb-5 group">
        <input
          {...formik.getFieldProps("city")}
          type="text"
          name="city"
          id="city"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="city"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          city:
        </label>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="text-white disabled:bg-blue-200 disabled:text-gray-500 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isLoading ? <FaSpinner className="animate-spin" /> : "Payment"}
      </button>
    </form>
  </div>
</div>

  );
}

export default CheakOut;
