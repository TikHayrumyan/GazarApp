import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useAppDispatch} from '../../hooks';
import {
  
  removeFromCart,
  resetCart,
  increment,
  decrement,
} from '../../store/slices/cartSlice';
import {svg} from '../../assets/svg';

type Props = {item: any};

const RemoveFromCart: React.FC<Props> = ({item}): JSX.Element => {
  const dispatch = useAppDispatch();
  const RemoveItem = (item: any) => {
    dispatch(removeFromCart(item));
  };
  
  return (
    <TouchableOpacity
      style={{
        alignSelf: 'flex-start',
        // marginTop: 50,
        paddingHorizontal: 20,
        // marginBottom: 20,
      }}
      onPress={() => RemoveItem(item)}
    >
      <svg.CloseMenuSvg />
    </TouchableOpacity>
  );
};

export default RemoveFromCart;
