<script setup>
import Spinner from "~/components/UI/LoaderSpinner.vue";
definePageMeta({
  layout: "seller",
  middleware:'auth'
});
import useNotifications from "~/composables/useNotifications.js";
import { ref, watch } from "vue";

const {
  notifications,
  pending,
  refresh,
  page: currentPage,
  perPage: itemsPerPage
} = await useNotifications();

const pagination = ref({
  total: 0,
  next: null,
  previous: null
});

// Watch for changes in notifications to update pagination
watch(() => notifications.value, (newVal) => {
  if (newVal) {
    pagination.value = {
      total: newVal.count,
      next: newVal.next,
      previous: newVal.previous
    };
  }
}, { immediate: true });

// Watch for changes in perPage to refresh data
watch(itemsPerPage, (newVal) => {
  currentPage.value = 1; // Reset to first page when changing items per page
  refresh();
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    refresh();
  }
};

const nextPage = () => {
  if (pagination.value.next !== null) {
    currentPage.value++;
    refresh();
  }
};
</script>

<template>
  <div class="">
    <UITitle title="Notifications" />

    <span v-if="pending" class="flex justify-center items-center">
      <Spinner></Spinner>
    </span>
    <div v-else>
      <div v-if="notifications?.results?.length">
        <div v-for="notification in notifications.results" :key="notification.id" class="flex flex-col gap-4 mb-4">
          <UIBox class="flex flex-col gap-4">
            <div class="flex items-center gap-2">
              <p class="font-bold text-[12px] md:text-[18px]">Message: </p>
              <p class="font-medium text-[12px] md:text-[18px]">{{ notification.message }}</p>
            </div>
          </UIBox>
        </div>

        <div class="flex flex-col justify-between items-center gap-2 mt-12">
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
                      :fill="currentPage == 1 ? 'rgba(25,58,42)' : '#193a2a'"
                  />
                </svg>
              </span>
              <div
                  class="rounded-full text-black flex justify-center items-center font-normal text-sm px-2"
              >
                {{ currentPage }} / {{ Math.ceil(pagination.total / itemsPerPage) }}
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
                      currentPage == Math.ceil(pagination.total / itemsPerPage)
                        ? 'rgba(25,58,42)'
                        : '#193a2a'
                    "
                  />
                </svg>
              </span>
            </div>
            <select
                v-model="itemsPerPage"
                class="py-1 bg-white text-black px-3 text-sm border-0 outline-0 border-b-2 border-gray-200 focus:shadow-none focus:ring-0"
            >
              <option v-for="i in [10, 25, 50, 100]" :value="i">{{ i }}</option>
            </select>
          </div>

          <p class="text-xs font-normal text-black/60">
            Showing {{ notifications?.results?.length }} of {{ pagination.total }} entries
          </p>
        </div>
      </div>
      <UIBox v-else class="flex items-center justify-center">
        <span class="text-lg text-black">No Notifications Found</span>
      </UIBox>
    </div>
  </div>
</template>

<style scoped>
/* Your styles here */
</style>