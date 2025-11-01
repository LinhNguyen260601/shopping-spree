import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import COMMON_EN from '@/locales/en/common.json'
import COMMON_VI from '@/locales/vi/common.json'
import HOME_EN from '@/locales/en/home.json'
import HOME_VI from '@/locales/vi/home.json'
import PRODUCT_EN from '@/locales/en/product.json'
import PRODUCT_VI from '@/locales/vi/product.json'
import PRODUCT_LIST_EN from '@/locales/en/productList.json'
import PRODUCT_LIST_VI from '@/locales/vi/productList.json'
import LOGIN_EN from '@/locales/en/login.json'
import LOGIN_VI from '@/locales/vi/login.json'
import REGISTER_EN from '@/locales/en/register.json'
import REGISTER_VI from '@/locales/vi/register.json'
import CART_EN from '@/locales/en/cart.json'
import CART_VI from '@/locales/vi/cart.json'
import USER_EN from '@/locales/en/user.json'
import USER_VI from '@/locales/vi/user.json'
import NOT_FOUND_EN from '@/locales/en/notFound.json'
import NOT_FOUND_VI from '@/locales/vi/notFound.json'
import HEADER_EN from '@/locales/en/header.json'
import HEADER_VI from '@/locales/vi/header.json'
import FOOTER_EN from '@/locales/en/footer.json'
import FOOTER_VI from '@/locales/vi/footer.json'
import { getLanguageFromLocalStorage } from '@/utils'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const satisfies Record<string, string>

export const resources = {
  en: {
    common: COMMON_EN,
    home: HOME_EN,
    product: PRODUCT_EN,
    productList: PRODUCT_LIST_EN,
    login: LOGIN_EN,
    register: REGISTER_EN,
    cart: CART_EN,
    user: USER_EN,
    notFound: NOT_FOUND_EN,
    header: HEADER_EN,
    footer: FOOTER_EN
  },
  vi: {
    common: COMMON_VI,
    home: HOME_VI,
    product: PRODUCT_VI,
    productList: PRODUCT_LIST_VI,
    login: LOGIN_VI,
    register: REGISTER_VI,
    cart: CART_VI,
    user: USER_VI,
    notFound: NOT_FOUND_VI,
    header: HEADER_VI,
    footer: FOOTER_VI
  }
} as const

export const defaultNS = 'home'

// Get saved language from localStorage or default to 'vi'
const savedLanguage = getLanguageFromLocalStorage()
const initialLanguage = savedLanguage && (savedLanguage === 'en' || savedLanguage === 'vi') ? savedLanguage : 'vi'

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  ns: ['common', 'home', 'product', 'productList', 'login', 'register', 'cart', 'user', 'notFound', 'header', 'footer'],
  defaultNS,
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false // React already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  }
})
