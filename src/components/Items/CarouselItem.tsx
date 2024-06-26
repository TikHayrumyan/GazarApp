import React from 'react';
import {View, ImageBackground,Text} from 'react-native';
import {text} from '../../text';
import {theme} from '../../constants';
// import ShopNow from '../buttons/ShopNow';
// import {CarouselType} from '../../types';
// import {useAppNavigation} from '../../hooks';
// import {productsData} from '../../constants/constants';
// import {useDispatch} from 'react-redux';
// import {resetCart} from '../../store/slices/cartSlice';

type Props = {item: any; array:any; index: number,id?:any};

const CarouselItem: React.FC<Props> = ({item, array, index}): JSX.Element => {
  // const navigation = useAppNavigation();
  // const dispatch = useDispatch();
  // const dotStyle = {
  //   width: 10,
  //   height: 10,
  //   marginHorizontal: 3,
  //   borderRadius: 5,
  // };

  return (
    <ImageBackground
      source={{uri: `${item.link}`}}
      style={{
        width: theme.sizes.width,
        height: "auto",
        paddingHorizontal: 20,
        marginBottom: 20,
        justifyContent: 'center',
        // aspectRatio: 0.75,
      }}
      resizeMode='cover'
    >
      <View >
        <Text style={{fontSize:20,color: theme.colors.gazarMainText,width:260, marginTop: 20 }}>
          {item.title}
        </Text>
        {item.description && <text.H1  style={{fontSize:13,height:"auto",color: theme.colors.gazarMainText}}>
          {item.description}
        </text.H1>}
      </View>
      {/* <ShopNow
        containerStyle={{marginBottom: 50, color: theme.colors.white}}
        onPress={() => {
          dispatch(resetCart());
          navigation.navigate('Shop', {
            title: 'Shop',
            products: productsData,
          });
        }}
      /> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        {/* {array.map((_:any, current:any) => {
          const backgroundColor =
            current === index ? theme.colors.primary : theme.colors.white;
          return (
            <View
              key={current}
              style={{
                ...dotStyle,
                backgroundColor: backgroundColor,
              }}
            />
          );
        })} */}
      </View>
    </ImageBackground>
  );
};

export default CarouselItem;
