import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CarouselType} from '../../types';

interface CarouselState {
  carousels: CarouselType[];
}

const initialState: CarouselState = {
  carousels: [],
};

const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {
    setCarousels: (state, action: PayloadAction<CarouselType[]>) => {
      state.carousels = action.payload;
    },
  },
});

export const {setCarousels} = carouselSlice.actions;
export default carouselSlice.reducer;
