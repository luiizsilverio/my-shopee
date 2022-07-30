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
  items: [],
  filteredItems: [],
  status: "",
  error: false
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      filterProducts (state, param) {
        const { payload: size } = param;
        if (size === "") {
          state.filteredItems = [...state.items];
        } else {
          state.filteredItems = [...state.items]
            .filter(x => x.availableSizes.indexOf(size) >= 0);
        }
      },

      sortProducts (state, param) {
        const { payload: sort } = param;
        const sortedProducts = [...state.filteredItems];
        sortedProducts.sort((a, b) => (
            sort === "lowestprice"
              ? (a.price > b.price ? 1 : -1)
              : sort === "highestprice"
                ? (a.price < b.price ? 1 : -1)
                : (a._id > b._id ? 1 : -1)
          )
        );
        state.filteredItems = sortedProducts;
      }
    },

    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
          state.status = 'aguarde';
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
          state.items = action.payload;
          state.filteredItems = action.payload;
          state.status = 'sucesso';
          state.error = false;
        });
        builder.addCase(getProducts.rejected, (state) => {
          state.status = 'erro';
          state.error = true;
        });
    }
})

export const { filterProducts, sortProducts } = productsSlice.actions

export default productsSlice.reducer
