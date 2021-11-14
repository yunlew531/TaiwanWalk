<template>
  <div class="flex justify-center">
    <ul class="flex flex-wrap -mr-2">
      <li
        class="w-8 h-8 flex justify-center items-center border bg-green-200 rounded cursor-pointer mr-2 hover:bg-gray-100 mb-2"
        :class="{ 'bg-gray-100': pages.currentPage === 1 }"
      >
        <span
          class="material-icons text-white-100"
          :class="{ 'text-green-100': pages.currentPage === 1 }"
        >chevron_left</span>
      </li>
      <li
        v-for="num in pages.totalPage"
        :key="num"
        class="page w-8 h-8 flex justify-center items-center text-green-300 border border-gray-100
          rounded cursor-pointer mr-2 hover:bg-gray-100 mb-2"
        :class="{ active: pages.currentPage === num }"
        @click="$emit('change', num)"
      >
        <span>{{ num }}</span>
      </li>
      <li
        class="w-8 h-8 flex justify-center items-center border border-gray-100 bg-green-200 rounded cursor-pointer mr-2 hover:bg-gray-100 mb-2"
        :class="{ 'bg-gray-100': pages.currentPage === pages.totalPage }"
      >
        <span
          class="material-icons text-white-100"
          :class="{ 'text-green-100': pages.currentPage === pages.totalPage }"
        >chevron_right</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pages: {
      type: Object,
      default: () => ({}),
      required: true
    }
  }
}
</script>

<style lang="scss">
.page {
  @apply border-gray-100;
  &.active {
    @apply border-green-400;
  }
}
</style>
