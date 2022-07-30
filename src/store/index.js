import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './Products.store'
import cartReducer from './Cart.store';

const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer
    }
})

export default store
