import {ReviewType} from './ReviewType';

export type ProductType = {
  quantityWantAdd?: number;
  id: number;
  categoryId: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  images: string[];
  sizes: string[];
  colors: string[];
  tags: string[];
  description: string;
  category?: string;
  is_bestseller?: boolean;
  is_featured?: boolean;
  is_sale: boolean;
  is_out_of_stock?: boolean;
  old_price?: number;
  quantity?: number;
  reviews: ReviewType[];
  weight: any,
};
