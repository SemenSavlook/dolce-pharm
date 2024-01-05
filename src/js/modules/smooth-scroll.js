export default function smoothScroll(element) {
  element.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  })
}