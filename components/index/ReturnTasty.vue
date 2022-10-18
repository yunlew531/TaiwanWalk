<template>
  <section class="mb-32">
    <div class="flex items-center px-16 mb-5">
      <h3 class="text-4xl font-light text-black-100 mr-auto">
        一再回訪美食
      </h3>
      <nuxt-link to="/restaurants/search?_city=all" class="flex items-center text-orange-100  duration-200 transform hover:translate-x-1.5">
        <span>查看更多美食</span>
        <span class="material-icons mt-0.5">chevron_right</span>
      </nuxt-link>
    </div>
    <ul class="grid grid-cols-4 gap-x-8 px-12">
      <li
        v-for="restaurant in restaurants"
        :key="restaurant.ID"
        class="group cursor-pointer"
        @click="$router.push(`/restaurant/${restaurant.RestaurantID}`)"
      >
        <img
          v-if="restaurant.Picture"
          :src="restaurant.Picture.PictureUrl1 || 'https://cdn.pixabay.com/photo/2017/06/08/17/32/not-found-2384304_960_720.jpg'"
          :alt="restaurant.Picture.PictureDescription1"
          onerror="this.onerror=null;this.src='https://cdn.pixabay.com/photo/2017/06/08/17/32/not-found-2384304_960_720.jpg'"
          class="h-48 w-full object-cover rounded-2xl mb-3"
        >
        <h2 class="text-xl font-bold duration-200 mb-1 group-hover:text-green-200">
          {{ restaurant.RestaurantName }}
        </h2>
        <h4 class="text-green-300 mr-auto">
          <span class="material-icons mr-1 text-sm">fmd_good</span>
          <span>{{ restaurant.City }}</span>
        </h4>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    restaurants: {
      type: Array,
      default: () => ([]),
      required: true
    }
  }
}
</script>
