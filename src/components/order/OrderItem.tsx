import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';

import {theme} from '../../constants';
import OrderCounter from './OrderCounter';
import {useAppDispatch} from '../../hooks';
import SaleBadge from '../badges/SaleBadge';
import {useAppNavigation} from '../../hooks';
import ProductName from '../product/ProductName';
import ProductPrice from '../product/ProductPrice';
import {
  decrement,
  increment,
  removeFromCart,
  resetCart,
} from '../../store/slices/cartSlice';
import RemoveFromCart from './removeFromCart';
type Props = {item: any; lastElement?: boolean; index: number;id?:any};

const OrderItem: React.FC<Props> = ({
  item,
  lastElement,
  index,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const marginBottom = lastElement ? 30 : 14;

  const TIncrement = () => {
    dispatch(increment(index as any));
    // dispatch(resetCart())
  };
  const TDecrement = () => {
    dispatch(decrement(index as any));
  };

  const renderImage = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Product', {item})}>
        <ImageBackground
          source={{uri: `${item?.imageLink}`}}
          style={{width: 100, height: '100%'}}
          imageStyle={{
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.lightBlue,
            borderWidth: 1,
          }}
          resizeMode='contain'
        >
          <SaleBadge
            version={1}
            item={item}
            containerStyle={{
              margin: 4,
              marginTop: 'auto',
            }}
          />
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderInfo = () => {
    return (
      <View
        style={{
          // borderTopWidth: 1,
          // borderBottomWidth: 1,
          borderColor: theme.colors.lightBlue,
          width: '100%',
          padding: 14,
          paddingRight: 0,
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View style={{marginRight: 'auto', justifyContent: 'space-between',width:160}}>
            <ProductName
              item={item}
              version={1}
             
            />
            <ProductPrice
              item={item}
              version={1}
              containerStyle={{marginBottom: 'auto'}}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            ></View>
          </View>

          {/* {renderRemoveItem(item.id as number)} */}
          <RemoveFromCart item={item} />
        </View>
        <View
          style={{
            width: '60%',
          }}
        >
          <OrderCounter
            item={item}
            increment={TIncrement}
            decrement={TDecrement}
            index={index}
          />
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: 100,
        marginBottom: marginBottom,
      }}
    >
      {renderImage()}
      {renderInfo()}
    </View>
  );
};

export default OrderItem;
