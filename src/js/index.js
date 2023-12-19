import modalPhoneHandler from "./modules/modal-phones";
import modalRequestPrice from "./modules/modal-request";
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { Fancybox } from "@fancyapps/ui";

window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-unused-vars
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

  const mobSwiper = new Swiper('.mobSwiper', {
    modules: [ Navigation, Pagination, Autoplay ],
    loop: true,
    speed: 2000,
    spaceBetween: 10,
    autoplay: false
  });

  modalPhoneHandler(swiper);
  modalRequestPrice(swiper);

  Fancybox.bind("[data-fancybox]", {
    Toolbar: {
      display: {
        left: [ "infobar" ],
        right: [ "thumbs", "close" ],
      },
    },
  });

})