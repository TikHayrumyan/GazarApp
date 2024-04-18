import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks';
import OrderCounter from '../order/OrderCounter';
import Button from '../buttons/Button';
import {AddToBasket, resetCart} from '../../store/slices/cartSlice';
import { useTranslation } from 'react-i18next';


const ProductPrice: React.FC<any> = ({
  item,
  containerStyle,
  version,
  numberOfLines = 1,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation()
  const [Item, setItem] = useState(item);

  const increment = () => {
    // dispatch(resetCart())
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

  if (version === 1) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // width: 100,
          ...containerStyle,
        }}
      >
        {/* {item?.old_price && (
          <Text
            style={{
              marginRight: 4,
              textDecorationLine: 'line-through',
              // ...theme.fonts.DMSans_400Regular,
              fontSize: 12,
              color: theme.colors.textColor,
              lineHeight: 12 * 1.5,
              ...styleText,
            }}
          >
            ${item?.old_price.toFixed(2)}
          </Text>
        )} */}
        <Text
          style={{
            // ...theme.fonts.DMSans_500Medium,
            // fontSize: 14,
            textAlign: 'center',
            width: '100%',
            fontSize: 16,
            fontWeight: '500',
            marginBottom: 10,
            lineHeight: 14 * 1.5,
            color: theme.colors.gazarGreenColor,
            // ...styleText,
          }}
          numberOfLines={numberOfLines}
        >
          {Item?.price} ֏
        </Text>
      </View>
    );
  }

  if (version === 2) {
    const renderPrice = () => {
      return (
        <View>
          <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
            <Text
              style={{
                fontSize: 20,
                color: theme.colors.gazarGreenColor,
              }}
            >
              {Item?.price} ֏
            </Text>
            <View style={{marginTop: 20, width: 170}}>
              <OrderCounter
                item={Item}
                index={0}
                increment={increment}
                decrement={decrement}
              />
            </View>
          </View>
          <View style={{paddingRight: 20, marginBottom: 20}}>
            <Button
              title={t("addToBasket")}
              transparent
              onPress={() => {
                dispatch(AddToBasket(Item));
              }}
            />
          </View>
        </View>
      );
    };

  
    return (
      <View
        style={{
          marginLeft: 20,
          flexDirection: 'row',
          alignItems: 'center',
          
        }}
      >
        {renderPrice()}
      </View>
    );
  }

  return <></>;
};

export default ProductPrice;
