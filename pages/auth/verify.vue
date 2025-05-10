<script setup>
import useMutate from "@/composables/useMutate.js";
const {otpOption} = useAuth();
const {$intercept} = useNuxtApp()

const apiResend = (data) => $intercept('oauth/resend-activation-code/', {
  method: "POST",
  body: JSON.stringify(data)
})

const {mutate, isPending} = useMutate({
  mutationFn: apiResend,
});


function resendOtpCode() {
    mutate({email: otpOption.value}, {
      onSuccess(res) {
        // setUserData(res.data, res.data.token)
      },
    })
}

</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <UIBox class="w-full max-w-xl !px-[32px]">
        <div class=" flex flex-col gap-[8px]">
          <UITitle title="Verify your account" class="!text-[18px] !font-bold " />
          <p class="md:text-[18px] text-sm font-normal">Enter confirmation code</p>
          <p class="md:text-[16px] text-xs font-normal mb-[10px] leading-6">We sent code to you {{otpOption?.email}} </p>
          <AuthVerifyCode/>
          <button class="mt-[14px]  md:text-[16px] text-xs underline text-blue-400 font-semibold" @click="resendOtpCode">Resend Code</button>
        </div>

    </UIBox>
  </div>
</template>

<style scoped>

</style>