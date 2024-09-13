import React, { useContext, useState, useEffect } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Cartcontext } from '../Context/CartContext';
import { WishListContext } from '../Context/WishListContext'; 
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';  // مؤشر تحميل

export default function ProductItem({ Product }) {
  const { addItemToCart, setcartItem } = useContext(Cartcontext);
  const { addWishList, wishlist } = useContext(WishListContext); 
  const [isWishlisted, setIsWishlisted] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    if (wishlist.some(item => item._id === Product._id)) {
      setIsWishlisted(true);
    }
  }, [wishlist, Product._id]);

  async function addItem(id) {
    setIsLoading(true);
    const resp = await addItemToCart(id);

    if (resp.data.status === 'success') {
      setIsLoading(false);
      setIsAddedToCart(true);
      setcartItem(resp.data.numOfCartItems);
      toast.success('Product added to cart', {
        style: { backgroundColor: 'blue', color: 'white' }
      });
    }
  }

  async function handleWishlist(id) {
    await addWishList(id);
    setIsWishlisted(true); 
    toast.success('Product added to wishlist', {
      style: { backgroundColor: 'red', color: 'white' }
    });
  }

  return (
    <div className="relative group pb-[60px]">
      <Link to={`/productDetails/${Product._id}`}>
        <img src={Product.imageCover} className="w-full object-cover" alt={Product.title} />
        <p className="text-sm text-blue-600 my-2">{Product.category.name}</p>
        <h3 className="truncate h4 mb-2">
          {Product.title.split(' ').slice(0, 2).join(' ')}
        </h3>
        <div className="flex justify-between">
          <p>{Product.price} EGY</p>
          <p>
            {Product.ratingsAverage} <FaStar className="text-yellow-400 inline-block" />
          </p>
        </div>
      </Link>

      {/* زر إضافة للعربة */}
      <button
        onClick={() => addItem(Product._id)}
        type="button"
        disabled={isLoading} 
        className="absolute bottom-0 left-0 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        {isLoading ? <ClipLoader color="#fff" size={20} /> : (isAddedToCart ? 'Added to Cart' : 'Add To Cart')}
      </button>

      {/* زر إضافة إلى المفضلة */}
      <button
        onClick={() => handleWishlist(Product._id)}
        type="button"
        className="absolute top-0 right-0 text-xl p-2"
      >
        <FaHeart className={`${isWishlisted ? 'text-red-600' : 'text-gray-400'} hover:text-red-600`} />
      </button>
    </div>
  );
}
