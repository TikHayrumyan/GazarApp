import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const ArrowViewAllSvg = (props) => (
  <Svg
    width={6}
    height={10}
    viewBox='0 0 6 10'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <G clipPath='url(#clip0_427_7007)'>
      <Path
        d='M1 9L5 5L1 1'
        stroke={props.color}
        strokeWidth={1.2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </G>
    <Defs>
      <ClipPath id='clip0_427_7007'>
        <Rect width={6} height={10} fill={props.color} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ArrowViewAllSvg;
