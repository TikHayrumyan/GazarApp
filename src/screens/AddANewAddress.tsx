import React, {useState} from 'react';
import {TouchableOpacity, View, ScrollView, Image} from 'react-native';
import {text} from '../text';
import {components} from '../components';
import {useAppNavigation} from '../hooks';
import {theme} from '../constants';

const AddANewAddress: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  const [selected, setSelected] = useState(false);

  const renderHeader = () => {
    return <components.Header title='Add a new address' goBack={true} />;
  };

  const renderMap = () => {
    const image: string = 'https://george-fx.github.io/kastelli/map/01.jpg';
    return (
      <View
        style={{
          marginTop: 10,
          flex: 1,
          paddingLeft: 20,
        }}
      >
        <Image source={{uri: image}} style={{flex: 1}} resizeMode='cover' />
      </View>
    );
  };

  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
        style={{flexGrow: 0}}
      >
        <components.InputField
          label='title'
          placeholder='Home'
          containerStyle={{
            marginBottom: 22,
          }}
        />
        <components.InputField
          label='new address'
          placeholder='Enter your address'
          containerStyle={{
            marginBottom: 22,
          }}
        />
        <TouchableOpacity
          style={{marginBottom: 18, flexDirection: 'row', alignItems: 'center'}}
          onPress={() => setSelected(!selected)}
        >
          <components.Checkbox
            active={selected}
            containerStyle={{
              backgroundColor: theme.colors.opacityBlue,
              borderColor: theme.colors.lightBlue,
            }}
          />
          <text.T14
            style={{
              marginLeft: 10,
            }}
          >
            Use current location
          </text.T14>
        </TouchableOpacity>
        <components.Button
          title='save address'
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    );
  };

  return (
    <components.SmartView>
      {renderHeader()}
      {renderMap()}
      {renderContent()}
    </components.SmartView>
  );
};

export default AddANewAddress;
