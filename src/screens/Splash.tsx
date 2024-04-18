// Library Imports
import {View} from 'react-native';
import React, {useEffect} from 'react';
import {components} from '../components';
import {ActivityIndicator} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useAppNavigation} from '../hooks';
import LogoSvg from '../assets/svg/LogoSvg';
import {theme} from '../constants';

const Splash: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  useEffect(() => {
    SplashScreen?.hide();
    setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 3000);
  }, []);

  return (
    <components.SmartView
      containerStyle={{
        backgroundColor: theme.colors.purple,
      }}
    >
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: '100%',
          paddingTop: 50,
          backgroundColor: '#FFFFFF',
          marginTop: 50,
        }}
      >
        <LogoSvg />
      </View>
      <ActivityIndicator
        size='large'
        style={{
          position: 'absolute',
          right: '43%',
          bottom: 80,
          backgroundColor: '#FFFFFF',
        }}
      />
    </components.SmartView>
  );
};

export default Splash;
