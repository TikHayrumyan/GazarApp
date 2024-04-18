import React from 'react';
import {View, Text} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {text} from '../text';
import {theme} from '../constants';
import {components} from '../components';
import {useAppNavigation} from '../hooks';

const VerifyYourPhoneNumber: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  const renderHeader = () => {
    return <components.Header title='Verify your phone number' goBack={true} />;
  };

  const renderContent = () => {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingVertical: 25,
        }}
      >
        <text.T16 style={{marginBottom: 40, color: theme.colors.black}}>
          Please enter your phone number, we will send you an SMS with a
          verification code.
        </text.T16>
        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#DBE9F5',
            marginBottom: 20,
          }}
        >
          <PhoneInput
            style={{
              paddingVertical: 16,
              paddingHorizontal: 25,
            }}
            initialCountry={'us'}
            textStyle={{
              // ...theme.fonts.DMSans_400Regular,
              fontSize: 16,
              color: theme.colors.black,
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: -12,
              left: 13,
              paddingHorizontal: 10,
              backgroundColor: theme.colors.transparent,
            }}
          >
            <Text
              style={{
                // ...theme.fonts.DMSans_500Medium,
                fontSize: 12,
                textTransform: 'uppercase',
                color: theme.colors.black,
                lineHeight: 12 * 1.7,
              }}
            >
              phone number
            </Text>
          </View>
        </View>
        <components.Button
          title='confirm'
          onPress={() => navigation.navigate('ConfirmationCode')}
        />
      </KeyboardAwareScrollView>
    );
  };

  return (
    <components.SmartView
      containerStyle={{backgroundColor: theme.colors.imageBackground}}
    >
      {renderHeader()}
      {renderContent()}
    </components.SmartView>
  );
};

export default VerifyYourPhoneNumber;
