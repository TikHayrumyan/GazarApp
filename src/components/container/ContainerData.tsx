import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Container from './Container';
import {ProductType} from '../../types';
import ContainerLine from './ContainerLine';
import ContainerItem from './ContainerItem';
import {theme} from '../../constants';
import Button from '../buttons/Button';
import {useAppDispatch, useAppNavigation} from '../../hooks';
import {AddToBasket, resetCart} from '../../store/slices/cartSlice';
import {useTranslation} from 'react-i18next';
import {setScreen} from '../../store/slices/tabSlice';

type Props = {
  type: string;
  data: any;
};

const ContainerData: React.FC<Props> = ({type, data}): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const {t, i18n} = useTranslation();
  const [repeatData, setRepeatData] = useState<any[]>([]);
  const navigation = useAppNavigation();

  const repeatOrder = async (data: any) => {
    if (data.productsOrder) {
      data.productsOrder.map((item: any, i: any) => {
        dispatch(
          AddToBasket({
            // GzCategory: res.GzCategory,
            discount: item.discount,
            discountActive: item.GzProduct.discountActive,
            discountType: item.GzProduct.discountType,
            gzProductDetails: item.GzProduct.gzProductDetails,
            id: item.GzProduct.id,
            imageLink: item.GzProduct.imageLink,
            maxLimit: item.GzProduct.maxLimit,
            minLimit: item.GzProduct.minLimit,
            price: item.GzProduct.price,
            quantity: item.count,
            slug: item.GzProduct.slug,
            tags: item.GzProduct.tags,
            unit: item.GzProduct.unit,
            weight: item.GzProduct.weight,
          }),
        );
      });
    }
    dispatch(setScreen('Order'));
    navigation.navigate('TabNavigator');
  };

  if (type === 'history') {
    return (
      <Container containerStyle={{backgroundColor: theme.colors.opacityBlue}}>
        <View>
          {data?.productsOrder?.map((item: any, i: any) => {
            return (
              <>
                <ContainerItem
                  title='Name'
                  price={`${item?.GzProduct?.name}`}
                />
                <ContainerLine />
                <ContainerItem
                  title='Price'
                  price={`${item?.GzProduct?.price}֏`}
                  titleStyle={{
                    color: theme.colors.mainColor,
                  }}
                  priceStyle={{
                    color: theme.colors.mainColor,
                  }}
                  containerStyle={{
                    marginBottom: 0,
                  }}
                />
                <ContainerItem title='Discount' price={`${item?.discount}֏`} />
              </>
            );
          })}
          <Button
            title='repeat Order'
            containerStyle={{
              marginTop: 10,
              marginBottom: 20,
            }}
            onPress={() => repeatOrder(data)}
          />
        </View>
      </Container>
    );
  }

  return null;
};

export default ContainerData;
