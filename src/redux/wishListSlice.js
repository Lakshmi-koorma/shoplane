import { createSlice } from "@reduxjs/toolkit";
const wishListSlice = createSlice({
  name: "wishList",
  initialState: {
    wishList: [],
  },
  reducers: {
    addToWishList(state, action) {
      state.wishList.push(action.payload);
    },
    removeFromWishList(state, action) {
      const newWishlist = state.wishList.filter(
        (product) => product?.id !== action.payload.id
      );
      state.wishList = newWishlist;
    },
    removeAll(state) {
      state.wishList = [];
    },
  },
});

export const wishListReducer = wishListSlice.reducer;
export const { addToWishList, removeFromWishList, removeAll } =
  wishListSlice.actions;
