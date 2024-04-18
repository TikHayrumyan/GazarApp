import React, {memo} from 'react';
import {TouchableOpacity, View, ImageBackground} from 'react-native';

import {text} from '../../text';
import InCart from '../buttons/InCart';
import {theme} from '../../constants';
import {ProductType} from '../../types';
import ProductPrice from './ProductPrice';
import ProductRating from './ProductRating';
import SaleBadge from '../badges/SaleBadge';
import {useAppNavigation} from '../../hooks';
import InWishlist from '../buttons/InWishlist';
import {color} from '../../utils';

type Props = {
  item: any;
  version: number;
  lastItem?: boolean;
  styleText?: object;
  id?: any
};

const ProductCard: React.FC<Props> = ({
  version,
  item,
  lastItem,
  styleText,
  id
}): JSX.Element | null => {
  const navigation = useAppNavigation();
  
  // 200 x 250
  if (version === 1) {
    return (
      <TouchableOpacity
        style={{
          width: 200,
          height: 'auto',
          marginRight: lastItem ? 20 : 14,
        }}
        onPress={() => navigation.navigate('Product',
         {
          item: {
            ...item,
            quantity: 1,
            id
          },
        })}
      >
        <ImageBackground
          source={{uri: `${item?.imageLink}`}}
          style={{
            marginBottom: 14,
            width: '100%',
            height: 200,
          }}
          imageStyle={{
            backgroundColor: theme.colors.imageBackground,
            borderRadius: 3,
          }}
          resizeMode='contain'
        >
         
          <SaleBadge
            item={item}
            version={1}
            styleText={{color: theme.colors.white}}
            containerStyle={{
              marginTop: 'auto',
              marginLeft: 14,
              marginRight: 14,
              marginBottom: 14,
              backgroundColor: theme.colors.primary,
            }}
          />
        </ImageBackground>
        <View style={{
          display:"flex",
          alignItems:"center",
          width:"100%"
        }}>
        {item?.gzProductDetails[0]?.name && (
          <text.T14
            style={{marginBottom: 3, color: theme.colors.mainColor}}
            numberOfLines={1}
          >
            {item?.gzProductDetails[0]?.name}
          </text.T14>
        )}
        {item?.price && (
          <ProductPrice
            item={item}
            version={1}
            styleText={{color: theme.colors.purple}}
          />
        )}

        </View>
      </TouchableOpacity>
    );
  }

  // 138 x 170
  if (version === 2) {
    return (
      <TouchableOpacity
        style={{
          width: 138,
          height: 'auto',
          marginRight: lastItem ? 20 : 14,
          backgroundColor: theme.colors.lightBlue,
          borderRadius: 10,
          padding: 5,
        }}
        onPress={() => navigation.navigate('Product', {item})}
      >
        <ImageBackground
          source={item.image}
          style={{
            width: '100%',
            height: 170,
            marginBottom: 14,
          }}
          imageStyle={{
            borderRadius: 10,
          }}
          resizeMode='cover'
        >
          <InWishlist
            containerStyle={{position: 'absolute', right: 0, padding: 14}}
            version={1}
            item={item}
          />
          <InCart
            item={item}
            containerStyle={{
              position: 'absolute',
              top: 'auto',
              bottom: 0,
              right: 0,
              let: 'auto',
              padding: 14,
            }}
          />
          <SaleBadge
            item={item}
            version={1}
            styleText={{color: theme.colors.white}}
            containerStyle={{
              marginTop: 'auto',
              marginBottom: 14,
              marginLeft: 14,
              marginRight: 14,
              backgroundColor: theme.colors.primary,
            }}
          />
        </ImageBackground>
        <text.T14 style={{marginBottom: 3, ...styleText}} numberOfLines={1}>
          {item.name}
        </text.T14>
        <ProductPrice item={item} version={1} styleText={styleText} />
      </TouchableOpacity>
    );
  }

  // 100 x 100
  if (version === 3) {
    const marginBottom = lastItem ? 0 : 10;

    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginBottom: marginBottom,
          backgroundColor: theme.colors.imageBackground,
          borderTopStartRadius: 5,
          borderBottomStartRadius: 5,
        }}
        onPress={() => navigation.navigate('Product', {item})}
      >
        <ImageBackground
          source={item.image}
          style={{width: 100, height: 100}}
          imageStyle={{
            backgroundColor: theme.colors.white,
            borderRadius: 3,
          }}
          resizeMode='cover'
        >
          <SaleBadge
            item={item}
            version={1}
            styleText={{color: theme.colors.white}}
            containerStyle={{
              marginTop: 'auto',
              marginBottom: 10,
              marginLeft: 10,
              marginRight: 10,
              backgroundColor: theme.colors.primary,
            }}
          />
        </ImageBackground>
        <View
          style={{
            flex: 1,
            paddingLeft: 14,
            paddingRight: 20,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            justifyContent: 'center',
            borderColor: theme.colors.lightBlue,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <text.T14 style={{marginBottom: 3}} numberOfLines={1}>
              {item.name}
            </text.T14>
            <InWishlist item={item} version={1} />
          </View>
          <ProductPrice
            item={item}
            containerStyle={{marginBottom: 11}}
            version={1}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <ProductRating
              item={item}
              version={1}
              colorIcon={theme.colors.starYellow}
            />
            <InCart item={item} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return null;
};

export default memo(ProductCard);
