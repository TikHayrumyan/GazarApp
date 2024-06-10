import { Text, Dimensions } from 'react-native';
import React from 'react';
import { theme } from '../constants';

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

const H1: React.FC<Props> = ({ children, style, numberOfLines }): JSX.Element => {
  return (
    <Text
      style={{
        // ...theme.fonts.Inter_700Bold,
        fontSize: getResponsiveFontSize(32),
        lineHeight: getResponsiveFontSize(32) * 1.3,
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

export default H1;
