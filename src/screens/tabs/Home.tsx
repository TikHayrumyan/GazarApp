import React from 'react';
import {ScrollView, View} from 'react-native';
import _v1 from './versions/_v1';
import _v2 from './versions/_v2';
import {theme} from '../../constants';

const version: number = 1;

const Home: React.FC = (): JSX.Element => {
  const renderHome_v1 = (): JSX.Element | null => {
    if (version === 1) {
      return <_v1 />;
    }

    return null;
  };

  const renderHome_v2 = (): JSX.Element | null => {
    if (version === 2) {
      return <_v2 />;
    }

    return null;
  };

  return (
    <View
      style={{
        backgroundColor: theme.colors.imageBackground,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 50,
        }}
      >
        {renderHome_v1()}
        {renderHome_v2()}
      </ScrollView>
    </View>
  );
};

export default Home;
