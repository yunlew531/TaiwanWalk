<template>
  <div class="main-container mx-auto">
    <nav class="text-green-100 mx-12 mt-16 mb-8">
      <nuxt-link to="/">
        首頁
      </nuxt-link> /
      <nuxt-link to="/">
        探索景點
      </nuxt-link> /
      <nuxt-link to="/">
        宜蘭縣
      </nuxt-link> /
      <span class="text-green-300 cursor-auto">羅東林業文化園區</span>
    </nav>
    <main>
      <Carousel />
      <h2 class="text-4xl text-black-100 font-light mx-16 mt-8 mb-3">
        羅東林業文化園區
      </h2>
      <ul class="flex gap-x-2 text-xl mx-16 mb-8">
        <li class="text-yellow-200 border border-yellow-200 rounded-full cursor-pointer px-4 py-0.5">
          # 自然風景類
        </li>
        <li class="text-yellow-200 border border-yellow-200 rounded-full cursor-pointer px-4 py-0.5">
          # 林場類
        </li>
      </ul>
      <article class="mx-16 mb-16">
        <h3 class="text-xl font-bold mb-3">
          景點介紹：
        </h3>
        <p class="text-lg font-light leading-8">
          日治時期台灣有三大林場，分別是：八仙山林場、阿里山林場以及太平山林場。從太平山林場所砍伐的檜木、扁柏等木材，都會運送到羅東出張所和貯木池進行存放，而羅東出張所經過規劃後，成為現今的羅東林業文化園區。羅東林業文化區坐落於羅東市區附近，交通十分方便，園內規劃有貯木池、森林鐵路、竹林車站、蒸汽火車頭、綠林和步道等，從這些設備、建築物中發現當年的林業發展多麼蓬勃，又是多麼地熱鬧，同時也讓人不禁感慨，許多珍貴的檜木消逝在太平山中。隨著林業發展的轉型，可以看見昔日風華的貯木池，零散放著當時砍伐的檜木，如今，貯木池不再具有貯木的功能，而是成為水鳥和魚兒們的天堂。在園區中散步，彷彿進入一座秘密花園，園內種植滿滿茂密的樹木，不時聽見鳥兒的叫聲，空氣中帶有芬多精與淡淡的檜木香，舒服的環境，令人不禁停下腳步，感受內心的寧靜。
        </p>
      </article>
      <section class="flex items-start mx-12 mb-16">
        <div class="w-1/2 bg-gray-200 rounded-xl mr-8 p-8">
          <p class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">開放時間：</span>
            <span class="block text-lg">06:00-19:00</span>
          </p>
          <p class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">服務電話：</span>
            <span class="block text-lg">886-3-9545114</span>
          </p>
          <p class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">景點地址：</span>
            <span class="block text-lg">宜蘭縣265羅東鎮中正北路118號</span>
          </p>
          <p class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">官方網站：</span>
            <span class="block text-lg">https://www.facebook.com/lfcgexhibition/</span>
          </p>
          <p class="flex flex-nowrap text-black-200 mb-3">
            <span class="flex-shrink-0 block text-xl font-bold">票價資訊：</span>
            <span class="block text-lg">免費，露營活動另計。</span>
          </p>
          <p class="flex flex-nowrap text-black-200">
            <span class="flex-shrink-0 block text-xl font-bold">注意事項：</span>
            <span class="block text-lg">1、愛護大自然生物，並請維護環境整潔。2、夏季日照與冬季寒風甚強，請預作防範</span>
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
      <Attractions />
      <div class="mb-32" />
    </main>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue'
import Attractions from '@/components/attraction/Attractions.vue'

export default {
  components: {
    Carousel,
    Attractions
  }
}
</script>

<style lang="scss">
.main-container {
  max-width: 1200px;
}
</style>
