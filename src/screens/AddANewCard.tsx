import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useAppNavigation} from '../hooks';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {components} from '../components';
import {theme} from '../constants';
import {svg} from '../assets/svg';
import Images from '../assets/Images';

const AddANewCard: React.FC = () => {
  const navigation = useAppNavigation();
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const renderHeader = () => {
    return <components.Header goBack={true} title='Add a new card' />;
  };

  const onChangeCardName = (text: string) => {
    setCardName(text);
  };

  const onChangeCardNumber = (text: string) => {
    const cleanedText = text.replace(/[^0-9]/g, '');
    setCardNumber(cleanedText);
  };

  const onChangeExpiryDate = (text: string) => {
    setExpiryDate(text);
  };

  const onChangeCvv = (text: string) => {
    setCvv(text);
  };

  const formatCardNumber = (input: string) => {
    const cleanedInput = input.replace(/\s/g, ''); // Remove spaces again
    const maskedCardNumber = cleanedInput
      .slice(-4)
      .padStart(cleanedInput?.length, '●');
    const formatted = maskedCardNumber.match(/.{1,4}/g)?.join(' ');
    return formatted;
  };

  const FormattedCardNumber = formatCardNumber(cardNumber);

  const renderContent = () => {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingRight: 20,
          paddingLeft: 20,
          paddingTop: 25,
          paddingBottom: 20,
          flexGrow: 1,
        }}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
      >
        <View style={{marginBottom: 28}}>
          <ImageBackground
            source={Images.BgMasterCard}
            resizeMode='contain'
            style={{
              width: 350,
              height: 220,
              alignSelf: 'center',
            }}
          >
            <View
              style={{
                height: 220,
                position: 'relative',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 305,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    marginHorizontal: 10,
                    flex: 1,
                  }}
                >
                  <Text numberOfLines={1} style={{color: theme.colors.white}}>
                    {cardName === '' ? 'Callie Mosley' : cardName}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      marginTop: 5,
                      fontSize: 10,
                      color: theme.colors.white,
                    }}
                  >
                    {cardNumber === ''
                      ? '●●●● ●●●● ●●●● 7741'
                      : FormattedCardNumber}
                  </Text>
                </View>
                <Image
                  source={Images.VisaLogo}
                  style={{height: 20, width: 40}}
                />
                <Image
                  source={Images.MasterIcon}
                  style={{height: 22, width: 40, marginLeft: 17.57}}
                />
              </View>
              <View
                style={{
                  marginHorizontal: 10,
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 305,
                }}
              >
                <View
                  style={{
                    marginHorizontal: 10,
                    flex: 1,
                    position: 'absolute',
                    left: 0,
                    bottom: 20,
                  }}
                >
                  <Text style={{color: theme.colors.white}} numberOfLines={1}>
                    {'ExpiryDate'}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      marginTop: 15,
                      fontWeight: 'bold',
                      color: theme.colors.white,
                    }}
                  >
                    {expiryDate === '' ? '••••/••••' : expiryDate}
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: 10,
                    flex: 1,
                    position: 'absolute',
                    right: 130,
                    bottom: 20,
                  }}
                >
                  <Text style={{color: theme.colors.white}} numberOfLines={1}>
                    CVV
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      marginTop: 15,
                      fontWeight: 'bold',
                      color: theme.colors.white,
                    }}
                  >
                    {cvv === '' ? '••••' : cvv}
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <components.InputField
          label='Name'
          value={cardName}
          onChangeText={onChangeCardName}
          placeholder='Mariah Franklin'
          containerStyle={{marginBottom: 20}}
        />
        <components.InputField
          label='card number'
          value={cardNumber}
          _maxLength={16}
          onChangeText={onChangeCardNumber}
          placeholder='xxxx xxxx xxxx 1234'
          icon={<svg.CameraSvg />}
          containerStyle={{marginBottom: 20}}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <components.InputField
            label='MM/yy'
            value={expiryDate}
            _maxLength={5}
            onChangeText={onChangeExpiryDate}
            placeholder='12/23'
            containerStyle={{width: '47%'}}
          />
          <components.InputField
            label='cvv'
            value={cvv}
            _maxLength={4}
            onChangeText={onChangeCvv}
            placeholder='000'
            containerStyle={{width: '47%'}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            style={{
              paddingLeft: 20,
              height: 50,
              width: '47%',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: '#DBE9F5',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                // ...theme.fonts.textStyle_14,
                color: theme.colors.mainColor,
              }}
            >
              - Choose -
            </Text>
            <View
              style={{
                position: 'absolute',
                top: -12,
                left: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  // ...theme.fonts.DMSans_500Medium,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  color: theme.colors.purple,
                  lineHeight: 12 * 1.7,
                }}
              >
                country
              </Text>
            </View>
          </TouchableOpacity>
          <components.InputField
            label='zip code'
            placeholder='00000'
            containerStyle={{width: '47%'}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <components.Button
            title='cancel'
            transparent={false}
            containerStyle={{width: '47%'}}
            onPress={() => navigation.goBack()}
          />
          <components.Button
            title='save'
            containerStyle={{width: '47%'}}
            onPress={() => navigation.goBack()}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  };

  return (
    <components.SmartView>
      {renderHeader()}
      {renderContent()}
    </components.SmartView>
  );
};

export default AddANewCard;
