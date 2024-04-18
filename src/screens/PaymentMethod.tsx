import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {components} from '../components';
import {theme} from '../constants';
import {svg} from '../assets/svg';
import {paymentMethods} from '../constants/constants';

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentMethod'>;

const PaymentMethod: React.FC<Props> = ({navigation}): JSX.Element => {
  const renderHeader = () => {
    return <components.Header goBack={true} title='Payment method' />;
  };

  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingLeft: 20,
          paddingTop: 5,
          paddingBottom: 20,
        }}
      >
        {paymentMethods.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 25,
                paddingBottom: 25,
                borderTopColor: theme.colors.lightBlue,
                borderTopWidth: 1,
                paddingRight: 20,
              }}
            >
              <Image
                source={item.icon}
                style={{
                  width:
                    item.type === 'visa'
                      ? 40.43
                      : item.type === 'mastercard'
                      ? 26.59
                      : item.type === 'google-pay'
                      ? 92.13
                      : item.type === 'apple-pay'
                      ? 40.2
                      : item.type === 'paypal'
                      ? 61.77
                      : null,
                  height:
                    item.type === 'visa'
                      ? 12
                      : item.type === 'mastercard'
                      ? 16
                      : item.type === 'google-pay'
                      ? 16
                      : item.type === 'apple-pay'
                      ? 16
                      : item.type === 'paypal'
                      ? 16
                      : null,
                }}
              />
              {item?.number && (
                <Text
                  style={{
                    marginLeft: 20,
                    // ...theme.fonts.textStyle_14,
                    color: theme.colors.textColor,
                  }}
                >
                  {item.number}
                </Text>
              )}
              {item?.edit && (
                <View style={{marginLeft: 'auto'}}>
                  <svg.EditSvg />
                </View>
              )}
              {item?.plus && (
                <View style={{marginLeft: 'auto'}}>
                  <svg.PlusSvg />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  const renderFooter = () => {
    return (
      <components.Button
        title='Add new card'
        containerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 20,
        }}
        onPress={() => {
          navigation.navigate('AddANewCard');
        }}
      />
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

export default PaymentMethod;
