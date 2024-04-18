import React from 'react';
import {View, TouchableOpacity, ImageBackground} from 'react-native';
import {useAppNavigation} from '../../hooks';

import {theme} from '../../constants';
import {ProductType} from '../../types';
import {components} from '../../components';

type Props = {item: any; containerStyle?: object,id?:any};

const WishlistItem: React.FC<Props> = ({item, containerStyle}): JSX.Element => {
  const navigation = useAppNavigation();

  return (
    <View style={{...containerStyle, flexDirection: 'row'}}>
      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
        }}
        onPress={() => navigation.navigate('Product', {item})}
      >
        <ImageBackground
          source={item.image}
          style={{
            width: '100%',
            height: '100%',
          }}
          imageStyle={{
            // ...borderRadius(5, 0, 5, 0)
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            backgroundColor: theme.colors.lightBlue,
          }}
          resizeMode='cover'
        >
          <components.SaleBadge
            item={item}
            version={1}
            containerStyle={{
              margin: 10,
              marginTop: 'auto',
            }}
          />
        </ImageBackground>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          // ...border(1, 0, 1, 0, theme.colors.lightBlue),
          paddingTop: 14,
          paddingRight: 20,
          paddingBottom: 10,
          paddingLeft: 14,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <components.ProductName
            item={item}
            version={1}
            // style={{marginBottom: 3, color: theme.colors.mainColor}}
          />
          <components.InWishlist item={item} version={1} />
        </View>
        <components.ProductPrice
          item={item}
          version={1}
          containerStyle={{marginBottom: 'auto'}}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <components.ProductRating
            item={item}
            version={1}
            colorIcon={theme.colors.starYellow}
          />
          <components.InCart item={item} />
        </View>
      </View>
    </View>
  );
};

export default WishlistItem;
