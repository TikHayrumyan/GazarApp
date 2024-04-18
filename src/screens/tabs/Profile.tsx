import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  Text,
  Alert,
  StyleSheet,
  Button,
} from 'react-native';
import {text} from '../../text';
import {svg} from '../../assets/svg';
import {theme} from '../../constants';
import {components} from '../../components';
import {useAppNavigation} from '../../hooks';
import {setScreen} from '../../store/slices/tabSlice';
import {useDispatch} from 'react-redux';
import {Svg} from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

const Profile: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();
  const [signOutModal, setSignOutModal] = useState(false);
  const [LanguageModal, setLanguageModal] = useState(false);
  const dispatch = useDispatch();
  const [UserInfo, setUserInfo] = useState<any>(null);
  const {t, i18n} = useTranslation();

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
  }, []);
  const renderUser = () => {
    if (UserInfo) {
      return (
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            paddingBottom: 30,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            source={{uri: UserInfo.picture}}
            style={{
              marginRight: 14,
              width: 60,
              height: 60,
              borderRadius: 50,
            }}
          />
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <text.H3 style={{marginRight: 'auto', marginBottom: 4}}>
                {UserInfo.given_name}
              </text.H3>
              {/* <svg.EditSvg /> */}
            </View>
            <text.T14>{UserInfo.email}</text.T14>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const renderMenu = () => {
    return (
      <View style={{paddingLeft: 20}}>
        <components.ProfileItem
          icon={<svg.ServerSvg />}
          title={t('MyOrders')}
          onPress={() => {
            navigation.navigate('OrderHistory');
          }}
        />
        {/* <components.ProfileItem
          icon={<svg.CreditCardSvg />}
          title='Payment methods'
          onPress={() => navigation.navigate('PaymentMethod')}
        /> */}
        <components.ProfileItem
          icon={<svg.MapPinSvg />}
          title={t('Address')}
          onPress={() => {
            navigation.navigate('MyAddress');
          }}
        />
        {/* <components.ProfileItem
          icon={<svg.GiftSvg />}
          title='Promocodes & gift cards'
          onPress={() => navigation.navigate('MyPromocodes')}
        /> */}
        <components.ProfileItem
          icon={<svg.EditSvg />}
          title={t('language')}
          onPress={() => setLanguageModal(true)}
        />
        <components.ProfileItem
          icon={<svg.LogOutSvg />}
          title={t('signOut')}
          onPress={async () => {
            await AsyncStorage.removeItem('user');
            navigation.navigate('SignIn');
          }}
        />
      </View>
    );
  };

  const renderSignOutModal = () => {
    return (
      <Modal
        isVisible={signOutModal}
        onBackdropPress={() => setSignOutModal(false)}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        style={{margin: 0}}
        animationIn='zoomIn'
        animationOut='zoomOut'
      >
        <View
          style={{
            backgroundColor: theme.colors.white,
            borderRadius: 5,
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              borderBottomWidth: 1,
              padding: 20,
              paddingBottom: 30,
            }}
          >
            <View style={{marginBottom: 14}}>
              <svg.LogOutBigSvg color={theme.colors.purple} />
            </View>
            <text.H2 style={{marginBottom: 30, color: theme.colors.purple}}>
              Are you sure you want to {'\n'}sign out ?
            </text.H2>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <components.Button
                title='cancel'
                transparent={false}
                containerStyle={{
                  width: '47%',
                }}
                onPress={() => setSignOutModal(false)}
              />
              <components.Button
                title='Sure'
                containerStyle={{width: '47%'}}
                transparent={true}
                onPress={() => {
                  setSignOutModal(false);
                  navigation.navigate('SignIn');
                  dispatch(setScreen('Home'));
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const [selectedLanguage, setSelectedLanguage] = useState('am');

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    setLanguageModal(false);
  };

  const renderLanguageModal = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Modal
          isVisible={LanguageModal}
          onBackdropPress={() => setLanguageModal(false)}
          hideModalContentWhileAnimating={true}
          backdropTransitionOutTiming={0}
          style={{margin: 0}}
          animationIn='zoomIn'
          animationOut='zoomOut'
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t("SelectLanguage")}</Text>
              <TouchableOpacity onPress={() => handleLanguageSelect('en')}>
                <Text style={styles.languageOption}>
                  English
                  {selectedLanguage == 'en' ? (
                    <svg.SmallCheckSvg
                      style={styles.checkIcon}
                    ></svg.SmallCheckSvg>
                  ) : null}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLanguageSelect('am')}>
                <Text style={styles.languageOption}>
                  Հայերեն
                  {selectedLanguage == 'am' ? (
                    <svg.SmallCheckSvg
                      style={styles.checkIcon}
                    ></svg.SmallCheckSvg>
                  ) : null}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLanguageSelect('ru')}>
                <Text style={styles.languageOption}>
                  Русский
                  {selectedLanguage == 'ru' ? (
                    <svg.SmallCheckSvg
                      style={styles.checkIcon}
                    ></svg.SmallCheckSvg>
                  ) : null}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* <Text>Selected Language: {selectedLanguage}</Text> */}
      </View>
    );
  };

  return (
    <components.SmartView
      containerStyle={{
        flexGrow: 1,
        paddingTop: 55,
        paddingBottom: 20,
        backgroundColor: theme.colors.imageBackground,
      }}
    >
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {renderUser()}
        {renderMenu()}
      </ScrollView>
      {renderSignOutModal()}
      {renderLanguageModal()}
    </components.SmartView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  languageOption: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'left',
  },
  checkIcon: {
    marginLeft: 10,
  },
});
