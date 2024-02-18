import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  products: Array<number>;
  totalAmount: number;
}

export interface AddProduct {
  productId: number;
  price: number;
}

export interface RemoveProduct {
  productId: number;
  price: number;
}

const initialState: CartState = {
  products: [],
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<AddProduct>) => {
      state.products.push(action.payload.productId);
      state.totalAmount += action.payload.price;
    },

    removeProduct: (state, action: PayloadAction<RemoveProduct>) => {
      state.products = state.products.filter((element) =>
        element !== action.payload.productId
      );
      state.totalAmount -= action.payload.price;
    },

    removeOneProduct: (state, action: PayloadAction<RemoveProduct>) => {
      state.products.splice(
        state.products.indexOf(action.payload.productId),
        1,
      );
      state.totalAmount -= action.payload.price;
    },
  },
});

export const { addProduct, removeProduct, removeOneProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
