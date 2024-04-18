import {TouchableOpacity} from 'react-native';
import React from 'react';

type Props = {
  plus?: boolean;
  minus?: boolean;
  onPress: () => void;
  containerStyle?: object;
};
import {svg} from '../../assets/svg';

const OrderItemBtn: React.FC<Props> = ({
  onPress,
  plus,
  minus,
  containerStyle,
}): JSX.Element => {
  const {PlusSvg, MinusSvg} = svg;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: 3,
        width:"10%",
        height:"80%"
        
        // textAlign:"center"
      }}
    >
      {plus && <PlusSvg />}
      {minus && <MinusSvg />}
    </TouchableOpacity>
  );
};

export default OrderItemBtn;
