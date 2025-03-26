<script setup lang="ts">
import useCpanelsFiels from "~/composables/hosts/useCpanelsFields";

definePageMeta({
  layout: "customer",
  middleware:'auth'
});

const { fields } = useCpanelsFiels()

const countries = ref([
  {
    title: 'egypt',
    id: 1
  },
  {
    title: 'sa',
    id: 2
  },
])

const dropdownValue = ref('')
</script>

<template>
  <div class="container my-[40px]">

  <UITitle title="100% Checked Email List" />

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
        <div class="flex flex-col ">
          <UIFormLabelField label="Hosting" />
          <div class="overflow-hidden lg:min-w-[222px] w-[122px]  flex items-center gap-[6px] border border-transparent ease-in-out duration-300">
            <InputText
                class="w-full !outline-0 !hover:outline-0 !hover:border-none !shadow-none !bg-transparent "
                :feedback="false"
                placeholder="search"
                type="text"
                id="header-search-input"
                toggleMask
            />
          </div>
        </div>
        <div class="flex flex-col ">
          <UIFormLabelField label="Provider" />
          <div class="overflow-hidden lg:min-w-[222px] w-[122px]  flex items-center gap-[6px] border border-transparent ease-in-out duration-300">
            <InputText
                class="w-full !outline-0 !hover:outline-0 !hover:border-none !shadow-none !bg-transparent "
                :feedback="false"
                placeholder="search"
                type="text"
                id="header-search-input"
                toggleMask
            />
          </div>
        </div>

        <div class="">
          <UIFormLabelField label="Type" />
          <Dropdown
              v-model="dropdownValue"
              filter
              empty-filter-message="No result"
              empty-message="No available options"
              countryLoading
              :options="countries"
              option-value="id"
              optionLabel="title"
              placeholder="Select country"
              :highlightOnSelect="true"
              class="bg-white lg:min-w-[222px] w-[122px]  font-medium text-sm !rounded-[8px]"
          />
        </div>
        <div class="">
          <UIFormLabelField label="country" />
          <Dropdown
              v-model="dropdownValue"
              filter
              empty-filter-message="No result"
              empty-message="No available options"
              countryLoading
              :options="countries"
              option-value="id"
              optionLabel="title"
              placeholder="Select country"
              :highlightOnSelect="true"
              class="bg-white lg:min-w-[222px] w-[122px]  font-medium text-sm !rounded-[8px]"
          />
        </div>
        <div class="">
          <UIFormLabelField label="Seller" />
          <Dropdown
              v-model="dropdownValue"
              filter
              empty-filter-message="No result"
              empty-message="No available options"
              countryLoading
              :options="countries"
              option-value="id"
              optionLabel="title"
              placeholder="Select country"
              :highlightOnSelect="true"
              class="bg-white lg:min-w-[222px] w-[122px]  font-medium text-sm !rounded-[8px]"
          />
        </div>

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