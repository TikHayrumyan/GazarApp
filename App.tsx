import * as React from 'react';
import {Provider} from 'react-redux';

import FlashMessage from 'react-native-flash-message';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {components} from './src/components';
import {persistor, store} from './src/store/store';
import StackNavigator from './src/navigation/StackNavigator';
import {View, Text} from 'react-native';
// import { useTranslation } from 'react-i18next';
// import { createRoot } from 'react-dom/client';
import i18n from 'i18next';
import {useTranslation, initReactI18next} from 'react-i18next';
import {en, ru, am} from './src/i18n/translations';
import {LogLevel, OneSignal} from 'react-native-onesignal';

const resources = {
  en: {
    translation: en,
  },
  am: {
    translation: am,
  },
  ru: {
    translation: ru,
  },
};
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    compatibilityJSON: 'v3',
    resources: resources,
    lng: 'am', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

  
  OneSignal.initialize("d42a63fc-b88b-44fc-952e-8420bce38d74");
  // OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  // OneSignal.Notifications.requestPermission(true);

  const App = () => {
   
  // OneSignal.initialize("d42a63fc-b88b-44fc-952e-8420bce38d74");
  // OneSignal.Notifications.addEventListener('click', (event) => {
  //   console.log('OneSignal: notification clicked:', event);
  // });

  const {t} = useTranslation();

  return (
    <SafeAreaProvider>
      <components.StatusBar />
      <Provider store={store}>
        <PersistGate loading={<components.Loader />} persistor={persistor}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
      
      <FlashMessage position='top' floating={true} />
    </SafeAreaProvider>
  );
};

export default App;
