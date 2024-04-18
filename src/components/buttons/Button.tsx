import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {theme} from '../../constants';

type Props = {
  title: string;
  onPress: () => void;
  containerStyle?: object;
  transparent?: boolean;
};

const Button: React.FC<Props> = ({
  title,
  onPress,
  containerStyle,
  transparent = true,
}): JSX.Element => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 40,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: transparent
            ? theme.colors.gazarGreenColor
            : theme.colors.textColor,
          backgroundColor: transparent
            ? theme.colors.gazarGreenColor
            : theme.colors.opacityBlue,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onPress}
      >
        <LinearGradient
          colors={[
            transparent ? theme.colors.transparent : theme.colors.opacityBlue,
            transparent ? theme.colors.transparent : theme.colors.opacityBlue,
          ]}
          style={{
            width: '100%',
            height: 50,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
        >
          <Text
            style={{
              color: transparent ? theme.colors.white : theme.colors.mainColor,
              textTransform: 'uppercase',
              // ...theme.fonts.DMSans_700Bold,
              fontSize: 14,
            }}
          >
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
