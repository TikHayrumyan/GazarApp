import { View, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { theme } from '../../../constants';
import { components } from '../../../components';
import { useTranslation } from 'react-i18next';

type Props = { item: any; id: any };

const _v1: React.FC<Props> = ({ item, id }): JSX.Element => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('camel');
  const [SingleProduct, setSingleProduct] = useState<any>();
  const [DataCategory, setDataCategory] = useState<any>();
  const { t, i18n } = useTranslation();

  const GetSingleProduct = useCallback(async () => {
    try {
      const response = await fetch(
        `https://gazar.am/api/products?product=${id ? id : item.id}&lan=${i18n.language.toLocaleUpperCase()}`
      );
      const res = await response.json();
      if (res) {
        setSingleProduct(res);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, item.id, i18n.language]);

  const getCategory = useCallback(async () => {
    try {
      const response = await fetch(
        `https://gazar.am/api/category?lan=${i18n.language.toLocaleUpperCase()}`
      );
      const res = await response.json();
      if (res) {
        setDataCategory(res);
      }
    } catch (error) {
      console.error(error);
    }
  }, [i18n.language]);

  useEffect(() => {
    getCategory();
    GetSingleProduct();
  }, [getCategory, GetSingleProduct]);

  const renderCarousel = useCallback(() => {
    return (
      <components.ProductCarousel
        item={item}
        version={1}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
    );
  }, [item, selectedColor, selectedSize]);

  const renderNameWithRating = useCallback(() => {
    return <components.ProductName item={item} SingleProduct={SingleProduct} version={2} />;
  }, [item, SingleProduct]);

  const renderPriceWithQuantity = useCallback(() => {
    return (
      <components.ProductPrice
        item={item}
        version={2}
        styleText={{ color: theme.colors.black }}
      />
    );
  }, [item]);

  const renderCategories = useCallback(() => {
    if (DataCategory) {
      return (
        <View>
          <FlatList
            data={DataCategory}
            renderItem={({ item, index }) => (
              <components.CategoryItem
                key={index as number}
                item={item as any}
                index={index}
                version={3}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={false}
            contentContainerStyle={{
              paddingLeft: 0,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
            style={{
              flexGrow: 0,
              marginBottom: 50,
            }}
            decelerationRate={0}
          />
        </View>
      );
    }
    return null;
  }, [DataCategory]);

  

  return (
    <components.SmartView>
      {renderCarousel()}
      <View style={{ marginTop: 20 }}>{SingleProduct && renderNameWithRating()}</View>
      {item && renderPriceWithQuantity()}
      {DataCategory && renderCategories()}
    </components.SmartView>
  );
};

export default _v1;
