<template>
  <section>
    <div class="flex items-center px-16 mb-5">
      <h3 class="text-4xl font-light text-black-100 mr-auto">
        {{ title }}
      </h3>
      <nuxt-link to="/" class="flex items-center text-orange-100">
        <span>{{ subtitle }}</span>
        <span class="material-icons mt-0.5">chevron_right</span>
      </nuxt-link>
    </div>
    <ul class="grid grid-cols-4 gap-x-8 px-12">
      <li
        v-for="place in data"
        :key="place.ID"
        @click="$emit('clickItem', place.ID)"
      >
        <img
          v-if="place.Picture"
          :src="place.Picture.PictureUrl1"
          :alt="place.Name"
          class="h-48 w-full object-cover rounded-2xl mb-3"
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
