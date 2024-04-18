import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import ParsedText from 'react-native-parsed-text';
import {text} from '../../text';
import {theme} from '../../constants';
import {components} from '../../components';
import {useAppNavigation} from '../../hooks';
import {validation} from '../../utils/validation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SignUp: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUserName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    });

    return unsubscribe;
  }, [navigation]);

  const renderHeader = () => {
    return <components.Header goBack={true} />;
  };

  const renderContent = () => {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          justifyContent: 'center',
        }}
        enableOnAndroid={true}
      >
        <text.H1 style={{marginBottom: 40, color: theme.colors.black}}>
          Sign up
        </text.H1>
        <components.InputField
          label='Name'
          placeholder='Callie Mosley'
          containerStyle={{marginBottom: 20}}
          onChangeText={(text) => setUserName(text)}
          value={username}
          checkIcon={false}
        />
        <components.InputField
          label='Email'
          placeholder='calliemosley@mail.com'
          containerStyle={{marginBottom: 20}}
          onChangeText={(text) => setEmail(text)}
          value={email}
          checkIcon={false}
        />
        <components.InputField
          label='password'
          placeholder='••••••••'
          containerStyle={{marginBottom: 20}}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          eyeOffIcon={false}
        />
        <components.InputField
          label='confirm password'
          placeholder='••••••••'
          containerStyle={{marginBottom: 20}}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry={true}
          eyeOffIcon={false}
        />
        <components.Button
          title='Sign up'
          containerStyle={{marginBottom: 20}}
          onPress={() => {
            if (validation({username, email, password, confirmPassword})) {
              navigation.navigate('VerifyYourPhoneNumber');
            }
          }}
        />
        <ParsedText
          style={{ color: theme.colors.mainColor}}
          parse={[
            {
              pattern: /Sign in./,
              style: {color: theme.colors.purple},
              onPress: () => navigation.navigate('SignIn'),
            },
          ]}
        >
          Already have an account? Sign in.
        </ParsedText>
      </KeyboardAwareScrollView>
    );
  };

  const renderFooter = () => {
    return (
      <View style={{padding: 20, paddingBottom: 60}}>
        <text.T16 style={{marginBottom: 20, color: theme.colors.mainColor}}>
          Sign in with social networks:
        </text.T16>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <components.Facebook onPress={() => console.log('Facebook')} />
          <components.Twitter onPress={() => console.log('Twitter')} />
          <components.Google onPress={() => console.log('Google')} />
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

export default SignUp;
