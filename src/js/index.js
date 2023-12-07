import modalPhoneHandler from "./modules/modal-phones";
import modalRequest from "./modules/modal-request";
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/autoplay';

window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper('.swiper', {
    modules: [ Navigation, Pagination, Autoplay ],
    loop: true,
    speed: 1500,
    spaceBetween: 50,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
  });
  // console.dir(swiper)
  modalPhoneHandler();
  modalRequest();
})