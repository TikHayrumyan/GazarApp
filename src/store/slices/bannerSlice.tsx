// bannerSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BannerType} from '../../types';

interface BannerState {
  banners: BannerType[];
}

const initialState: BannerState = {
  banners: [],
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setBanners: (state, action: PayloadAction<BannerType[]>) => {
      state.banners = action.payload;
    },
  },
});

export const {setBanners} = bannerSlice.actions;
export default bannerSlice.reducer;
