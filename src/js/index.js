import modalPhoneHandler from "./modules/modal-phones";
import Swiper from 'swiper';
import 'swiper/css';

// eslint-disable-next-line no-unused-vars
const swiper = new Swiper('.swiper', {
  loop: true,
  speed: 1000,
  spaceBetween: 20,
  autoplay: true,
});

modalPhoneHandler();
