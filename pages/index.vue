<template>
  <div class="main-container mx-auto">
    <main>
      <section class="banner-section mx-auto flex justify-center items-center pt-24 pb-14">
        <div class="mr-auto">
          <h3 class="text-black-100 font-light text-5xl leading-normal mb-5">
            <span class="block">探索<span class="border-b-2 border-yellow-100">台灣之美</span></span>
            <span class="block">讓我們更親近這片土地</span>
          </h3>
          <h4 class="flex items-center text-green-300 text-xl">
            <span class="material-icons mr-1.5">location_on</span>
            <span class="mr-2">台灣旅遊景點導覽</span>
            <span>Taiwan Travel Guide</span>
          </h4>
        </div>
        <div class="input-container -mb-2">
          <div
            class="relative"
            @mouseenter="showSearchSelect"
            @mouseleave="hideSearchSelect"
          >
            <button
              type="button"
              class="flex items-center w-full text-green-100 border border-gray-100 rounded-md px-8 py-2 mb-2"
            >
              <span class="mr-auto">{{ searchType }}</span>
              <span v-show="!isSearchSelectShow" class="material-icons">expand_more</span>
              <span v-show="isSearchSelectShow" class="material-icons">expand_less</span>
            </button>
            <ul
              v-show="isSearchSelectShow"
              class="selects w-full absolute text-black-200 bg-white-100 border border-gray-100 rounded-md"
            >
              <li class="cursor-pointer px-8 py-2" @click="selectSearchType('探索景點')">
                探索景點
              </li>
              <li class="cursor-pointer px-8 py-2" @click="selectSearchType('節慶活動')">
                節慶活動
              </li>
              <li class="cursor-pointer px-8 py-2" @click="selectSearchType('品嚐美食')">
                品嚐美食
              </li>
            </ul>
          </div>
          <input
            type="text"
            placeholder="你想去哪裡？請輸入關鍵字"
            class="w-full border border-gray-100 rounded-md bg-gray-200 px-8 py-2 mb-2"
          >
          <button
            type="button"
            class="w-full flex justify-center items-center text-white-100 font-bold bg-green-200
              rounded-md px-8 py-2 mb-2"
          >
            <span class="material-icons mr-3">search</span>
            <span class="mr-8">搜</span><span>尋</span>
          </button>
        </div>
      </section>
      <Carousel :title="true" :places="swiperPics" />
      <RecentActivities :activities="activities" />
      <HotSpot :attractions="attractions" />
      <ReturnTasty :restaurants="restaurants" />
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import Carousel from '@/components/Carousel.vue'
import RecentActivities from '@/components/index/RecentActivities.vue'
import HotSpot from '@/components/index/HotSpot.vue'
import ReturnTasty from '@/components/index/ReturnTasty.vue'

export default Vue.extend({
  components: {
    Carousel,
    RecentActivities,
    HotSpot,
    ReturnTasty
  },
  async asyncData ({ $axios, $getRandom }) {
    const filterHasPicture = "$filter=contains(Picture/PictureUrl1, 'http')"
    const [
      { data: activitiesData },
      { data: attractionsData },
      { data: restaurantsData }
    ] = await Promise.all([
      $axios.get(`/v2/Tourism/Activity?${filterHasPicture}`),
      $axios.get(`/v2/Tourism/ScenicSpot?${filterHasPicture}`),
      $axios.get(`/v2/Tourism/Restaurant?${filterHasPicture}`)
    ])

    const [r1, r2, r3, r4] = $getRandom.getRamdomArr(4, attractionsData.length - 1)
    const attractions = [attractionsData[r1], attractionsData[r2], attractionsData[r3], attractionsData[r4]]

    const attract = attractionsData
    const [r5, r6, r7, r8, r9, r10] = $getRandom.getRamdomArr(6, attractionsData.length - 1)
    const swiperPics = [attract[r5], attract[r6], attract[r7], attract[r8], attract[r9], attract[r10]]

    const [r11, r12, r13, r14] = $getRandom.getRamdomArr(6, activitiesData.length - 1)
    const activities = [activitiesData[r11], activitiesData[r12], activitiesData[r13], activitiesData[r14]]

    const [r15, r16, r17, r18] = $getRandom.getRamdomArr(4, restaurantsData.length - 1)
    const restaurants = [restaurantsData[r15], restaurantsData[r16], restaurantsData[r17], restaurantsData[r18]]

    return {
      activities,
      attractions,
      restaurants,
      swiperPics
    }
  },
  data () {
    return {
      isSearchSelectShow: false,
      searchType: '探索景點',
      activities: []
    }
  },
  methods: {
    selectSearchType (select) {
      this.searchType = select
      this.hideSearchSelect()
    },
    showSearchSelect () {
      this.isSearchSelectShow = true
    },
    hideSearchSelect () {
      this.isSearchSelectShow = false
    }
  }
})
</script>

<style lang="scss">
.main-container {
  max-width: 1200px;
}
.banner-section {
  max-width: 920px;
}
.input-container {
  max-width: 350px;
  width: 100%;
}
.selects {
  > li {
    @apply border-b border-gray-100;
    &:last-of-type {
      border-bottom: none;
    }
    &:hover {
      @apply text-green-100;
    }
  }
  &::before {
    content: '';
    width: 100%;
    @apply h-5 absolute -top-5;
  }
}
</style>
