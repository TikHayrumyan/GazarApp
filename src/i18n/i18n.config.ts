// import {en, fr} from './translations';
import React from "react";
// import { createRoot } from 'react-dom/client';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import en from './translations/en.json';
import am from './translations/am.json';
import ru from './translations/ru.json';


const resources = {
    en: {
        translation: en,
    },
    am: {
        translation: am,
    },
    ru: {
        translation: ru,
    }
}


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: resources,
    lng: "am", // if you're using a language detector, do not define the lng option
    fallbackLng: "am",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

// i18next.use(initReactI18next).init({
//     debug: false,
//     lng: 'en',
//     fallbackLng: 'en',
//     compatibilityJson: 'v3',
//     resources,
// })

export default i18n;