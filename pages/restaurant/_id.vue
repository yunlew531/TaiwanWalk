<template>
  <div class="main-container mx-auto">
    <nav class="text-green-100 mx-12 mt-16 mb-8">
      <nuxt-link to="/">
        首頁
      </nuxt-link> /
      <nuxt-link to="/">
        探索景點
      </nuxt-link> /
      <nuxt-link :to="`/restaurants/search?_city=${formatCity}`">
        {{ formatCity }}
      </nuxt-link> /
      <span class="text-green-300 cursor-auto">{{ restaurant.Name }}</span>
    </nav>
    <main>
      <Carousel :places="picturesArr" />
      <h2 class="text-4xl text-black-100 font-light mx-16 mt-8 mb-3">
        {{ restaurant.Name }}
      </h2>
      <ul class="flex gap-x-2 text-xl mx-16 mb-8">
        <li v-if="restaurant.Class" class="text-yellow-200 border border-yellow-200 rounded-full cursor-pointer px-4 py-0.5">
          # {{ restaurant.Class }}
        </li>
      </ul>
      <article class="mx-16 mb-16">
        <h3 class="text-xl font-bold mb-3">
          景點介紹：
        </h3>
        <p class="text-lg font-light leading-8">
          {{ restaurant.Description }}
        </p>
      </article>
      <section class="flex items-start mx-12 mb-16">
        <div class="w-1/2 bg-gray-200 rounded-xl mr-8 p-8">
          <p class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">開放時間：</span>
            <span class="block text-lg whitespace-pre-wrap">{{ formatOpenTime }}</span>
          </p>
          <p class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">服務電話：</span>
            <a :href="`tel:+${restaurant.Phone}`" class="block text-lg">{{ formatPhone }}</a>
          </p>
          <p class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">餐廳地址：</span>
            <span class="block text-lg">{{ restaurant.Address }}</span>
          </p>
          <p v-if="restaurant.WebsiteUrl" class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">官方網站：</span>
            <a
              class="block text-green-100 text-lg"
              target="_blank"
              :href="restaurant.WebsiteUrl">{{ restaurant.WebsiteUrl }}</a>
          </p>
        </div>
        <div class="w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4298.528081312345!2d121.51848972707104!3d25.04707355140966!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9727e339109%3A0xc34a31ce3a4abecb!2z6Ie65YyX6LuK56uZ!5e0!3m2!1szh-TW!2stw!4v1636751178514!5m2!1szh-TW!2stw"
            width="540"
            height="250"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            class="w-full rounded-xl mb-8"
          />
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
        title="還有這些不能錯過的美食"
        :subtitle="`更多${formatCity}美食`"
        :data="moreRestaurants"
        @clickItem="pushPage"
        @clickMore="$router.push(`/restaurants/search?_city=${formatCity}`)"
      />
      <div class="mb-32" />
    </main>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue'
import MoreList from '@/components/attraction/MoreList.vue'

export default {
  components: {
    Carousel,
    MoreList
  },
  async asyncData ({ $axios, params, $translateCity }) {
    const { id } = params

    let restaurant = {}
    let moreRestaurants = []
    try {
      const res = await $axios.get(`/v2/Tourism/Restaurant?$filter=contains(ID, '${id}')`)
      restaurant = res.data[0]
      const engCity = $translateCity.chineseToEng(restaurant.City || restaurant.Address.slice(0, 3))
      const moreRestaurantsRes = await $axios.get(`/v2/Tourism/Restaurant/${engCity}?$top=4`)
      moreRestaurants = moreRestaurantsRes.data
    } catch (err) { console.log(err) }

    let picturesArr = Object.keys(restaurant.Picture).filter(key => key.match('PictureUrl'))
    picturesArr = picturesArr.map((key) => {
      const value = restaurant.Picture[key]
      return { Picture: { PictureUrl1: value } }
    })

    return {
      restaurant,
      picturesArr,
      moreRestaurants
    }
  },
  computed: {
    formatPhone () {
      return `0${this.restaurant.Phone.split('886-')[1]}`
    },
    formatOpenTime () {
      let time = this.restaurant.OpenTime

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
      return this.restaurant.City || this.restaurant.Address.slice(0, 3)
    }
  },
  methods: {
    pushPage (restaurantId) {
      this.$router.push(`/restaurant/${restaurantId}`)
    }
  }
}
</script>

<style lang="scss">
.main-container {
  max-width: 1200px;
}
</style>
