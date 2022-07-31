import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async(order) => {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order)
      });

      const data = await res.json();
      localStorage.clear("myshopee.cart");
      return data;
    }
)

const initialState = {
  order: null,
  status: "",
  error: false
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
      clearOrder (state) {
        state.order = null;
      }
    },

    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) => {
          state.status = 'aguarde';
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
          state.order = {...action.payload};
          state.status = 'sucesso';
          state.error = false;
        });
        builder.addCase(createOrder.rejected, (state) => {
          state.status = 'erro';
          state.error = true;
        });
    }
})

export const { clearOrder } = orderSlice.actions

export default orderSlice.reducer
