import React, { useCallback, useEffect, useMemo } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { components } from '../../../components';
import { theme } from '../../../constants';
import { useAppDispatch, useAppNavigation, useAppSelector } from '../../../hooks';
import { setBanners } from '../../../store/slices/bannerSlice';
import { setProducts } from '../../../store/slices/productSlice';
import { bannersData, productsData } from '../../../constants/constants';
import { useTranslation } from 'react-i18next';
import useFetchData from '../../../fetchData/useFetchData';

const Home: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();
  const { t, i18n } = useTranslation();
  const language = useMemo(() => i18n.language.toLocaleUpperCase(), [i18n.language]);
  const { slider, category, bestSeller, banner, salesProduct } = useFetchData(language);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBanners(bannersData));
    dispatch(setProducts(productsData));
  }, [dispatch]);

  const renderCarousel = useCallback(() => {
    if (slider) {
      return (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces
          alwaysBounceHorizontal
          style={{ flex: 1 }}
        >
          {slider.map((item, index, array) => (
            <components.CarouselItem
              key={index}
              item={item.gzSliderDetails[0]}
              array={array}
              index={index}
            />
          ))}
        </ScrollView>
      );
    }
    return null;
  }, [slider]);

  const renderCategories = useCallback(() => {
    if (category) {
      return (
        <FlatList
          data={category}
          renderItem={({ item, index }) => (
            <components.CategoryItem
              key={index}
              item={item}
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
          style={{ flexGrow: 0, marginBottom: 50 }}
          decelerationRate={0}
        />
      );
    }
    return null;
  }, [category]);

  const renderBestSellers = useCallback(() => {
    console.log(bestSeller);
    
    if (bestSeller) {
      return (
        <View style={{ marginBottom: 50 }}>
          <components.BlockHeading
            styleContent={{ color: theme.colors.black }}
            title={t('PopularProducts')}
            containerStyle={{ paddingHorizontal: 20 }}
            onPress={() => {
              navigation.navigate('Shop', {
                products: bestSeller,
                title: t('PopularProducts'),
              });
            }}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20 }}
            decelerationRate={0}
          >
            {bestSeller.map((item, index, array) => {
              const lastItem = index === array.length - 1;
              return (
                <components.ProductCard
                  key={index}
                  item={item}
                  version={1}
                  lastItem={lastItem}
                  id={item.id}
                />
              );
            })}
          </ScrollView>
        </View>
      );
    }
    return null;
  }, [bestSeller, navigation, t]);

  const renderBanner = useCallback(() => {
    if (banner) {
      return (
        <View style={{ marginBottom: 50 }}>
          <components.BannerItem version={1} banner={banner[0]} />
        </View>
      );
    }
    return null;
  }, [banner]);

  const renderFeatured = useCallback(() => {
    if (salesProduct && salesProduct.length) {
      return (
        <View style={{ marginBottom: 50 }}>
          <components.BlockHeading
            styleContent={{ color: theme.colors.black }}
            title="Featured Products"
            containerStyle={{ paddingHorizontal: 20 }}
            onPress={() =>
              navigation.navigate('Shop', {
                products: salesProduct,
                title: 'Featured Products',
              })
            }
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20 }}
            decelerationRate={0}
          >
            {salesProduct.map((item, index, array) => {
              const lastItem = index === array.length - 1;
              return (
                <components.ProductCard
                  key={index}
                  item={item}
                  version={2}
                  styleText={{ color: theme.colors.black }}
                  lastItem={lastItem}
                />
              );
            })}
          </ScrollView>
        </View>
      );
    }
    return null;
  }, [salesProduct, navigation]);

  return (
    <components.SmartView>
      <View style={{ backgroundColor: theme.colors.imageBackground }}>
        {renderCarousel()}
        {renderCategories()}
        {renderBestSellers()}
        {renderBanner()}
      </View>
      <View style={{ backgroundColor: theme.colors.imageBackground }}>
        {renderFeatured()}
      </View>
    </components.SmartView>
  );
};

export default Home;
