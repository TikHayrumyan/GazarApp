import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
  showModal: boolean;
};
const TabBar: React.FC<Props> = ({showModal, children}): JSX.Element => {
  const insets = useSafeAreaInsets();
  const homeIndicatorHeight = insets.bottom;
  const paddingTabVertical = 20;

  const homeIndicatorSettings = () => {
    if (homeIndicatorHeight !== 0) {
      return homeIndicatorHeight;
    }
    if (homeIndicatorHeight === 0) {
      return paddingTabVertical;
    }
  };

  return (
    <LinearGradient
      colors={['#fff', '#fff']}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: homeIndicatorSettings(),
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        position: 'absolute',
        bottom: 0,
        opacity: showModal === true ? 0.5 : 1,
        width: '100%',
      }}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
    >
      {children}
    </LinearGradient>
  );
};

export default TabBar;
