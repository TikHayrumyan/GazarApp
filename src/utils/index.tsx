import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {RootState, AppDispatch} from '../store/store';
import {showMessage} from 'react-native-flash-message';
import {backgroundColor} from './backgroundColor';
import {borderRadius} from './borderRadius';
import {useSelector} from 'react-redux';
import {ProductType} from '../types';
import {position} from './position';
import {bgColor} from './bgColor';
import {padding} from './padding';
import {border} from './border';
import {margin} from './margin';
import {color} from './color';
import {flex} from './flex';
import {size} from './size';

export const addedToCartMessage = (item: any) => {
  showMessage({
    message: `${item.name} added to cart`,
    type: 'success',
    icon: 'success',
    style: {marginTop: 20},
  });
};

export const homeIndicatorHeight = () => {
  const insets = useSafeAreaInsets();
  const {bottom} = insets;
  return bottom;
};

export const statusBarHeight = () => {
  const insets = useSafeAreaInsets();
  const {top} = insets;
  return top;
};

export const quantityInCart = (item: any) => {
  const cart = useSelector((state: {cart: {list: any}}) => {
    return state.cart.list;
  });
  
  const ifItemInCart = cart?.find((el:any) => el.id === item.id);
  const quantity = ifItemInCart ? ifItemInCart?.weight : item?.weight;

  return quantity;
};

export const itemExistsInCart = (item: any) => {
  const cart = useSelector((state: {wishlist: {list: ProductType[]}}) => {
    return state.wishlist.list;
  });
  const ifItemInCart = cart?.find((el) => el.id === item.id);
  return ifItemInCart ? true : false;
};


export const getAllColors = (products: ProductType[]): Array<String> => {
  const colors = products?.map((e: any) => {
    return e.colors;
  });
  const allColors = colors?.flat();
  const uniqueColors = [...new Set(allColors)];
  return uniqueColors;
};

export const getAllSizes = (products: ProductType[]): Array<String> => {
  const sizes = products?.map((e: any) => {
    return e.sizes;
  });
  const allSizes = sizes?.flat();
  const uniqueSizes = [...new Set(allSizes)];
  return uniqueSizes;
};

export const getProductsByColor = () => {
  const products = useSelector((state: {products: {list: ProductType[]}}) => {
    return state.products.list;
  });
  const color = useSelector((state: {products: {color: string}}) => {
    return state.products.color;
  });
  const filteredProducts = products.filter((e) => e.colors.includes(color));
  return filteredProducts;
};

export const getProductsBySize = () => {
  const products = useSelector((state: {products: {list: ProductType[]}}) => {
    return state.products.list;
  });
  const size = useSelector((state: {products: {size: string}}) => {
    return state.products.size;
  });
  const filteredProducts = products.filter((e) => e.sizes.includes(size));
  return filteredProducts;
};

export const getAllTags = (products: ProductType[]): Array<String> => {
  const tags = products?.map((e: any) => {
    return e.tags;
  });
  const allTags = tags?.flat();
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags;
};

export {
  padding,
  margin,
  position,
  flex,
  size,
  color,
  bgColor,
  border,
  borderRadius,
  backgroundColor,
};
