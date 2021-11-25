<template>
  <div class="input-container -mb-2">
    <div
      class="relative"
      @mouseenter="showSearchSelect"
      @mouseleave="hideSearchSelect"
    >
      <button
        type="button"
        class="flex items-center w-full text-green-100 border border-gray-100 rounded-md px-8 py-2 mb-2"
      >
        <span class="mr-auto">{{ search.type }}</span>
        <span v-show="!isSearchSelectShow" class="material-icons">expand_more</span>
        <span v-show="isSearchSelectShow" class="material-icons">expand_less</span>
      </button>
      <ul
        v-show="isSearchSelectShow"
        class="selects w-full absolute text-black-200 bg-white-100 border border-gray-100 rounded-md"
      >
        <li
          v-for="type in types"
          :key="type"
          class="cursor-pointer px-8 py-2"
          @click="selectType(type)"
        >
          {{ type }}
        </li>
      </ul>
    </div>
    <input
      v-model="search.content"
      type="text"
      placeholder="你想去哪裡？請輸入關鍵字"
      class="w-full border border-gray-100 rounded-md bg-gray-200 px-8 py-2 mb-2"
      @keyup.enter="searchContent"
    >
    <button
      type="button"
      class="w-full flex justify-center items-center text-white-100 font-bold bg-green-200
        rounded-md duration-200 px-8 py-2 mb-2 hover:bg-green-400"
      @click="searchContent"
    >
      <span class="material-icons mr-3">search</span>
      <span class="mr-8">搜</span><span>尋</span>
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSearchSelectShow: false,
      search: {
        type: '探索景點',
        content: ''
      },
      types: ['探索景點', '節慶活動', '品嚐美食']
    }
  },
  methods: {
    selectType (select) {
      this.search.type = select
      this.hideSearchSelect()
    },
    showSearchSelect () {
      this.isSearchSelectShow = true
    },
    hideSearchSelect () {
      this.isSearchSelectShow = false
    },
    searchContent () {
      const { type, content } = this.search

      if (content && type === '探索景點') {
        this.$router.push({ name: 'attractions-search', query: { _city: 'all', _content: content } })
        return
      }

      if (content && type === '節慶活動') {
        this.$router.push({ name: 'activities-search', query: { _city: 'all', _content: content } })
        return
      }

      if (content && type === '品嚐美食') {
        this.$router.push({ name: 'restaurants-search', query: { _city: 'all', _content: content } })
        return
      }

      if (!content && type === '探索景點') {
        this.$router.push('/attractions/search?_city=all')
        return
      }

      if (!content && type === '節慶活動') {
        this.$router.push('/activities/search?_city=all')
        return
      }

      if (!content && type === '品嚐美食') {
        this.$router.push('/restaurants/search?_city=all')
      }
    }
  }
}
</script>
