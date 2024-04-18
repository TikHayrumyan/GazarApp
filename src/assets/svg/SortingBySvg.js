import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const SortingBySvg = ({color, props}) => (
  <Svg
    width={8}
    height={5}
    viewBox='0 0 8 5'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <G clipPath='url(#clip0_145_2743)'>
      <Path
        d='M0.799218 0.799804L3.99922 3.9998L7.19922 0.799805'
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </G>
    <Defs>
      <ClipPath id='clip0_145_2743'>
        <Rect
          width={4.8}
          height={8}
          fill={color}
          transform='translate(8) rotate(90)'
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SortingBySvg;
