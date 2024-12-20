import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
      items: [],
      stock: {}, 
    },
    reducers: {
      addItemToCart: (state, action) => {
        const existingItem = state.items.find((item) => item._id === action.payload._id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({
            ...action.payload,
            quantity: 1,
          });
        }
  

        if (!state.stock[action.payload._id]) {
          state.stock[action.payload._id] = action.payload.maxStock || 20;
        }
      },
      removeItemFromCart: (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      },
      clearCart: (state) => {
        state.items = [];
      },
      updateQuantity: (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.items.find((item) => item._id === id);
        if (item) {
          item.quantity = quantity;
        }
      },
      checkout: (state) => {
        state.items.forEach((item) => {

          if (state.stock[item._id] !== undefined) {
            state.stock[item._id] -= item.quantity;
          }
        });

        state.items = [];
      },
    },
  });
  
  export const { addItemToCart, removeItemFromCart, clearCart, updateQuantity, checkout } =
    cartSlice.actions;
  export default cartSlice.reducer;
  
