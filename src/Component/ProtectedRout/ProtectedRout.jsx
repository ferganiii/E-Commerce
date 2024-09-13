import React, { useContext, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRout(props) {

    const [count, setcount] = useState(0)

    const {token}=useContext(UserContext)
    if (token) {
      return  props.children
      
      }else{
    
       return <Navigate to={'/login'}></Navigate>
      }
  return (
    <>
    


    </>
  )
}
