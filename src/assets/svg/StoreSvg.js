import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const StoreSvg = ({bgColor = '#fff', iconColor = '#142535'}) => (
  <Svg xmlns='http://www.w3.org/2000/svg' width={50} height={58} fill='none'>
    <Circle cx={25} cy={33} r={25} fill={bgColor} />
    <Path
      fill={bgColor}
      d='M503.5 440H479V207.433c13.842-3.487 24-16.502 24-31.933v-104c0-8.547-6.953-15.5-15.5-15.5h-464C14.953 56 8 62.953 8 71.5v104c0 15.432 10.158 28.446 24 31.933V440H7.5a7.5 7.5 0 000 15h496a7.5 7.5 0 000-15zM488 71.5v104c0 9.383-6.999 17.384-15.602 17.834-4.595.235-8.939-1.36-12.254-4.505-3.317-3.148-5.145-7.4-5.145-11.971V71h32.5a.5.5 0 01.501.5zM71 71h33v105.858c0 9.098-7.402 16.5-16.5 16.5s-16.5-7.402-16.5-16.5V71zm48 0h33v105.858c0 9.098-7.402 16.5-16.5 16.5s-16.5-7.402-16.5-16.5V71zm48 0h33v105.858c0 9.098-7.402 16.5-16.5 16.5s-16.5-7.402-16.5-16.5V71zm48 0h33v105.858c0 9.098-7.402 16.5-16.5 16.5s-16.5-7.402-16.5-16.5V71zm48 0h33v105.858c0 9.098-7.402 16.5-16.5 16.5s-16.5-7.402-16.5-16.5V71zm48 0h33v105.858c0 9.098-7.402 16.5-16.5 16.5s-16.5-7.402-16.5-16.5V71zm48 0h33v105.858c0 9.098-7.402 16.5-16.5 16.5s-16.5-7.402-16.5-16.5V71zm48 0h33v105.858c0 9.098-7.402 16.5-16.5 16.5s-16.5-7.402-16.5-16.5V71zM23 175.5v-104a.5.5 0 01.5-.5H56v105.858c0 4.571-1.827 8.823-5.145 11.971-3.314 3.146-7.663 4.743-12.254 4.505C29.999 192.884 23 184.883 23 175.5zm24 31.962c5.266-1.279 10.128-3.907 14.181-7.753a31.034 31.034 0 002.326-2.462c5.782 6.793 14.393 11.11 23.993 11.11 9.604 0 18.218-4.32 24-11.119 5.782 6.799 14.396 11.119 24 11.119s18.218-4.32 24-11.119c5.782 6.799 14.396 11.119 24 11.119s18.218-4.32 24-11.119c5.782 6.799 14.396 11.119 24 11.119s18.218-4.32 24-11.119c5.782 6.799 14.396 11.119 24 11.119s18.218-4.32 24-11.119c5.782 6.799 14.396 11.119 24 11.119s18.218-4.32 24-11.119c5.782 6.799 14.396 11.119 24 11.119s18.218-4.32 24-11.119c5.782 6.799 14.396 11.119 24 11.119 9.6 0 18.21-4.317 23.993-11.11a31.218 31.218 0 002.326 2.462c4.054 3.847 8.914 6.482 14.181 7.761V440h-33V263.5c0-8.547-6.953-15.5-15.5-15.5h-96c-8.547 0-15.5 6.953-15.5 15.5V440H47V207.462zM416 440h-97V263.5a.5.5 0 01.5-.5h96a.5.5 0 01.5.5V440z'
    />
    <Path
      stroke={iconColor}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M343.5 336a7.5 7.5 0 00-7.5 7.5v16a7.5 7.5 0 0015 0v-16a7.5 7.5 0 00-7.5-7.5zM262.5 248h-174c-4.687 0-8.5 3.813-8.5 8.5v142c0 4.687 3.813 8.5 8.5 8.5h174c4.687 0 8.5-3.813 8.5-8.5v-142c0-4.687-3.813-8.5-8.5-8.5zM256 392H95V263h161v129z'
    />
  </Svg>
);

export default StoreSvg;