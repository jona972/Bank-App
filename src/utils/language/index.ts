import translationEn from "@/utils/language/translations/en.json";
import translationEs from "@/utils/language/translations/es.json";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: { translation: translationEn },
  es: { translation: translationEs },
};

const initI18n = async (): Promise<void> => {
  const language = Localization.getLocales()?.[0]?.languageCode ?? "en";

  i18n.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
