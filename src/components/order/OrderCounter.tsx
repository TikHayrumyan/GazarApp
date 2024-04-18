import React, { useEffect } from 'react';
import {View, Text} from 'react-native';
import {useAppDispatch} from '../../hooks';
import {quantityInCart} from '../../utils';

type Props = {item: any, index: number, increment: (index: number)=>void, decrement: (index: number)=>void};

import OrderItemBtn from './OrderItemBtn';
import {theme} from '../../constants';
import Button from '../buttons/Button';

const OrderCounter: React.FC<Props> = ({item, increment, decrement, index}): JSX.Element => {
  const dispatch = useAppDispatch();
  const quantity = quantityInCart(item);
  
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        marginBottom:10
      }}
    >
      <OrderItemBtn
        minus={true}
        onPress={() => decrement(index)}
      />
      <Text
        style={{
          fontSize: 12,
          color: theme.colors.mainColor,
          borderWidth: 0.5,
          borderRadius: 3,
          width:"40%",
          textAlign:"center",
          display:"flex",
          height:"80%",
          paddingTop:"4%",

        }}
      >
        {(item?.weight * (item?.quantity ? item?.quantity : 1))?.toFixed(1)} {item?.unit == "one" ? "հատ" : "կգ"}
        {/* {item.weight*item.quantity} {item.unit == "one" ? "հատ" : "կգ"} */}
      </Text>
      <OrderItemBtn
        plus={true}
     
        onPress={() => increment(index)}
      />
      
    </View>
  );
};

export default OrderCounter;
