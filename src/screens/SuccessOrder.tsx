import {components} from '../components';
import {Text, View} from 'react-native';
import {theme} from '../constants';
import Button from '../components/buttons/Button';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppNavigation} from '../hooks';
import {setScreen} from '../store/slices/tabSlice';
export default function SuccessOrder() {
  const renderHeader = () => {
    return <components.Header title='Success' goBack={false} />;
  };
  const {t} = useTranslation();
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  return (
    <components.SmartView
      containerStyle={{backgroundColor: theme.colors.imageBackground}}
    >
      {renderHeader()}
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',

        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
            height: '40%',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: 'green',
              marginBottom: 40,
            }}
          >
            <Text style={{color:"black"}}>Պատվերը</Text> Հաջողվել է
          </Text>
          <Button
            title={t('goToHomePage')}
            transparent
            onPress={() => {
              dispatch(setScreen('Home'));
              navigation.navigate('TabNavigator');
            }}
          />
        </View>
      </View>
    </components.SmartView>
  );
}
