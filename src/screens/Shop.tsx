import React, {useEffect, useState, useCallback} from 'react';
import Modal from 'react-native-modal';
import {View, FlatList, TouchableOpacity, ScrollView} from 'react-native';

import {text} from '../text';
import {theme, sortingBy} from '../constants';
import {svg} from '../assets/svg';
import {components} from '../components';

import {useTranslation} from 'react-i18next';

enum TypeSort {
  BestMatch = 1,
  PriceIncrease = 2,
  PriceDecrease = 3,
  Newest = 4,
  Rating = 5,
  MostPopular = 6,
}

const Shop = ({
  route,
  navigation,
}: {
  route: any | undefined;
  navigation: any | undefined;
}): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [sort, setSort] = useState(sortingBy[0].id);
  const [isLoading, setLoading] = useState(true);
  const [GetAllProducts, setGetAllProducts] = useState([]);
  const [DataCategory, setDataCategory] = useState<any>();
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const {t, i18n} = useTranslation();
  let id = route?.params?.products?.filter((item: any) => {
    if (typeof item == 'number') {
      return item;
    } else {
      return item.id;
    }
  });

  
  const getCategory = async () => {
    try {
      const response = await fetch(
        `https://gazar.am/api/category?lan=${i18n.language.toLocaleUpperCase()}`,
      );
      const res = await response.json();
      if (res) {
        setDataCategory(res);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const GetProductData = async () => {
    // console.log(id);
    
    try {
      const response = await fetch(
        `https://gazar.am/api/products?category=${
          selectedCategory?.id ? selectedCategory?.id : 0
        }&lan=${i18n.language.toLocaleUpperCase()}`,
      );
      const res = await response.json();
      if (res) {
        setGetAllProducts(
          res.map((item: any) => ({
            ...item,
            quantity: 1,
          })),
        );

        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
 
  useEffect(() => {
    GetProductData();
    getCategory();
    
  }, [selectedCategory,route?.params]);
  
  useEffect(() => {
    sortProducts(sort);
  }, [sort]);

  const sortProducts = (type: TypeSort) => {
    var newListProducts: any = [...GetAllProducts];

    switch (type) {
      case TypeSort.PriceIncrease:
        newListProducts.sort(function (a: any, b: any) {
          return a.price - b.price;
        });
        break;
      case TypeSort.PriceDecrease:
        newListProducts.sort(function (a: any, b: any) {
          return b.price - a.price;
        });
        break;

      default:
        break;
    }
    setGetAllProducts(newListProducts);
  };

  const increment = useCallback(
    (index: number) => {
      let temp: any = [...GetAllProducts];
      if (temp[index].maxLimit > temp[index].quantity) {
        temp[index].quantity++;
        setGetAllProducts(temp);
      }
    },
    [GetAllProducts],
  );

  const decrement = useCallback(
    (index: number) => {
      let temp: any = [...GetAllProducts];
      if (temp[index].minLimit < temp[index].quantity) {
        temp[index].quantity--;
        setGetAllProducts(temp);
      }
    },
    [GetAllProducts],
  );

  const renderHeader = () => {
    return (
      <components.Header
        title={route?.params?.title ? route?.params?.title : 'Shop'}
        border={true}
        goBack={true}
        basket={true}
      />
    );
  };
  
  const renderCategories_1 = () => {
    if (DataCategory) {
      return (
        <View style={{height: 60, marginTop: 10}}>
          <ScrollView
            contentContainerStyle={{paddingLeft: 20}}
            style={{flexGrow: 0, marginVertical: 12}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
          >
            {DataCategory.map((item: any, index: any, array: any) => {
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
                  title={route?.params?.title}
                />
              );
            })}
          </ScrollView>
        </View>
      );
    }
  };

  const renderProducts = () => {
    // let newListProducts = sortProducts(sort, GetAllProducts as any);
    return (
      <FlatList
        data={GetAllProducts}
        renderItem={({item, index}) => (
          <components.ShopItem
            item={item}
            index={index}
            increment={increment}
            decrement={decrement}
          />
        )}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        numColumns={2}
        horizontal={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
      />
    );
  };

  const renderPopup = () => {
    return (
      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        style={{margin: 0}}
        animationIn='zoomIn'
        animationOut='zoomOut'
      >
        <View
          style={{
            backgroundColor: theme.colors.white,
            marginHorizontal: 40,
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 6,
          }}
        >
          {sortingBy.map((item, index, array) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  height: 49,
                  borderBottomWidth: array.length - 1 === index ? 0 : 1,
                  marginBottom: 4,
                  borderBottomColor: theme.colors.lightBlue,
                  backgroundColor: theme.colors.imageBackground,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingRight: 20,
                }}
                onPress={() => {
                  setSort(item.id);
                  setShowModal(false);
                }}
              >
                <text.T14
                  style={{
                    color: theme.colors.mainColor,
                    paddingLeft: 20,
                  }}
                >
                  {item.title}
                </text.T14>
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderWidth: 1,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: theme.colors.primary,
                  }}
                >
                  <View
                    style={{
                      backgroundColor:
                        sort === item.id
                          ? theme.colors.primary
                          : theme.colors.white,
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                    }}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    );
  };

  return (
    <components.SmartView
      containerStyle={{backgroundColor: theme.colors.imageBackground}}
    >
      {id ? id[0] && renderHeader() : null}
      {route?.params?.title == t('Shop') && renderHeader()}
      {renderCategories_1()}
      {GetAllProducts && renderProducts()}
      {renderPopup()}
    </components.SmartView>
  );
};

export default Shop;
