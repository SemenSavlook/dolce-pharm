import modalPhoneHandler from "./modules/modal-phones";
import modalRequestPrice from "./modules/modal-request";
import orderButtonHandler from "./modules/order-Button-handler";
import mobileSwiperHandler from "./modules/mob-swiper-Hanlder";

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { Fancybox } from "@fancyapps/ui";

window.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.swiper', {
    modules: [ Navigation, Pagination, Autoplay ],
    loop: true,
    speed: 2000,
    spaceBetween: 0,
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

  modalPhoneHandler(swiper);
  modalRequestPrice(swiper);
  orderButtonHandler('.js-getOrder-button', 'https://wa.me/+77711041201');

  const mobileSwiperElement = document.querySelector('.js-mobSwiper');
  if (mobileSwiperElement) { mobileSwiperHandler(mobileSwiperElement) }

  Fancybox.bind("[data-fancybox]", {
    Toolbar: {
      display: {
        left: [ "infobar" ],
        right: [ "thumbs", "close" ],
      },
    },
  });
});