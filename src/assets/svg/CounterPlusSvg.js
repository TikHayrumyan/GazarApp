import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const CounterPlusSvg = ({color}) => (
  <Svg width={10} height={10} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <Path
      d='M5 2.083v5.834M2.083 5h5.834'
      stroke={color}
      strokeWidth={1.2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Svg>
);

export default CounterPlusSvg;
