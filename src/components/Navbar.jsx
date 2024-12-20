import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { assets } from "../assets/assets.js";
import { NavLink, Link } from "react-router-dom";
import { logout } from "../store/reducers/authSlice";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Get total quantity of items in the cart
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    alert(`Successfully logged out!`);
  };

  return (
    <div className="sticky top-0 z-50 bg-white flex items-center justify-between py-5 font-medium border-b">
      <Link to="/">
        <h2 className="text-3xl font-semibold cursor-pointer">LAVANYA</h2>
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <div className="group relative">
          <img src={assets.profile_icon} className="w-5 cursor-pointer" alt="Profile Icon" />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="hover:text-black">
                    My Profile
                  </Link>
                  <Link to="/orders" className="hover:text-black">
                    Orders
                  </Link>
                  <button onClick={handleLogout} className="text-left hover:text-black">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="hover:text-black">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart icon" />
          {totalItems > 0 && ( // Only show if there are items in the cart
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {totalItems}
            </p>
          )}
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* Responsive Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">
            HOME
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">
            COLLECTION
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">
            ABOUT
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
}
