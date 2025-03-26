import en from "./locales/en.json";
import ar from "./locales/ar.json";


export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    ar,
    en,
  },
}));