import {View, Text, ViewStyle} from 'react-native';
import React from 'react';

import type {ProductType} from '../../types';

type Props = {
  item: any;
  version: number;
  containerStyle?: ViewStyle;
  colorIcon?: string;
  id?:any

};

import {svg} from '../../assets/svg';
import {theme} from '../../constants';

const ProductRating: React.FC<Props> = ({
  item,
  version,
  containerStyle,
  colorIcon,
}): JSX.Element | null => {
  if (version === 1) {
    const textStyles = {
      // ...theme.fonts.DMSans_400Regular,
      fontSize: 12,
      lineHeight: 12 * 1.7,
      marginLeft: 4,
      color: theme.colors.textColor,
    };

    return (
      <View
        style={{
          ...containerStyle,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <svg.RatingStarSvg color={colorIcon} />
        <Text style={{...textStyles}}>{item.rating?.toFixed(1)}</Text>
      </View>
    );
  }

  return null;
};

export default ProductRating;
