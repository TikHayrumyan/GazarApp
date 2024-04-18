import React from 'react';
import {ScrollView} from 'react-native';
import {text} from '../text';
import {svg} from '../assets/svg';
import {components} from '../components';
import {useAppNavigation} from '../hooks';
import {theme} from '../constants';

const ForgotPasswordSentEmail: React.FC = () => {
  const navigation = useAppNavigation();

  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.imageBackground,
          marginTop: 50,
          paddingHorizontal: 20,
          paddingTop: 25,
          paddingBottom: 20,
          flexGrow: 1,
        }}
      >
        <svg.KeySvg />
        <text.H2
          style={{
            marginTop: 30,
            marginBottom: 14,
            textAlign: 'center',
            color: theme.colors.mainColor,
          }}
        >
          Your password has{'\n'}been reset!
        </text.H2>
        <text.T16 style={{color: theme.colors.mainColor, textAlign: 'center'}}>
          Qui ex aute ipsum duis. Incididunt adipisicing voluptate laborum
        </text.T16>
      </ScrollView>
    );
  };

  const renderButton = () => {
    return (
      <components.Button
        title='done'
        containerStyle={{
          paddingBottom: 60,
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
      containerStyle={{
        backgroundColor: theme.colors.purple,
      }}
    >
      {renderContent()}
      {renderButton()}
    </components.SmartView>
  );
};

export default ForgotPasswordSentEmail;
