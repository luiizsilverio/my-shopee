import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async() => {
      // return fetch("http://localhost:5000/api/products").then((res) => res.json())
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      return data;
    }
)

const initialState = {
  lista: [],
  status: "",
  error: false
}

const products = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
          state.status = 'aguarde...';
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
          state.lista = action.payload;
          state.status = 'sucesso';
          state.error = false;
        });
        builder.addCase(getProducts.rejected, (state) => {
          state.status = 'erro';
          state.error = true;
        });
    }
})

// export const { aqui a lista de reducers... } = products.actions

export default products.reducer
