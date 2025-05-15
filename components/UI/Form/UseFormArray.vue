<!-- UIFormUseFormArray.vue -->
<script setup>
import { useFieldArray } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const { remove, push, fields } = useFieldArray(props.name)

// Expose these methods to parent
defineExpose({
  remove,
  push,
  fields
})
</script>

<template>
  <slot
      :remove="remove"
      :push="push"
      :fields="fields"
  />
</template>