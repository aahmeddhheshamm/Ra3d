<script setup>

const {$intercept} = useNuxtApp()

const localePath = useLocalePath()
const {setOtpOption} = useAuth();

const userRegister = ref({
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
})
const confirmPassword = ref("")
const apiRegister = (data) => $intercept('oauth/signup/', {
  method: "POST",
  body: JSON.stringify(data)
})

const {mutate, isPending} = useMutate({
  mutationFn: apiRegister,
});


function submitRegister() {
  mutate(userRegister.value, {
    onSuccess(){
      setOtpOption(userRegister.value.email)
      setTimeout(()=>{
        navigateTo(localePath('/auth/verify'));
      },3000)
    },
  });
}


</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <UIBox class="w-full max-w-xl">
      <div class="w-full flex justify-center mb-4">
        <IconsTheLogo class="w-[69px] h-[79px]" />
      </div>
      <h2 class="text-2xl font-semibold"> Sign Up </h2>
      <p class="text-[16px]">
        Enter your information to create an account.
      </p>
      <ValidationForm class="w-full flex flex-col gap-[8px] mt-[12px]" @submit="submitRegister" autocomplete="off" >
<div class="grid grid-cols-2 gap-x-4 gap-y-4">


        <UIFormInputField
            name="firstName"
            v-model="userRegister.first_name"
            validation="required"
            type="text"
            label="First Name"
            placeholder="Enter first name"
            id="firstName"
        />
        <UIFormInputField
            name="lastName"
            v-model="userRegister.last_name"
            validation="required"
            type="text"
            label="Last Name"
            placeholder="Enter last name"
            id="lastName"
        />

        <UIFormInputField
            class="col-span-2"
            name="email"
            v-model="userRegister.email"
            validation="required|email"
            type="email"
            label="email"
            placeholder="Enter email"
            id="email"
        />
        <UIFormInputField
            name="username"
            v-model="userRegister.username"
            validation="required"
            type="text"
            label="Username"
            placeholder="Enter username"
            id="username"
        />

        <UIFormPasswordField
            name="password"
            id="password"
            placeholder="Enter password"
            label="password"
            validation="required|password"
            v-model="userRegister.password"
        />
<!--        <UIFormPasswordField-->
<!--            class="flex-1 !py-1"-->
<!--            name="confirm_password"-->
<!--            id="confirm_password"-->
<!--            placeholder="Enter confirm password"-->
<!--            label="Confirm password"-->
<!--            validation="required|password"-->
<!--            v-model="confirmPassword"-->
<!--        />-->
</div>
        <UIButtonsPrimaryButton
            type="submit"
            :loading="isPending"
            :disabled="isPending"
            submitTitle="Sign up"
            :class="[{ 'btn-disabled': isPending }, '!px-4 !py-[9px] !text-[14px] !rounded-[4px] w-full']"
        />

      </ValidationForm>

      <div class="mt-4 text-center text-sm">
        have an account?
        <NuxtLink :to="localePath('/auth/login')" class="underline text-blue-400 font-semibold"> Sign in </NuxtLink>
      </div>

    </UIBox>
  </div>
</template>
