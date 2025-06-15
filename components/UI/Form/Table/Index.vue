<script setup>
import Spinner from '@/components/UI/LoaderSpinner.vue'
import { ref, computed, watchEffect, onMounted, watch } from 'vue'
import useFetch from '@/composables/useFetch'
import { changeDateFormat } from '@/composables/global.js'
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import {useLocalePath} from "#i18n";
const localPath = useLocalePath();
const {user} = useAuth()

const {$intercept} = useNuxtApp();
const emits = defineEmits(['openPopup', 'openFilter', 'reorder'])

const props = defineProps({
  columns: {
    type: [{
      key: { type: String},
      label: { type: String},
      ordering: { type: String},
      type: { type: String},
    }]
  },
  items: {
    type: []
  },
  listUrl: {
    type: String
  },

  removeHeader: {
    type: Boolean,
    default: false
  },

  actionBtnTitle: {
    type: String,
    default: ''
  },
  actionBtnLoading: {
    type: Boolean
  },
  hasFilterBtn: {
    type: Boolean,
    default: true
  },
  hasSearchBtn: {
    type: Boolean,
    default: true
  },
  hasPagination: {
    type: Boolean,
    default: true
  },

  actions: {
    type: []
  },
  urlParams: {
    type: Object,
    default: {}
  },
  reloadData: {
    type: Boolean
  },
  customClass: {
    type: Boolean
  },
  boxClass: {
    type: String
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  hasResultsArr: {
    type: Boolean,
    default: false
  }
})

const tableData = ref(props.items || [])

const pagination = ref({
  total: null,
  next: null,
  previous: null,
  perPage: 10,
  page: 1
})

const page = ref(1)
const perPage = ref(10)

const loadingData = ref()
const placeholderData = ref()
const urlParams = computed(() => props.urlParams)

watch(urlParams, () => {
  page.value = 1
})

if (props.listUrl && !props.items) {

  if (!props.hasPagination) {

      const { data, isFetching, isSuccess, isLoading, isPlaceholderData, refetch } = useFetch({
      queryKey: [props.listUrl],
      queryFn: async () => {
        return $intercept(`${props.listUrl}`, undefined,{
          // search: searchQuery.value,
        })
      }
    })

    loadingData.value = isLoading.value
    watchEffect(() => {
      if (isSuccess) {
        tableData.value = data.value?.data?.data
        loadingData.value = isLoading.value
        placeholderData.value = isPlaceholderData.value
      }
    })
  } else {
    const { data, isFetching, isSuccess, isLoading, isPlaceholderData, refetch } = useFetch({
      queryKey: [props.listUrl, page, perPage, urlParams],
      queryFn: async () => {
        return $intercept(`${props.listUrl}`, undefined, {
          page: page.value,
          page_size: perPage.value,
          ...urlParams.value
        })
      }
    })

    loadingData.value = isLoading.value
    watchEffect(() => {
      if (isSuccess) {
        console.log('data.value', data.value)
        tableData.value = data.value?.results
        pagination.value.total = data.value?.count
        pagination.value.next = data.value?.next
        pagination.value.previous = data.value?.previous
        loadingData.value = isLoading.value
        placeholderData.value = isPlaceholderData.value

      }
    })
  }
}

const prevPage = () => {
  page.value = Math.max(page.value - 1, 1)
}

const nextPage = () => {
  if (pagination.value.next === null) {
    return
  } else if (!placeholderData.value) {
    page.value = page.value + 1
  }
}

const actions = computed(() => {
  const hasPermission = props.actions?.some(action => 'permission' in action);

  if (hasPermission) {
    return props.actions.filter(action =>
        action.permission?.includes(user?.value?.status)
    );
  }

  return props.actions;
});

// const cancelSearch = () => {
//   showSearchInput.value = false
//   searchQuery.value = ''
// }


</script>

<template>
<!--  <ModelsDeleteModel-->
<!--      v-model="openDeleteModal"-->
<!--      @deleteFromServer=""-->
<!--  />-->
  <div class="overflow-auto">
    <UIBox :class="['overflow-auto !rounded-[20px]', boxClass]">
    <!-- start table -->
    <template #header v-if="showHeader">
      <div v-if="hasFilterBtn"
      >
        <slot name="filterOptions">

        </slot>

      </div>
    </template>

    <template #default>
      <div class="">
<!--      <div class="overflow-x-auto">-->
        <table class="w-full" :class="{ 'border-separate border-spacing-y-5': customClass }">
          <!-- table header -->
          <thead v-if="!removeHeader">
          <tr class="whitespace-nowrap bg-gray-100">
            <th
                v-for="(column, index) in columns"
                :key="column.key"
                class=" transition-all duration-500 py-2"
            >
              <div class="flex w-full items-center gap-[0.315rem]">

                <h6 class="text-[14px] font-medium text-gray-600 leading-[20px] capitalize">{{ $t(column.label) }}</h6>
              </div>
            </th>
            <th v-if="actions?.length">
              <div class="flex w-full items-center gap-[0.315rem]">
                <h6 class="text-[14px] font-medium text-gray-600 leading-[20px] capitalize">actions</h6>
              </div>
            </th>
          </tr>
          </thead>

          <!-- table body -->
          <tbody v-if="loadingData && columns">
          <tr>
            <td :colspan="`${columns.length + 1}`" class="p-6">
              <span class="flex justify-center items-center">
                <Spinner></Spinner>
              </span>
            </td>
          </tr>
          </tbody>

          <tbody v-else-if="!tableData?.length && columns">
          <tr>
            <td :colspan="`${columns.length + 1}`" class="p-6 text-center">
              <span class="text-xs text-neural-300">No Records Found</span>
            </td>
          </tr>
          </tbody>

          <tbody v-else>
          <template v-for="(element, index) in tableData" :key="element.id">
            <tr class="whitespace-nowrap hover:bg-[#f8f8f8]">
              <td v-for="column in columns" :key="column.key" :class="{ 'py-[14px]': !customClass }">
                <slot v-if="column.key" :name="`${column.key}`" v-bind="element">
                  <div class="flex gap-2 items-center *:!text-sm">
                    <p
                        v-if="column.type === 'rounded-char'"
                        class="text-sm capitalize text-black"
                    >
                      {{ element[column.key] || '—' }}
                    </p>
                    <p v-else-if="column.type === 'date'" class="text-[14px] font-medium text-merchant-tableContent capitalize leading-5 ">
                      {{ changeDateFormat(element[column.key]) }}
                    </p>
                    <p v-else class="text-[14px] font-medium text-merchant-tableContent leading-5">
                      {{ element[column.key] || '—' }}
                    </p>
                  </div>
                </slot>
              </td>
              <td v-if="actions?.length">
                <slot>
                  <Menu as="div">
                    <MenuButton class="relative" id="headlessui-menu-button-guest">
                      <IconsActionsIcon class="w-[18px] h-[18px] " />
                      <transition
                          enter-active-class="transition ease-out duration-100"
                          enter-from-class="transform opacity-0 scale-95"
                          enter-to-class="transform opacity-100 scale-100"
                          leave-active-class="transition ease-in duration-75"
                          leave-from-class="transform opacity-100 scale-100"
                          leave-to-class="transform opacity-0 scale-95"
                      >
                        <MenuItems class="absolute z-10 bg-white rounded-[10px] end-0 overflow-hidden  transition-[opacity,margin] duration  min-w-48  shadow-lg shadow-black/10  ">
                          <div v-for="(action, key1) in actions" :key="key1" class=""
                          >
                           <MenuItem
                              v-slot="{ active }"
                              class="first:pt-0 last:pb-0 block"
                              @click="action.action(element)"
                          >
                            <span
                                class="flex items-center gap-x-3.5 py-2 px-3  text-sm text-black hover:bg-[#f8f8f8] focus:outline-none focus:bg-none cursor-pointer"
                            >
                            <div class="flex items-center justify-between gap-3 p-2">
                              <span class="w-4 flex justify-center" v-html="action.icon"></span>
                              <span>{{ action.text }}</span>
                            </div>
                          </span>
                          </MenuItem>
                          </div>

                        </MenuItems>
                      </transition>
                    </MenuButton>
                  </Menu>
                </slot>

<!--                <div-->
<!--                    :id="`dropdown-${element.id}-${index}`"-->
<!--                    class="hs-dropdown flex justify-center items-center relative"-->
<!--                    :class="`item-${element.id}`"-->
<!--                >-->
<!--                  <button-->
<!--                      @click="displayMenuOnTop(`item-${element.id}`)"-->
<!--                      id="hs-dropdown-custom-icon-trigger"-->
<!--                      type="button"-->
<!--                      class="hs-dropdown-toggle hs-dropdown-open:bg-primary-700 flex justify-center items-center size-9 text-sm font-semibold   text-gray-800 shadow-sm  disabled:opacity-50 disabled:pointer-events-none "-->
<!--                  >-->
<!--                    <svg-->
<!--                        class="flex-none size-4 hs-dropdown-open:text-white text-gray-600"-->
<!--                        xmlns="http://www.w3.org/2000/svg"-->
<!--                        width="24"-->
<!--                        height="24"-->
<!--                        viewBox="0 0 24 24"-->
<!--                        fill="none"-->
<!--                        stroke="currentColor"-->
<!--                        stroke-width="2"-->
<!--                        stroke-linecap="round"-->
<!--                        stroke-linejoin="round"-->
<!--                    >-->
<!--                      <circle cx="12" cy="12" r="1" />-->
<!--                      <circle cx="12" cy="5" r="1" />-->
<!--                      <circle cx="12" cy="19" r="1" />-->
<!--                    </svg>-->
<!--                  </button>-->
<!--                  <ul-->
<!--                      :aria-labelledby="`hs-dropdown-with-icons-${element.id}-${index}`"-->
<!--                      class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md shadow-black/10 rounded-lg p-2 mt-2 absolute z-[1000]"-->
<!--                  >-->
<!--                    <template v-for="(action, key1) in actions" :key="key1">-->
<!--                      <li-->
<!--                          class="first:pt-0 last:pb-0 block"-->
<!--                          @click="action.action(element)"-->
<!--                      >-->
<!--                          <span-->
<!--                              class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-black hover:bg-primary-50 focus:outline-none focus:bg-primary-100 cursor-pointer"-->
<!--                          >-->
<!--                            <div class="flex items-center justify-between gap-3">-->
<!--                              <span class="w-4 flex justify-center" v-html="action.icon"></span>-->
<!--                              <span>{{ action.text }}</span>-->
<!--                            </div>-->
<!--                          </span>-->
<!--                      </li>-->
<!--                    </template>-->
<!--                  </ul>-->
<!--                </div>-->
              </td>

            </tr>
          </template>
          </tbody>
        </table>
      </div>

      <div
        class="flex flex-col  justify-between items-center gap-2 mt-12 "
        v-if="hasPagination && !loadingData && tableData?.length"
      >
        <div class="flex items-center gap-4">
          <p class="text-black font-normal">Page</p>
          <div class="flex items-center gap-[0.9rem]">
            <span class="cursor-pointer px-2 py-4" @click="prevPage">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="4"
                height="6"
                viewBox="0 0 4 6"
                fill="none"
              >
                <path
                  d="M3.5 5.03105L3.5 1.20527C3.5 0.778098 2.99894 0.547643 2.6746 0.825646L0.4429 2.73854C0.210094 2.93808 0.210094 3.29824 0.4429 3.49779L2.6746 5.41068C2.99894 5.68868 3.5 5.45823 3.5 5.03105Z"
                  :fill="page == 1 ? 'rgba(25,58,42)' : '#193a2a'"
                />
              </svg>
            </span>
            <div
              class="rounded-full text-black  flex justify-center items-center font-normal text-sm px-2"
            >
              {{ page }} / {{ Math.ceil(pagination?.total / perPage) }}
            </div>
            <span class="cursor-pointer px-2 py-4" @click="nextPage">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="4"
                height="6"
                viewBox="0 0 4 6"
                fill="none"
              >
                <path
                  d="M0.5 1.20527L0.5 5.03105C0.5 5.45823 1.00106 5.68868 1.3254 5.41068L3.5571 3.49779C3.78991 3.29824 3.78991 2.93808 3.5571 2.73854L1.3254 0.825646C1.00106 0.547643 0.5 0.778098 0.5 1.20527Z"
                  :fill="
                    page == Math.ceil(pagination?.total / perPage)
                      ? 'rgba(25,58,42)'
                      : '#193a2a'
                  "
                />
              </svg>
            </span>
          </div>
          <select
            v-model="perPage"
            class="py-1 bg-white text-black px-3 text-sm border-0 outline-0 border-b-2 border-gray-200 focus:shadow-none focus:ring-0"
          >
            <option v-for="i in [10, 25, 50, 100]">{{ i }}</option>
          </select>
        </div>

        <p class="text-xs font-normal text-black/60">
          Showing {{ tableData?.length }} results of {{ pagination.total }} entries
        </p>
      </div>
    </template>
  </UIBox>
  </div>
</template>

<style scoped>
select {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M1.90502 1.27926C1.70373 1.06996 1.37084 1.06338 1.16141 1.26467C1.05413 1.36787 1.00009 1.50579 1.00009 1.64384C1.00009 1.77505 1.04874 1.90626 1.14681 2.00828L4.43364 5.42657C4.53277 5.52965 4.66976 5.58789 4.8128 5.58789C4.95572 5.58789 5.09271 5.52965 5.19184 5.42657L8.47866 2.00828C8.67995 1.79897 8.67351 1.46595 8.46407 1.26467C8.25463 1.06338 7.92174 1.06996 7.72046 1.27926L4.8128 4.30327L1.90502 1.27926Z" fill="%230376F9" stroke="%230376F9" stroke-width="0.3"/></svg>');
  background-position: right 0px center;
  background-repeat: no-repeat;
  background-size: 0.47938rem 0.47656rem;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  font-family: Lexend;
}

</style>
