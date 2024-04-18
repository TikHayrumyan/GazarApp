import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {theme} from '../../constants';

type Props = {
  containerStyle?: object;
  onPress?: () => void;
};

const ShopNow: React.FC<Props> = ({containerStyle, onPress}): JSX.Element => {
  return (
    <TouchableOpacity
      style={{
        alignSelf: 'flex-start',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.colors.white,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          textTransform: 'uppercase',
          // ...theme.fonts.DMSans_700Bold,
          fontSize: 12,
          lineHeight: 12 * 1.7,
          color: theme.colors.white,
        }}
      >
        shop now
      </Text>
    </TouchableOpacity>
  );
};

export default ShopNow;
