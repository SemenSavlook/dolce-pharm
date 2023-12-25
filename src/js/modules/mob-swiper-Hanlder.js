
// Клонирует контейнер и делает из него мобильный Swiper
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

var mobSwiper;
var windowWidth = window.innerWidth;
var mobSwiperProps = {
  modules: [ Navigation, Pagination, Autoplay ],
  loop: true,
  speed: 2000,
  spaceBetween: 10,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    pauseOnMouseEnter: true
  },
  pagination: {
    el: '.mob-swiper-pagination',
    clickable: true
  },
}

function mobileSwiperHandler(elem) {

  window.addEventListener('load', () => {
    const pagination = document.createElement('div');
    pagination.classList.add('swiper-pagination', 'mob-swiper-pagination');

    const clone = elem.cloneNode(true);
    clone.classList.add('mobSwiper');
    clone.append(pagination);
    elem.after(clone);
    swiperInit();

    window.addEventListener('resize', checkWindowSize);
  });
}

function swiperInit() {
  if (window.innerWidth <= 576) {
    mobSwiper = new Swiper('.mobSwiper', mobSwiperProps);
  }
}

function needRender() {
  if (window.innerWidth !== windowWidth) {
    windowWidth = window.innerWidth;
    return true;
  } else {
    return false;
  }
}

function checkWindowSize() {
  if (needRender()) {
    if (mobSwiper) {
      mobSwiper.destroy(true, true);
    }
    swiperInit();
  }
}

export default mobileSwiperHandler;