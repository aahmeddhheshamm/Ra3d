<script setup lang="ts">
import useCpanelsFiels from "~/composables/hosts/useCpanelsFields";


definePageMeta({
  layout: "customer",
  middleware:'auth'
});



const { fields } = useCpanelsFiels()
</script>

<template>
  <div class="container my-[40px]">

  <UITitle title="Social Media Data" />


    <UIFormTable
        title="merchants"
        :columns="fields"
        list-url="v2/stores/paginate-stores"
        :url-params="filters"
        :has-filter-btn="true"
        :has-search-btn="true"
        class="text-neural-300 font-normal text-xs !p-0 !bg-transparent !rounded-none !shadow-none"
    >
      <template #tableBtns>
        <div class="overflow-hidden lg:w-[262px] w-[146px] h-[32px] lg:h-[46px] px-[8px] lg:px-[12px] py-[9px] lg:py-[13px] flex items-center gap-[6px] border border-transparent ease-in-out duration-300">
          <InputText
              class="w-full  !outline-0 !hover:outline-0 !hover:border-none !shadow-none !bg-transparent caret-merchant-secondary_color !text-merchant-textHeader"
              :feedback="false"
              placeholder="search"
              type="text"
              id="header-search-input"
              toggleMask
          />
        </div>
                     <UIButtonsFilterButton :disabled="false"  />

      </template>
      <template #id="data">
        <span>#{{data.id}}</span>
      </template>

      <template #status="data">
          <span
              class="text-[14px] font-medium text-merchant-tableContent leading-5 px-3 pt-2 pb-1 rounded-[4px]"
              :class="[data?.status === 'pending' ? 'bg-secondary-950' : data?.status === 'requested' ? 'bg-secondary-450' : data?.status === 'preparation' ? 'bg-secondary-550' : data?.status === 'shipping' ? 'bg-secondary-650' : data?.status === 'delivered' ? 'bg-secondary-950' : data?.status === 'canceled' ? 'bg-error-600' : data?.status === 'refund' ? 'bg-gray-150' : 'bg-error-200']"
          >{{ data?.status }}
          </span>
      </template>
      <template #actions="data">
        sdasda
<!--        <UIButtonsLinkButton :to="`/merchants/profile/orders/${data?.id}`" class="bg-[#155B451A] w-[23px] h-[23px] p-[4px] rounded-[8px]">-->
<!--          <IconsEyeIcon color="#155B45" class="w-[15px] h-[15px]"/>-->
<!--        </UIButtonsLinkButton>-->

      </template>
    </UIFormTable>

  </div>

</template>

<style scoped>

</style>