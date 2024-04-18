import React from 'react';
import {ScrollView} from 'react-native';
import _v1 from './versions/_v1';
import _v2 from './versions/_v2';
import {components} from '../../components';
import {theme} from '../../constants';

const version: number = 1;

const OrderHistory: React.FC = (): JSX.Element => {
  const renderHeader: () => JSX.Element = () => {
    return <components.Header goBack={true} title='Order history' />;
  };

  const renderContent: () => JSX.Element = () => {
    return (
      <ScrollView>
        {version === 1 && <_v1 />}
        {version === 2 && <_v2 />}
      </ScrollView>
    );
  };

  return (
    <components.SmartView
      containerStyle={{backgroundColor: theme.colors.imageBackground}}
    >
      {renderHeader()}
      {renderContent()}
    </components.SmartView>
  );
};

export default OrderHistory;
