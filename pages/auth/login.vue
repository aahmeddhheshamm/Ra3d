<script setup>
const {$intercept} = useNuxtApp()
const localePath = useLocalePath()
const {setUserData} = useAuth();
const userLogin = ref({
  email: "",
  password: "",
})

const apiLogin = (data) => $intercept('oauth/login/', {
  method: "POST",
  body: JSON.stringify(data)
})

const {mutate, isPending} = useMutate({
  mutationFn: apiLogin,
});

function submitLogin() {
  mutate(userLogin.value, {
    onSuccess(res){
      setUserData(res?.user, res?.access_token)
      setTimeout(()=>{
        if(res?.user.status === 'ADMIN'){
          navigateTo(localePath('/dashboard'));
        }else navigateTo(localePath('/'));
      },3000)
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
          <h2 class="text-2xl font-semibold"> Login </h2>
          <p class="text-[16px]">
            Enter your email below to login to your account.
          </p>
        <ValidationForm class="w-full flex flex-col gap-[8px] mt-[14px]" @submit="submitLogin" autocomplete="off" >

            <UIFormInputField
                name="email"
                v-model="userLogin.email"
                validation="required|email"
                type="email"
                label="email"
                placeholder="Enter your email"
                id="email"
            />

          <UIFormPasswordField
              class="flex-1 !py-1"
              name="password"
              id="password"
              placeholder="Enter your password"
              label="password"
              validation="required"
              v-model="userLogin.password"
          />

            <UIButtonsPrimaryButton
                type="submit"
                :loading="isPending"
                :disabled="isPending"
                submitTitle="Sign in"
                :class="[{ 'btn-disabled': isPending }, '!px-4 !py-[9px] !text-[14px] !rounded-[4px] w-full']"
            />

        </ValidationForm>

        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <NuxtLink :to="localePath('/auth/signup')" class="underline text-blue-400 font-semibold"> Sign up </NuxtLink>
        </div>

      </UIBox>
    </div>
</template>
