import { Text, Dimensions } from 'react-native';
import React from 'react';
import { theme } from '../constants';

const { width } = Dimensions.get('window');

// Function to calculate responsive font size
const getResponsiveFontSize = (fontSize: number) => {
  const scaleFactor = width / 375; // 375 is a common base width for design (e.g., iPhone 6/7/8)
  return fontSize * scaleFactor;
};

type Props = {
  children: React.ReactNode;
  style?: object;
  numberOfLines?: number;
};

const H5: React.FC<Props> = ({ children, style, numberOfLines }): JSX.Element => {
  return (
    <Text
      style={{
        fontSize: getResponsiveFontSize(16), // Adjust the base font size as needed
        lineHeight: getResponsiveFontSize(16) * 1.3, // Adjust the line height multiplier as needed
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

export default H5;
