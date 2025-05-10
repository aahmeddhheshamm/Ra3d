<script setup>
const localePath = useLocalePath()
const {setOtpOption} = useAuth();
const {$intercept} = useNuxtApp();

const email = ref()

const apiPasswordReset = (data) => $intercept('oauth/password-reset/', {
  method: "POST",
  body: JSON.stringify(data)
})

const {mutate, isPending} = useMutate({
  mutationFn: apiPasswordReset,
});

function submitForgetPassword() {
  setOtpOption(email.value)
  mutate({email: email.value}, {
    onSuccess(res){
      setTimeout(()=>{
        navigateTo(localePath('/auth/reset-verify'));
      },2000)
    },
  });
}


</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <UIBox class="w-full max-w-sm">
      <div class="w-full flex justify-center mb-4">
        <IconsTheLogo class="w-[69px] h-[79px]" />
      </div>
      <h2 class="text-2xl font-semibold"> Forget Password </h2>
      <p class="text-[16px]">
        Enter your email below to reset your password account.
      </p>
      <ValidationForm class="w-full flex flex-col gap-[8px] mt-[14px]" @submit="submitForgetPassword" autocomplete="off" >

        <UIFormInputField
            name="email"
            v-model="email"
            validation="required|email"
            type="email"
            label="email"
            placeholder="Enter your email"
            id="email"
        />

        <UIButtonsPrimaryButton
            type="submit"
            :loading="isPending"
            :disabled="isPending"
            submitTitle="Submit"
            :class="[{ 'btn-disabled': isPending }, '!px-4 !py-[9px] !text-[14px] !rounded-[4px] w-full']"
        />

      </ValidationForm>


    </UIBox>
  </div>
</template>
