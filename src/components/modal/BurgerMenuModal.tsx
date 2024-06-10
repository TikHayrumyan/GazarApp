import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {setScreen} from '../../store/slices/tabSlice';
import {useAppDispatch} from '../../hooks';
import {useAppNavigation} from '../../hooks';
import {theme} from '../../constants';
import {svg} from '../../assets/svg';
import BurgerMenuItem from './BurgerMenuItem';
import {productsData} from '../../constants/constants';
import {categories} from '../../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const BurgerMenuModal: React.FC<Props> = ({
  showModal,
  setShowModal,
}): JSX.Element => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const [UserInfo, setUserInfo] = useState<any>(null);
  const {t} = useTranslation();
  const _retrieveData = async () => {
    try {
      const asyncUser = await AsyncStorage.getItem('user');
      if (asyncUser !== null) {
        setUserInfo(JSON.parse(asyncUser));
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  useEffect(() => {
    _retrieveData();
  }, [showModal]);
  const renderCloseBtn = () => {
    return (
      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          marginTop: 50,
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
        onPress={() => setShowModal(false)}
      >
        <svg.CloseMenuSvg />
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    if (UserInfo) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 20,
            borderBottomWidth: 1,
            paddingHorizontal: 20,
            marginBottom: 20,
            borderBottomColor: theme.colors.lightBlue,
          }}
        >
          <Image
            source={{
              uri: `${UserInfo.picture}`,
            }}
            style={{
              width: responsiveWidth(14),
              aspectRatio: 1,
              marginRight: 14,
              borderRadius: 50,
            }}
          />
          <View>
            <Text
              style={{
                ...theme.fonts.H5,
                color: theme.colors.mainColor,
                textTransform: 'capitalize',
              }}
              numberOfLines={1}
            >
              {UserInfo.given_name}
            </Text>
            <Text
              style={{
                // ...theme.fonts.textStyle_14,
                color: theme.colors.textColor,
              }}
              numberOfLines={1}
            >
              {UserInfo.email}
            </Text>
          </View>
        </View>
      );
    }
  };
  
  const renderMenu = () => {
    return (
      <View style={{paddingHorizontal: 20}}>
        <BurgerMenuItem
          version={2}
          icon={<svg.ShopSvg />}
          title={t('Shop')}
          containerStyle={{
            marginBottom: 6,
          }}
          onPress={() => {
            setShowModal(false);
            navigation.navigate('Shop', {
              title: t("Shop"),
              // products: productsData.filter((item: any) => {item?.is_sale - 1}),
            });
          }}
        />
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={{paddingLeft: 20}}>
        {/* <BurgerMenuItem
          version={2}
          icon={<svg.BellSvg />}
          title={t('Notifications')}
          quantity={1}
          containerStyle={{marginBottom: 10}}
          onPress={() => {
            setShowModal(false);
            navigation.navigate('Notifications');
          }}
        /> */}
        {/* <BurgerMenuItem
          version={2}
          icon={<svg.HelpCircleSvg />}
          title={t("Support")}
          containerStyle={{marginBottom: 10}}
          onPress={() => {
            console.log('Support');
          }}
        /> */}
        <BurgerMenuItem
          version={2}
          icon={<svg.LogOutSvg />}
          title={t("signOut")}
          onPress={async () => {
            await AsyncStorage.removeItem('user');
            navigation.navigate('SignIn');
          }}
        />
      </View>
    );
  };

  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={() => setShowModal(false)}
      hideModalContentWhileAnimating={true}
      backdropTransitionOutTiming={0}
      style={{margin: 0}}
      animationIn='slideInLeft'
      animationOut='slideOutLeft'
    >
      <ScrollView
        style={{
          width: responsiveWidth(78),
          height: theme.sizes.height,
          backgroundColor: theme.colors.white,
          paddingBottom: 20,
        }}
        contentContainerStyle={{flexGrow: 1}}
      >
        {renderCloseBtn()}
        {UserInfo && renderHeader()}
        {renderMenu()}
        {renderFooter()}
      </ScrollView>
    </Modal>
  );
};

export default BurgerMenuModal;
