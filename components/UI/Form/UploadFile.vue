<template>
  <label class="flex flex-col">
    <div
      class="flex flex-col items-center justify-center gap-[16px] rounded-[4px] border-2 w-full h-[120px] cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 hover:border-primaryb-400"
    >

      <img
        v-if="!uploadedFile && !fileType.length"
        class="w-[48px] h-[48px]"
        src="@/assets/images/img/upload-cloud.svg"
        id="upload-cloud"
        alt="upload-cloud"
      />
      <div v-else>
        <img
          v-if="uploadedFile?.name?.includes('.pdf') || fileType === 'pdf'"
          src="@/assets/images/img/PDF_file_icon.png"
          :alt="uploadedFile?.type"
          class="w-8 inline-block me-2 "
        />
        <img
          v-else-if="uploadedFile?.name?.includes('.ppt') || fileType === 'ppt'"
          src="@/assets/images/img/ppt-icon.png"
          :alt="uploadedFile?.type"
          class="w-8 inline-block me-2 "
        />
        <img
          v-else-if="
            uploadedFile?.name?.includes('.xlsx') || fileType === 'xlsx'
          "
          src="@/assets/images/img/xlsx-icon.png"
          :alt="uploadedFile?.type"
          class="w-8 inline-block me-2 "
        />
        <img
          v-else-if="
            uploadedFile?.name?.includes('.doc') ||
            uploadedFile?.name?.includes('.docx') ||
            type === 'doc'
          "
          src="@/assets/images/img/doc-icon.png"
          :alt="uploadedFile?.type"
          class="w-8 inline-block me-2 "
        />

        <img
          v-else-if="fileType === 'image' || imagePreview"
          class="w-[50px] h-[50px]"
          :src="imagePreview || modelValue || uploadedFile?.name"
          id="upload-cloud"
          alt="upload-cloud"
        />
      </div>

      <span class="text-primary-400 font-normal text-[12px]"  v-if="!readOnly">
        <slot>أضف خطاب الضمان البنكي لتوثيق الحساب في أسرع وقت </slot>
      </span>
    </div>

    <input
      @change="(e) => uploadFile(e)"
      type="file"
      class="opacity-0 leading-0 hidden"
      v-if="!readOnly"
    />
  </label>
</template>

<script setup>
import { toast } from "vue3-toastify";
import {
  defineProps,
  defineEmits,
  ref,
  computed,
  watch,
  watchEffect,
} from "vue";
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  accept: {
    type: String,
    default: "",
  },
  readOnly:{
    type:Boolean,
    required:false,
    default:false
  }
});
const emit = defineEmits(["update:modelValue"]);
const uploadedFile = ref("");
const imagePreview = ref("");
const fileType = ref("");
const acceptedExtensions = computed(() => {
  return props.accept.split(",").filter((ext) => ext !== "");
});

const uploadFile = (e) => {
  imagePreview.value = "";
  const file = e.target.files[0];
  const fileExtension = file.name.split(".").pop();
  if (acceptedExtensions.value.length && !acceptedExtensions.value.includes(fileExtension)) {
    toast.error("File type not supported");
    return;
  }
  uploadedFile.value = file;
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
};

watchEffect(() => {
  if (typeof props.modelValue === "string") {
    const extenstion = props.modelValue.split(".").pop();
    if (!extenstion) return;
    if (extenstion === "pdf") {
      fileType.value = "pdf";
    } else if (extenstion === "ppt") {
      fileType.value = "ppt";
    } else if (extenstion === "xlsx") {
      fileType.value = "xlsx";
    } else if (extenstion === "doc" || extenstion === "docx") {
      fileType.value = "doc";
    } else {
      fileType.value = "image";
    }
  }
});
</script>

<style>
</style>