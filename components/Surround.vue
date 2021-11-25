<template>
  <div>
    <h4 class="text-xl font-bold text-black-200 mb-5">
      周邊資訊：
    </h4>
    <div class="grid grid-cols-3 gap-x-8">
      <button
        type="button"
        class="flex flex-col justify-center items-center font-bold border border-gray-100 rounded-md duration-200 py-6 hover:bg-white-200"
        @click="$router.push({ name: 'attractions-search', query: { _near: `${position.PositionLat}, ${position.PositionLon}` }})"
      >
        <img src="@/assets/images/nearby-scene30.png" alt="附近景點">
        <span class="block text-green-200 mt-1">附近景點</span>
      </button>
      <button
        type="button"
        class="flex flex-col justify-center items-center font-bold border border-gray-100 rounded-md duration-200 py-6 hover:bg-white-200"
        @click="$router.push({ name: 'activities-search', query: { _near: `${position.PositionLat}, ${position.PositionLon}` }})"
      >
        <img src="@/assets/images/nearby-food30.png" alt="附近活動">
        <span class="block text-green-200 mt-1">附近活動</span>
      </button>
      <button
        type="button"
        class="flex flex-col justify-center items-center font-bold border border-gray-100 rounded-md duration-200 py-6 hover:bg-white-200"
        @click="$router.push({ name: 'restaurants-search', query: { _near: `${position.PositionLat}, ${position.PositionLon}` } })"
      >
        <img src="@/assets/images/nearby-event30.png" alt="附近美食">
        <span class="block text-green-200 mt-1">附近美食</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: Object,
      default: () => ({}),
      required: true
    }
  }
}
</script>
