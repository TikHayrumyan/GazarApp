import React, { useState, useMemo, useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import GoBack from './GoBack';
import { svg } from '../../assets/svg';
import { theme } from '../../constants';
import BurgerMenuModal from '../modal/BurgerMenuModal';
import { useAppSelector, useAppDispatch, useAppNavigation } from '../../hooks';
import { setQuantityWantAdd, setSearch } from '../../store/slices/productSlice';
import { setScreen } from '../../store/slices/tabSlice';

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

  const containerStyle: ViewStyle = useMemo(() => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    height: 90,
    borderBottomWidth: border ? 1 : 0,
    borderBottomColor: border ? theme.colors.lightBlue : 'transparent',
  }), [border]);

  const basketOnPress = useCallback(() => {
    dispatch(setScreen('Order'));
    navigation.navigate('TabNavigator');
  }, [dispatch, navigation]);

  const renderGoBack = useCallback(() => (
    goBack && (
      <View style={styles.goBack}>
        <GoBack
          onPress={() => {
            navigation.goBack();
            isHeaderProduct && dispatch(setQuantityWantAdd(0));
          }}
        />
      </View>
    )
  ), [goBack, navigation, dispatch, isHeaderProduct]);

  const renderTitle = useCallback(() => (
    title && (
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    )
  ), [title]);

  const renderBasket = useCallback(() => (
    basket && (
      <TouchableOpacity onPress={basketOnPress} style={styles.basket}>
        <View style={styles.basketAmount}>
          <Text style={styles.basketText}>
            {`${total} ֏`}
          </Text>
        </View>
        <svg.ShoppingCart />
      </TouchableOpacity>
    )
  ), [basket, basketOnPress, total]);

  const renderBurgerMenu = useCallback(() => (
    burgerMenu && (
      <TouchableOpacity
        style={styles.burgerMenu}
        onPress={() => setShowModal(true)}
      >
        <svg.BurgerMenuSvg />
      </TouchableOpacity>
    )
  ), [burgerMenu]);

  const renderSearch = useCallback(() => (
    search && (
      <View style={styles.frameSearch}>
        <View style={styles.searchIcon}>
          <svg.SearchSvg color={theme.colors.black} />
        </View>
        <TextInput
          placeholder='Search'
          placeholderTextColor={theme.colors.black}
          onChangeText={setSearchText}
          value={searchText}
          style={styles.searchInput}
          onBlur={() => dispatch(setSearch(searchText))}
        />
      </View>
    )
  ), [search, searchText, dispatch]);

  const renderBurgerContacts = useCallback(() => (
    <BurgerMenuModal showModal={showModal} setShowModal={setShowModal} />
  ), [showModal]);

  return (
    <View style={containerStyle}>
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
  goBack: {
    position: 'absolute',
    left: 0,
    bottom: 5,
  },
  title: {
    fontSize: 20,
    color: theme.colors.black,
    position: 'absolute',
    bottom: 10,
  },
  basket: {
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    bottom: 10,
  },
  basketAmount: {
    marginVertical: 3,
    height: 22,
    borderRadius: 11,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.black,
    marginRight: 10,
  },
  basketText: {
    color: theme.colors.white,
    fontSize: 10,
  },
  burgerMenu: {
    position: 'absolute',
    left: 0,
    bottom: 10,
    height: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  frameSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    width: theme.sizes.width - 195,
    left: 70,
    position: 'absolute',
    height: 40,
    bottom: 8,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
  },
  searchIcon: {
    marginHorizontal: 7,
  },
  searchInput: {
    flex: 1,
    color: theme.colors.black,
    height: 40,
  },
});

export default Header;
