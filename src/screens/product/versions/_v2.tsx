import React, {useState} from 'react';
import {ProductType} from '../../../types';
import {useAppDispatch} from '../../../hooks';
import {components} from '../../../components';
import {addedToCartMessage} from '../../../utils';
import {theme} from '../../../constants';
import {useAppSelector} from '../../../hooks';
import {setQuantityWantAdd} from '../../../store/slices/productSlice';

type Props = {item: any};

const _v2: React.FC<Props> = ({item}): JSX.Element => {
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('camel');
  const quantityWantAdd = useAppSelector(
    (state) => state.product.quantityWantAdd,
  );

  const renderCarousel = () => {
    return (
      <components.ProductCarousel
        version={2}
        item={item}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
    );
  };

  const renderTabs = () => {
    return <components.ProductTab item={item} />;
  };

  const renderNameWithRating = () => {
    return <components.ProductName item={item} version={2} />;
  };

  const renderPriceWithQuantity = () => {
    return (
      <components.ProductPrice
        item={item}
        version={2}
        styleText={{color: theme.colors.black}}
      />
    );
  };

  const renderButton = () => {
    return (
      <components.Button
        title='+ Add to cart'
        containerStyle={{margin: 20}}
        onPress={() => {
        
          dispatch(setQuantityWantAdd(0));
          addedToCartMessage(item);
        }}
      />
    );
  };

  return (
    <components.SmartView>
      {renderCarousel()}
      {renderTabs()}
      {renderNameWithRating()}
      {renderPriceWithQuantity()}
      {renderButton()}
    </components.SmartView>
  );
};

export default _v2;
