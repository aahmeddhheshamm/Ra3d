<script setup>
import useMutate from "@/composables/useMutate.js";
import {useLocalePath} from '#i18n'
const localePath = useLocalePath()
const {otpOption, setUserData} = useAuth();

const isLoading = ref(false);

const otpValues = ref(null);

const {$intercept} = useNuxtApp()

const apiVerifyCode = (data) => $intercept('oauth/activate/', {
  method: "POST",
  body: JSON.stringify(data)
})

const {mutate, isPending} = useMutate({
  mutationFn: apiVerifyCode,
});


function  onComplete(isCompleted, value) {
  if (isCompleted) {
    otpValues.value = value;
    handleVerifyCode();
  } else {
    otpValues.value = null
  }
}


function  handleVerifyCode() {
  if (otpValues) {
    isLoading.value = true;
      mutate({email: otpOption.value.email, code: otpValues.value}, {
        onSuccess(res) {
          setUserData(res.data?.user, res.data?.token)
          setTimeout(()=> {
            navigateTo(localePath('/auth/login'))
          })
        },
        onError(err) {
          isLoading.value = false;
        }
      });

  }
}

</script>
<template>
  <div>
    <AuthCodeInput @complete="onComplete" />
    <UIButtonsPrimaryButton
        type="submit"
        :loading="isLoading"
        :disabled="isLoading"
        submitTitle="activate"
        :class="[{ 'btn-disabled': isLoading }, 'w-full !py-[15px] !mt-[32px] !text-[16px] !font-normal ']"
        @click="handleVerifyCode"
    />
  </div>

</template>
