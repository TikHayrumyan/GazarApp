import {ScrollView} from 'react-native';
import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Reviews'>;

import {components} from '../components';
import {theme} from '../constants';

const Reviews: React.FC<Props> = ({route}): JSX.Element => {
  const {reviews} = route.params;

  const renderHeader = () => {
    return <components.Header goBack={true} title='Reviews' />;
  };

  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingLeft: 20,
          paddingTop: 25,
          paddingBottom: 20,
          backgroundColor: theme.colors.imageBackground,
        }}
      >
        {reviews.map((item, index, array) => {
          return (
            <components.ReviewItem
              item={item}
              key={index}
              array={array}
              index={index}
            />
          );
        })}
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

export default Reviews;
