<template>
  <div class="fixed inset-0 w-[100vw] h-[100vh] z-50 bg-white flex items-center justify-center loading-indicator-special">
    <SharedLodersSpinner/>
  </div>
</template>
<style >
body:has(.loading-indicator-special){
 width:100vw;
  height:100vh;
  overflow:hidden;
}
</style>