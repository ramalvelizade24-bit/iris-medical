(() => {
  const key = 'iris-catalog-return-v1';
  const read = () => { try { return JSON.parse(sessionStorage.getItem(key) || 'null'); } catch { return null; } };
  const save = state => { try { sessionStorage.setItem(key, JSON.stringify(state)); } catch {} };
  const frame = document.getElementById('madhu-catalog-frame');
  const panel = document.getElementById('category-panel');
  const returning = new URL(location.href).searchParams.has('irisReturn');
  const siteRoot = new URL('../', document.currentScript.src);
  const safeURL = value => {
    try {
      const url = new URL(value, location.href);
      return url.protocol === location.protocol && url.host === location.host && url.pathname.startsWith(siteRoot.pathname) && (url.pathname.endsWith('.html') || url.pathname.endsWith('/')) ? url : null;
    } catch { return null; }
  };
  const directoryScrollKey = 'iris-directory-scroll-v1';
  const scrollKey = value => { const url = new URL(value); url.searchParams.delete('irisReturn'); return url.href; };
  function returnURL() {
    const url = new URL(location.href);
    url.searchParams.set('irisReturn', '1');
    if (frame) url.hash = 'services';
    return url.href;
  }
  function openProduct(href, state) {
    const url = safeURL(href);
    if (!url) return;
    save({ ...state, y: scrollY });
    url.searchParams.set('irisFrom', returnURL());
    location.assign(url.href);
  }
  function catalogState() {
    const buttons = [...panel.querySelectorAll('button:not(.accordion-trigger)')];
    return {
      selected: buttons.findIndex(b => b.getAttribute('aria-pressed') === 'true'),
      search: document.getElementById('search')?.value || '',
      open: [...panel.querySelectorAll('details')].map(item => item.open),
      expanded: [...panel.querySelectorAll('.accordion-trigger')].map(item => item.getAttribute('aria-expanded') === 'true'),
      page: window.irisCatalogPage?.get() || 1,
      panelOpen: !panel.hidden
    };
  }
  window.irisOpenCatalogDirectory = href => {
    if (panel) {
      const state = catalogState();
      if (self !== top) parent.postMessage({ type: 'iris-open-product', href, state }, '*');
      else openProduct(href, state);
      return;
    }
    const url = safeURL(href); if (!url) return;
    try { const positions = JSON.parse(sessionStorage.getItem(directoryScrollKey) || '{}'); positions[scrollKey(location.href)] = scrollY; sessionStorage.setItem(directoryScrollKey, JSON.stringify(positions)); } catch {}
    url.searchParams.set('irisFrom', returnURL());
    location.assign(url.href);
  };
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
      panel.querySelectorAll('.accordion-trigger').forEach((button, i) => {
        const expanded = !!state.expanded?.[i];
        button.setAttribute('aria-expanded', String(expanded));
        if (button.nextElementSibling) button.nextElementSibling.hidden = !expanded;
      });
      window.irisCatalogPage?.restore(state.page);
      if (state.panelOpen) { panel.hidden = false; document.getElementById('category-trigger')?.setAttribute('aria-expanded', 'true'); }
      if (self !== top) requestAnimationFrame(() => requestAnimationFrame(() => parent.postMessage({ type: 'iris-catalog-restored', height: Math.max(1000, Math.ceil(document.querySelector('.shell').getBoundingClientRect().height + 24)) }, '*')));
      else restoreScroll(state.y);
    }
    document.addEventListener('click', event => {
      const a = event.target.closest('.card a[href]');
      if (!a || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !new URL(a.href).pathname.includes('/products/')) return;
      event.preventDefault();
      const state = catalogState();
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
    const url = safeURL(from);
    if (url) back.href = url.href;
  }
  if (!panel && !frame) {
    document.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const product = event.target.closest('.card a[href]');
      if (product && safeURL(product.href)?.pathname.includes('/products/')) { event.preventDefault(); window.irisOpenCatalogDirectory(product.href); return; }
      const link = event.target.closest('.blade-group[href],.blade-back[href]');
      if (link && from) { const url = safeURL(link.href); if (url) { url.searchParams.set('irisFrom', from); link.href = url.href; } }
    }, true);
    if (returning) {
      try { const positions = JSON.parse(sessionStorage.getItem(directoryScrollKey) || '{}'); restoreScroll(positions[scrollKey(location.href)]); } catch {}
    }
  }
})();
