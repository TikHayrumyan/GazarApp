import React from 'react';

import {theme} from '../constants';
import { Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Function to calculate responsive font size
const getResponsiveFontSize = (fontSize:any) => {
  const scaleFactor = width / 375; // 375 is a common base width for design (e.g., iPhone 6/7/8)
  return fontSize * scaleFactor;
};
type Props = {
  children: React.ReactNode;
  style?: object;
  numberOfLines?: number;
};

const H3: React.FC<Props> = ({children, style, numberOfLines}): JSX.Element => {
  return (
    <Text
      style={{
        // ...theme.fonts.Inter_500Medium,
        fontSize: getResponsiveFontSize(20),
        lineHeight: 20 * 1.2,
        color: theme.colors.mainColor,
        textTransform: 'capitalize',
        ...style,
      }}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export default H3;
