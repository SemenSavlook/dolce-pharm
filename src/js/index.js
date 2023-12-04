import modalPhoneHandler from "./modules/modal-phones";
import modalRequest from "./modules/modal-request";
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';

window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 1000,
    spaceBetween: 20,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false
    },
  });
  // console.dir(swiper)
  modalPhoneHandler();
  modalRequest();
})