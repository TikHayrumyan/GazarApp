import React, { useEffect, useMemo } from 'react';
import { Text, TouchableOpacity, ImageBackground, StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { useTranslation } from 'react-i18next';
import { useAppNavigation } from '../../hooks';
import QuantityBadge from '../badges/QuantityBadge';
import { theme } from '../../constants';
import { productsData } from '../../constants/constants';

type Props = {
  item: any;
  version: number;
  lastElement?: boolean;
  selectedCategory?: any;
  setSelectedCategory?: any;
  index: number;
  id?: any;
  title?: string;
};

const CategoryItem: React.FC<Props> = ({
  item,
  version,
  lastElement,
  selectedCategory,
  setSelectedCategory,
  index,
  title,
}): JSX.Element | null => {
  const navigation = useAppNavigation();
  const { t, i18n } = useTranslation();

  const getCategoryName = () => {
    const language = i18n.language;
    if (language === 'am') return item.gzCategoryDetails[2]?.name;
    if (language === 'ru') return item.gzCategoryDetails[1]?.name;
    return item.gzCategoryDetails[0]?.name;
  };

  const categoryName = useMemo(() => getCategoryName(), [i18n.language, item]);

  useEffect(() => {
    if (title) {
      const matchingCategory = item.gzCategoryDetails.find(
        (detail: any) => detail.name === title
      );
      if (matchingCategory && setSelectedCategory) {
        setSelectedCategory(item);
      }
    }
  }, [title]);

  const handleCategoryPress = () => {
    
      setSelectedCategory(item);
    
  };

  const handleNavigation = (name: string) => {
    const arr = Object.entries(item).flat();

    navigation.navigate('Shop', {
      title: name,
      products: arr as any,
    });
  };

  const renderVersion1 = () => (
    <TouchableOpacity
      style={[
        styles.version1Container,
        {
          marginRight: lastElement ? 20 : 10,
          backgroundColor: selectedCategory?.id === item.id
            ? theme.colors.gazarGreenColor
            : theme.colors.opacityBlue,
          borderColor: selectedCategory?.id === item.id
            ? theme.colors.gazarGreenColor
            : theme.colors.textColor,
        },
      ]}
      onPress={handleCategoryPress}
    >
      <Text
        style={{
          color: selectedCategory?.id === item.id
            ? theme.colors.white
            : theme.colors.textColor,
          lineHeight: 20.4,
          fontSize: 16,
        }}
      >
        {categoryName}
      </Text>
    </TouchableOpacity>
  );

  const renderVersion2 = () => {
    const blockWidth = responsiveWidth(100) / 2 - 30;
    const blockHeight = responsiveWidth(100) / 2 - 30;

    return (
      <TouchableOpacity
        style={[
          styles.version2Container,
          { width: blockWidth, height: blockHeight },
        ]}
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
          style={styles.version2ImageBackground}
          imageStyle={styles.version2Image}
          resizeMode="cover"
        >
          <QuantityBadge quantity={item.quantity as number} version={2} />
        </ImageBackground>
        <Text numberOfLines={1} style={styles.version2Text}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderVersion3 = () =>
    item?.gzCategoryDetails?.map((detail: any) => {
      if (detail.lan === i18n.language.toUpperCase()) {
        return (
          <TouchableOpacity
            key={detail.id}
            style={styles.version3Container}
            onPress={() => handleNavigation(detail.name)}
          >
            <ImageBackground
              source={{ uri: detail.imageLink }}
              style={styles.version3ImageBackground}
              imageStyle={styles.version3Image}
              resizeMode="contain"
            />
            <Text style={styles.version3Text}>{detail.name}</Text>
          </TouchableOpacity>
        );
      }
    });

  const renderVersion4 = () => (
    <TouchableOpacity
      style={styles.version4Container}
      onPress={() =>
        navigation.navigate('Shop', { title: item.name, products: item })
      }
    >
      <ImageBackground
        source={{ uri: item.imageLink }}
        style={styles.version4ImageBackground}
        imageStyle={styles.version4Image}
        resizeMode="contain"
      />
      <Text style={styles.version4Text}>{item.name}</Text>
    </TouchableOpacity>
  );

  switch (version) {
    case 1:
      return renderVersion1();
    case 2:
      return renderVersion2();
    case 3:
      return renderVersion3();
    case 4:
      return renderVersion4();
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  version1Container: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 3,
  },
  version2Container: {
    marginBottom: 14,
    backgroundColor: theme.colors.lightBlue,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.lightBlue,
  },
  version2ImageBackground: {
    width: '100%',
    height: 120,
    borderRadius: 14,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.lightBlue,
    paddingTop: 5,
  },
  version2Image: {
    borderRadius: 14,
  },
  version2Text: {
    color: theme.colors.black,
    lineHeight: 37.5,
    alignSelf: 'center',
  },
  version3Container: {
    width: 150,
    height: 180,
    margin: '5%',
    marginBottom: 10,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  version3ImageBackground: {
    backgroundColor: '#f2fce4',
    height: 110,
    width: 'auto',
    marginTop: 40,
  },
  version3Image: {
    backgroundColor: '#f2fce4',
  },
  version3Text: {
    textAlign: 'center',
    fontSize: 15,
    margin: 15,
    color: theme.colors.gazarMainText,
  },
  version4Container: {
    width: '100%',
    height: 160,
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
  },
  version4ImageBackground: {
    backgroundColor: '#f2fce4',
    height: 140,
    width: '100%',
    marginTop: 10,
  },
  version4Image: {
    backgroundColor: '#f2fce4',
  },
  version4Text: {
    textAlign: 'center',
    margin: 10,
    color: theme.colors.gazarMainText,
  },
});

export default CategoryItem;
