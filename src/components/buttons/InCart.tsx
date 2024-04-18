import React, {useState} from 'react';
import {TouchableOpacity, Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {AddToBasket, resetCart} from '../../store/slices/cartSlice';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {ProductType} from '../../types';
import {svg} from '../../assets/svg';
import OrderCounter from '../order/OrderCounter';
import Button from './Button';
import { useTranslation } from 'react-i18next';

type Props = {
  item: any;
  containerStyle?: object;
  id?: any;
};

const InCart: React.FC<Props> = ({item, containerStyle}): JSX.Element => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation()
  const [Item, setItem] = useState(item);
  const cart = useAppSelector((state) => state.cart.list);
  const exist = (item: any) => cart.find((i: any) => i.id === item.id);
  const increment = () => {
    let temp = {...Item};
    if (temp.maxLimit > temp.quantity) {
      temp.quantity++;
      setItem(temp);
    }
  };
  const decrement = () => {
    let temp = {...Item};

    if (temp.minLimit < temp.quantity) {
      temp.quantity--;

      setItem(temp);
    }
  };
  return (
    <TouchableOpacity
    // style={{...containerStyle}}
    >
      <OrderCounter
        item={item}
        index={0}
        increment={increment}
        decrement={decrement}
      />
      <Button
        title={t("addToBasket")}
        transparent
        onPress={() => {
          dispatch(AddToBasket(item));
        }}
      />
    </TouchableOpacity>
  );
};

export default InCart;
