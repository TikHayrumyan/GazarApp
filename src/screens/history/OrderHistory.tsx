import React from 'react';
import {ScrollView} from 'react-native';
import _v1 from './versions/_v1';
import _v2 from './versions/_v2';
import {components} from '../../components';
import {theme} from '../../constants';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const version: number = 1;

const OrderHistory: React.FC = (): JSX.Element => {
 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(data[1].productsOrder);
  
  const fetchData = async () => {
    const asyncUserId = await AsyncStorage.getItem('userDbId');
    
    if (asyncUserId) {
      // console.log(`https://gazar.am/api/orders?id=${JSON.parse(asyncUserId)}`);
      
      try {
        const response = await fetch(
          // `https://gazar.am/api/orders?id=${JSON.parse(asyncUserId)}`,
          `https://gazar.am/api/orders?id=clpigx6by00007z0v5mh1ikh9`,
          
        );
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);



  const renderHeader: () => JSX.Element = () => {
    return <components.Header goBack={true} title='Order history' />;
  };

  const renderContent: () => JSX.Element = () => {
    return (
      <ScrollView>
        {version === 1 && <_v1 data={data}/>}
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
