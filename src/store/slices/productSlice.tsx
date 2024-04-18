import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductType} from '../../types';

interface ProductState {
  products: ProductType[];
  searchText: string;
  quantityWantAdd: number;
}

const initialState: ProductState = {
  products: [],
  searchText: '',
  quantityWantAdd: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
    },
    setSearch: (state, action) => {
      state.searchText = action.payload;
    },
    setQuantityWantAdd: (state, action) => {
      state.quantityWantAdd = action.payload;
    },
  },
});

export const {setProducts, setSearch, setQuantityWantAdd} = productSlice.actions;
export default productSlice.reducer;
