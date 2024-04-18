import {View, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../../constants';
import {components} from '../../../components';
import { useTranslation } from 'react-i18next';

type Props = {item: any,id:any};

const _v1: React.FC<Props> = ({item,id}): JSX.Element => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('camel');
  const [SingleProduct, setSingleProduct] = useState<any>();
  const {t,i18n} = useTranslation()
  const GetSingleProduct = async () => {

    try {
      const response = await fetch(
        `https://gazar.am/api/products?product=${id ? id : item.id}&lan=${(i18n.language).toLocaleUpperCase()}`,
      );
      const res = await response.json();
      if (res) {
        setSingleProduct(res)
        
      }
    } catch (error) {
      console.error(error);
    }
  }
  const renderCarousel = () => {
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
  };

  const renderNameWithRating = () => {
    return <components.ProductName item={item} SingleProduct={SingleProduct} version={2} />;
  };

  const renderPriceWithQuantity = () => {
    
    return (
      <>
         <components.ProductPrice
          item={item}
          version={2}
          styleText={{color: theme.colors.black}}
        />
      </>
    );
  };

  const [DataCategory, setDataCategory] = useState<any>();

  const getCategory = async () => {
    try {
      const response = await fetch(`https://gazar.am/api/category?lan=${(i18n.language).toLocaleUpperCase()}`);
      const res = await response.json();

      if (res) {
        setDataCategory(res);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCategory();
    GetSingleProduct()
  }, []);
 
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

  const renderRelated = () => {
    // const bestSellers = productDatas?.filter(
    //   (item: ProductType) => item.is_bestseller,
    // );
    // const slice = bestSellers?.slice(0, 5);

    if (item) {
      // return (
      //   <View style={{marginBottom: 50}}>
      //     <components.BlockHeading
      //       styleContent={{color: theme.colors.black}}
      //       title='Best Sellers'
      //       containerStyle={{paddingHorizontal: 20}}
      //       onPress={() => {
      //         navigation.navigate('Shop', {
      //           products: item,
      //           title: 'Best Sellers',
      //         });
      //       }}
      //     />
      //     { (
      //       <ScrollView
      //         horizontal={true}
      //         showsHorizontalScrollIndicator={false}
      //         contentContainerStyle={{paddingLeft: 20}}
      //         decelerationRate={0}
      //       >
      //         {item?.map((item: any, index: number, array: any) => {
      //           const lastItem = index === array.length - 1;
      //           return (
      //             <components.ProductCard
      //               key={index}
      //               item={item}
      //               version={1}
      //               lastItem={lastItem}
      //             />
      //           );
      //         })}
      //       </ScrollView>
      //     )}
      //   </View>
      // );
    }
  };
  return (
    <components.SmartView>
      {renderCarousel()}
      <View style={{marginTop: 20}}>{SingleProduct && renderNameWithRating()}</View>
      {item && renderPriceWithQuantity()}
      {DataCategory && renderCategories()}
    </components.SmartView>
  );
};

export default _v1;
