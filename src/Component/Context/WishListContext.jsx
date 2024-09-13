import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const headers = { token: localStorage.getItem('token') };

  async function addWishList(PID) {
    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { productId: PID },
        { headers }
      );

      const productResponse = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${PID}`
      );

      const newWishlist = [...wishlist, productResponse.data.data];

      setWishlist(newWishlist);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));

      console.log(productResponse.data.data);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  }

  async function deletWishList(id) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        { headers }
      );

      if (response.data.status === 'success') {
     
        const updatedWishlist = wishlist.filter((item) => item._id !== id);
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        console.log('Product removed from wishlist');
      }
    } catch (error) {
      console.error('Error deleting from wishlist:', error);
    }
  }

  return (
    <WishListContext.Provider value={{ setWishlist, deletWishList, addWishList, wishlist }}>
      {children}
    </WishListContext.Provider>
  );
}
