<template>
  <div class="flex">
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
          class="city-list w-full border border-gray-100 rounded-md absolute mt-2"
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
    <div
      v-if="date"
      class="date-selector flex relative text-gray-400 flex-grow border border-gray-100 rounded-md px-8 py-2 mr-4"
      :class="{ active: search.date }"
    >
      <input
        v-model="search.date"
        type="date"
        class="bg-gray-100 absolute left-0 top-0 w-full h-full focus:outline-none"
      >
      <span
        class="select-date-text text-green-200 font-medium mr-auto"
        :class="{ hide: search.date }"
      >選擇日期</span>
      <span class="material-icons text-green-200">date_range</span>
    </div>
    <input
      v-model="search.content"
      type="text"
      placeholder="你想去哪裡？請輸入關鍵字"
      class="text-gray-400 flex-grow border border-gray-100 rounded-md px-8 py-2 mr-4 focus:outline-none"
      @keyup.enter="$emit('search', search)"
    >
    <button
      type="button"
      class="flex justify-center items-center text-white-100 bg-green-200 border duration-200 border-gray-100 rounded-md px-8 py-2 hover:bg-green-400"
      @click="$emit('search', search)"
    >
      <span class="material-icons mr-2">search</span>
      <span class="font-bold">
        <span class="mr-5">搜</span>
        <span>尋</span>
      </span>
    </button>
  </div>
</template>

<script>
import city from '@/assets/json/city.json'

export default {
  props: {
    date: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      search: {
        city: { chinese: '全部縣市' },
        content: ''
      },
      isCitySelectShow: false,
      cities: city.data
    }
  },
  created () {
    this.checkSelectCity()
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
    checkSelectCity () {
      const { _city } = this.$route.query

      if (_city === 'all') { return }

      if (_city) {
        const engCity = this.$translateCity.chineseToEng(_city)
        this.search.city = { chinese: _city, eng: engCity }
      }
    }
  }
}
</script>

<style lang="scss">
.search-panel {
  max-width: 240px;
  width: 100%;
}
</style>
