<template>
  <div class="main-container mx-auto">
    <nav class="text-green-100 mx-12 mt-16 mb-8">
      <nuxt-link to="/">
        首頁
      </nuxt-link> /
      <nuxt-link to="/attractions/search">
        探索景點
      </nuxt-link> /
      <nuxt-link :to="`/attractions/search?_city=${formatCity}`">
        {{ formatCity }}
      </nuxt-link> /
      <span class="text-green-300 cursor-auto">{{ attraction.Name }}</span>
    </nav>
    <main>
      <Carousel :places="picturesArr" />
      <h2 class="text-4xl text-black-100 font-light mx-16 mt-8 mb-3">
        {{ attraction.Name }}
      </h2>
      <ul class="flex gap-x-2 text-xl mx-16 mb-8">
        <li v-if="attraction.Class1" class="text-yellow-200 border border-yellow-200 rounded-full cursor-pointer px-4 py-0.5">
          # {{ attraction.Class1 }}
        </li>
        <li v-if="attraction.Class2" class="text-yellow-200 border border-yellow-200 rounded-full cursor-pointer px-4 py-0.5">
          # {{ attraction.Class2 }}
        </li>
      </ul>
      <article class="mx-16 mb-16">
        <h3 class="text-xl font-bold mb-3">
          景點介紹：
        </h3>
        <p class="text-lg font-light leading-8">
          {{ attraction.Description }}
        </p>
      </article>
      <section class="flex items-start mx-12 mb-16">
        <div class="w-1/2 bg-gray-200 rounded-xl mr-8 p-8">
          <p v-if="formatOpenTime" class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">開放時間：</span>
            <span class="block text-lg whitespace-pre-wrap">{{ formatOpenTime }}</span>
          </p>
          <p v-if="attraction.Phone" class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">服務電話：</span>
            <a :href="`tel:+${attraction.Phone}`" class="block text-lg">{{ formatPhone }}</a>
          </p>
          <p v-if="attraction.Address" class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">景點地址：</span>
            <span class="block text-lg">{{ attraction.Address }}</span>
          </p>
          <p v-if="attraction.WebsiteUrl" class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">官方網站：</span>
            <a
              class="block text-green-100 text-lg"
              target="_blank"
              :href="attraction.WebsiteUrl"
            >
              {{ attraction.WebsiteUrl }}
            </a>
          </p>
          <p v-if="attraction.TicketInfo" class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">票價資訊：</span>
            <span class="block text-lg">{{ attraction.TicketInfo }}</span>
          </p>
          <p v-if="attraction.Remarks" class="flex flex-nowrap text-black-200">
            <span class="flex-shrink-0 block text-xl font-bold">注意事項：</span>
            <span class="block text-lg">{{ attraction.Remarks }}</span>
          </p>
        </div>
        <div class="w-1/2">
          <Leaflet :position="attraction.Position" />
          <h4 class="text-xl font-bold text-black-200 mb-5">
            周邊資訊：
          </h4>
          <div class="grid grid-cols-3 gap-x-8">
            <button type="button" class="flex flex-col justify-center items-center font-bold border border-gray-100 rounded-md py-6">
              <img src="@/assets/images/nearby-scene30.png" alt="附近景點">
              <span class="block text-green-200 mt-1">附近景點</span>
            </button>
            <button type="button" class="flex flex-col justify-center items-center font-bold border border-gray-100 rounded-md py-6">
              <img src="@/assets/images/nearby-food30.png" alt="附近活動">
              <span class="block text-green-200 mt-1">附近活動</span>
            </button>
            <button type="button" class="flex flex-col justify-center items-center font-bold border border-gray-100 rounded-md py-6">
              <img src="@/assets/images/nearby-event30.png" alt="附近美食">
              <span class="block text-green-200 mt-1">附近美食</span>
            </button>
          </div>
        </div>
      </section>
      <MoreList
        title="還有這些不能錯過的景點"
        :subtitle="`更多${formatCity}景點`"
        :data="moreAttraction"
        @clickItem="pushPage"
        @clickMore="$router.push(`/attractions/search?_city=${formatCity}`)"
      />
      <div class="mb-32" />
    </main>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue'
import Leaflet from '@/components/Leaflet.vue'
import MoreList from '@/components/attraction/MoreList.vue'

export default {
  components: {
    Carousel,
    Leaflet,
    MoreList
  },
  async asyncData ({ $axios, params, $translateCity }) {
    const { id } = params

    let attraction = {}
    let moreAttraction = []
    try {
      const res = await $axios.get(`/v2/Tourism/ScenicSpot?$filter=contains(ID, '${id}')`)
      attraction = res.data[0]
      const engCity = $translateCity.chineseToEng(attraction.City || attraction.Address.slice(0, 3))
      const moreAttractionRes = await $axios.get(`/v2/Tourism/ScenicSpot/${engCity}?$top=4`)
      moreAttraction = moreAttractionRes.data
    } catch (err) { console.log(err) }

    let picturesArr = Object.keys(attraction.Picture).filter(key => key.match('PictureUrl'))
    picturesArr = picturesArr.map((key) => {
      const value = attraction.Picture[key]
      return { Picture: { PictureUrl1: value } }
    })

    return {
      attraction,
      picturesArr,
      moreAttraction
    }
  },
  computed: {
    formatPhone () {
      return `0${this.attraction.Phone.split('886-')[1]}`
    },
    formatOpenTime () {
      let time = this.attraction.OpenTime

      if (time) {
        time = time.replaceAll('hours', '小時')
        time = time.replaceAll('；', '\n')
        time = time.replace('Sun', '星期日: ')
        time = time.replace('Mon', '星期一: ')
        time = time.replace('Tue', '星期二: ')
        time = time.replace('Wed', '星期三: ')
        time = time.replace('Thu', '星期四: ')
        time = time.replace('Fri', '星期五: ')
        time = time.replace('Sat', '星期六: ')
      }

      return time
    },
    formatCity () {
      return this.attraction.City || this.attraction.Address.slice(0, 3)
    }
  },
  methods: {
    pushPage (attractionId) {
      this.$router.push(`/attraction/${attractionId}`)
    }
  }
}
</script>

<style lang="scss">
.main-container {
  max-width: 1200px;
}
</style>
