import React from 'react';
import {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {components} from '../../../components';
import {categories} from '../../../constants/constants';
import {useAppNavigation} from '../../../hooks';
import {BannerType, ProductType} from '../../../types';
import {theme} from '../../../constants';
import {setBanners} from '../../../store/slices/bannerSlice';
import {setCarousels} from '../../../store/slices/carouselSlice';
import {setProducts} from '../../../store/slices/productSlice';

import {
  bannersData,
  // carouselData,
  productsData,
} from '../../../constants/constants';

const _v2 = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const banners = useAppSelector((state) => state.banner.banners);

  useEffect(() => {
    dispatch(setBanners(bannersData));
    // dispatch(setCarousels(carouselData));
    dispatch(setProducts(productsData));
  }, []);

  const renderBanner = (version: number) => {
    const banner = banners[version - 1];
    return (
      <components.BannerItem version={version} banner={banner as BannerType} />
    );
  };

  const renderFeatured = () => {
    const products = productsData;
    const featured = products?.filter((item: any) => item.is_featured);
    const slice = featured?.slice(0, 5);

    return (
      <View style={{marginBottom: 50}}>
        <components.BlockHeading
          styleContent={{color: theme.colors.black}}
          title='Featured Products'
          containerStyle={{paddingHorizontal: 20}}
          onPress={() =>
            navigation.navigate('Shop', {
              products: featured,
              title: 'Featured Products',
            })
          }
        />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: 20}}
          decelerationRate={0}
        >
          {slice?.map(
            (item: any, index: number, array: ProductType[]) => {
              const lastItem = index === array?.length - 1;
              return (
                <components.ProductCard
                  key={index}
                  item={item}
                  version={2}
                  styleText={{
                    color: theme.colors.black,
                    BroadcastColor: theme.colors.black,
                  }}
                  lastItem={lastItem}
                />
              );
            },
          )}
        </ScrollView>
      </View>
    );
  };

  const renderTopCategories = () => {
    const topCategories = categories?.filter((item) => item?.isTopCategory);
    const sliceTopCategories = topCategories.slice(0, 6);
    return (
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 50,
        }}
      >
        <components.BlockHeading
          styleContent={{color: theme.colors.black}}
          title='Top categories'
          onPress={() => {
            navigation.navigate('TopCategories');
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {sliceTopCategories.map((item, index) => {
            return (
              <components.CategoryItem key={index} item={item} version={4} index={index}/>
            );
          })}
        </View>
      </View>
    );
  };

  const renderBestSellers = () => {
    const products = productsData;

    const bestSellers = products?.filter(
      (item: any) => item.is_bestseller,
    );

    const slice = bestSellers?.slice(0, 3);

    return (
      <View
        style={{
          marginBottom: 50,
          marginLeft: 20,
        }}
      >
        <components.BlockHeading
          styleContent={{color: theme.colors.black}}
          title='Best Sellers'
          containerStyle={{
            paddingRight: 20,
          }}
          onPress={() => {
            navigation.navigate('Shop', {
              products: bestSellers,
              title: 'Best Sellers',
            });
          }}
        />
        {slice?.map(
          (item: any, index: number, array: ProductType[]) => {
            const lastItem = index === array?.length - 1;
            return (
              <components.ProductCard
                key={index}
                item={item}
                version={3}
                lastItem={lastItem}
              />
            );
          },
        )}
      </View>
    );
  };

  const renderSale = () => {
    const products = productsData;
    const featured = products?.filter((item: any) => item.is_sale);
    const slice = featured?.slice(0, 5);

    return (
      <View style={{marginBottom: 60}}>
        <components.BlockHeading
          styleContent={{color: theme.colors.primary}}
          title='Flash Sale'
          containerStyle={{paddingHorizontal: 20}}
          onPress={() =>
            navigation.navigate('Shop', {
              products: featured,
              title: 'Flash Sale',
            })
          }
        />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: 20}}
          decelerationRate={0}
        >
          {slice?.map(
            (item: any, index: number, array: ProductType[]) => {
              const lastItem = index === array?.length - 1;
              return (
                <components.ProductCard
                  key={index}
                  item={item}
                  version={2}
                  styleText={{color: theme.colors.black}}
                  lastItem={lastItem}
                />
              );
            },
          )}
        </ScrollView>
      </View>
    );
  };

  return (
    <components.SmartView>
      <View style={{backgroundColor: theme.colors.imageBackground}}>
        {renderBanner(2)}
        {renderFeatured()}
        {renderTopCategories()}
        {renderBestSellers()}
      </View>
      {renderBanner(3)}
      {renderSale()}
    </components.SmartView>
  );
};

export default _v2;
