import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loding from '../Loding/Loding';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isLoding, setisLoding] = useState(false);
  async function getBrands() {
    setisLoding(true);
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }finally {
      setisLoding(false);
    }
  }
 
  useEffect(() => {
    getBrands();
  }, []);

  const handleClick = (brand) => {
    setSelectedBrand(brand); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };
  if (isLoding) {
    return <Loding/> ;
  }
  return (
    <>
      <div className='text-center mb-3'>
      <h1 className='text-6xl text-blue-600'>ALL Brands</h1>
      </div>
       <div className="flex flex-wrap justify-center gap-4">
    
      {brands.map((b) => (
        <div
          key={b._id}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
          onClick={() => handleClick(b)}
        >
          <a href="#">
            <img className="rounded-t-lg" src={b.image} alt={b.name} />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {b.name}
              </h5>
            </a>
          </div>
        </div>
      ))}

    
      {isModalOpen && selectedBrand && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <button className="absolute top-4 right-4 text-gray-600" onClick={closeModal}>
              &times;
            </button>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-green-500 mb-4">{selectedBrand.name}</h2>
              <img src={selectedBrand.image} alt={selectedBrand.name} className="w-32 mx-auto mb-4" />
              <p>{selectedBrand.name.toLowerCase()}</p>
              <button
                onClick={closeModal}
                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
 
  );
}
