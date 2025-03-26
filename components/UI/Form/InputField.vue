<template>
  <div class="">
    <UIFormLabelField v-if="label" :label="label" />
    <Field
        :name="name"
        :rules="validation"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :model-value="modelValue"
        validate-on-input
        validate-on-change
        validate-on-model-update
        validate-on-blur
        v-slot="{ handleChange, value, errors, field }"
        @input="$emit('update:modelValue', $event.target.value)"
        :modelValue="modelValue"
    >
      <div class="p-input-icon-right flex-grow  items-center relative">
        <template v-if="errors.length > 0">
          <slot :icon="true" name="icon"></slot>
        </template>
        <template v-else>
          <slot :icon="false" name="icon"></slot>
        </template>
        <InputText
            @keyup="$emit('write', value)"
            class="border-2 py-2"
            :class="['w-full', { 'is-invalid': errors.length > 0 }]"
            :feedback="false"
            :placeholder="placeholder"
            :type="type"
            :id="id + name"
            :disabled="disabled"
            toggleMask
            @update:modelValue="handleChange"
            @blur="handleChange"
            v-bind="field"
            @keydown="handleSpace"
            autocomplete="new-password"
            :readonly="readonly"
        />
      </div>
    </Field>
    <ErrorMessage :name="name" class="!text-red-500 text-xs mt-1" />

  </div>
</template>
<script>
export default {
  name: "Input",
  props: {
    name: {
      type: String,
    },
    id: {
      type: String,
    },
    validation: {
      type: String,
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    modelValue: {
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
    hasValidationField: {
      type: Boolean,
      required: false,
      default: true,
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  methods: {
    handleSpace(event) {
      if (event.keyCode === 32 && event.target.value.length < 1) {
        event.preventDefault();
      }
      if (event.target.name === 'number') {
        if (event.key === 'e') {
          event.preventDefault();
        }
      }
    },
  },
};
</script>
