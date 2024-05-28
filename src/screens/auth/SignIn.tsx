import React from 'react';
import ParsedText from 'react-native-parsed-text';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {text} from '../../text';
import {theme} from '../../constants';
import {components} from '../../components';
import {useAppNavigation} from '../../hooks';

import {useEffect, useState} from 'react';
import {useAppDispatch} from '../../hooks';
import {setScreen} from '../../store/slices/tabSlice';

import {useTranslation, initReactI18next} from 'react-i18next';
import Button from '../../components/buttons/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();
const SignIn: React.FC = () => {
  
  const [error, setError] = useState();
  const [user, setUser] = React.useState(null);
  const navigation = useAppNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [accessToken, setAccessToken] = React.useState(null);
  const [message, setMessage] = useState<any>();
  const dispatch = useAppDispatch();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId:
        '316385471831-js1uftj5d0t7q1tm1ipo9ohqkoohsgj1.apps.googleusercontent.com',
      androidClientId:
        '316385471831-q7opk0d3ohnrgqfisoink7k90q75l701.apps.googleusercontent.com',
      iosClientId:
        '316385471831-qvptaifkd5kr4v9t2mckf2o8ojc57vpr.apps.googleusercontent.com',
    }
    // ,{
    //   projectNameForProxy: "@owner/slug"
    // }
  );
  
  
  const _retrieveData = async () => {
    try {
      const asyncUser = await AsyncStorage.getItem('user');
      if (asyncUser !== null) {
        dispatch(setScreen('Home'));
        navigation.navigate('TabNavigator');
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  // dispatch(setScreen('Home'));
  // navigation.navigate('TabNavigator');
  React.useEffect(() => {
    _retrieveData();
  }, []);
  React.useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication?.accessToken as any);
      if (accessToken) {
        fetchUserInfo();
      }
    }
  }, [response, accessToken]);

  async function fetchUserInfo() {
    const AsyncUser = await AsyncStorage.getItem('user');

    if (accessToken && !AsyncUser) {
      let response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const useInfo = await response.json();

      setUser(useInfo);

      await AsyncStorage.setItem('user', JSON.stringify(useInfo));
      dispatch(setScreen('Home'));
      navigation.navigate('TabNavigator');
    }
  }

  const renderHeader = () => {
    return <components.Header goBack={true} />;
  };

  const renderContent = () => {
    const {t, i18n} = useTranslation();
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={{
          padding: 20,
          justifyContent: 'center',
          flexGrow: 1,
        }}
      >
        <text.H1
          style={{marginBottom: 35, marginTop: 100, color: theme.colors.black}}
        >
          {t('emailLogin')}
          {/* <Translator/> */}
        </text.H1>

        <components.InputField
          label='Email'
          placeholder='example@gmail.com'
          containerStyle={{marginBottom: 20}}
          onChangeText={(text) => setEmail(text)}
          value={email}
          checkIcon={false}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 0,
          }}
        ></View>

        <View>
          {/* {user && <ShowUserInfo />} */}
          {user === null && (
            <>
              <TouchableOpacity>
                <Button
                  title='Sign in'
                  onPress={() => {
                    promptAsync();
                  }}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  };

  const renderFooter = () => {
    const {t, i18n} = useTranslation();
    return (
      <View style={{padding: 20, paddingBottom: 60}}>
        <text.T16 style={{marginBottom: 20, color: theme.colors.mainColor}}>
          {t('loginOther')}
        </text.T16>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* <components.Facebook onPress={() => console.log('Facebook')} />
          <components.Twitter onPress={() => console.log('Twitter')} /> */}
          <components.Google
            onPress={() => {
              promptAsync();
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <components.SmartView
      containerStyle={{backgroundColor: theme.colors.imageBackground}}
    >
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
    </components.SmartView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
  },
});
