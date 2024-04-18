import React from 'react';
import {View, ImageBackground} from 'react-native';
import {text} from '../../text';
import {theme} from '../../constants';
import ShopNow from '../buttons/ShopNow';
import {useAppNavigation} from '../../hooks';
import {BannerType} from '../../types/BannerType';
import {productsData} from '../../constants/constants';

type Props = {version: number; banner: any};

const BannerItem: React.FC<Props> = ({version, banner}): JSX.Element | null => {
  const navigation = useAppNavigation();

  if (version === 1) {
    return (
      <View>
        <ImageBackground
          source={{uri:`${banner?.gzSliderDetails[0].link}`}}
          style={{
            width: '100%',
            aspectRatio: 1.775,
          }}
          // imageStyle={{
          //   borderRightRadius: 5,
          //   borderLeftRadius: 5,
          //   backgroundColor: theme.colors.imageBackground,
          // }}
          resizeMode='cover'
        >
          <text.H2
            style={{color: theme.colors.gazarMainText, marginTop: 100, marginLeft: 20}}
          >
            {banner?.gzSliderDetails[0].title}
          </text.H2>
          {/* <text.H2
            style={{
              marginBottom: 20,
              color: theme.colors.white,
              paddingLeft: 20,
            }}
          >
            {banner?.title2}
          </text.H2> */}
          {/* <ShopNow
            onPress={() =>
              navigation.navigate('Shop', {
                title: 'Shop',
                products: productsData,
              })
            }
            containerStyle={{
              borderColor: theme.colors.black,
              marginLeft: 20,
            }}
            // textContainerStyle={{
            //   color: theme.colors.black,
            // }}
          /> */}
        </ImageBackground>
      </View>
    );
  }

  // if (version === 2) {
  //   return (
  //     <View
  //       style={{
  //         marginBottom: 50,
  //       }}
  //     >
  //       <ImageBackground
  //         source={banner?.image}
  //         style={{
  //           width: '100%',
  //           aspectRatio: 1.42,
  //           paddingHorizontal: 20,
  //           justifyContent: 'center',
  //         }}
  //         // imageStyle={{
  //         //   borderRightRadius: 5,
  //         //   borderLeftRadius: 5,
  //         //   backgroundColor: theme.colors.imageBackground,
  //         // }}
  //         resizeMode='cover'
  //       >
  //         <text.H2 style={{color: theme.colors.white}}>
  //           {banner?.title1}
  //         </text.H2>
  //         <text.H2 style={{marginBottom: 20, color: theme.colors.white}}>
  //           {banner?.title2}
  //         </text.H2>
  //         <ShopNow
  //           onPress={() =>
  //             navigation.navigate('Shop', {
  //               title: 'Shop',
  //               products: productsData,
  //             })
  //           }
  //         />
  //       </ImageBackground>
  //     </View>
  //   );
  // }

  // if (version === 3) {
  //   return (
  //     <View
  //       style={{
  //         margin: 10,
  //       }}
  //     >
  //       <ImageBackground
  //         source={banner?.image}
  //         style={{
  //           width: '100%',
  //           aspectRatio: 1.775,
  //           paddingTop: 30,
  //           paddingRight: 20,
  //           paddingLeft: 20,
  //         }}
  //         imageStyle={{
  //           borderRadius: 5,
  //           backgroundColor: theme.colors.imageBackground,
  //         }}
  //         resizeMode='cover'
  //       >
  //         <text.H2 style={{color: theme.colors.white}}>
  //           {banner?.title1}
  //         </text.H2>
  //         <text.H2 style={{marginBottom: 20, color: theme.colors.white}}>
  //           {banner?.title2}
  //         </text.H2>
  //         <ShopNow
  //           onPress={() =>
  //             navigation.navigate('Shop', {
  //               title: 'Shop',
  //               products: productsData,
  //             })
  //           }
  //         />
  //       </ImageBackground>
  //     </View>
  //   );
  // }

  return null;
};

export default BannerItem;
