<script setup>
definePageMeta({
  layout: "customer",
  middleware:'auth'
});
const {user, removeUserData} = useAuth();
const email = ref(user.value.email)
const localePath = useLocalePath()
const {$intercept} = useNuxtApp()

const confirmPassword = ref()
const userUpdate = ref({
  old_password: "",
  new_password: "",
})
const apiLogin = (data) => $intercept('oauth/password-change/', {
  method: "POST",
  body: JSON.stringify(data)
})

const {mutate, isPending} = useMutate({
  mutationFn: apiLogin,
});

function submitChangeData() {
  mutate(userUpdate.value, {
    onSuccess(res){
      removeUserData();
      navigateTo(localePath('/auth/login'));
    },
  });
}

</script>

<template>
  <div class="container my-[40px]">
    <UITitle title="Settings" />

    <ValidationForm class="w-full" @submit="submitChangeData" autocomplete="off" >

    <div class="w-full">
      <UIFormInputField
          class="flex-1 !py-1"
          name="email"
          type="email"
          id="email"
          placeholder="email"
          label="email"
          v-model="email"
          :disabled="true"
      />

      <UIFormPasswordField
          class="flex-1 !py-1"
          name="current_password"
          id="current_password"
          placeholder="Enter current password"
          label="Current password"
          validation="required"
          v-model="userUpdate.old_password"
      />
      <UIFormPasswordField
          class="flex-1 !py-1"
          name="new_password"
          id="new_password"
          placeholder="Enter new password"
          label="New password"
          validation="required|password"
          v-model="userUpdate.new_password"
      />
<!--      <UIFormPasswordField-->
<!--          class="flex-1 !py-1"-->
<!--          name="confirm_password"-->
<!--          id="confirm_password"-->
<!--          placeholder="Enter confirm password"-->
<!--          label="Confirm password"-->
<!--          v-model="confirmPassword"-->
<!--      />-->

      <UIButtonsPrimaryButton
          type="submit"
          :loading="isPending"
          :disabled="isPending"
          submitTitle="Save"
          :class="[{ 'btn-disabled': isPending }, '!px-4 !py-[9px] !text-[14px] !rounded-[4px] w-full']"
      />

    </div>
    </ValidationForm>

  </div>
</template>

<style scoped>

</style>