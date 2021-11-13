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
            <button type="button" class="flex items-center w-full text-green-100 border border-gray-100 rounded-md px-8 py-2 mb-2">
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
      <Carousel :title="true" />
      <RecentActivities />
      <HotSpot />
      <ReturnTasty />
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import Carousel from '~/components/Carousel.vue'
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
  data () {
    return {
      isSearchSelectShow: false,
      searchType: '探索景點'
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
