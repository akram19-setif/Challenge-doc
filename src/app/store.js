import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../rtk/cartSlice";
import productSlice from "../rtk/productSlice";
// Configuration Store
export const store = configureStore({
  reducer: {
    products: productSlice,
    carts: cartSlice,
  },
});
