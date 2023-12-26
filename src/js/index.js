import modalPhoneHandler from "./modules/modal-phones";
import modalRequestPrice from "./modules/modal-request";
import orderButtonHandler from "./modules/order-Button-handler";
import mainBanerSwiper from "./modules/main-baner-swiper";
import mobileSwiperHandler from "./modules/mob-swiper-Hanlder";
import animationObserver from "./modules/animation-observer";

import { Fancybox } from "@fancyapps/ui";

window.addEventListener('DOMContentLoaded', () => {

  animationObserver('.positive .oserver-animation', 'oserver-animation--flag');
  animationObserver('.negatives .observer', 'observer');

  modalPhoneHandler(mainBanerSwiper);
  modalRequestPrice(mainBanerSwiper);
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