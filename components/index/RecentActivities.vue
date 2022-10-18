<template>
  <section class="mb-12">
    <div class="flex items-center px-16 mb-5">
      <h3 class="text-4xl font-light text-black-100 mr-auto">
        近期活動
      </h3>
      <nuxt-link to="/activities/search?_city=all" class="flex items-center text-orange-100 duration-200 transform hover:translate-x-1.5">
        <span>查看更多活動</span>
        <span class="material-icons mt-0.5">chevron_right</span>
      </nuxt-link>
    </div>
    <ul class="grid grid-cols-2 px-12 gap-x-8 gap-y-3">
      <li
        v-for="activity in activities"
        :key="activity.ID"
        class="recent-activity-card flex h-40 rounded-lg overflow-hidden border border-gray-100 bg-gray-200 cursor-pointer"
        @click="changePage(activity)"
      >
        <div class="w-40 flex-shrink-0 h-full overflow-hidden">
          <img
            v-if="activity.Picture"
            :src="activity.Picture.PictureUrl1 || 'https://cdn.pixabay.com/photo/2017/06/08/17/32/not-found-2384304_960_720.jpg'"
            :alt="activity.Picture.PictureDescription1"
            onerror="this.onerror=null;this.src='https://cdn.pixabay.com/photo/2017/06/08/17/32/not-found-2384304_960_720.jpg'"
            class="w-full h-full"
          >
        </div>
        <div class="flex flex-col w-full px-8 py-4">
          <span class="text-green-300">
            {{ $dayjs(activity.StartTime).format("YYYY/MM/DD") }} -
            {{ $dayjs(activity.EndTime).format("YYYY/MM/DD") }}
          </span>
          <h2 class="flex-grow text-black-200 text-xl font-bold">
            {{ activity.ActivityName }}
          </h2>
          <div class="flex">
            <h4 class="text-green-300 mr-auto">
              <span class="material-icons mr-1 text-sm">fmd_good</span>
              <span>{{ activity.City }}</span>
            </h4>
            <nuxt-link to="/" class="flex items-center text-green-200">
              <span>詳細介紹</span>
              <span class="material-icons mt-0.5">chevron_right</span>
            </nuxt-link>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    activities: {
      type: Array,
      default: () => ([{}]),
      required: true
    }
  },
  methods: {
    changePage (activity) {
      this.$router.push(`/activity/${activity.ActivityID}`)
    }
  }
}
</script>

<style lang="scss">
.recent-activity-card {
  img {
    transition: transform 0.3s;
  }
  &:hover {
    img {
      transform: scale(1.1);
    }
  }
}
</style>
