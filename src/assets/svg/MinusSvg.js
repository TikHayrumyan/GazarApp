import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {theme} from '../../constants';

const MinusSvg = () => (
  <Svg xmlns='http://www.w3.org/2000/svg' width={10} height={10} fill='none'>
    <Path
      stroke="black"
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M2.157 5H7.99'
    />
  </Svg>
);

export default MinusSvg;
