import modalPhoneHandler from "./modules/modal-phones";
import modalRequestPrice from "./modules/modal-request-price";
import orderButtonHandler from "./modules/order-Button-handler";
import mainBanerSwiper from "./modules/main-baner-swiper";
import mobileSwiperHandler from "./modules/mob-swiper-Hanlder";
import animationObserver from "./modules/animation-observer";

import { Fancybox } from "@fancyapps/ui";

window.addEventListener('DOMContentLoaded', () => {

  // Анимации
  animationObserver('.positive .oserver-animation', 'oserver-animation--flag');
  animationObserver('.negatives .observer', 'observer');

  // Обработка кнопки связаться с нами в хеддере (остановка слайдера)
  modalPhoneHandler(mainBanerSwiper);

  // Обработка кнопок запроса прайс-листа, (остановка слайдера)
  modalRequestPrice(mainBanerSwiper);

  // Установка обработчика с классом '.js-getOrder-button', обработчика перехода в watsap
  orderButtonHandler('.js-getOrder-button', 'https://wa.me/+77711041201');

  // Обработка мобильного слайдера (для десктопа не слайдера)
  const mobileSwiperElement = document.querySelector('.js-mobSwiper');
  if (mobileSwiperElement) { mobileSwiperHandler(mobileSwiperElement) }

  // Обработка отзывов
  Fancybox.bind("[data-fancybox]", {
    Toolbar: {
      display: {
        left: [ "infobar" ],
        right: [ "thumbs", "close" ],
      },
    },
  });
});