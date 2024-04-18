import React, {useEffect, useState} from 'react';
import {View, ScrollView, FlatList} from 'react-native';
import {components} from '../../../components';
import {theme} from '../../../constants';
import {useAppDispatch, useAppNavigation, useAppSelector} from '../../../hooks';
import {setBanners} from '../../../store/slices/bannerSlice';
// import {setCarousels} from '../../../store/slices/carouselSlice';
import {setProducts} from '../../../store/slices/productSlice';
import {
  bannersData,
  // carouselData,
  productsData,
} from '../../../constants/constants';
import { useTranslation } from 'react-i18next';

const _v1: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();
  const {t,i18n} = useTranslation()
  
  const dispatch = useAppDispatch();
  const banners = useAppSelector((state) => state.banner.banners);
  const carousels = useAppSelector((state) => state.carousel.carousels);
  const products = useAppSelector((state) => state.product.products);
  const [dataSlider, setDataSlider] = useState<any>([]);
  const [DataCategory, setDataCategory] = useState<any>();
  const [DataBestSeller, setDataBestSeller] = useState<any>();
  const [DataBanner, setDataBanner] = useState<any>();
  const [DataSalesProduct, setDataSalesProduct] = useState<any>();
  useEffect(() => {
    dispatch(setBanners(bannersData)); // Assuming bannersData is set elsewhere
    dispatch(setProducts(productsData)); // Assuming productsData is set elsewhere
  }, [bannersData, productsData]);
  
  const fetchData = async () => {
    try {
      const [
        sliderResponse,
        categoryResponse,
        bestSellerResponse,
        bannerResponse,
        salesProductResponse,
      ] = await Promise.all([
        fetch(`https://gazar.am/api/sliders?type=HOME&lan=${(i18n.language).toLocaleUpperCase()}`),
        fetch(`https://gazar.am/api/category?&lan=${(i18n.language).toLocaleUpperCase()}`),
        fetch(`https://gazar.am/api/products?popular=true&lan=${(i18n.language).toLocaleUpperCase()}`),
        fetch(`https://gazar.am/api/sliders?type=SECOND&lan=${(i18n.language).toLocaleUpperCase()}`),
        fetch(`https://gazar.am/api/products?discount=true&lan=${(i18n.language).toLocaleUpperCase()}`),
      ]);

      const sliderData = await sliderResponse.json();
      const categoryData = await categoryResponse.json();
      const bestSellerData = await bestSellerResponse.json();
      const bannerData = await bannerResponse.json();
      const salesProductData = await salesProductResponse.json();

      setDataSlider(sliderData);
      setDataCategory(categoryData);
      setDataBestSeller(bestSellerData);
      setDataBanner(bannerData);
      setDataSalesProduct(salesProductData);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderCarousel = () => {
    const carousel = dataSlider ?? undefined;
    if (dataSlider) {
      return (
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          bounces={true}
          alwaysBounceHorizontal={true}
          style={{flex: 1}}
        >
          {carousel?.map((item: any, index: any, array: any) => {
            return (
              <components.CarouselItem
                key={index}
                item={item.gzSliderDetails[0]}
                array={array}
                index={index}
              />
            );
          })}
        </ScrollView>
      );
    }
  };

  
  const renderCategories = () => {
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
  };

  const renderBestSellers = () => {
    const productData = DataBestSeller ?? undefined;
    
    if (DataBestSeller) {
      return (
        <View style={{marginBottom: 50}}>
          <components.BlockHeading
            styleContent={{color: theme.colors.black}}
            title={t("PopularProducts")}
            containerStyle={{paddingHorizontal: 20}}
            onPress={() => {
              navigation.navigate('Shop', {
                products: productData,
                title: t("PopularProducts"),
              });
            }}
          />
          {
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingLeft: 20}}
              decelerationRate={0}
            >
              {productData?.map((item: any, index: number, array: any) => {
                const lastItem = index === array?.length - 1;
         
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
          }
        </View>
      );
    }
  };

  const renderBanner = () => {
    const banner = DataBanner ?? undefined;

    if (banner) {
      return (
        <View style={{marginBottom: 50}}>
          <components.BannerItem version={1} banner={banner[0] as any} />
        </View>
      );
    }
  };

  const renderFeatured = () => {
   
    if (DataSalesProduct && DataSalesProduct?.length) {
      return (
        <View style={{marginBottom: 50}}>
          <components.BlockHeading
            styleContent={{color: theme.colors.black}}
            title='Featured Products'
            containerStyle={{paddingHorizontal: 20}}
            onPress={() =>
              navigation.navigate('Shop', {
                products: DataSalesProduct,
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
            {DataSalesProduct?.map((item: any, index: number, array: any) => {
            
              const lastItem = index === array.length - 1;
              return (
                <components.ProductCard
                  key={index}
                  item={item}
                  version={2}
                  styleText={{color: theme.colors.black}}
                  lastItem={lastItem}
                />
              );
            })}
          </ScrollView>
        </View>
      );
    }
  };

  return (
    <components.SmartView>
      <View style={{backgroundColor: theme.colors.imageBackground}}>
        {dataSlider && renderCarousel()}
        {DataCategory && renderCategories()}
        {DataBestSeller && renderBestSellers()}
        {DataBanner && renderBanner()}
      </View>
      <View style={{backgroundColor: theme.colors.imageBackground}}>
        {renderFeatured()}
      </View>
    </components.SmartView>
  );
};

export default _v1;
