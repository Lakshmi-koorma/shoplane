import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { wishListReducer } from "./wishListSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    wishList: wishListReducer,
  },
});
