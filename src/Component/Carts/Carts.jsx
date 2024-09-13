import React, { useContext, useEffect, useState } from 'react';
import { Cartcontext } from '../Context/CartContext';
import { FaTrash } from 'react-icons/fa';
import CartItems from '../CartItems/CartItems';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Carts() {
  const [cartDetils, setCartDetils] = useState(null);
  const { getLoggedusercart, updateCart, deletitem, clearCart } = useContext(Cartcontext);

  async function getCart() {
    try {
      const response = await getLoggedusercart();
      if (response.data.status === 'success') {
        setCartDetils(response.data.data);
      } else {
        console.error('Failed to fetch cart details:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching cart details:', error);
    }
  }

  async function updateItem(id, count) {
    const response = await updateCart(id, count);
    if (response.data.status === 'success') {
      setCartDetils(response.data.data);
      toast.success('Updated', {
        style: { backgroundColor: 'blue', color: 'white' }
      });
    }
  }

  async function deletItemCart(id) {
    const response = await deletitem(id);
    if (response.data.status === 'success') {
      setCartDetils(response.data.data);
      toast.success('Deleted', {
        style: { backgroundColor: 'blue', color: 'white' }
      });
    }
  }

  async function clear() {
    try {
      const response = await clearCart();
      console.log(response); 
      if (response?.data?.status === 'success') {
        setCartDetils(null)
        toast.success('Cart cleared successfully', {
          style: { backgroundColor: 'blue', color: 'white' }
        });
      } else {
        toast.error('Failed to clear cart', {
          style: { backgroundColor: 'red', color: 'white' }
        });
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Error clearing cart', {
        style: { backgroundColor: 'red', color: 'white' }
      });
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <div className='container'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <h5 className='text-blue-500 text-2xl text-center m-5'>Cart Details</h5>
          <div className='flex items-center mb-3 justify-between'>
            <p className='text-xl text-white bg-blue-500 p-2 rounded-sm'>
              Total Price <span className='rounded-md p-2 bg-blue-400'> {cartDetils?.totalCartPrice} EGY</span>
            </p>
            <button onClick={clear} className='bg-blue-600 rounded-md p-2 text-white'>
              Clear Cart <FaTrash className='inline-block text-red-300' />
            </button>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartDetils?.products?.map((p) => (
                <CartItems
                  deletItemCart={deletItemCart}
                  updateItem={updateItem}
                  key={p.product.id}
                  count={p.count}
                  price={p.price}
                  product={p.product}
                />
              ))}
            </tbody>
          </table>
        </div>
        {cartDetils?.products?.length > 0 ? (
          <div className='flex align-content-end mt-3'>
            <Link
              to={'/cheakout/' + cartDetils._id}
              className="bg-blue-500 text-white p-3 rounded-md px-10 text-xl max-w-xs mx-auto hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Check out
            </Link>
          </div>
        ) : (
          <p className='text-center text-gray-500'>Your cart is empty.</p>
        )}
      </div>
    </>
  );
}
