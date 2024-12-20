import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart, clearCart, updateQuantity, checkout } from "../store/reducers/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const stock = useSelector((state) => state.cart.stock);

  const handleRemove = (item) => {
    dispatch(removeItemFromCart(item._id));
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > stock[item._id]) {
      alert(`The stock is limited to ${stock[item._id]} for ${item.name}.`);
      return;
    }

    dispatch(updateQuantity({ id: item._id, quantity: newQuantity }));
  };

  const handleCheckout = () => {
    dispatch(checkout());
    alert("Thank you for your purchase!");
    navigate("/"); // Redirect to home after checkout
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-700">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item._id} className="flex flex-col mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="text-gray-900 font-medium">{item.name}</p>
                      <p className="text-gray-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Stock: {stock[item._id] ?? 20}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </button>
                </div>

                {/* Quantity Adjuster */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item, Math.max(item.quantity - 1, 1))
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    onClick={() =>
                      handleQuantityChange(item, Math.min(item.quantity + 1, stock[item._id]))
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Stock Limit Warning */}
                {item.quantity === stock[item._id] && (
                  <p className="text-sm text-red-500 mt-2">
                    The stock is limited to {stock[item._id]}. You cannot add more.
                  </p>
                )}
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleClearCart}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
