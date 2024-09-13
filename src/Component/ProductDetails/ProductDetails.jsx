import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Loding from '../Loding/Loding';
import { Cartcontext } from '../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const { addItemToCart, setcartItem } = useContext(Cartcontext);
  
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  async function getProductDetails(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
    } catch (error) {
      setError('Failed to fetch product details');
      console.error(error);
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  async function addItem(productId) {
    try {
      const resp = await addItemToCart(productId);
      if (resp.data.status === "success") {
        setcartItem(resp.data.numOfCartItems);
        toast.success('Product added to cart', {
          style: { backgroundColor: 'blue', color: 'white' }
        });
      }
    } catch (error) {
      toast.error('Failed to add product to cart', {
        style: { backgroundColor: 'red', color: 'white' }
      });
    }
  }

  if (loading) {
    return <Loding />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-12">
      <div className="col-span-4 py-5">
        <img src={productDetails?.imageCover} className="w-full" alt={productDetails?.title} />
      </div>
      <div className="col-span-8 self-center py-5">
        <h2>{productDetails.title}</h2>
        <p className="my-3 font-light">{productDetails.description}</p>
        <h3 className="mb-2">{productDetails.category.name}</h3>

        <div className="flex mb-3 justify-between">
          <p>{productDetails.price} EGY</p>
          <p>
            {productDetails.ratingsAverage} <FaStar className="text-yellow-400 inline-block" />
          </p>
        </div>
        <button
          onClick={() => addItem(productDetails._id)} 
          className="w-full bg-blue-600 py-1 text-white rounded-sm"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
