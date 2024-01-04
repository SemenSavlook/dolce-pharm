// Запрос прайс листа
export default function modalRequestPrice(swiper) {
  const modal = document.querySelector('.js-request-price-modal');
  const requestPriceButtons = document.querySelectorAll('.js-modal-request-price');
  const closeButton = document.querySelector('.js-modal-price-button-close');
  const body = document.body;

  const form = modal.querySelector('#js-modal-request-form');
  const allInputs = form.querySelectorAll('input');
  const submitBtn = form.querySelector('#js-modal-request-submit');
  const nameField = form.querySelector('[name="full-name"]');
  const companyField = form.querySelector('[name="company"]');
  const telField = form.querySelector('[name="phone"]');
  const emailField = form.querySelector('[name="email"]');
  const warningField = form.querySelector('.warning');

  var openFlag = false;

  if (!(modal && requestPriceButtons && closeButton && form)) {
    console.log('ModalRequestPrice Error')
    return
  }

  function missClickCloseModal(e) {
    if (!e.target.closest('.modal-wrapper')) {
      closeModal();
    }
  }

  function escButtonHandler(e) {
    const key = e.key || e.keyCode;
    if (key === 'Escape' || key === '27') {
      closeModal()
    }
  }

  // Закрытие модального окна
  function closeModal() {
    openFlag = false;
    requiredAttrHandler();
    window.removeEventListener('mouseup', missClickCloseModal);
    window.removeEventListener('keydown', escButtonHandler);
    swiper.autoplay.resume();
    modal.classList.remove('visible');
    body.style.paddingRight = '';
    body.style.overflow = '';
  }

  // Показ окна
  function showModal() {
    openFlag = true;
    body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    modal.classList.add('visible');
    body.style.overflow = 'hidden';
    window.addEventListener('mouseup', missClickCloseModal);
    window.addEventListener('keydown', escButtonHandler);
    requiredAttrHandler();
    swiper.autoplay.pause();
  }

  function requiredAttrHandler() {
    if (openFlag) {
      allInputs.forEach(el => el.setAttribute('required', 'required'));
    } else {
      allInputs.forEach(el => el.removeAttribute('required'));
    }
  }

  requestPriceButtons.forEach((e) => e.addEventListener('click', showModal));

  closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
  });

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (allInputs.length > 0 && Array.from(allInputs).every(el => el.value.length === 0)) {
      warningField.classList.add('show');
      setTimeout(() => {
        warningField.classList.remove('show');
      }, 2000);

      return;
    }

    if (checkValidation()) {
      console.log('sucsess');
    } else {
      console.log('invalid');
    }
  });

  // Удаление не цифр
  telField.addEventListener('input', (e) => {
    if (!e.data) return;
    if (!/[0-9()+]+/.test(e.data)) {
      telField.value = telField.value.slice(0, -1);
    }
  });

  showModal();

  function checkName(element, message) {
    if (element.value.length > 1) {
      element.setCustomValidity('');
      return true;
    } else {
      element.setCustomValidity(message);
      return false;
    }
  }

  function checkEmail(element, message) {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(element.value)) {
      element.setCustomValidity('');
      return true;
    } else {
      element.setCustomValidity(message);
    }
  }

  allInputs.forEach(el => el.addEventListener('input', () => el.setCustomValidity('')));

  function checkValidation() {
    if (checkName(nameField, 'Необходимо указать корректное имя')
      && checkName(companyField, 'Необходимо указать название компании')
      && checkEmail(emailField, 'Необходимо указать корректный e-mail')) {
      return true
    } else {
      form.reportValidity();
      return false
    }


  }

}