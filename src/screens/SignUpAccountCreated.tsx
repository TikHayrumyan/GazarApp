import React from 'react';
import {ScrollView, View} from 'react-native';

import {text} from '../text';
import {svg} from '../assets/svg';
import {components} from '../components';
import {useAppNavigation} from '../hooks';
import {theme} from '../constants';

const SignUpAccountCreated: React.FC = () => {
  const navigation = useAppNavigation();

  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
          paddingVertical: 20,
          backgroundColor: theme.colors.imageBackground,
        }}
      >
        <svg.KeySvg />
        <text.H2
          style={{
            marginTop: 30,
            marginBottom: 14,
            color: theme.colors.mainColor,
          }}
        >
          Account Created!
        </text.H2>
        <text.T16 style={{color: theme.colors.mainColor, textAlign: 'center'}}>
          Your account had been created{'\n'}successfully.
        </text.T16>
      </ScrollView>
    );
  };

  const renderButton = () => {
    return (
      <components.Button
        title='Sign In Now'
        containerStyle={{
          margin: 20,
          padding: 20,
          backgroundColor: theme.colors.imageBackground,
        }}
        onPress={() => {
          navigation.navigate('SignIn');
        }}
      />
    );
  };

  return (
    <components.SmartView
      containerStyle={{backgroundColor: theme.colors.purple}}
    >
      {renderContent()}
      <View style={{backgroundColor: theme.colors.imageBackground}}>
        {renderButton()}
      </View>
    </components.SmartView>
  );
};

export default SignUpAccountCreated;
