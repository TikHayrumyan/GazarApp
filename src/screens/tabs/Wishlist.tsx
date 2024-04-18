import React from 'react';
import {View, ScrollView} from 'react-native';
import {useAppSelector} from '../../hooks';
import {components} from '../../components';
import {theme} from '../../constants';
import {svg} from '../../assets/svg';
import {text} from '../../text';
import {useAppNavigation} from '../../hooks';
import {productsData} from '../../constants/constants';

const Wishlist: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();
  const wishlist = useAppSelector((state) => state.wishlist.list);

  const renderProducts = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          backgroundColor: theme.colors.imageBackground,
          flexGrow: 1,
          paddingVertical: 20,
          paddingLeft: 20,
          paddingBottom: 100,
        }}
      >
        {wishlist.map((item, index, array) => {
          const lastElement = index === array.length - 1;
          const marginBottom = lastElement ? 0 : 14;

          return (
            <components.WishlistItem
              key={index}
              item={item}
              containerStyle={{
                marginBottom: marginBottom,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                backgroundColor: theme.colors.white,
                borderColor: theme.colors.lightBlue,
                borderWidth: 1,
              }}
            />
          );
        })}
      </ScrollView>
    );
  };

  const renderButton = () => {
    return (
      <View
        style={{
          paddingBottom: 80,
          backgroundColor:
            wishlist.length > 0
              ? theme.colors.purple
              : theme.colors.imageBackground,
        }}
      >
        <components.Button
          title={'shop now'}
          containerStyle={{padding: 20}}
          transparent={true}
          onPress={() => {
            navigation.navigate('Shop', {
              title: 'Shop',
              products: productsData,
            });
          }}
        />
      </View>
    );
  };

  const renderEmptyWishlist = () => {
    return (
      <View
        style={{
          flexGrow: 1,
          justifyContent: 'center',
          backgroundColor: theme.colors.imageBackground,
          paddingLeft: 20,
        }}
      >
        <svg.ShoppingBagSvg color={theme.colors.mainColor} />
        <text.H2 style={{marginTop: 30}}>Your wishlist is empty!</text.H2>
        <text.T16 style={{marginLeft: 2}}>
          You don't like any products yet
        </text.T16>
      </View>
    );
  };

  return (
    <components.SmartView
      containerStyle={{
        flexGrow: 1,
        backgroundColor:
          wishlist.length > 0
            ? theme.colors.purple
            : theme.colors.imageBackground,
      }}
    >
      {wishlist.length > 0 ? renderProducts() : renderEmptyWishlist()}
      {!(wishlist?.length > 0) && renderButton()}
    </components.SmartView>
  );
};

export default Wishlist;
