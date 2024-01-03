import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const mainBanerSwiper = new Swiper('.swiper', {
  modules: [ Navigation, Pagination, Autoplay ],
  loop: true,
  speed: 2000,
  spaceBetween: 10,
  autoplay: {
    delay: 5000,
    // disableOnInteraction: true,
    pauseOnMouseEnter: true
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

export default mainBanerSwiper;