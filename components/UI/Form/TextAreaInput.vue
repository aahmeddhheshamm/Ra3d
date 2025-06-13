<template>
  <div>
    <label class="flex flex-col">
      <UIFormLabelField v-if="label" :label="label" />

      <textarea
          class="py-2 border border-[#CBD5E1] rounded-[8px]"
          :class="['w-full resize-none', { 'is-invalid': errorMessage }]"
          autoResize
          :readonly="readonly"
          :name="name"
          cols="50"
          :value="value"
          @input="handleInput"
          @change="handleChange"
          @blur="handleBlur"
          :placeholder="placeholder"
          :disabled="disabled"
          :dir="direction"
          :rows="rows"
      />
    </label>
    <div class="min-h-[32px] py-[8px] min-w[1px] overflow-hidden">
      <Transition name="error" mode="out-in">
        <span
            v-if="errorMessage"
            class="text-danger block font-normal text-[12px] leading-[16px] break-all text-wrap hyphens-auto"
        >
          {{ errorMessage }}
        </span>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import {useField} from 'vee-validate';
import {computed} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false
  },
  rows: {
    type: Number,
    required: false,
    default: 5
  },
  placeholder: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    required: false,
    default: false
  },
  readonly: {
    type: Boolean,
    required: false,
    default: false
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const {value, handleChange, handleBlur, errorMessage} = useField(
    () => props.name,
    undefined,
    {
      initialValue: props.modelValue,
      syncVModel: true
    }
);

const handleInput = (e) => {
  value.value = e.target.value;
  emit('update:modelValue', e.target.value);
};

const direction = computed(() => {
  if (value.value && /[._](ar|en)$/.test(props.name)) {
    return /[\u0600-\u06FF]/.test(value.value) ? "rtl" : "ltr";
  }
  return '';
});
</script>