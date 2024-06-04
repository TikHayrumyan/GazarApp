import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Container from './Container';
import {ProductType} from '../../types';
import ContainerLine from './ContainerLine';
import ContainerItem from './ContainerItem';
import {theme} from '../../constants';
import Button from '../buttons/Button';
import {useAppDispatch} from '../../hooks';
import {AddToBasket, resetCart} from '../../store/slices/cartSlice';
import {useTranslation} from 'react-i18next';

type Props = {
  type: string;
  data: any;
};

const ContainerData: React.FC<Props> = ({type, data}): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const {t, i18n} = useTranslation();
  const [repeatData, setRepeatData] = useState<any[]>([]);

  const repeatOrder = async (data: any) => {
    try {
      for (let index = 0; index < data.productsOrder.length; index++) {
        const item = data.productsOrder[index];
        if (item.gzProductId) {
          const response = await fetch(
            `https://gazar.am/api/products?product=${
              item.gzProductId
            }&lan=${i18n.language.toLocaleUpperCase()}`,
          );
          const res = await response.json();
          if (res) {
            // setRepeatData((prevData) => [...prevData, res]);
            //  dispatch(AddToBasket(res));

            let xyz = {
              GzCategory: res.GzCategory,
              discount: res.discount,
              discountActive: res.discountActive,
              discountType: res.discountType,
              gzProductDetails: res.gzProductDetails,
              id: res.id,
              imageLink: res.imageLink,
              maxLimit: res.maxLimit,
              minLimit: res.minLimit,
              price: res.price,
              quantity: item.count,
              slug: res.slug,
              tags: res.tags,
              unit: res.unit,
              weight: res.weight,
            };
            // dispatch(resetCart())
            dispatch(AddToBasket(xyz));
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
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
