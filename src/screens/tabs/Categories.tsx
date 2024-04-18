import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {components} from '../../components';
import {listCategories, categories} from '../../constants/constants';
import {theme} from '../../constants';
import {useAppSelector} from '../../hooks';
import {CategoryType} from '../../types';

const Categories: React.FC = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState(listCategories[1]);
  const searchText = useAppSelector((state) => state.product?.searchText);

  const handleSearch = (data: any[]) => {
    if (searchText?.trim() !== '' && searchText !== undefined) {
      const result = data.filter((item) =>
        item?.title?.toLowerCase()?.includes(searchText?.toLowerCase()),
      );
      return result;
    }
    return data;
  };

  const renderCategories_1 = () => {
    return (
      <View style={{height: 60}}>
        <ScrollView
          contentContainerStyle={{paddingLeft: 20}}
          style={{flexGrow: 0, marginVertical: 12}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
        >
          {listCategories.map((item, index, array) => {
            const lastElement = index === array.length - 1;
            return (
              <components.CategoryItem
                key={index}
                item={item}
                version={1}
                lastElement={lastElement}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                index={index}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const renderCategories_2 = () => {
    const newCategories = categories?.filter((item) => {
      return item?.listcateforyId === selectedCategory?.id;
    });
    const result = handleSearch(newCategories);

    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingLeft: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          paddingBottom: 80,
        }}
      >
        {/* {result.map(
          (
            item: CategoryType,
            index: React.Key | null | undefined,
            array: string | any[],
          ) => {
            const lastElement = index === array.length - 1;
            return (
              <components.CategoryItem
                key={index}
                item={item}
                version={2}
                lastElement={lastElement}
              />
            );
          },
        )} */}
      </ScrollView>
    );
  };

  return (
    <components.SmartView
      containerStyle={{backgroundColor: theme.colors.imageBackground}}
    >
      {renderCategories_1()}
      {renderCategories_2()}
    </components.SmartView>
  );
};

export default Categories;
