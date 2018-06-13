import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import { translate } from 'react-i18next';

export default (selectedLocale, callback) => {
  i18next
    .use(XHR)
    .init({
      lng: selectedLocale,
      fallbackLng: selectedLocale,
      ns: ['app'],
      defaultNS: 'app',
      lowerCaseLng: true,
      load: 'currentOnly',
      debug: true,
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: `/locales/${LOCALE_HASH}/{{ns}}/{{lng}}.json`,
      },
      react: {
        wait: true,
      },
    }, () => {
      translate.setI18n(i18next);
      callback();
    });
};
