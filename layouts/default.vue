<template>
  <div>
    <Header />
    <div class="container mx-auto pt-20">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
.container {
  min-height: calc(100vh - 64px);
}
</style>
