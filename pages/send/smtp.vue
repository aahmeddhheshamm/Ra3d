<script setup lang="ts">
import useSmtpFields from "~/composables/send/useSmtpFields";

definePageMeta({
  layout: "customer",
  middleware:'auth'
});

const { fields } = useSmtpFields()

</script>

<template>
  <div class="container my-[40px]">

  <UITitle title="SMTP" />

    <UIFormTable
        title="merchants"
        :columns="fields"
        list-url="smtp/smtp"
        :url-params="filters"
        :has-filter-btn="true"
        :has-search-btn="true"
        class="text-neural-300 font-normal text-xs !p-0 !bg-transparent !rounded-none !shadow-none"
    >

      <template #user="data">
        <span class="text-neural-300 font-medium text-[15px]">{{data.user?.username}}</span>
      </template>

      <template #status="data">
          <span
              class="text-[12px] font-medium text-white leading-5 px-3 pt-2 pb-2 rounded-[4px]"
              :class="[data?.status == 'Unsold' ? 'bg-blue-400' : data?.status == 'Sold' ? 'bg-error-200' : 'bg-error-200']"
          >{{ data?.status }}
          </span>
      </template>
    </UIFormTable>

  </div>

</template>

<style scoped>

</style>