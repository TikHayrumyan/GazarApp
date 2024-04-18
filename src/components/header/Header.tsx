import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
} from 'react-native';
import GoBack from './GoBack';
import {svg} from '../../assets/svg';
import {theme} from '../../constants';
import {setScreen} from '../../store/slices/tabSlice';
import BurgerMenuModal from '../modal/BurgerMenuModal';
import {useAppSelector, useAppDispatch, useAppNavigation} from '../../hooks';
import {setQuantityWantAdd, setSearch} from '../../store/slices/productSlice';

type Props = {
  title?: string;
  goBack?: boolean;
  basket?: boolean;
  border?: boolean;
  search?: boolean;
  burgerMenu?: boolean;
  isHeaderProduct?: boolean;
};

const Header: React.FC<Props> = ({
  title,
  goBack,
  basket,
  burgerMenu,
  border,
  search,
  isHeaderProduct,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const route = useRoute();

  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');

  const cart = useAppSelector((state) => state.cart.list);
  const total = useAppSelector((state) => state.cart.total)?.toFixed(0);
  
  const basketOnPress = () => {
    isHeaderProduct && dispatch(setQuantityWantAdd(0));
    if (cart?.length > 0) {
      dispatch(setScreen('Order'));
      route.name === 'Shop' && navigation.navigate('TabNavigator');
      route.name === 'Product' && navigation.navigate('TabNavigator');
    }
    if (cart?.length === 0) {
      Alert.alert('Your cart is empty', 'Please add some items to your cart', [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ]);
    }
  };

  const containerStyle: object = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    height: 90,
  };

  const renderGoBack = () => {
    if (goBack) {
      return (
        <View
          style={{
            position: 'absolute',
            left: 0,
            bottom: 5,
          }}
        >
          <GoBack
            onPress={() => {
              navigation.goBack();
              isHeaderProduct && dispatch(setQuantityWantAdd(0));
            }}
          />
        </View>
      );
    }
  };

  const renderTitle = () => {
    if (title) {
      return (
        <Text
          style={{
            // ...theme.fonts.DMSans_400Regular,
            fontSize: 20,
            color: theme.colors.black,
            position: 'absolute',
            bottom: 10,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
      );
    }
  };

  const renderBasket = () => {
    if (basket) {
      return (
        <TouchableOpacity onPress={basketOnPress} style={styles.basket}>
          <View
            style={{
              marginVertical: 3,
              height: 22,
              borderRadius: 11,
              paddingHorizontal: 7,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.black,
              marginRight: 10,
            }}
          >
            <Text
              style={{
                color: theme.colors.white,
                // ...theme.fonts.DMSans_700Bold,
                fontSize: 10,
              }}
            >
              {`${total} ֏`}
            </Text>
          </View>
          <svg.ShoppingCart/>
        </TouchableOpacity>
      );
    }
  };

  const renderBurgerMenu = () => {
    if (burgerMenu) {
      return (
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 0,
            bottom: 10,
            height: 25,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => setShowModal(true)}
        >
          <svg.BurgerMenuSvg />
        </TouchableOpacity>
      );
    }
  };

  const renderSearch = () => {
    if (search) {
      return (
        <View style={styles.frameSearch}>
          <View style={{marginHorizontal: 7}}>
            <svg.SearchSvg color={theme.colors.black} />
          </View>
          <TextInput
            placeholder='Search'
            placeholderTextColor={theme.colors.black}
            onChangeText={setSearchText}
            value={searchText}
            style={{
              flex: 1,
              color: theme.colors.black,
              height: 40,
            }}
            onBlur={() => dispatch(setSearch(searchText))}
          />
        </View>
      );
    }
  };

  const renderBurgerContacts = () => {
    return (
      <BurgerMenuModal showModal={showModal} setShowModal={setShowModal} />
    );
  };

  return (
    <View style={{...containerStyle}}>
      {renderGoBack()}
      {renderTitle()}
      {renderBasket()}
      {renderBurgerMenu()}
      {renderSearch()}
      {renderBurgerContacts()}
    </View>
  );
};

const styles = StyleSheet.create({
  basket: {
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    bottom: 10,
  },
  frameSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    width: theme.sizes.width - 195,
    left: 70,
    position: 'absolute',
    height: 30,
    bottom: 8,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
  },
  burgerMenuIcon:{
    backgroundColor:"black",
    color:"black"
  }
});

export default Header;
