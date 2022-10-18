<template>
  <ul class="grid grid-cols-4 gap-x-8 gap-y-9 mb-20">
    <li v-for="place in data" :key="place.RestaurantID || place.ScenicSpotID || place.ActivityID" class="group cursor-pointer">
      <img
        v-if="place.Picture.PictureUrl1"
        :src="place.Picture.PictureUrl1"
        :alt="place.Picture.PictureDescription1 || place.RestaurantName || place.ActivityName || place.ScenicSpotName"
        class="h-48 w-full object-cover rounded-2xl mb-3"
        onerror="this.onerror=null;this.src='https://cdn.pixabay.com/photo/2017/06/08/17/32/not-found-2384304_960_720.jpg'"
        @click="$emit('clickItem', place.RestaurantID || place.ScenicSpotID || place.ActivityID)"
      >
      <h2 class="text-xl font-bold duration-200 mb-1 group-hover:text-green-200">
        {{ place.RestaurantName || place.ScenicSpotName || place.ActivityName }}
      </h2>
      <h4 v-if="place.City" class="text-green-300 mr-auto">
        <span class="material-icons mr-1 text-sm">fmd_good</span>
        <span>{{ place.City }}</span>
      </h4>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => ([]),
      required: true
    }
  }
}
</script>
