<script setup>

</script>
<template>

  <div class="grid app-layout absolute w-full min-h-full">
    <!-- Sidebar -->
    <div class="lg:block hidden">
      <layoutsSellerSidebar />
    </div>
    <!-- Main content -->
    <div class="flex flex-col flex-column-fluid w-full overflow-x-hidden gap-[40px]">
      <layoutsSellerTheHeader />
      <div class="mx-[20px] xl:mx-[30px]  max-w-full overflow-x-hidden relative">
       <slot/>
      </div>
    </div>
  </div>
</template>

<style>

.app-layout {
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .app-layout {
    grid-template-columns: auto 1fr;
  }
}
</style>
