<template>
  <div class="main-container mx-auto">
    <nav class="text-green-100 mx-12 mt-16 mb-8">
      <nuxt-link to="/">
        首頁
      </nuxt-link> /
      <span class="text-green-300 cursor-auto">品嚐美食</span>
    </nav>
    <main>
      <section class="flex mx-16 mb-16">
        <div class="search-panel relative mr-4">
          <button
            type="button"
            class="w-full flex items-center border border-gray-100 rounded-md px-8 py-2"
            @click="toggleCityList"
          >
            <span class="block font-medium text-green-200 mr-auto">{{ search.city.chinese }}</span>
            <span class="material-icons text-green-500 block">expand_more</span>
          </button>
          <client-only>
            <simplebar
              v-show="isCitySelectShow"
              data-simplebar-auto-hide="false"
              class="city-list border border-gray-100 absolute mt-2"
            >
              <ul class="w-full overflow-hidden bg-white-100 rounded-md pr-6">
                <li
                  class="text-green-300 border-b border-gray-100 cursor-pointer px-8 py-2 hover:text-green-200"
                  @click="selectCity({ chinese: '全部縣市' })"
                >
                  全部縣市
                </li>
                <li
                  v-for="city in cities"
                  :key="city.eng"
                  class="text-green-300 border-b border-gray-100 cursor-pointer px-8 py-2 hover:text-green-200"
                  @click="selectCity(city)"
                >
                  {{ city.chinese }}
                </li>
              </ul>
            </simplebar>
          </client-only>
        </div>
        <input
          v-model="search.content"
          type="text"
          placeholder="你想去哪裡？請輸入關鍵字"
          class="text-gray-400 flex-grow border border-gray-100 rounded-md px-8 py-2 mr-4"
        >
        <button
          type="button"
          class="flex justify-center items-center text-white-100 bg-green-200 border border-gray-100 rounded-md px-8 py-2"
          @click="searchPlace"
        >
          <span class="material-icons mr-2">search</span>
          <span class="font-bold">
            <span class="mr-5">搜</span>
            <span>尋</span>
          </span>
        </button>
      </section>
      <section v-show="type === 'normal'" class="px-16">
        <h3 class="text-4xl font-light text-black-100 mb-3 px-2">
          熱門主題
        </h3>
        <ul class="grid grid-cols-4 gap-x-8 gap-y-3">
          <li class="location-food h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              地方特產
            </h2>
          </li>
          <li class="chinese-food h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              中式美食
            </h2>
          </li>
          <li class="ice-cream h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              甜點冰品
            </h2>
          </li>
          <li class="foreign-food h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              異國料理
            </h2>
          </li>
          <li class="souvenir-food h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              伴手禮
            </h2>
          </li>
          <li class="vegetarian-food h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              素食
            </h2>
          </li>
        </ul>
      </section>
      <div v-show="type === 'searched'" class="mx-14">
        <button
          type="button"
          class="flex items-center text-green-200 mb-1"
          @click="type = 'normal'"
        >
          <span class="material-icons mr-1">reply</span>
          <span class="text-lg">返回</span>
        </button>
        <h3 class="inline-block text-black-100 font-light text-4xl mb-4 mr-1">
          搜尋結果
        </h3>
        <span class="text-lg text-green-300">
          共有
          <span class="text-yellow-200">{{ places.length }}</span>
          筆
        </span>
      </div>
      <SearchList
        v-show="type === 'searched'"
        class="mx-12 mb-20"
        :data="displayPlaces"
      />
      <Pagination
        v-show="type === 'searched'"
        :pages="pages"
        class="mx-12 mb-24"
        @change="changePage"
      />
    </main>
  </div>
</template>

<script>
import city from '@/assets/json/city.json'
import calcPage from '@/mixins/calcPage.vue'
import SearchList from '@/components/SearchList.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  components: {
    SearchList,
    Pagination
  },
  mixins: [calcPage],
  asyncData () {
    const cities = city.data

    return {
      cities
    }
  },
  data () {
    return {
      // 'normal' / 'searched'
      type: 'normal',
      isCitySelectShow: false,
      search: {
        city: { chinese: '全部縣市' },
        content: ''
      },
      places: [],
      pages: {}
    }
  },
  computed: {
    displayPlaces () {
      const { currentPage = 1 } = this.pages
      const minIdx = (currentPage - 1) * 20
      const maxIdx = currentPage * 20 - 1
      return this.places.filter((place, idx) => idx >= minIdx && idx <= maxIdx)
    }
  },
  methods: {
    toggleCityList () {
      this.isCitySelectShow = !this.isCitySelectShow
    },
    showCityList () {
      this.isCitySelectShow = true
    },
    hideCityList () {
      this.isCitySelectShow = false
    },
    selectCity (city) {
      this.search.city = city
      this.hideCityList()
    },
    changePage (page) {
      window.scrollTo({ top: 0 })
      this.pages.currentPage = page
    },
    async searchPlace () {
      this.type = 'searched'
      const { content, city } = this.search
      let data = []

      try {
        if (content) {
          const filter = `?$filter=contains(Name, '${content}')`
          const res = await this.$axios.get(`/v2/Tourism/Restaurant${filter}`)
          data = res.data.filter(place => place.Picture.PictureUrl1)
        } else if (!content && city.chinese === '全部縣市') {
          const res = await this.$axios.get('/v2/Tourism/Restaurant')
          data = res.data.filter(place => place.Picture.PictureUrl1)
        } else {
          const res = await this.$axios.get(`/v2/Tourism/Restaurant/${city.eng}`)
          data = res.data.filter(place => place.Picture.PictureUrl1)
        }
        this.places = data
        this.pages = this.calcPage(data.length)
      } catch (err) { console.dir(err) }
    }
  }
}
</script>

<style lang="scss">
.main-container {
  max-width: 1200px;
}
.search-panel {
  max-width: 240px;
  width: 100%;
}
.location-food {
  background: url(@/assets/images/location-food.png) center no-repeat;
}
.chinese-food {
  background: url(@/assets/images/chinese-food.png) center no-repeat;
}
.ice-cream {
  background: url(@/assets/images/ice-cream.png) center no-repeat;
}
.foreign-food {
  background: url(@/assets/images/foreign-food.png) center no-repeat;
}
.souvenir-food {
  background: url(@/assets/images/souvenir-food.png) center no-repeat;
}
.vegetarian-food {
  background: url(@/assets/images/vegetarian-food.png) center no-repeat;
}
.location-food, .chinese-food, .ice-cream, .foreign-food, .souvenir-food, .vegetarian-food {
  background-size: cover;
}
.city-list {
  max-height: 350px;
  border-radius: 6px;
  position: absolute;
  width: 100%;
  li {
    margin-top: -1px;
    &:first-of-type {
      margin-top: 0;
    }
    &:last-of-type {
      border-bottom: none;
    }
  }
}
</style>
