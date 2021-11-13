<template>
  <section>
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
      <span class="text-yellow-200">240</span>
      筆
    </span>
    <ul class="grid grid-cols-4 gap-x-8 gap-y-9">
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
    data: {
      type: Object,
      default: () => ({}),
      requied: true
    }
  }
}
</script>
