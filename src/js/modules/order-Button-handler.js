export default function orderButtonHandler(selector, waNumber) {
  const orderButtons = document.querySelectorAll(selector);
  if (orderButtons && orderButtons.length > 0) {
    orderButtons.forEach((el) => {
      el.addEventListener('click', () => {
        var link = document.createElement("a");
        link.href = waNumber;
        link.target = "_blank";
        link.click();
        link = null;
      })
    })
  } else {
    console.log('No order buttons')
  }
}