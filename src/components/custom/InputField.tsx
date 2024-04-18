import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {theme} from '../../constants';
import {svg} from '../../assets/svg';

type Props = {
  containerStyle?: object;
  onChangeText?: (text: string) => void;
  value?: string;
  type?: string;
  check?: boolean;
  label?: string;
  placeholder?: string;
  _maxLength?: number;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  eyeOffIcon?: boolean;
  checkIcon?: boolean;
  icon?: JSX.Element;
};

const InputField: React.FC<Props> = ({
  placeholder,
  containerStyle,
  secureTextEntry,
  _maxLength,
  keyboardType,
  checkIcon,
  eyeOffIcon = false,
  onChangeText,
  label,
  value,
  icon,
}): JSX.Element | null => {
  return (
    <View
      style={{
        paddingLeft: 20,
        height: 50,
        width: '100%',
     
        borderWidth:1,
        borderColor: '#DBE9F5',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        ...containerStyle,
      }}
    >
      <TextInput
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          fontSize: 16,
          color: theme.colors.mainColor,
          // ...theme.fonts.DMSans_400Regular,
        }}
        maxLength={_maxLength}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={'#A7AFB7'}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
      />
      {label && (
        <View
          style={{
            position: 'absolute',
            top: -12,
            left: 10,
            paddingHorizontal: 10,
            backgroundColor: theme.colors.transparent,
          }}
        >
          <Text
            style={{
              // ...theme.fonts.DMSans_500Medium,
              fontSize: 12,
              textTransform: 'uppercase',
              color: theme.colors.gazarMainText,
              lineHeight: 12 * 1.7,
            }}
          >
            {label}
          </Text>
        </View>
      )}
      {checkIcon && (
        <View style={{paddingHorizontal: 20}}>
          <svg.InputCheckSvg />
        </View>
      )}
      {eyeOffIcon && (
        <TouchableOpacity style={{paddingHorizontal: 20}}>
          <svg.EyeOffSvg />
        </TouchableOpacity>
      )}
      {icon && (
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;
