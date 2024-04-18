import React from 'react';
import {ScrollView, View} from 'react-native';
import {components} from '../components';
import {theme} from '../constants';
import {categories} from '../constants/constants';

const TopCategories: React.FC = (): JSX.Element => {
  const renderHeader = () => {
    return (
      <components.Header
        title={'Top Categories'}
        border={true}
        goBack={true}
        basket={true}
      />
    );
  };
  const renderCategories_2 = () => {
    const newCategories = categories?.filter((item) => {
      return item?.isTopCategory;
    });
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingLeft: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        {newCategories.map((item, index, array) => {
          const lastElement = index === array.length - 1;
          return (
            <components.CategoryItem
              key={index}
              item={item}
              version={2}
              lastElement={lastElement}
            />
          );
        })}
      </ScrollView>
    );
  };

  return (
    <components.SmartView
      containerStyle={{backgroundColor: theme.colors.purple}}
    >
      <View style={{marginBottom: 10}}>{renderHeader()}</View>
      {renderCategories_2()}
    </components.SmartView>
  );
};

export default TopCategories;
