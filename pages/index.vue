<template>
  <div class="main-container mx-auto">
    <main>
      <section class="banner-section mx-auto flex justify-center items-center pt-24 pb-14">
        <MainContent class="mr-auto" />
        <SearchPanel />
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
import SearchPanel from '@/components/index/SearchPanel.vue'
import MainContent from '@/components/index/MainContent.vue'

export default Vue.extend({
  components: {
    MainContent,
    SearchPanel,
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

    const [r1, r2, r3, r4] = $getRandom.getRandomArr(4, attractionsData.length - 1)
    const attractions = [attractionsData[r1], attractionsData[r2], attractionsData[r3], attractionsData[r4]]

    const attract = attractionsData
    const [r5, r6, r7, r8, r9, r10] = $getRandom.getRandomArr(6, attractionsData.length - 1)
    const swiperPics = [attract[r5], attract[r6], attract[r7], attract[r8], attract[r9], attract[r10]]

    const [r11, r12, r13, r14] = $getRandom.getRandomArr(4, activitiesData.length - 1)
    const activities = [activitiesData[r11], activitiesData[r12], activitiesData[r13], activitiesData[r14]]

    const [r15, r16, r17, r18] = $getRandom.getRandomArr(4, restaurantsData.length - 1)
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
      activities: []
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
