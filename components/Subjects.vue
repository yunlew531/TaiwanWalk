<template>
  <div>
    <ul class="grid grid-cols-4 gap-x-8 gap-y-3">
      <li
        v-for="subject in data"
        :key="subject.title"
        :style="{ 'background-image': `url(${require(`@/assets/images/${subject.file}`)})` }"
        class="h-32 flex justify-center items-center rounded-3xl bg-no-repeat bg-center bg-cover"
        @click="$emit('clickItem', subject.title)"
      >
        <h2 class="text-2xl font-bold text-white-100 tracking-widest">
          {{ subject.title }}
        </h2>
      </li>
    </ul>
  </div>
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
