import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("myshopee.cart") || "[]"),
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addToCart (state, param) {
        const { payload: product } = param;

        const cartItems = state.cartItems.slice(); // retorna uma cópia
        let alreadyInCart = false;

        cartItems.forEach(item => {
          if (item._id === product._id) {
            item.count ++;
            alreadyInCart = true;
          }
        })

        if (!alreadyInCart) {
          cartItems.push({...product, count: 1});
        }

        state.cartItems = [...cartItems];
        localStorage.setItem('myshopee.cart', JSON.stringify(cartItems));
      },

      removeFromCart (state, param) {
        const { payload: product } = param;

        const cartItems = state.cartItems.slice()
          .filter((item) => item._id !== product._id);

        state.cartItems = [...cartItems];
        localStorage.setItem('myshopee.cart', JSON.stringify(cartItems));
      }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer
