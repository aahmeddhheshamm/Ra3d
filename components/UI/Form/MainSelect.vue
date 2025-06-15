<template>
  <div class="flex flex-col ">
  <UIFormLabelField v-if="label" :label="label" />

  <Listbox v-model="inputVal" :multiple="multiple">
    <div class="relative">
      <ListboxButton
        class="relative flex items-center justify-between w-full min-w-[180px] border border-gray-300 rounded-xs bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-primaryb-500 focus-visible:ring-1 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-primaryb-300 sm:text-sm"
        v-slot="{ open }"
      >
        <span
          class="block truncate"
          :class="
            inputPlaceholder == placeholder ? 'text-gray-400' : 'text-gray-900'
          "
        >
          {{ inputPlaceholder }}
        </span>
        <div v-if="loading" class="flex justify-center">
          <div
            class="loading w-3 h-3 border-2 border-primaryb-200 border-t-transparent rounded-full animate-spin"
          ></div>
        </div>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronDownIcon
            v-if="!open"
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <ChevronUpIcon
            v-else
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="listbox absolute mt-1 max-h-60 w-full overflow-auto rounded-xs bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50"
          @scroll="fetchWhenScroll"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="option in items"
            :key="option[optionKey]"
            :value="option[optionKey]"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-primaryb-50 text-black' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
                >{{ option.name }}</span
              >
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-primaryb-600"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
          <div v-if="items.length === 0" class="flex justify-center py-2">
            <span class="text-gray-400">No data found</span>
          </div>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
  <ErrorMessage :name="name" class="!text-red-500 text-xs mt-1" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/vue/20/solid";

import { useField, ErrorMessage } from "vee-validate";
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    default: "",
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
    default: "",
  },
  optionKey: {
    type: String,
    default: "id",
  },
  validation: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
});
const items = ref([]);
const meta = ref({});
const loading = ref(false);

const { value: inputVal } = useField(props.name, props.validation, {
  syncVModel: true,
  checkedValue: props.modelValue,
});

const inputPlaceholder = computed(() => {
  if (!inputVal.value || inputVal.value.length === 0) {
    return props.placeholder;
  }
  if (props.multiple) {
    return props.modelValue
      .map((val) => {
        return items?.value.find((option) => option[props.optionKey] === val)
          ?.name;
      })
      .join(",");
  }
  return items?.value.find((item) => item[props.optionKey] == inputVal.value)
    ?.name;
});

const fetchOptions = async () => {

  const runtimeConfig = useRuntimeConfig();

  const baseUrl = runtimeConfig.public.baseUrl;
  if(!items.value?.length) {
    const request = await fetch(baseUrl + props.url);
    const data = await request.json();
    items.value.push(...data.value.data);
    meta.value = data.value.data.meta;
  }

};

const fetchWhenScroll = (e) => {
  if (!props.url) {
    return;
  }
  const bottomOfWindow =
    e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      fetchOptions();
    }
  });
  if (
    bottomOfWindow &&
    meta.value.current_page < meta.value.last_page &&
    !loading.value
  ) {
    observer.observe(e.target);
  }
};
watch(
  () => props.url,
  (val) => {
    if (!val) return;
    items.value = [];
    meta.value = {};
    fetchOptions();
  },
  { immediate: true }
);
watch(
  () => props.options,
  (val) => {
    items.value = val;
  },
  { immediate: true }
);
</script>

<style scoped>
.listbox::-webkit-scrollbar {
  width: 5px;
}
.listbox::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.listbox::-webkit-scrollbar-thumb {
  background: #888;
}
</style>