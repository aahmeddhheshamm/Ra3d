<script setup>
import useMutate from "@/composables/useMutate.js";
import {useLocalePath} from '#i18n'
const localePath = useLocalePath()
const {otpOption, setUserData} = useAuth();

const isLoading = ref(false);

const otpValues = ref(null);

const {$intercept} = useNuxtApp()

const new_password = ref()

const apiVerifyCode = (data) => $intercept('oauth/password-reset-verify/', {
  method: "POST",
  body: JSON.stringify(data)
})

const {mutate, isPending} = useMutate({
  mutationFn: apiVerifyCode,
});


function  onComplete(isCompleted, value) {
  if (isCompleted) {
    otpValues.value = value;
    // handleVerifyCode();
  } else {
    otpValues.value = null
  }
}


function  handleVerifyCode() {
  if (otpValues) {
    isLoading.value = true;
      mutate({new_password: new_password.value, code: otpValues.value}, {
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
    <UIFormPasswordField
        class="flex-1 !py-1 mt-4"
        name="new_password"
        id="new_password"
        placeholder="Enter new password"
        label="New password"
        validation="required|password"
        v-model="new_password"
    />
    <UIButtonsPrimaryButton
        type="submit"
        :loading="isLoading"
        :disabled="isLoading"
        submitTitle="Submit"
        :class="[{ 'btn-disabled': isLoading }, 'w-full !py-[15px] !mt-[32px] !text-[16px] !font-normal ']"
        @click="handleVerifyCode"
    />
  </div>

</template>
