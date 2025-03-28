import { createSelector, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const isExist = state.items.find((item) => item.id === action.payload.id);
      if (isExist) {
        isExist.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
  },
});

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  removeItem,
} = cartSlice.actions;

// ✅ Selector for getting cart items
export const selectCartItems = (state) => state.cart.items;

// ✅ Selector for getting total cart count
export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

export default cartSlice.reducer;
