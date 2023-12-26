const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1
}

export default function animationObserver(selector, animationClass) {

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove(animationClass);
        console.log('Intersecting');
        observer.unobserve(entry.target);
      }
    })
  }, options);

  document.querySelectorAll(selector).forEach(el => {
    observer.observe(el);
  });
}