import Vue3Toasity, { toast } from "vue3-toastify";

import "vue3-toastify/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toasity, {
    autoClose: 3000,
    position: "bottom-right",
  });

  return {
    provide: {
      toast: toast,
    },
  };
});
