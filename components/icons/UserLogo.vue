<script setup lang="ts">

defineProps({
  color: {
    type: String,
    default:"#FF7733",
    required: false,
  }
})

</script>

<template>
  <svg width="18px" height="18px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="vuesax/linear/profile-circle">
      <g id="profile-circle">
        <path id="Vector" d="M16.1603 17.04C16.067 17.0266 15.947 17.0266 15.8403 17.04C13.4936 16.96 11.627 15.04 11.627 12.68C11.627 10.2666 13.5736 8.30664 16.0003 8.30664C18.4136 8.30664 20.3736 10.2666 20.3736 12.68C20.3603 15.04 18.507 16.96 16.1603 17.04Z" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path id="Vector_2" d="M24.987 25.8401C22.6137 28.0134 19.467 29.3334 16.0003 29.3334C12.5337 29.3334 9.38701 28.0134 7.01367 25.8401C7.14701 24.5867 7.94701 23.3601 9.37367 22.4001C13.027 19.9734 19.0003 19.9734 22.627 22.4001C24.0537 23.3601 24.8537 24.5867 24.987 25.8401Z" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path id="Vector_3" d="M16.0003 29.3334C23.3641 29.3334 29.3337 23.3639 29.3337 16.0001C29.3337 8.63628 23.3641 2.66675 16.0003 2.66675C8.63653 2.66675 2.66699 8.63628 2.66699 16.0001C2.66699 23.3639 8.63653 29.3334 16.0003 29.3334Z" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </g>
  </svg>

</template>