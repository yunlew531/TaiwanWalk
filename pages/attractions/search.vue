<template>
  <div class="main-container mx-auto">
    <nav class="text-green-100 mx-12 mt-16 mb-8">
      <nuxt-link to="/">
        首頁
      </nuxt-link> /
      <span class="text-green-300 cursor-auto">探索景點</span>
    </nav>
    <main>
      <section class="flex mx-16 mb-16">
        <div class="search-panel relative mr-4">
          <button
            type="button"
            class="w-full flex items-center border border-gray-100 rounded-md px-8 py-2"
            @click="toggleCityList"
          >
            <span class="block font-medium text-green-200 mr-auto">全部縣市</span>
            <span class="material-icons text-green-500 block">expand_more</span>
          </button>
          <simplebar
            v-show="isCitySelectShow"
            data-simplebar-auto-hide="false"
            class="city-list border border-gray-100 absolute mt-2"
          >
            <ul class="w-full overflow-hidden bg-white-100 rounded-md pr-6">
              <li class="text-green-300 border-b border-gray-100 cursor-pointer px-8 py-2">
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
          <li class="nature h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              自然風景類
            </h2>
          </li>
          <li class="factory h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              觀光工廠類
            </h2>
          </li>
          <li class="play h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              遊憩類
            </h2>
          </li>
          <li class="agriculture h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              休閒農業類
            </h2>
          </li>
          <li class="ecology h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              生態類
            </h2>
          </li>
          <li class="hotspring h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              溫泉類
            </h2>
          </li>
          <li class="historic h-32 flex justify-center items-center rounded-3xl">
            <h2 class="text-2xl font-bold text-white-100 tracking-widest">
              古蹟類
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
        city: '',
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
.search-panel {
  max-width: 240px;
  width: 100%;
}
.nature {
  background: url(@/assets/images/nature.png) center no-repeat;
}
.factory {
  background: url(@/assets/images/factory.png) center no-repeat;
}
.play {
  background: url(@/assets/images/play.png) center no-repeat;
}
.agriculture {
  background: url(@/assets/images/agriculture.png) center no-repeat;
}
.ecology {
  background: url(@/assets/images/ecology.png) center no-repeat;
}
.hotspring {
  background: url(@/assets/images/hotspring.png) center no-repeat;
}
.historic {
  background: url(@/assets/images/historic.png) center no-repeat;
}
.nature, .factory, .play, .agriculture, .ecology, .hotspring, .historic {
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
