import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { components } from '../components';
import { useAppNavigation } from '../hooks';
import { theme } from '../constants';
import { setScreen } from '../store/slices/tabSlice';
import { useTranslation } from 'react-i18next';

type UserInfo = {
  addressId: { address: string }[];
};

const MyAddress: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const {t} = useTranslation()
  const retrieveData = useCallback(async () => {
    try {
      const asyncUserId = await AsyncStorage.getItem('userDbId');
      if (asyncUserId) {
        const response = await fetch(
          `https://gazar.am/api/user?id=${JSON.parse(asyncUserId)}`
        );
        const res = await response.json();
        if (res) {
          setUserInfo(res);
        }
      }
    } catch (error) {
      console.error('Error retrieving data', error);
    }
  }, []);

  useEffect(() => {
    retrieveData();
  }, [retrieveData]);

  const renderHeader = () => (
    <components.Header goBack={true} title={t('myAddress')} />
  );

  const renderContent = () => (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {userInfo?.addressId?.map((item, index) => (
        item.address && (
          <TouchableOpacity
            key={index}
            style={styles.addressItem}
          >
            <View>
              <Text style={styles.addressText} numberOfLines={1}>
                {item.address}
              </Text>
            </View>
          </TouchableOpacity>
        )
      ))}
    </ScrollView>
  );

  // const renderButton = () => (
  //   <components.Button
  //     title="+ add new address"
  //     onPress={() => navigation.navigate('AddANewAddress')}
  //     containerStyle={styles.addButtonContainer}
  //   />
  // );

  return (
    <components.SmartView containerStyle={styles.container}>
      {renderHeader()}
      {renderContent()}
      {/* {renderButton()} */}
    </components.SmartView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.imageBackground,
  },
  contentContainer: {
    paddingTop: 25,
    paddingBottom: 20,
    paddingLeft: 20,
    gap: 14,
  },
  addressItem: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: theme.colors.lightBlue,
    borderWidth: 1,
  },
  addressText: {
    fontSize: 12,
    lineHeight: 18,
    color: theme.colors.textColor,
  },
  addButtonContainer: {
    padding: 20,
  },
});

export default MyAddress;
