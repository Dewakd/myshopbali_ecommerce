import React, { useEffect, useState, useMemo } from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { useProducts } from '../api';

const Collection = () => {
  const { data = [], isLoading, isError } = useProducts();
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');


  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };


  const filteredProducts = useMemo(() => {
    if (category.length === 0) return data;
    return data.filter((item) => category.includes(item.category));
  }, [data, category]);


  const sortedProducts = useMemo(() => {
    if (sortType === 'low-high') {
      return [...filteredProducts].sort((a, b) => a.price - b.price);
    }
    if (sortType === 'high-low') {
      return [...filteredProducts].sort((a, b) => b.price - a.price);
    }
    return filteredProducts;
  }, [filteredProducts, sortType]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error loading data</h1>;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="flex flex-col min-w-60">
        <div className="sticky top-20 bg-white z-10">
          <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
            FILTERS
            <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="dropdown" />
          </p>
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" value={'Backpacks'} onChange={toggleCategory} /> Backpacks
              </p>
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" value={'Briefcases'} onChange={toggleCategory} /> Briefcases
              </p>
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" value={'Duffles'} onChange={toggleCategory} /> Duffles
              </p>
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" value={'Leather Jackets'} onChange={toggleCategory} /> Leather Jackets
              </p>
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" value={'Messengers'} onChange={toggleCategory} /> Messengers
              </p>
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" value={'Wallets'} onChange={toggleCategory} /> Wallets
              </p>
            </div>
          </div>
        </div>
      </div>
  

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {sortedProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image?.[0]}
              hoverImage={item.image?.[1]}
            />
          ))}
        </div>
      </div>
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 right-5 bg-[#3c2f2f] text-white rounded-full w-12 h-12 flex items-center justify-center">
        <img className="h-6 -rotate-90" src={assets.dropdown_icon} alt="up-icon" />
      </button>
    </div>
  );
  
  
};

export default Collection;
