export default function modalRequest() {
  const modal = document.querySelector('.js-modal-request');
  const requestButtons = document.querySelectorAll('.js-modal-request-buttons');
  const closeButtons = document.querySelector('.js-modal-button-close');

  function closeModal(e) {
    if (!e.target.closest('.modal-wrapper')) {
      modal.classList.remove('visible')
    }
    // window.removeEventListener('mouseup', closeModal)
  }

  function modalCloseHandler() {
    window.addEventListener('mouseup', closeModal)
  }
  modalCloseHandler();

  closeButtons.addEventListener('click', () => {
    modal.classList.remove('visible')
  })

  requestButtons.forEach((e) => {
    e.addEventListener('click', () => {
      modal.classList.add('visible');
    })
  })

}