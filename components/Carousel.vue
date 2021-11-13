<template>
  <section class="relative mx-12 mb-12">
    <client-only>
      <swiper ref="swiperRef" :options="swiperOption" class="overflow-x-hidden rounded-2xl">
        <div class="swiper-slide">
          <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1174&q=80" alt="" class="w-full object-cover">
          <h2 v-if="title" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white-100 text-3xl">
            <span>新北市</span>
            <span class="mx-2">|</span>
            <span>不厭亭</span>
          </h2>
        </div>
        <div class="swiper-slide">
          <img src="https://images.unsplash.com/photo-1520746023174-87501e47217c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1166&q=80" alt="" class="w-full object-cover">
          <h2 v-if="title" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white-100 text-3xl">
            <span>新北市</span>
            <span class="mx-2">|</span>
            <span>不厭亭</span>
          </h2>
        </div>
        <div class="swiper-slide">
          <img src="https://images.unsplash.com/photo-1495977958109-d0a07c767f0e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="" class="w-full object-cover">
          <h2 v-if="title" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white-100 text-3xl">
            <span>新北市</span>
            <span class="mx-2">|</span>
            <span>不厭亭</span>
          </h2>
        </div>
        <div slot="pagination" class="swiper-pagination position-absolute" />
      </swiper>
      <div class="swiper-button-prev" />
      <div class="swiper-button-next" />
    </client-only>
  </section>
</template>

<script>
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper'

Swiper.use([Autoplay, Navigation, Pagination])

export default {
  props: {
    title: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.swiper-slide {
  img {
    height: 400px;
  }
}
.swiper-horizontal>.swiper-pagination-bullets {
  @apply flex justify-end pr-10 mb-4;
  .swiper-pagination-bullet {
    @apply bg-gray-300;
    margin: 0 10px;
    width: 20px;
    height: 20px;
    &.swiper-pagination-bullet-active {
      @apply bg-white-100;
    }
  }
}
.swiper-button-prev, .swiper-button-next {
  @apply h-10 w-10 border-2 border-white-100 rounded-full;
  &::after {
    @apply text-white-100 text-xs font-bold;
  }
}
.swiper-button-prev {
  left: 30px;
}
.swiper-button-next {
  right: 30px;
}
</style>
