(() => {
  // Never conceal the page while the catalog and saved scroll position load.
  window.irisRevealReturn = () => {
    document.documentElement.classList.remove('iris-return-wait');
    document.documentElement.classList.remove('iris-return-ready');
  };
  window.irisRevealReturn();
})();
