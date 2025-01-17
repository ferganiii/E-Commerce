




import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";


import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";



function Login() {
  const {setToken} = useContext(UserContext)
  
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const schema = Yup.object().shape({
   
    email: Yup.string().required().email("email is not valid"),
    password: Yup.string()
      .required("pass is required")
      .matches(
        /^[A-Z].{5,}/,
        "must be start with uppercase then at least 5 chars"
      ),
     
  });

  const navigate = useNavigate();
  const formik = useFormik({
    
    initialValues: {
     
      email: "",
      password: "",
     
    },

    
    onSubmit: handleSubmit,

    
 
    validationSchema: schema,
  
 
  });
  
  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const {data} = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if(data.message == "success") {
     
        navigate('/')
        setToken(data.token)
      }
    } catch (error) {
      setErrMsg(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  
  useEffect(() => {
    console.log("Mounting Login");
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
    <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Login</h2>

    {errMsg ? (
      <div
        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        {errMsg}
      </div>
    ) : null}

    <form onSubmit={formik.handleSubmit}>
      <div className="relative z-0 w-full mb-5 group">
        <input
          {...formik.getFieldProps("email")}
          type="email"
          name="email"
          id="email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          UserEmail :
        </label>
        {formik.errors.email && formik.touched.email ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.email}
          </div>
        ) : null}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          {...formik.getFieldProps("password")}
          type="password"
          name="password"
          id="password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          UserPassword :
        </label>

        {formik.errors.password && formik.touched.password ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.password}
          </div>
        ) : null}
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="text-white disabled:bg-blue-200 disabled:text-gray-500 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isLoading ? <FaSpinner className="animate-spin" /> : "Submit"}
      </button>
    </form>
  </div>
</div>

  );
}

export default Login;
