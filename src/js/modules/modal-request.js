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


  function showModal() {
    body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    modal.classList.add('visible');
    body.style.overflow = 'hidden';
    window.addEventListener('mouseup', missClickCloseModal);
    swiper.autoplay.pause();
  }

  function closeModal() {
    window.removeEventListener('mouseup', missClickCloseModal);
    swiper.autoplay.resume();
    modal.classList.remove('visible');
    body.style.paddingRight = '';
    body.style.overflow = '';
  }

  requestPriceButtons.forEach((e) => e.addEventListener('click', showModal));

  closeButton.addEventListener('click', (e) => {
    e.preventDefault()
    closeModal()
  });
}