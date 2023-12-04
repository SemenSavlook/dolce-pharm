export default function modalRequest() {
  const modal = document.querySelector('.js-modal-request');
  const requestButtons = document.querySelectorAll('.js-modal-request-buttons');
  const closeButtons = document.querySelectorAll('.js-modal-button-close');
  const continueButton = document.querySelector('#modal-request-coninue-button');
  const modalBeforeBlock = document.querySelector('.modal-before');
  const modalAfterBlock = document.querySelector('.modal-after');

  function closeModal(e) {
    if (!e.target.closest('.modal-wrapper')) {
      modal.classList.remove('visible');
      modalBeforeBlock.style.display = '';
      modalAfterBlock.style.display = '';
    }
    // window.removeEventListener('mouseup', closeModal)
  }

  continueButton.addEventListener('click', () => {
    modalBeforeBlock.style.display = 'none';
    modalAfterBlock.style.display = 'block';
  })

  function modalCloseHandler() {
    window.addEventListener('mouseup', closeModal)
  }

  modalCloseHandler();

  closeButtons.forEach(e => {
    e.addEventListener('click', (e) => {
      e.preventDefault()
      console.log(e)
      modal.classList.remove('visible')
    })
  })

  requestButtons.forEach((e) => {
    e.addEventListener('click', () => {
      modal.classList.add('visible');
    })
  })

}