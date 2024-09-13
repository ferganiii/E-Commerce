
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

   export const Cartcontext = createContext();
   
   export default function CartcontextProvider({children}) {
   
   
 
    const headers={token : localStorage.getItem('token')}

    function getLoggedusercart () {
         return     axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
               headers 
              }).then((data)=>data)
               .catch((error)=>error)
     }
    function addItemToCart (PID) {
         return     axios.post(`https://ecommerce.routemisr.com/api/v1/cart` ,{productId:PID}, {
               headers 
              }).then((data)=>data)
               .catch((error)=>error)
     }
     
     function updateCart  (id , count) {
      return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count: count }, {
        headers 
      }).then((data) => data)
        .catch((error) => error);
      
  }

  function deletitem (id) {
    return     axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
          headers 
         }).then((data)=>data)
          .catch((error)=>error)
}

   const [cartItem, setcartItem] = useState(0)
async function getCart() {
  const response = await getLoggedusercart();
  if (response.data.status === 'success') {
    setcartItem(response.data.numOfCartItems);
    console.log({cartItem});
    
  }
}
   
 useEffect(()=>{
  getCart()
 } 
  ,[])

      function cheakOut(cartId, shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://http://localhost:5173` ,
          {
            shippingAddress:shippingAddress        
        },
        {headers}
        ).then((data)=>data)
        .catch((error)=>error)
      }  
    

   
      function clearCart () {
        return     axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
              headers 
             }).then((data)=>data)
              .catch((error)=>error)
    }


     return (
       <Cartcontext.Provider value={{clearCart , cheakOut,cartItem,getCart,setcartItem, getLoggedusercart ,addItemToCart ,updateCart , deletitem}}>
         {children}
       </Cartcontext.Provider>
     );
   }
   
   