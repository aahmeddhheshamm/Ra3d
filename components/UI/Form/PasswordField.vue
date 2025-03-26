<template>
  <div class="">
    <UIFormLabelField v-if="label" :label="label" />
    <Field
        :name="name"
        :rules="validation"
        validate-on-input
        validate-on-change
        validate-on-model-update
        validate-on-blur
        v-slot="{ handleChange, value, errors, field }"
        @input="$emit('update:modelValue', $event.target.value)"
        :modelValue="modelValue"
    >
      <div class=" flex-grow items-center relative">
        <slot :icon="errors.length > 0" name="icon">
          <div
              class="absolute inset-y-0 flex items-center px-3 cursor-pointer rtl:left-0 ltr:right-0"
              @click="togglePassword"
          >
            <IconsEyeFill class="w-[18px] h-[18px] fill-gray-600" v-if="passwordType === 'password'"/>
            <LazyIconsEyeOffFill class="w-[18px] h-[18px] fill-gray-600" v-else/>
          </div>
        </slot>
        <InputText
            @keyup="$emit('write', value)"
            class="border-2 py-2 password-input"
            :class="['w-full', { 'is-invalid': errors.length > 0 }]"
            :feedback="false"
            :placeholder="placeholder"
            :type="passwordType"
            :id="id + name"
            :disabled="disabled"
            toggleMask
            @update:modelValue="handleChange"
            @blur="handleChange"
            @keydown="handleSpace"
            v-bind="field"
            autocomplete="new-password"
            :readonly="readonly"
        />
      </div>

    </Field>

    <ErrorMessage :name="name" class="!text-red-500 text-xs mt-1" />
  </div>
</template>
<script setup>
import { ErrorMessage, Field } from "vee-validate";
const props = defineProps({
  modelValue: {
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  validation: {
    type: String,
    default: "",
  },
});
const passwordType = ref('password')

function togglePassword() {
  if (!props.modelValue) {
    return
  }
  passwordType.value === 'password' ? passwordType.value = 'text' : passwordType.value = 'password'
}

function handleSpace(event) {
  if (event.keyCode === 32 && event.target.value.length < 1) {
    event.preventDefault();
  }
  if(event.target.name === 'number'){
    if(event.key === 'e'){
      event.preventDefault();
    }
  }
}
</script>
