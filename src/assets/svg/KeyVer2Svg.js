import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';
const KeyVer2Svg = (props) => (
  <Svg
    width={70}
    height={70}
    viewBox='0 0 70 70'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Circle cx={35} cy={35} r={34} stroke='#015F6B' strokeWidth={2} />
  </Svg>
);
export default KeyVer2Svg;
