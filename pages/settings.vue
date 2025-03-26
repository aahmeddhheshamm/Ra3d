<script setup>
definePageMeta({
  layout: "customer",
  middleware:'auth'
});

const email = ref()
const currentPassword = ref()
const newPassword = ref()
const confirmPassword = ref()
</script>

<template>
  <div class="container my-[40px]">
    <UITitle title="Settings" />

    <ValidationForm class="w-full" @submit="userRegister" autocomplete="off" >

    <div class="w-full">
      <UIFormInputField
          class="flex-1 !py-1"
          name="email"
          type="email"
          id="email"
          placeholder="email"
          label="email"
          v-model="email"
      />

      <UIFormPasswordField
          class="flex-1 !py-1"
          name="current_password"
          id="current_password"
          placeholder="Enter current password"
          label="Current password"
          v-model="currentPassword"
      />
      <UIFormPasswordField
          class="flex-1 !py-1"
          name="new_password"
          id="new_password"
          placeholder="Enter new password"
          label="New password"
          v-model="newPassword"
      />
      <UIFormPasswordField
          class="flex-1 !py-1"
          name="confirm_password"
          id="confirm_password"
          placeholder="Enter confirm password"
          label="Confirm password"
          v-model="confirmPassword"
      />

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