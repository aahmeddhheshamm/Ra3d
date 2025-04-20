<template>
  <label class="flex flex-col items-center justify-center relative cursor-pointer"
  :class="{'overflow-hidden':imagePreview}"
  >
      <img
          v-if="imagePreview"
          class="w-full h-full object-cover absolute inset-0"
          :src="imagePreview"
          id="upload-cloud"
          alt="upload-cloud"
          onerror="this.src='/default-cover.png'"
      />

    <input
        @change="(e) => uploadFile(e)"
        type="file"
        class="opacity-0 leading-0 hidden"
        v-if="!readOnly"
    />
     <span class="font-english font-normal leading-normal text-white text-[14px] lg:text-[16px]">Upload Image</span>
  </label>
</template>

<script setup>
import { toast } from "vue3-toastify";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,

  },
  accept: {
    type: String,
    required: true,

  },
  readOnly: {
    type: Boolean,
    required: true,

  }
})

const emit = defineEmits(["update:modelValue"]);
const uploadedFile = ref("");
const imagePreview = ref("");
const fileType = ref("");
const acceptedExtensions = computed(() => {
  return props.accept?.split(",").filter((ext) => ext !== "") || [];
});

const uploadFile = (e) => {
  if (e?.target?.files?.[0]?.type?.includes('image/')){

  imagePreview.value = "";
  const file = e.target.files?.[0];
  const fileExtension = file?.name?.split(".").pop();
  if (acceptedExtensions.value.length && !acceptedExtensions.value.includes(fileExtension)) {
    toast.error("File type not supported");
    return;
  }
  uploadedFile.value = file;
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  fileType.value = "";
  emit("update:modelValue", file);
  if (file.type.includes("image")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
    fileType.value = "image";
  }
    }
  e.target.value = null
};
if (typeof props.modelValue === "string") {
  imagePreview.value = props.modelValue;
}
</script>

<style>
</style>