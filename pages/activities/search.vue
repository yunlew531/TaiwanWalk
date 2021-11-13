<template>
  <div class="main-container mx-auto">
    <nav class="text-green-100 mx-12 mt-16 mb-8">
      <nuxt-link to="/">
        首頁
      </nuxt-link> /
      <span class="text-green-300 cursor-auto">節慶活動</span>
    </nav>
    <main>
      <section class="flex mx-16 mb-16">
        <div class="search-panel relative mr-4">
          <button
            type="button"
            class="w-full flex items-center border border-gray-100 rounded-md px-8 py-2"
            @click="toggleCityList"
          >
            <span class="block font-medium text-green-200 mr-auto">{{ search.city }}</span>
            <span class="material-icons text-green-500 block">expand_more</span>
          </button>
          <simplebar v-show="isCitySelectShow" data-simplebar-auto-hide="false" class="city-list border border-gray-100 absolute mt-2">
            <ul class="w-full overflow-hidden bg-white-100 rounded-md pr-6">
              <li
                class="text-green-300 border-b border-gray-100 cursor-pointer px-8 py-2"
                @click="selectCity('全部縣市')"
              >
                全部縣市
              </li>
              <li
                class="text-green-300 border-b border-gray-100 cursor-pointer px-8 py-2"
                @click="selectCity(city)"
              >
                臺北市
              </li>
            </ul>
          </simplebar>
        </div>
        <div
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
          <li class="festival h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              節慶活動
            </h2>
          </li>
          <li class="bike h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              自行車活動
            </h2>
          </li>
          <li class="casual h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              遊憩活動
            </h2>
          </li>
          <li class="industry h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              產業文化活動
            </h2>
          </li>
          <li class="year h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              年度活動
            </h2>
          </li>
          <li class="season h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              四季活動
            </h2>
          </li>
        </ul>
      </section>
      <SearchList
        v-show="type === 'searched'"
        class="mx-12"
        @back="type = 'normal'"
      />
    </main>
  </div>
</template>

<script>
import SearchList from '@/components/SearchList.vue'

export default {
  components: {
    SearchList
  },
  data () {
    return {
      // 'normal' / 'searched'
      type: 'normal',
      isCitySelectShow: false,
      search: {
        city: '全部縣市',
        content: ''
      }
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
    searchPlace () {
      this.type = 'searched'
    }
  }
}
</script>

<style lang="scss">
.main-container {
  max-width: 1200px;
}
.search-panel, .date-selector {
  max-width: 240px;
  width: 100%;
}
.date-selector {
  input {
    background: transparent;
    padding: 0 32px;
    &::-webkit-datetime-edit, &::-webkit-calendar-picker-indicator {
      opacity: 0;
    }
  }
  &.active {
    input {
      &::-webkit-datetime-edit {
        opacity: 1;
      }
    }
  }
}
.festival {
  background: url(@/assets/images/festival.png) center no-repeat;
}
.bike {
  background: url(@/assets/images/bike.png) center no-repeat;
}
.casual {
  background: url(@/assets/images/casual.png) center no-repeat;
}
.industry {
  background: url(@/assets/images/industry.png) center no-repeat;
}
.year {
  background: url(@/assets/images/year.png) center no-repeat;
}
.season {
  background: url(@/assets/images/season.png) center no-repeat;
}
.festival, .bike, .casual, .industry, .year, .season {
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
.select-date-text {
  &.hide {
    opacity: 0;
  }
}
</style>
