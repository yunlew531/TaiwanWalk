<template>
  <div class="main-container mx-auto">
    <nav class="text-green-100 mx-12 mt-16 mb-8">
      <nuxt-link to="/">
        首頁
      </nuxt-link> /
      <span class="text-green-300 cursor-auto">節慶活動</span>
    </nav>
    <main>
      <SearchBar
        ref="searchBarRef"
        :date="true"
        class="mx-16 mb-16"
        @search="searchPlace"
      />
      <section v-show="!isSearched" class="px-16">
        <h3 class="text-4xl font-light text-black-100 mb-3 px-2">
          熱門主題
        </h3>
        <Subjects :data="subjects" @clickItem="searchSubject" />
      </section>
      <SearchResultBar
        v-show="isSearched"
        :length="places.length"
        class="mx-14"
        @back="resetSearch"
      />
      <SearchList
        v-show="places.length"
        class="mx-12"
        :data="displayPlaces"
        @clickItem="pushPage"
      />
      <Pagination
        v-show="places.length && places.length > 20"
        :pages="pages"
        class="mx-12"
        @change="changePage"
      />
    </main>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import Subjects from '@/components/Subjects.vue'
import SearchResultBar from '~/components/SearchResultBar.vue'
import SearchList from '@/components/SearchList.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  components: {
    SearchBar,
    Subjects,
    SearchResultBar,
    SearchList,
    Pagination
  },
  async asyncData ({ query, $axios, $translateCity, $filterHasImgs, $calcPage }) {
    let { _city } = query
    const { _content, _subject, _near } = query
    let places = []
    let pages = {}
    const subjects = [
      { title: '節慶活動', file: 'festival.png' },
      { title: '自行車活動', file: 'bike.png' },
      { title: '遊憩活動', file: 'casual.png' },
      { title: '產業文化活動', file: 'industry.png' },
      { title: '年度活動', file: 'year.png' },
      { title: '四季活動', file: 'season.png' }
    ]

    if (_near && !_city && !_content && !_subject) {
      let [latitude, longitude] = _near.split(', ')
      latitude = Number(latitude)
      longitude = Number(longitude)
      const url = `/v2/Tourism/Activity?$spatialFilter=nearby(${latitude}, ${longitude}, 30000)`
      try {
        const res = await $axios.get(url)
        places = $filterHasImgs(res.data)
        pages = $calcPage(places.length)
      } catch (err) {}
    }

    if (_city && !_content && !_near) {
      let url = ''

      if (_city === 'all') {
        url = '/v2/Tourism/Activity'
      } else {
        _city = $translateCity.chineseToEng(_city)
        url = `/v2/Tourism/Activity/${_city}`
      }

      try {
        const res = await $axios.get(url)
        places = $filterHasImgs(res.data)
        pages = $calcPage(places.length)
      } catch (err) {}
    }

    if (_city && _content && !_near) {
      let url = ''

      if (_city === 'all') {
        url = `/v2/Tourism/Activity?$filter=contains(Name, '${encodeURI(_content)}')`
      } else {
        _city = $translateCity.chineseToEng(_city)
        url = `/v2/Tourism/Activity/${_city}?$filter=contains(Name, '${encodeURI(_content)}')`
      }

      try {
        const res = await $axios.get(url)
        places = $filterHasImgs(res.data)
        pages = $calcPage(places.length)
      } catch (err) {}
    }

    if (_subject && !_near && !_city && !_content) {
      const url = `/v2/Tourism/Activity?$filter=contains(Class1, '${encodeURI(_subject)}')`

      try {
        const res = await $axios.get(url)
        places = $filterHasImgs(res.data)
        pages = $calcPage(places.length)
      } catch (err) {}
    }

    return {
      places,
      subjects,
      pages
    }
  },
  data () {
    return {
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
    },
    isSearched () {
      const isSearchCity = this.$route.query._city
      const isSearchContent = this.$route.query._content
      const isSearchSubject = this.$route.query._subject
      const isSearchNearBy = this.$route.query._near
      return isSearchCity || isSearchContent || isSearchSubject || isSearchNearBy
    }
  },
  watch: {
    '$route.query': {
      handler () {
        this.$router.go()
      },
      deep: true
    }
  },
  methods: {
    changePage (page) {
      this.pages.currentPage = page
    },
    pushPage (activitiesId) {
      this.$router.push(`/activity/${activitiesId}`)
    },
    resetSearch () {
      this.places = []
      this.$router.push({ name: 'activities-search' })
    },
    searchSubject (subject) {
      this.$router.push({ name: 'activities-search', query: { _subject: subject } })
    },
    searchPlace (search) {
      const { city, content } = search

      if (content) {
        if (city.chinese === '全部縣市') {
          this.$router.push({ name: 'activities-search', query: { _city: 'all', _content: content } })
        } else {
          this.$router.push({ name: 'activities-search', query: { _city: city.chinese, _content: content } })
        }
      }

      if (!content) {
        if (city.chinese === '全部縣市') {
          this.$router.push({ name: 'activities-search', query: { _city: 'all' } })
        } else {
          this.$router.push({ name: 'activities-search', query: { _city: city.chinese } })
        }
      }
    }
  }
}
</script>

<style lang="scss">
.main-container {
  max-width: 1200px;
}
.date-selector {
  max-width: 240px;
  width: 100%;
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
.city-list {
  max-height: 350px;
  position: absolute;
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
