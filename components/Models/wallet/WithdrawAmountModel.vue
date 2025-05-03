<script setup>

const props = defineProps(['walletAmount','loading'])

const emits = defineEmits(['close', 'sendWithdrawAmount'])

const withdrawData = ref({
  amount: 0,
  payment_method: "BITCOIN",
  wallet_address: ""
})

function submitAmountWithdraw (){
  emits('sendWithdrawAmount', withdrawData )
}


</script>

<template>
  <div>
    <p class="font-semibold text-[23px] text-primary-400"><span class="text-[30px] font-normal text-error-200">{{walletAmount}} </span> USD</p>
    <p class="text-[14px] text-primary-400 font-normal">{{$t('revenueAvailableForWithdrawal')}}</p>
    <hr />
    <ValidationForm class="w-full flex flex-col gap-[32px] mt-[28px]" @submit="submitAmountWithdraw" autocomplete="off" >
      <UIFormInputField
          name="walletAddress"
          v-model="withdrawData.wallet_address"
          validation="required"
          type="text"
          label="Wallet Address"
          placeholder="Enter your wallet address"
          id="walletAddress"
      />

      <UIFormInputField
          v-model.number="withdrawData.amount"
          id="amount"
          name="amount"
          :placeholder="$t('value')"
          :label="$t('withdrawValue')"
          type="number"
          validation="required|numeric"
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