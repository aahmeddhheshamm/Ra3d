import {defaultConfig} from "~/config";

import AppHelper from "~/helpers/appHelper";

let refreshTokenCalled = false;
import useRefreshToken from "~/composables/useRefreshToken.js"
export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();


  const baseUrl = runtimeConfig.public.baseUrl;

  async function interceptRequest(options){
    // get token
    const token = useCookie("token").value;
    // get lang
    // const lang = getLang.value || defaultConfig.lang;

    // const lang = useNuxtApp().$i18n.locale.value
    if(token){
      options.headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // "Media-type": "application/json",
        ...options.headers,

      };
    }else {
      options.headers = {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...options.headers,

      };
    }

    // delete content type if the body is an object (eg. FormData)
    if (typeof options.body === "object") {
      if (options.headers?.["Content-Type"]) {
        delete options.headers["Content-Type"];
      }
    }

    return options;
  }

  // intercept response
  async function interceptResponse(
    response,
    method
  ){
    const responseJson = await response.json();
    const message = responseJson?.message;

    const errors = responseJson?.errors;

    // handle response error
    if (!response.ok) {
      // show error message
      if (!AppHelper.isServer()) {
        if (errors && Array.isArray(errors) && errors.length) {
          errors.forEach((err) => {
            // @ts-ignore
            nuxtApp.$toast.error(err);
          });
        } else if (message) {
          // @ts-ignore
          nuxtApp.$toast.error(message);
        }
      }

      return Promise.reject(responseJson);
    }

    // handle response success
    if (method && method.toLowerCase() !== "get") {
      // @ts-ignore
      nuxtApp.$toast.success(message);
    }

    return responseJson;
  }

  // intercept function
  async function intercept(url, options = {}, queryParams = {}) {
    // Construct query string from queryParams object
    const queryString = Object.keys(queryParams)
        .map((key) => {
          const value = queryParams[key]

          if (value === null || value === undefined) return ''

          return `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
        })

        .join('&')
    const linkWithParams = url.includes("?") ? `${url}&` : `${url}?`
    // Append query string to the URL
    const fullUrl = Object.keys(queryParams).length
        ? `${baseUrl}${linkWithParams}${queryString}`
        : `${baseUrl}${url}${queryString}`


    // handle request
    const requestOptions = await interceptRequest(options);


    const response = await fetch(fullUrl, requestOptions);

    // handle response
    const responsOption = await interceptResponse(response, options.method);

    return responsOption;
  }

  return {
    provide: {intercept},
  };
});
