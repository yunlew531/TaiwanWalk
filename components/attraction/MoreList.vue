<template>
  <section>
    <div class="flex items-center px-16 mb-5">
      <h3 class="text-4xl font-light text-black-100 mr-auto">
        {{ title }}
      </h3>
      <nuxt-link to="/" class="flex items-center text-orange-100">
        <span>更多宜蘭縣景點</span>
        <span class="material-icons mt-0.5">chevron_right</span>
      </nuxt-link>
    </div>
    <ul class="grid grid-cols-4 gap-x-8 px-12">
      <li v-for="location in 4" :key="location">
        <img src="https://images.unsplash.com/photo-1636705502546-a08a1f3750bf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80" alt="" class="h-48 w-full object-cover rounded-2xl mb-3">
        <h2 class="text-xl font-bold mb-1">
          龜山島牛奶海
        </h2>
        <h4 class="text-green-300 mr-auto">
          <span class="material-icons mr-1 text-sm">fmd_good</span>
          <span>新北市</span>
        </h4>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '標題',
      requied: true
    }
  }
}
</script>
