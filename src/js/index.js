import modalPhoneHandler from "./modules/modal-phones";
import modalRequestPrice from "./modules/modal-request";
import orderButtonHandler from "./modules/order-Button-handler";

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

  window.addEventListener('resize', checkWindowSize);


  modalPhoneHandler(swiper);
  modalRequestPrice(swiper);
  checkWindowSize();
  orderButtonHandler('.js-getOrder-button', 'https://wa.me/+77711041201');

  Fancybox.bind("[data-fancybox]", {
    Toolbar: {
      display: {
        left: [ "infobar" ],
        right: [ "thumbs", "close" ],
      },
    },
  });

})

function checkWindowSize() {
  if (window.innerWidth < 576) {
    var mobSwiper = new Swiper('.mobSwiper', {
      modules: [ Navigation, Pagination, Autoplay ],
      loop: false,
      speed: 1500,
      spaceBetween: 10,
      autoplay: {
        delay: 6000,
        stopOnLastSlide: true,
        pauseOnMouseEnter: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
    });
  } else {
    if (mobSwiper) {
      mobSwiper.destroy();
    }
  }
}