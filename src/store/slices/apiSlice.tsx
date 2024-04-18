// import {createSlice} from '@reduxjs/toolkit';

// import {BASE_URL} from '@env';
import {ProductType, BannerType, CarouselType} from '../../types';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({baseUrl: "https://george-fx.github.io/kastelli/"}),
  endpoints: (builder) => ({
    getProducts: builder.query<{products: ProductType[]}, void>({
      query: () => 'products.json',
    }),
    getBanners: builder.query<{banners: BannerType[]}, void>({
      query: () => 'banners.json',
    }),
    getCarousel: builder.query<{carousel: CarouselType[]}, void>({
      query: () => 'carousel.json',
    }),
  }),
});

export const {useGetProductsQuery, useGetBannersQuery, useGetCarouselQuery} =
  apiSlice;
