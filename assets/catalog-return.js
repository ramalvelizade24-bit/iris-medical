(() => {
  const key = 'iris-catalog-return-v1';
  const read = () => { try { return JSON.parse(sessionStorage.getItem(key) || 'null'); } catch { return null; } };
  const save = state => { try { sessionStorage.setItem(key, JSON.stringify(state)); } catch {} };
  const frame = document.getElementById('madhu-catalog-frame');
  const panel = document.getElementById('category-panel');
  const returning = new URL(location.href).searchParams.has('irisReturn');
  function returnURL() {
    const url = new URL(location.href);
    url.searchParams.set('irisReturn', '1');
    if (frame) url.hash = 'services';
    return url.href;
  }
  function openProduct(href, state) {
    save({ ...state, y: scrollY });
    const url = new URL(href, location.href);
    if (url.protocol !== location.protocol || url.host !== location.host) return;
    url.searchParams.set('irisFrom', returnURL());
    location.assign(url.href);
  }
  let scrollRestored = false;
  function restoreScroll(y) {
    if (scrollRestored) return;
    scrollRestored = true;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      window.scrollTo({ top: y || 0, behavior: 'instant' });
      requestAnimationFrame(() => window.irisRevealReturn?.());
    }));
  }
  if (frame) {
    window.addEventListener('message', event => {
      if (event.source !== frame.contentWindow) return;
      const data = event.data || {};
      if (data.type === 'iris-open-product') openProduct(data.href, data.state);
      if (data.type === 'iris-catalog-ready' && returning) frame.contentWindow.postMessage({ type: 'iris-restore-catalog', state: read() }, '*');
      if (data.type === 'iris-catalog-restored' && returning) {
        const height = Number(data.height);
        if (Number.isFinite(height) && height >= 1000 && height <= 200000) frame.style.height = height + 'px';
        restoreScroll(read()?.y);
      }
    });
  }
  if (panel) {
    const buttons = [...panel.querySelectorAll('button:not(.accordion-trigger)')];
    const details = [...panel.querySelectorAll('details')];
    const search = document.getElementById('search');
    let selected = -1;
    panel.addEventListener('click', event => { const i = buttons.indexOf(event.target.closest('button')); if (i >= 0) selected = i; });
    function restore(state) {
      if (!state) { window.irisRevealReturn?.(); return; }
      if (buttons[state.selected]) buttons[state.selected].click();
      if (search) { search.value = state.search || ''; search.dispatchEvent(new Event('input', { bubbles: true })); }
      details.forEach((item, i) => { item.open = !!state.open?.[i]; });
      if (self !== top) requestAnimationFrame(() => requestAnimationFrame(() => parent.postMessage({ type: 'iris-catalog-restored', height: Math.max(1000, Math.ceil(document.querySelector('.shell').getBoundingClientRect().height + 24)) }, '*')));
      else restoreScroll(state.y);
    }
    document.addEventListener('click', event => {
      const a = event.target.closest('.card a[href]');
      if (!a || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !new URL(a.href).pathname.includes('/products/')) return;
      event.preventDefault();
      const state = { selected, search: search?.value || '', open: details.map(item => item.open) };
      if (self !== top) parent.postMessage({ type: 'iris-open-product', href: a.href, state }, '*');
      else openProduct(a.href, state);
    });
    window.addEventListener('message', event => { if (event.source === parent && event.data?.type === 'iris-restore-catalog') restore(event.data.state); });
    if (self !== top) parent.postMessage({ type: 'iris-catalog-ready' }, '*');
    else if (returning) restore(read());
  }
  const back = document.querySelector('a.back');
  const from = new URL(location.href).searchParams.get('irisFrom');
  if (back && from) {
    try {
      const url = new URL(from);
      if (url.protocol === location.protocol && url.host === location.host && /\/index(?:-v\d+)?\.html$/.test(url.pathname)) back.href = url.href;
    } catch {}
  }
})();
