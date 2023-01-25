import { createSlice } from "@reduxjs/toolkit";
import { products } from "../data";
const initialState = {
  productList: [],
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    getAllProducts: (state) => {
      state.productList = products;
    },
  },
});

// Export actions Product
export const { getAllProducts } = productSlice.actions;

export default productSlice.reducer;
