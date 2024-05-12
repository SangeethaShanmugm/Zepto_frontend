import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../redux/itemSlice"

export const store = configureStore({
    reducer: {
        itemShop: itemReducer
    }
})