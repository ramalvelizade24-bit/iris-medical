(() => {
  const links = [...document.querySelectorAll('a[data-product-order]')];
  if (!links.length) return;
  function updateOrderLinks() {
    const product = document.querySelector('main h1')?.textContent.trim() || 'Məhsul';
    const message = window.irisOrderMessage
      ? window.irisOrderMessage(product)
      : `Salam! ${product} məhsulunu sifariş etmək istəyirəm. Zəhmət olmasa, qiymət və mövcudluq barədə məlumat verin.`;
    for (const link of links) {
      link.href = 'https://wa.me/994512521701?text=' + encodeURIComponent(message);
      link.target = '_blank';
      link.rel = 'noopener';
    }
  }
  updateOrderLinks();
  document.addEventListener('iris-language-change', updateOrderLinks);
})();
