export default function modalRequestPrice(swiper) {
  const modal = document.querySelector('.js-request-price-modal');
  const requestPriceButtons = document.querySelectorAll('.js-modal-request-price');
  const closeButton = document.querySelector('.js-modal-price-button-close');
  const body = document.body;

  if (!(modal && requestPriceButtons && closeButton)) {
    console.log('ModalRequestPrice Error')
    return
  }

  function missClickCloseModal(e) {
    if (!e.target.closest('.modal-wrapper')) {
      closeModal();
    }
  }

  function escClickHandler(e) {
    const key = e.key || e.keyCode;
    if (key === 'Escape' || key === '27') {
      closeModal()
    }
  }

  // Закрытие модального окна
  function closeModal() {
    window.removeEventListener('mouseup', missClickCloseModal);
    window.removeEventListener('keydown', escClickHandler);
    swiper.autoplay.resume();
    modal.classList.remove('visible');
    body.style.paddingRight = '';
    body.style.overflow = '';
  }

  function showModal() {
    body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    modal.classList.add('visible');
    body.style.overflow = 'hidden';
    window.addEventListener('mouseup', missClickCloseModal);
    window.addEventListener('keydown', escClickHandler);
    swiper.autoplay.pause();
  }

  requestPriceButtons.forEach((e) => e.addEventListener('click', showModal));

  closeButton.addEventListener('click', (e) => {
    e.preventDefault()
    closeModal()
  });
}