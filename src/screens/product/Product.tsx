import React from 'react';
import {ScrollView} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import _v1 from './versions/_v1';
import _v2 from './versions/_v2';

import {components} from '../../components';
import type {RootStackParamList} from '../../types';
import {theme} from '../../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Product'>;

const version: number = 1;

const Product: React.FC<any> = ({route}): JSX.Element => {
  const {item,id} = route?.params;
    
  const renderHeader = () => {
    return (
      <components.Header
        goBack={true}
        border={true}
        basket={true}
        isHeaderProduct={true}
      />
    );
  };
 
  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
          backgroundColor: theme.colors.imageBackground,
        }}
        showsVerticalScrollIndicator={false}
      >
        {version === 1 && <_v1 item={item} id={id ? id : item.id}/>}
        {version === 2 && <_v2 item={item} />}
      </ScrollView>
    );
  };

  return (
    <components.SmartView>
      {renderHeader()}
      {renderContent()}
    </components.SmartView>
  );
};

export default Product;
