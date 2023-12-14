import modalPhoneHandler from "./modules/modal-phones";
import modalRequest from "./modules/modal-request";
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper('.swiper', {
    modules: [ Navigation, Pagination, Autoplay ],
    loop: true,
    speed: 2000,
    spaceBetween: 50,
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
  // console.dir(swiper)
  modalPhoneHandler();
  modalRequest();
})