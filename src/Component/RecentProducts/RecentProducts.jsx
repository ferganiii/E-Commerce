import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import UseProduct from '../../Hooks/UseProduct';
import Loading from '../Loding/Loding'; 

export default function RecentProducts() {
  const { data, isLoading, error } = UseProduct();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error|| 'Something went wrong'} />;
  }

  return (
    <div className='container mx-auto'>
      <div className='grid mt-10 gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6'>
        {data && data.length > 0 ? (
          data.map((product) => (
            <div key={product._id} className='p-6 bg-white rounded-lg shadow-lg'>
              <ProductItem Product={product} />
            </div>
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
    </div>
  );
}
