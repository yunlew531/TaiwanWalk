<template>
  <div>
    <button
      type="button"
      class="flex items-center text-green-200 mb-1"
      @click="$emit('back')"
    >
      <span class="material-icons mr-1">reply</span>
      <span class="text-lg">返回</span>
    </button>
    <h3 class="inline-block text-black-100 font-light text-4xl mb-4 mr-1">
      搜尋結果
    </h3>
    <span class="text-lg text-green-300">
      共有
      <span class="text-yellow-200">{{ length }}</span>
      筆
    </span>
  </div>
</template>

<script>
export default {
  props: {
    length: {
      type: Number,
      default: 0
    }
  }
}
</script>
