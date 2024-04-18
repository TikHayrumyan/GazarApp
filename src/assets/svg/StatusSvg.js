import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';
import {theme} from '../../constants';

const StatusSvg = ({status = false, title}) => (
  <Svg width={30} height={67} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <Circle
      cx={15}
      cy={15}
      r={14.4}
      stroke={theme.colors.primary}
      strokeWidth={1.2}
    />
    <Circle
      cx={15}
      cy={15}
      r={7.4}
      fill={status ? theme.colors.primary : 'transparent'}
      stroke={'transparent'}
      strokeWidth={1.2}
    />
    <Circle
      cx={15.5}
      cy={37.5}
      r={1.5}
      fill={title === 'Receiving' ? 'transparent' : theme.colors.purple}
    />
    <Circle
      cx={15.5}
      cy={44.5}
      r={1.5}
      fill={title === 'Receiving' ? 'transparent' : theme.colors.purple}
    />
    <Circle
      cx={15.5}
      cy={51.5}
      r={1.5}
      fill={title === 'Receiving' ? 'transparent' : theme.colors.purple}
    />
    <Circle
      cx={15.5}
      cy={58.5}
      r={1.5}
      fill={title === 'Receiving' ? 'transparent' : theme.colors.purple}
    />
    <Circle
      cx={15.5}
      cy={65.5}
      r={1.5}
      fill={title === 'Receiving' ? 'transparent' : theme.colors.purple}
    />
  </Svg>
);

export default StatusSvg;
