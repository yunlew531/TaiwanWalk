<template>
  <div class="main-container mx-auto">
    <nav class="text-green-100 mx-12 mt-16 mb-8">
      <nuxt-link to="/">
        首頁
      </nuxt-link> /
      <nuxt-link to="/activities/search">
        節慶活動
      </nuxt-link> /
      <nuxt-link :to="`/activities/search?_city=${formatCity}`">
        {{ formatCity }}
      </nuxt-link> /
      <span class="text-green-300 cursor-auto">{{ activity.Name }}</span>
    </nav>
    <main>
      <Carousel :places="picturesArr" />
      <h2 class="text-4xl text-black-100 font-light mx-16 mt-8 mb-3">
        {{ activity.Name }}
      </h2>
      <ul class="flex gap-x-2 text-xl mx-16 mb-8">
        <li v-if="activity.Class1" class="text-yellow-200 border border-yellow-200 rounded-full cursor-pointer px-4 py-0.5">
          # {{ activity.Class1 }}
        </li>
        <li v-if="activity.Class2" class="text-yellow-200 border border-yellow-200 rounded-full cursor-pointer px-4 py-0.5">
          # {{ activity.Class2 }}
        </li>
      </ul>
      <article class="mx-16 mb-16">
        <h3 class="text-xl font-bold mb-3">
          景點介紹：
        </h3>
        <p class="text-lg font-light leading-8">
          {{ activity.Description }}
        </p>
      </article>
      <section class="flex items-start mx-12 mb-16">
        <div class="w-1/2 bg-gray-200 rounded-xl mr-8 p-8">
          <p class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">活動時間：</span>
            <span class="block text-lg">
              {{ $dayjs(activity.StartTime).format("YYYY/MM/DD") }} -
              {{ $dayjs(activity.EndTime).format("YYYY/MM/DD") }}</span>
          </p>
          <p v-if="activity.Phone" class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">聯絡電話：</span>
            <a :href="`tel:+${activity.Phone}`" class="block text-lg">{{ formatPhone }}</a>
          </p>
          <p class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">主辦單位：</span>
            <span class="block text-lg">{{ activity.Organizer }}</span>
          </p>
          <p class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-black-200 text-xl font-bold">活動地點：</span>
            <span class="block text-green-100  text-lg">{{ activity.Location }}</span>
          </p>
          <p v-if="activity.WebsiteUrl" class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">官方網站：</span>
            <a
              class="block text-green-100 text-lg"
              target="_blank"
              :href="activity.WebsiteUrl"
            >
              {{ activity.WebsiteUrl }}
            </a>
          </p>
          <p v-if="activity.Charge" class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">活動費用：</span>
            <span class="block text-lg">{{ activity.Charge }}</span>
          </p>
          <p v-if="activity.Remarks" class="flex flex-nowrap text-black-200">
            <span class="flex-shrink-0 block text-xl font-bold">注意事項：</span>
            <span class="block text-lg">{{ activity.Remarks }}</span>
          </p>
        </div>
        <div class="w-1/2">
          <Leaflet :position="activity.Position" />
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
        title="還有這些不能錯過活動"
        :subtitle="`更多${formatCity}活動`"
        :data="moreActivities"
        @clickItem="pushPage"
        @clickMore="$router.push(`/activities/search?_city=${formatCity}`)"
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

    let activity = {}
    let moreActivities = []
    try {
      const res = await $axios.get(`/v2/Tourism/Activity?$filter=contains(ID, '${id}')`)
      activity = res.data[0]
      const engCity = $translateCity.chineseToEng(activity.City || activity.Address.slice(0, 3))
      const moreActivitiesRes = await $axios.get(`/v2/Tourism/Activity/${engCity}?$top=4`)
      moreActivities = moreActivitiesRes.data
    } catch (err) { console.log(err) }

    let picturesArr = Object.keys(activity.Picture).filter(key => key.match('PictureUrl'))
    picturesArr = picturesArr.map((key) => {
      const value = activity.Picture[key]
      return { Picture: { PictureUrl1: value } }
    })

    return {
      activity,
      picturesArr,
      moreActivities
    }
  },
  computed: {
    formatPhone () {
      return `0${this.activity.Phone.split('886-')[1]}`
    },
    formatCity () {
      return this.activity.City || this.activity.Address.slice(0, 3)
    }
  },
  methods: {
    pushPage (activitiesId) {
      this.$router.push(`/activity/${activitiesId}`)
    }
  }
}
</script>

<style lang="scss">
.main-container {
  max-width: 1200px;
}
</style>
