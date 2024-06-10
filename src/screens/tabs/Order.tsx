import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {text} from '../../text';
import {svg} from '../../assets/svg';
import {theme} from '../../constants';
import {useAppSelector} from '../../hooks';
import {components} from '../../components';
import {useAppNavigation} from '../../hooks';
import {productsData} from '../../constants/constants';
import {useTranslation} from 'react-i18next';

const Order: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();
  const cart = useAppSelector((state) => state.cart.cart);
  const delivery = useAppSelector((state) => state.cart.delivery)?.toFixed(2);
  const subtotal = useAppSelector((state) => state.cart.total)?.toFixed(2);
  const discount = useAppSelector((state) => state.cart.discount)?.toFixed(2);
  const [appliedVoucher, setAppliedVoucher] = useState<boolean>(false);
  const {t} = useTranslation();
  const total =
    Number(delivery) + Number(subtotal) - Number(appliedVoucher ? discount : 0);

  const renderProducts = () => {
    return (
      <View style={{marginLeft: 20}}>
        {cart?.map((item: any, index: number, array: any[]) => {
          
          const lastElement = index === array?.length - 1;
          return (
            <components.OrderItem
              key={index}
              item={item}
              index={index}
              lastElement={lastElement}
            />
          );
        })}
      </View>
    );
  };

  const renderVoucher = (applied: boolean) => {
    return applied ? (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
          marginBottom: 50,
        }}
      >
        <svg.PayCheckSvg />
        <text.T16 style={{marginLeft: 5, color: theme.colors.mainColor}}>
          Promocode applied
        </text.T16>
      </View>
    ) : (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 50,
          marginHorizontal: 20,
        }}
      >
        <components.InputField
          placeholder='Promocode'
          label='Enter the voucher'
          containerStyle={{flex: 1, marginRight: 10}}
        />
        <View style={{width: '30%'}}>
          <components.Button
            title='apply'
            onPress={() => {
              setAppliedVoucher(true);
            }}
          />
        </View>
      </View>
    );
  };
  const renderTotal = () => {
    return (
      <components.Container
        containerStyle={{
          marginHorizontal: 20,
        }}
      >
        <components.ContainerItem
          title={t('total')}
          price={`${subtotal} ֏`}
          titleStyle={{
            // ...theme.fonts.H5,
            color: theme.colors.mainColor,
          }}
          priceStyle={{
            // ...theme.fonts.textStyle_14,
            color: theme.colors.mainColor,
          }}
        />
        {/* <components.ContainerItem title='Delivery' price={`${delivery} ֏`} /> */}
        {/* {appliedVoucher && (
          <components.ContainerItem title='Discount' price={`- $${discount}`} />
        )} */}
        {/* <components.ContainerLine /> */}
        {/* <components.ContainerItem
          title='Total'
          price={`${total.toFixed(2)} ֏`}
          containerStyle={{
            marginBottom: 0,
          }}
          titleStyle={{ color: theme.colors.mainColor}}
          priceStyle={{ color: theme.colors.mainColor}}
        /> */}
      </components.Container>
    );
  };

  const renderEmptyCart = () => {
    return (
      <View
        style={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}
      >
        <svg.ShoppingBagSvg color={theme.colors.mainColor} />
        <text.H2 style={{marginTop: 30, marginRight: 14}}>
        {t("emptyCart")}
        </text.H2>
        <text.T16>{t("emptyCartDesc")}</text.T16>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 20,
          paddingBottom: 20,
        }}
      >
        {renderProducts()}
        {/* {renderVoucher(appliedVoucher)} */}
        {renderTotal()}
      </ScrollView>
    );
  };

  const renderButton = () => {
    if (cart?.length > 0) {
      return (
        <components.Button
          title={cart?.length > 0 ? t("proceedtocheckout") : ''}
          containerStyle={{padding: 20, paddingBottom: 100}}
          transparent={true}
          onPress={() => {
            if (cart?.length > 0) {
              navigation.navigate('Checkout', {appliedVoucher});
            }
            // if (cart.length === 0) {
            //   navigation.navigate('Shop', {
            //     title: 'Shop',
            //     products: productsData,
            //   });
            // }
          }}
        />
      );
    }
  };

  return (
    <components.SmartView
      containerStyle={{backgroundColor: theme.colors.imageBackground}}
    >
      {cart?.length > 0 ? renderContent() : renderEmptyCart()}

      {renderButton()}
    </components.SmartView>
  );
};

export default Order;
