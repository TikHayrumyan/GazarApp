import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const StarBlackSvg = (props) => (
  <Svg
    width={12}
    height={12}
    viewBox='0 0 12 12'
    fill='white'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <G clipPath='url(#clip0_145_2178)'>
      <Path
        d='M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z'
        stroke={props.color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </G>
    <Defs>
      <ClipPath id='clip0_145_2178'>
        <Rect width={12} height={12} fill='white' />
      </ClipPath>
    </Defs>
  </Svg>
);
export default StarBlackSvg;
