import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './Products.store'
import cartReducer from './Cart.store';
import orderReducer from './Order.store';

const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        order: orderReducer,
    }
})

export default store
