const closeButtons = document.querySelectorAll('.js-modal-phone-close');
const phoneButton = document.querySelector('#js-modal-phone-button');
const modal = document.querySelector('#js-modal-phone');


const overflow = document.createElement('div');
overflow.classList.add('overflow-body')

phoneButton.addEventListener('click', () => {
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
  modal.classList.add('visible');
  document.body.style.overflow = 'hidden';
  modal.before(overflow)
  console.log(overflow)
})

closeButtons.forEach((el) => {
  el.addEventListener('click', () => {
    modal.classList.remove('visible');
    document.body.style.overflow = '';
    overflow.remove();
    document.body.style.paddingRight = 0;
  })
})