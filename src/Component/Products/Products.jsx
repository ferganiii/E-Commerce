import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import Loading from '../Loding/Loding'; 
import UseProduct from '../../Hooks/UseProduct';
import RecentProducts from '../RecentProducts/RecentProducts';

export default function Products() {
  const { data, isLoading, error } = UseProduct();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message || 'Something went wrong'}</div>;
  }

  return (
    <>

     <div className='container mx-auto'>
      <div className='grid mt-10 gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6'>
        {data && data.length > 0 ? (
          data.map((p) => (
            <div key={p._id} className='p-6 bg-white rounded-lg shadow-lg'>
              <ProductItem Product={p} />
            </div>
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
    </div>
    </>
   
  );
}
