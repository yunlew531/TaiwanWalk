<template>
  <div class="border-b border-gray-100">
    <header class="header flex items-center px-12 py-6 mx-auto">
      <h1 class="text-xl font-mochiy text-green-100 tracking-wide mr-auto">
        <nuxt-link to="/" class="flex items-center">
          <img src="@/assets/images/logo.png" alt="Taiwan Walk" class="mr-1.5">
          <span>台灣走走 • Tai Walk</span>
        </nuxt-link>
      </h1>
      <ul class="flex items-center font-sans text-lg text-green-300 tracking-wide -mr-5">
        <li class="duration-200 mr-5 hover:text-green-100">
          <nuxt-link to="/">
            探索景點
          </nuxt-link>
        </li>
        <li class="duration-200 mr-5 hover:text-green-100">
          <nuxt-link to="/">
            節慶活動
          </nuxt-link>
        </li>
        <li class="duration-200 mr-5 hover:text-green-100">
          <nuxt-link to="/">
            品嚐美食
          </nuxt-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss">
.header {
  max-width: 1200px;
}
</style>
