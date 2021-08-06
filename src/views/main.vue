<template>
  <div class="site-wrapper">
    <!-- <main-navbar /> -->
    <main-sidebar />
    <div class="site-content__wrapper">
      <main-content />
    </div>
  </div>
</template>

<script>
  // import MainNavbar from '@/views/main-navbar'
  import MainSidebar from '@/views/main-sidebar'
  import MainContent from '@/views/main-content'
  export default {
    components: {
      // MainNavbar,
      MainSidebar,
      MainContent
    },
  }
</script>

<style>
</style>