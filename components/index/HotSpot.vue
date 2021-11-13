<template>
  <section class="mb-12">
    <div class="flex items-center px-16 mb-5">
      <h3 class="text-4xl font-light text-black-100 mr-auto">
        熱門打卡景點
      </h3>
      <nuxt-link to="/" class="flex items-center text-orange-100">
        <span>查看更多景點</span>
        <span class="material-icons mt-0.5">chevron_right</span>
      </nuxt-link>
    </div>
    <ul class="grid grid-cols-4 gap-x-8 px-12">
      <li v-for="attraction in attractions" :key="attraction.ID">
        <img
          v-if="attraction.Picture"
          :src="attraction.Picture.PictureUrl1"
          :alt="attraction.Picture.PictureDescription1"
          class="h-48 w-full object-cover rounded-2xl mb-3"
        >
        <h2 class="text-xl font-bold mb-1">
          {{ attraction.Name }}
        </h2>
        <h4 class="text-green-300 mr-auto">
          <span class="material-icons mr-1 text-sm">fmd_good</span>
          <span>{{ attraction.City }}</span>
        </h4>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    attractions: {
      type: Array,
      default: () => ([]),
      required: true
    }
  }
}
</script>
