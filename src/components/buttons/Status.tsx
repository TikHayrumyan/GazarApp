import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {theme} from '../../constants';

type Props = {
  onPress: () => void;
  title: string;
  active: boolean;
};

const Status: React.FC<Props> = ({onPress, title, active}): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderWidth: 1,
        paddingHorizontal: 18,
        paddingVertical: 6,
        backgroundColor: active
          ? theme.colors.primary
          : theme.colors.opacityBlue,
        borderRadius: 3,
        borderColor: active
          ? theme.colors.imageBackground
          : theme.colors.lightBlue,
        marginRight: 10,
      }}
    >
      <Text
        style={{
          textTransform: 'uppercase',
          color: active ? theme.colors.white : theme.colors.mainColor,
          // ...theme.fonts.DMSans_700Bold,
          fontSize: 12,
          lineHeight: 12 * 1.7,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Status;
