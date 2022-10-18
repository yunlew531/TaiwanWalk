<template>
  <section>
    <div class="flex items-center px-16 mb-5">
      <h3 class="text-4xl font-light text-black-100 mr-auto">
        {{ title }}
      </h3>
      <button
        type="button"
        class="flex items-center text-orange-100 transform duration-200 hover:translate-x-1.5"
        @click="$emit('clickMore')"
      >
        <span>{{ subtitle }}</span>
        <span class="material-icons mt-0.5">chevron_right</span>
      </button>
    </div>
    <ul class="grid grid-cols-4 gap-x-8 px-12">
      <li
        v-for="place in data"
        :key="place.ActivityID"
        class="group cursor-pointer"
        @click="$emit('clickItem', place.ScenicSpotID || place.ActivityID || place.RestaurantID)"
      >
        <img
          v-if="place.Picture"
          :src="place.Picture.PictureUrl1 || 'https://cdn.pixabay.com/photo/2017/06/08/17/32/not-found-2384304_960_720.jpg'"
          :alt="place.ScenicSpotName || place.ActivityName || place.RestaurantName"
          onerror="this.onerror=null;this.src='https://cdn.pixabay.com/photo/2017/06/08/17/32/not-found-2384304_960_720.jpg'"
          class="h-48 w-full object-cover rounded-2xl mb-3"
        >
        <h2 class="text-xl font-bold duration-200 mb-1 group-hover:text-green-200">
          {{ place.ScenicSpotName || place.ActivityName || place.RestaurantName }}
        </h2>
        <h4 class="text-green-300 mr-auto">
          <span class="material-icons mr-1 text-sm">fmd_good</span>
          <span>{{ place.City }}</span>
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
      required: true
    },
    subtitle: {
      type: String,
      default: '連結',
      required: true
    },
    data: {
      type: Array,
      default: () => ([]),
      required: true
    }
  }
}
</script>
