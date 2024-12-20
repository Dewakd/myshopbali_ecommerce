import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProductItem({ id, image, hoverImage, name, price }) {
  const [imgSrc, setImgSrc] = useState(image);

  useEffect(() => {
    setImgSrc(image);
  }, [image]);

  const handleMouseOver = () => {
    setImgSrc(hoverImage);
  };

  const handleMouseOut = () => {
    setImgSrc(image); 
  };

  return (
    <Link
      className="text-gray-700 cursor-pointer"
      to={`/product/${id}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="overflow-hidden">
        <img className="hover:scale-110 transition duration-500 ease-in-out object-cover" src={imgSrc} alt={name} />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">${price}</p>
    </Link>
  );
}
