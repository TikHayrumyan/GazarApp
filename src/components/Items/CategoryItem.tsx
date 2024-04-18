import React from 'react';
import {Text, TouchableOpacity, ImageBackground} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';

import {text} from '../../text';
import {theme} from '../../constants';
import {CategoryType} from '../../types';
import {useAppNavigation} from '../../hooks';
import QuantityBadge from '../badges/QuantityBadge';
import {productsData} from '../../constants/constants';
import { useTranslation } from 'react-i18next';

type Props = {
  item: any;
  version: number;
  lastElement?: boolean;
  selectedCategory?: any;
  setSelectedCategory?: any;
  index: number;
  id?:any

};

const CategoryItem: React.FC<Props> = ({
  item,
  version,
  lastElement,
  selectedCategory,
  setSelectedCategory,
  index,
}): JSX.Element | null => {
  const navigation = useAppNavigation();
  const {t,i18n} = useTranslation()
  // 63 x 32
  
  if (version === 1) {
    const marginRight = lastElement ? 20 : 10;

    return (
      <TouchableOpacity
        style={{
          paddingVertical: 6,
          paddingHorizontal: 18,
          borderWidth: 1,
          borderRadius: 3,
          marginRight: marginRight,
          backgroundColor:
            selectedCategory?.id === item.id
              ? theme.colors.gazarGreenColor
              : theme.colors.opacityBlue,
          borderColor:
            selectedCategory?.id === item.id
              ? theme.colors.gazarGreenColor
              : theme.colors.textColor,
        }}
        onPress={() => {
          if (setSelectedCategory) {
        
            setSelectedCategory(item);
          }
        }}
      >
        <Text
          style={{
            color:
              selectedCategory?.id === item.id
                ? theme.colors.white
                : theme.colors.textColor,
            // textTransform: 'uppercase',
            lineHeight: 12 * 1.7,
            fontSize: 16,
            // ...theme.fonts.DMSans_700Bold,
          }}
        >
          {i18n.language == "am" ? item.gzCategoryDetails[2].name : i18n.language == "ru" ? item.gzCategoryDetails[1].name : item.gzCategoryDetails[0].name}
          
        </Text>
      </TouchableOpacity>
    );
  }

  // 160 x 160
  if (version === 2) {
    const blockWidth = responsiveWidth(100) / 2 - 30;
    const blockHeight = responsiveWidth(100) / 2 - 30;

    const imageBgStyle = {
      borderWidth: 1,
      width: '100%',
      height: 120,
      borderRadius: 14,
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.lightBlue,
      paddingTop: 5,
    };

    const textStyles = {
      // ...theme.fonts.DMSans_400Regular,
      color: theme.colors.black,
      lineHeight: 25 * 1.5,
      alignSelf: 'center',
    };

    return (
      <TouchableOpacity
        style={{
          width: blockWidth,
          height: blockHeight,
          marginBottom: 14,
          backgroundColor: theme.colors.lightBlue,
          borderRadius: 16,
          borderColor: theme.colors.lightBlue,
          borderWidth: 1,
        }}
        onPress={() => {
          navigation.navigate('Shop', {
            title: item.title,
            products: productsData.filter(
              (product: any) => product?.categoryId === item?.id,
            ),
          });
        }}
      >
        <ImageBackground
          source={item.image}
          imageStyle={{borderRadius: 14}}
          resizeMode='cover'
        >
          <QuantityBadge quantity={item.quantity as number} version={2} />
        </ImageBackground>
        <text.T14 numberOfLines={1} style={textStyles}>
          {item.title}
        </text.T14>
      </TouchableOpacity>
    );
  }

  // 90 x 90
  if (version === 3) {
    const SelectCategoryProduct = (name: any) => {
      let arr = Object.entries(item).flat()
      
      navigation.navigate('Shop', {
        title: name,
        products: arr as any,
      });
   
    };
    
    if (item && item.gzCategoryDetails) {
      return item?.gzCategoryDetails?.map((item: any) => {
        if (item.lan == (i18n.language).toLocaleUpperCase()) {
          return (
            <TouchableOpacity
              style={{
                width: 150,
                height: 160,
                margin: '5%',
                marginBottom: 10,
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',
              }}
              onPress={() => SelectCategoryProduct(item.name)}
            >
              <ImageBackground
                source={{uri: `${item?.imageLink}`}}
                imageStyle={{
                  backgroundColor: '#f2fce4',
                  height: 110,
                  width: 'auto',
                  marginTop: 40,
                }}
                resizeMode='contain'
              ></ImageBackground>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  margin: 15,
                  color: theme.colors.gazarMainText,
                }}
              >
                {item?.name}
              </Text>
            </TouchableOpacity>
          );
        }
      });
    } else {
      return null;
    }
  }

  // 102 x 102
  if (version === 4) {
    // const marginRight = lastElement ? 20 : 14;

    return (
      <TouchableOpacity
        style={{
          width: '100%',
          height: 160,
          display: 'flex',
          flexWrap: 'wrap',
          alignSelf: 'flex-start',
        }}
        onPress={() =>
          navigation.navigate('Shop', {
            title: item.name,
            products: item,
          })
        }
      >
        <ImageBackground
          source={{uri: `${item.imageLink}`}}
          // style={imageBgStyle}
          imageStyle={{
            // ...radiusStyles,
            backgroundColor: '#f2fce4',
            // borderRadius: 4,
            height: 140,
            width: '100%',
            // margin:10
            marginTop: 10,
          }}
          resizeMode='contain'
        >
          {/* <QuantityBadge quantity={item.quantity as number} version={1} /> */}
        </ImageBackground>
        <Text
          style={{
            textAlign: 'center',
            margin: 10,
            color: theme.colors.gazarMainText,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }

  return null;
};

export default CategoryItem;
