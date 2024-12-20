import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useProducts } from "../api";
import { useParams } from "react-router-dom";
import { addItemToCart } from "../store/reducers/cartSlice";
import OurPolicy from "../components/OurPolicy";

export default function ProductDetail() {
  const { data, isLoading, isError } = useProducts();
  const { id } = useParams();
  const dispatch = useDispatch();

  // Find the selected product based on the `id` from the URL
  const product = data?.find((product) => product._id === id);

  // State for the main image
  const [mainImage, setMainImage] = useState(product?.image[0]);

  // State for the quantity
  const [quantity, setQuantity] = useState(1);

  // FAQ dropdown states
  const [faqOpen, setFaqOpen] = useState([false, false, false, false]);

  const toggleFaq = (index) => {
    setFaqOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleAddToCart = () => {
    if (quantity < 1) {
      alert("Quantity must be at least 1.");
      return;
    }
  
    if (quantity > 20) {
      alert("The stock is limited to 20.");
      return;
    }
  
    dispatch(
      addItemToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image[0],
        quantity,
      })
    );
    alert(`${quantity} ${product.name} added to cart!`);
  };
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError || !product) {
    return <h1>Error: Product not found</h1>;
  }

  return (
    <>
      <div className="min-h-full bg-gray-50 p-6 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Left Side: Product Image */}
          <div className="lg:col-span-2 flex flex-col items-start gap-4">
            {/* Main Image */}
            <div className="w-3/4 h-auto bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto">
              {product.image.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-14 h-14 object-cover rounded-lg border ${
                    mainImage === imageUrl ? "border-black" : "border-gray-300"
                  } cursor-pointer`}
                  onClick={() => setMainImage(imageUrl)} // Change main image on click
                />
              ))}
            </div>
          </div>

          {/* Right Side: Product Details */}
          <div className="lg:col-span-1 flex flex-col">
            {/* Brand and Title */}
            <p className="text-gray-500 text-sm">{product.category}</p>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="text-yellow-400 mt-1">
              ★★★★★ <span className="text-gray-500">(42 reviews)</span>
            </p>

            {/* Price */}
            <p className="text-2xl font-semibold text-gray-900 mt-4">
              ${product.price}
            </p>

            {/* Description */}
            <p className="text-gray-500 mt-4 text-sm">{product.description}</p>

            {/* Quantity Input */}
            <div className="mt-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                  className="px-3 py-2 bg-gray-200 rounded-lg"
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(20, Number(e.target.value))))}
                  className="w-16 px-2 py-2 text-center border rounded-lg"
                />
                <button
                  onClick={() => setQuantity(Math.min(quantity + 1, 20))}
                  className="px-3 py-2 bg-gray-200 rounded-lg"
                >
                  +
                </button>
              </div>
              {quantity === 20 && (
                <p className="text-sm text-red-500 mt-2">
                  The stock is limited to 20. You cannot add more.
                </p>
              )}
            </div>

            
            <button
              onClick={handleAddToCart}
              className="mt-6 bg-black text-white py-3 rounded-lg font-medium text-sm hover:bg-gray-800 transition"
            >
              Add to cart
            </button>

            {/* Additional Information */}
            <p className="text-gray-500 mt-4 text-xs">
              Free delivery on orders over $300
            </p>

            {/* FAQ Section */}
            <div className="mt-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">FAQs</h2>
              {[...Array(2)].map((_, index) => (
                <div key={index} className="mb-4">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center text-left p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <span className="text-sm font-medium text-gray-800">
                      FAQ Question {index + 1}
                    </span>
                    <span
                      className={`transition-transform ${
                        faqOpen[index] ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {faqOpen[index] && (
                    <div className="p-4 bg-gray-100 text-sm text-gray-700 rounded-lg">
                      This is the answer to FAQ Question {index + 1}. Lorem ipsum
                      dolor sit amet, consectetur adipiscing elit.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <OurPolicy />
    </>
  );
}
