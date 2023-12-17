function modalPhoneHandler(swiper) {
  const closeButtons = document.querySelectorAll('.modal-phone .js-modal-phone-close');
  const phoneButton = document.querySelector('#js-modal-phone-button');
  const modal = document.querySelector('#js-modal-phone');
  const modalWrapper = document.querySelector('.js-modal-phone-wrapper');

  if (closeButtons.length === 0 || !phoneButton || !modal) {
    console.log('Error modal phones');
    return;
  }


  function windowMissClickCloseHandler(e) {
    if (!e.target.closest('#js-modal-phone')) {
      closeModal()
    }
  }

  function modalPositionHandler(showFlag) {
    if (showFlag) {
      modal.style.top = `${phoneButton.getBoundingClientRect().top}px`;
      modal.style.left = `${phoneButton.getBoundingClientRect().right}`
        - `${modal.getBoundingClientRect().width}` + 'px';
    } else {
      modal.style.top = '';
    }
  }

  phoneButton.addEventListener('click', () => {
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    document.body.style.overflow = 'hidden';
    modalWrapper.style.display = 'block';
    modal.classList.add('visible');
    modalPositionHandler(true);
    window.addEventListener('mouseup', windowMissClickCloseHandler);
    swiper.autoplay.pause();
  });

  function closeModal() {
    modal.classList.remove('visible');
    document.body.style.overflow = '';
    document.body.style.paddingRight = 0;
    modalPositionHandler(false);
    window.removeEventListener('mouseup', windowMissClickCloseHandler);
    setTimeout(() => {
      modalWrapper.style.display = '';
      modal.style.left = '';
      swiper.autoplay.resume();
    }, 500);
  }

  closeButtons.forEach((el) => {
    el.addEventListener('click', closeModal);
  });


  window.addEventListener('keydown', (e) => {
    const key = e.key || e.keyCode;
    if (key === 'Escape' || key === '27') {
      closeModal()
    }
  });
}

export default modalPhoneHandler;