import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'intl-pluralrules';
import ru from '../locales/ru.json'
import uz from '../locales/uz.json'
import { getItem, setItem } from './AsyncStorage';
export const resources = {
  ru: {
    translation: ru
  },
  uz: {
    translation: uz
  }
};


const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      const savedLanguage = await getItem('lang');
      callback(savedLanguage || 'uz');
    } catch (error) {
      console.error("Tilni aniqlashda xato: ", error);
      callback('uz');
    }
  },
  init: () => { },
  cacheUserLanguage: async (lng) => {
    try {
      await setItem('lang', lng);
    } catch (error) {
      console.error("Tilni saqlashda xato: ", error);
    }
  }
};


i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    fallbackLng: 'uz',
    resources,
    compatibilityJson: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

