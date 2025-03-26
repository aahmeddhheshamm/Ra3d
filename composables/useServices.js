// export default function useServices() {
//   const {$intercept} = useNuxtApp();
//
//   const apiGetCountries = () => $intercept("v2/regions");
//   const apiGetCities = (regionId) => $intercept(`v2/regions/cities?region_id=${regionId}`);
//   const apiGetArea = (cityId) => $intercept(`v2/regions/cities/areas?city_id=${cityId}`);
//
//   const apiGetExchangeBar = () => $intercept('v2/exchange/bar');
//
//   const apiGetExchangesDetails = (yearId, id) => $intercept(`v2/exchange/details/${yearId}/${id}`);
//
//   const apiGetHomeSlider = () => $intercept('v2/slider');
//
//   const apiGetYearsOptions = () => $intercept('v2/exchange/years');
//
//   const apiGetHomeTable = (year) => $intercept(`v2/exchange/tables?year=${year}`);
//
//   const apiGetAbout = () => $intercept('v2/about');
//   const apiGetTerms = () => $intercept('v2/terms');
//   const apiGetContactus = () => $intercept('v2/settings');
//
//   const apiGetMerchantFeatures = () => $intercept('v2/about/features');
//
//
//   const searchParamsHandler = (params = {}) => {
//     return new URLSearchParams(params).toString();
//   };
//
//   // const apiGetStores = (cityId) => $intercept(`v2/stores/latest?city_id=${cityId}`);
//   const apiGetSearchStores = (cityId, params) => {
//     return $intercept(`v2/stores/paginate-stores?city_id=${userSetLocation.value?.id}&${searchParamsHandler({...params})}`);
//   };
//   const apiGetStores = (params) => {
//     return $intercept(`v2/stores/latest?city_id=${userSetLocation.value?.id}&${searchParamsHandler({...params})}`);
//   };
//
//   const apiGetFeaturedStores = () => $intercept(`v2/stores/featured-vue?city_id=${userSetLocation.value?.id}`);
//
//   const apiGetStoreDetails = (storeId) => $intercept(`v2/stores/details/${storeId}?city_id=${userSetLocation.value?.id}`);
//
//   const apiGetStoreCategories = (storeId) => $intercept(`v2/stores/${storeId}/categories?city_id=${userSetLocation.value?.id}`);
//
//   const apiGetStoreAbout = (storeId) => $intercept(`v2/stores/about/${storeId}?city_id=${userSetLocation.value?.id}`);
//
//   const apiGetStoreTerms = (storeId) => $intercept(`v2/stores/terms/${storeId}?city_id=${userSetLocation.value?.id}`);
//
//   // const apiGetStoreProducts = (storeId, cityId) => $intercept(`v2/stores/${storeId}/products?city_id=${cityId}`);
//
//   const apiGetStoreProducts = (storeId, params) => {
//     return $intercept(`v2/stores/${storeId}/products?city_id=${userSetLocation.value?.id}&${searchParamsHandler({...params})}`);
//   };
// const apiGetProducts =(params) => {
//     return $intercept(`v2/products?city_id=${userSetLocation.value?.id}&${searchParamsHandler({...params})}`);
//   };
//   const apiGetProductDetails = (storeId, productId) => $intercept(`v2/stores/${storeId}/products/details/${productId}?city_id=${userSetLocation.value?.id}`);
//
//   const apiGetCart = () => $intercept(`v2/cart`);
//
//   const apiGetAddress = (params) => {
//     return $intercept(`v2/address${searchParamsHandler({...params})}`);
//   };
//   const apiGetAddressDetails = (addressId) => $intercept(`v2/address/${addressId}`);
//
//   const apiGetOrders = (params) => {
//     return $intercept(`v2/order${searchParamsHandler({...params})}`);
//   };
//   const apiGetOrderDetails = (orderId) => $intercept(`v2/order/details/${orderId}`);
//
//   const apiGetWalletAmount = () => $intercept(`v2/wallet`);
//   const apiGetWalletTransactions = () => $intercept(`v2/wallet/transactions`);
//   const apiGetWalletUserTransactions = () => $intercept(`v2/user/ibans`);
//   const apiGetBanks = () => $intercept(`v2/user/banks`);
//   const apiGetPaymentLog = () => $intercept(`v2/payment-log`);
//
//   // const apiGetWishlist = (cityId) => $intercept(`v2/favorites?city_id=${cityId}`);
//
//   const apiGetWishlist = (cityId, params) => {
//     return $intercept(`v2/favorites?city_id=${cityId}&${searchParamsHandler({...params})}`);
//   };
//
//   const apiGetShippingCompany = (storeId, addressId, coupon) => $intercept(`v2/order/checkout?store_id=${storeId}&address_id=${addressId}&coupon=${coupon}`);
//
//
//   return {apiGetCountries, apiGetCities, apiGetArea, apiGetExchangeBar,apiGetExchangesDetails, apiGetHomeSlider, apiGetYearsOptions, apiGetHomeTable, apiGetAbout, apiGetTerms, apiGetContactus, apiGetMerchantFeatures, apiGetStores, apiGetFeaturedStores, apiGetStoreDetails, apiGetStoreCategories ,apiGetStoreAbout, apiGetStoreProducts, apiGetStoreTerms, apiGetProductDetails, apiGetCart, apiGetAddress, apiGetAddressDetails, apiGetOrders, apiGetOrderDetails, apiGetWalletAmount, apiGetWalletTransactions, apiGetWalletUserTransactions, apiGetBanks, apiGetPaymentLog, apiGetShippingCompany, apiGetWishlist,apiGetProducts,apiGetSearchStores};
// }
