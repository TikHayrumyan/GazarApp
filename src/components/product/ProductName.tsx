import React from 'react';
import {Text, TextStyle, View} from 'react-native';

import {text} from '../../text';
import {svg} from '../../assets/svg';
import {theme} from '../../constants';
import {ProductType} from '../../types';
import { useTranslation } from 'react-i18next';

type Props = {item: any;  version: 1 | 2;id?:any,SingleProduct?:any};

const ProductName: React.FC<Props> = ({
  item,
  version,
  SingleProduct
}): JSX.Element | null => {
  const {t,i18n} = useTranslation()
  if (version === 1) {
  
    return (
      <Text
        style={{
          textAlign: "center",
          width: "100%",
          marginRight: 'auto',
          color: theme.colors.textColor,
          fontSize: 16,
          fontWeight: "500",
          // ...theme.fonts.textStyle_14,
          // ...style,
        }}
        numberOfLines={1}
      >
        {item?.gzProductDetails[0]?.name}
      </Text>
    );
  }
  
  if (version === 2) {
    return (
      <View
        style={{
          marginBottom: 20,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        {SingleProduct?.gzProductDetails.map((item: any, index: number) => {
          if (item.lan == (i18n.language).toLocaleUpperCase()) {
            return (
              <View
                key={index}
                style={{display: 'flex', flexDirection: 'column'}}
              >
                <Text style={{fontSize: 25}}>{item.name}</Text>
                {item.description && <Text>{item.description}</Text>}
              </View>
            );
          }
        })}
      </View>
    );
  }

  return null;
};

export default ProductName;
