import React, {memo} from 'react';
import {theme} from '../../constants';
import {TouchableOpacity, ImageBackground, Image} from 'react-native';
import {useAppNavigation} from '../../hooks';
import ProductName from '../product/ProductName';
import ProductPrice from '../product/ProductPrice';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import OrderCounter from '../order/OrderCounter';
import Button from '../buttons/Button';
import { useDispatch } from 'react-redux';
import { AddToBasket, resetCart } from '../../store/slices/cartSlice';
import { useTranslation } from 'react-i18next';

type Props = {item: any, index: number, increment: (index: number)=>void, decrement: (index: number)=>void};

const ShopItem: React.FC<Props> = ({item, index, increment, decrement}): JSX.Element => {
  const navigation = useAppNavigation();
  const blockWidth = responsiveWidth(50) - 20 - 7.5;
  const dispatch = useDispatch()
  const {t,i18n} = useTranslation()
  
  const GetSingleProduct = async (id: number) => {

    try {
      const response = await fetch(
        `https://gazar.am/api/products?product=${id}&lan=${(i18n.language).toLocaleUpperCase()}`,
      );
      const res = await response.json();
      if (res) {
 
        navigation.navigate('Product', {
          item: {
            ...res,
            quantity: 1,
            id
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <TouchableOpacity
      style={{
        width: blockWidth,
        height: 'auto',
        marginBottom: 20,
        borderRadius: 5,
        padding: 4,

      }}
      onPress={() => {
        GetSingleProduct(item.id)
      }}
    >
      <ImageBackground
        source={{uri: `${item.imageLink}`}}
        style={{
          width: '100%',
          height: 150,
          // marginBottom: 5,
          alignItems: 'flex-end',
          // objectFit: 'contain',
          
        }}
        imageStyle={{
          // borderRadius: 5,
          // backgroundColor: transparent,
          objectFit: 'contain',

        }}
        
      >
      
      </ImageBackground>
      <ProductName
        item={item}
        // style={{marginBottom: 3, color: theme.colors.mainColor}}
        version={1}
      />
      <ProductPrice
        version={1}
        item={item}
        styleText={{color: theme.colors.mainColor}}
      />
      <OrderCounter item={item} index={index} increment={increment} decrement={decrement} />
      <Button title={t("addToBasket")} transparent onPress={() => {
       
        dispatch(AddToBasket(item))
        // dispatch(resetCart())
        console.log(item);
        
        
      }}/>
    </TouchableOpacity>
  );
};

export default memo(ShopItem);
