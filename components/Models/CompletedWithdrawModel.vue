<script setup>

const props = defineProps(['loading'])

const emits = defineEmits(['close', 'sendCompletedWithdrawAmount'])

const withdrawData = ref({
  transaction_id: ""
})

function submitAmountWithdraw (){
  emits('sendCompletedWithdrawAmount', withdrawData )
}


</script>

<template>
  <div>

    <ValidationForm class="w-full flex flex-col gap-[32px] mt-[28px]" @submit="submitAmountWithdraw" autocomplete="off" >
      <UIFormInputField
          name="transactionId"
          v-model="withdrawData.transaction_id"
          validation="required"
          type="text"
          label="Transaction ID"
          placeholder="Enter Transaction ID"
          id="transactionId"
      />

      <hr />
      <div class="flex items-center gap-[16px]">
      <UIButtonsPrimaryButton
          type="submit"
          :loading="loading"
          :disabled="loading"
          submitTitle="send"
          :class="[{ 'btn-disabled': loading }, '!px-4 !py-[9px] !text-[14px] !rounded-[4px] w-fit !bg-primary-355']"
      />
      <UIButtonsPrimaryButton
          type="button"
          :disabled="loading"
          submitTitle="cancel"
          :class="[{ 'btn-disabled': loading }, '!bg-error-200 !text-white !px-4 !py-[9px] !text-[14px] !rounded-[4px] w-fit']"
          @click="emits('close')"
      />

      </div>

    </ValidationForm>

  </div>
</template>