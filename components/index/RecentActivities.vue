<template>
  <section class="mb-12">
    <div class="flex items-center px-16 mb-5">
      <h3 class="text-4xl font-light text-black-100 mr-auto">
        近期活動
      </h3>
      <nuxt-link to="/" class="flex items-center text-orange-100">
        <span>查看更多活動</span>
        <span class="material-icons mt-0.5">chevron_right</span>
      </nuxt-link>
    </div>
    <ul class="grid grid-cols-2 px-12 gap-x-8 gap-y-3">
      <li v-for="location in 4" :key="location" class="flex h-40 rounded-lg overflow-hidden border border-gray-100 bg-gray-200">
        <img src="https://images.unsplash.com/photo-1636701943721-c3dbdef953d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80" alt="" class="w-40 flex-shrink-0 h-full">
        <div class="flex flex-col w-full px-8 py-4">
          <span class="text-green-300">2021/10/30 - 2021/11/13</span>
          <h2 class="flex-grow text-black-200 text-xl font-bold">
            2021 日月潭花火音樂嘉年華
          </h2>
          <div class="flex">
            <h4 class="text-green-300 mr-auto">
              <span class="material-icons mr-1 text-sm">fmd_good</span>
              <span>新北市</span>
            </h4>
            <nuxt-link to="/" class="flex items-center text-green-200">
              <span>詳細介紹</span>
              <span class="material-icons mt-0.5">chevron_right</span>
            </nuxt-link>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
