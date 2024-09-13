import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loding/Loding'; 

export default function Category() {

  const [categories, setCategories] = useState([]);
  
  async function getCategories() {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    setCategories(data?.data);
  }

  useEffect(() => {
    console.log('Mounting Category');
    getCategories();
  }, []);

  if (categories.length === 0) {
    return <Loading />;
  }

  return (
    <>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {categories.map((category) => (
    <div
      key={category._id}
      className="max-w-sm bg-white border border-blue-300 rounded-lg shadow hover:shadow-2xl transition-shadow duration-300  dark:border-gray-700"
    >
      <img className="max-h-[250px] w-full object-center rounded-t-lg" src={category.image} alt={category.name} />
     <div className='p-4 text-center'>
     <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {category.name}
      </h5>
     </div>
    </div>
  ))}
</div>



    </>
  );
}
