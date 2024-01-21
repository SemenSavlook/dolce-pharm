const defOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 1
}

export default function animationObserver(selector, animationClass, options = defOptions) {

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove(animationClass);
        observer.unobserve(entry.target);
      }
    })
  }, options);

  document.querySelectorAll(selector).forEach(el => {
    observer.observe(el);
  });
}