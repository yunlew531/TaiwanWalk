<template>
  <ul class="grid grid-cols-4 gap-x-8 gap-y-9">
    <li v-for="place in data" :key="place.ID">
      <img
        v-if="place.Picture.PictureUrl1"
        :src="place.Picture.PictureUrl1"
        :alt="place.Picture.PictureDescription1 || place.Name"
        class="h-48 w-full object-cover rounded-2xl mb-3"
        @click="$emit('clickItem', place.ID)"
      >
      <h2 class="text-xl font-bold mb-1">
        {{ place.Name }}
      </h2>
      <h4 class="text-green-300 mr-auto">
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
      requied: true
    }
  }
}
</script>
