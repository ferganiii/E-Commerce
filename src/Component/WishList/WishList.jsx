import React, { useContext } from 'react';
import { WishListContext } from '../Context/WishListContext';
import { Cartcontext } from '../Context/CartContext';
import toast from 'react-hot-toast';

export default function WishList() {
  const { addWishList, wishlist, deletWishList } = useContext(WishListContext);
  const { addItemToCart, setcartItem } = useContext(Cartcontext);

  async function addItem(id) {
    try {
      const resp = await addItemToCart(id);
      if (resp.data.status === 'success') {
        setcartItem(resp.data.numOfCartItems);
        toast.success('Product added to cart', {
          style: { backgroundColor: 'blue', color: 'white' }
        });
      }
    } catch (error) {
      toast.error('Error adding product to cart', {
        style: { backgroundColor: 'red', color: 'white' }
      });
    }
  }

  async function handleDelete(id) {
    try {
      await deletWishList(id); 
      toast.success('Product removed from wishlist', {
        style: { backgroundColor: 'blue', color: 'white' }
      });
    } catch (error) {
      toast.error('Error removing product from wishlist', {
        style: { backgroundColor: 'red', color: 'white' }
      });
    }
  }

  return (
    <div>
    <h1 className="text-3xl text-center mb-2 text-blue-500">My List</h1>
    <div className="grid gap-4">
      {wishlist.map((product) => (
        <div
          key={product._id}
          className="mb-3 w-full flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src={product.imageCover}
            alt={product.title}
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-gray-600">{product.category.name}</p>
            <p className="text-blue-600">{product.price} EGY</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => addItem(product._id)}
                className="w-60 bg-blue-600 py-2 text-white rounded-sm"
              >
                Add to cart
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="w-60 bg-red-600 py-2 text-white rounded-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
}
