const closeButtons = document.querySelectorAll('.js-modal-phone-close');
const phoneButton = document.querySelector('#js-modal-phone-button');
const modal = document.querySelector('#js-modal-phone');

const overflow = document.createElement('div');
overflow.classList.add('overflow-body');

phoneButton.addEventListener('click', () => {
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
  document.body.style.overflow = 'hidden';
  modal.before(overflow);
  modal.classList.add('visible');
  window.addEventListener('mouseup', closeHandler);
});

function closeModal() {
  modal.classList.remove('visible');
  document.body.style.overflow = '';
  overflow.remove();
  document.body.style.paddingRight = 0;
  window.removeEventListener('mouseup', closeHandler);
}

closeButtons.forEach((el) => {
  el.addEventListener('click', closeModal);
});

function closeHandler(e) {
  if (!e.target.closest('#js-modal-phone')) {
    closeModal()
  }
}

window.addEventListener('keydown', (e) => {
  const key = e.key || e.keyCode;
  if (key === 'Escape' || key === '27') {
    closeModal()
  }
});