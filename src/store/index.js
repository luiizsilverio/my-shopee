import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './Products.store'

const store = configureStore({
    reducer: {
        products: productsReducer,
    }
})

export default store
