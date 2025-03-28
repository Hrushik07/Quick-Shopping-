import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/dataSlice";
import cartReducer from "../features/cartSlice";
const store = configureStore({
  reducer: {
    data: dataReducer,
    cart: cartReducer,
  },
});

export default store;
