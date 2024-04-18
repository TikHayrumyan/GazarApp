import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  cart: [],
  total: 0,
  discount: 0,
  delivery: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state: any, action: any) => {
      let {quantity, ...data} = state.cart[action.payload];
      if (quantity < data.maxLimit) {
        state.cart[action.payload] = {
          ...data,
          quantity: quantity + 1,
        };
        state.total += data.price;
      }
    },
    decrement: (state: any, action: any) => {
      let {quantity, ...data} = state.cart[action.payload];

      if (quantity > data.minLimit) {
        state.cart[action.payload] = {
          ...data,
          quantity: quantity - 1,
        };
        state.total -= data.price;
      }
    },

    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.delivery = 0;
      state.discount = 0;
    },

    AddToBasket: (state, action) => {
      const productIndex = state.cart?.findIndex(
        (item: any) => item.id == action.payload.id,
      );

      if (productIndex != -1) {
        let {quantity, ...data} = state.cart[productIndex];
        state.cart[productIndex] = {
          ...data,
          quantity: quantity + 1,
        };
      } else {
        state.cart.push(action.payload);
      }

      state.total += action.payload.price * action.payload.quantity;
    },
    removeFromCart: (state, action) => {
      const inCart = state.cart.find(
        (item: any) => item.id === action.payload.id,
      );
      state.cart.splice(state.cart.indexOf(inCart), 1);
      state.total -= action.payload.price * action.payload.quantity;
    },
  },
});

export const {removeFromCart, resetCart, increment, AddToBasket, decrement} =
  cartSlice.actions;

export default cartSlice.reducer;
