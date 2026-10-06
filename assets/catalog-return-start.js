(() => {
  if (self !== top || !new URL(location.href).searchParams.has('irisReturn')) return;
  const style = document.createElement('style');
  style.textContent = 'html.iris-return-wait{background:#F5F8FA}html.iris-return-wait body{opacity:0!important}html.iris-return-ready body{animation:iris-return-in .18s ease-out both}@keyframes iris-return-in{from{opacity:0}to{opacity:1}}@media(prefers-reduced-motion:reduce){html.iris-return-ready body{animation:none}}';
  document.head.append(style);
  document.documentElement.classList.add('iris-return-wait');
  window.irisRevealReturn = () => {
    document.documentElement.classList.remove('iris-return-wait');
    document.documentElement.classList.add('iris-return-ready');
  };
  // A missing catalog or unavailable storage must never leave the page invisible.
  setTimeout(window.irisRevealReturn, 2500);
})();
