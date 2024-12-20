import React, { useEffect, useState } from 'react'
import Title from './Title';
import ProductItem from './ProductItem';
import { useProducts } from '../api';

export default function BestSeller() {
  const {data, isLoading, isError} = useProducts();

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (isError) {
    return <h1>{isError}</h1>
  }

  const bestProducts = data.slice(0, 5);


  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1 = {'BEST'} text2 = {'SELLER'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero alias quisquam quia maxime?
        </p>
      </div>

      {/* Rendering products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
         bestProducts.map(item => ( 
            <ProductItem key={item._id} id={item._id} image={item.image[0]} hoverImage={item.image[1]} name={item.name} price={item.price}/>
          ))
        }
      </div>
    </div>
  )
}
