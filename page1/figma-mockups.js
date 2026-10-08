(() => {
  const measure = () => {
    const wrap = document.querySelector(".journey .wrap");
    if (wrap) {
      document.documentElement.style.setProperty('--page-side-gutter', wrap.getBoundingClientRect().left + 'px');
      document.documentElement.style.setProperty(
        "--figma-mockup-scale",
        window.innerWidth <= 760 ? 0.85 : Math.min(wrap.clientWidth / 1366, 1200 / 1366),
      );
    }
    for (const region of document.querySelectorAll('.figma-lines')) {
      region.style.setProperty('--figma-line-scale', region.clientWidth / 1366);
    }
    const comparison = document.querySelector('.comparison');
    const firstPhone = comparison?.querySelector('.figma-mockup');
    if (firstPhone) comparison.style.setProperty('--comparison-phone-top', (firstPhone.getBoundingClientRect().top - comparison.getBoundingClientRect().top) + 'px');
    const prototypes = document.querySelector('.prototypes');
    const copy = prototypes?.querySelector('.prototype-copy');
    if (copy) prototypes.style.setProperty('--prototype-copy-bottom', (copy.getBoundingClientRect().bottom - prototypes.getBoundingClientRect().top) + 'px');
    const pair = comparison?.querySelector('.phone-pair');
    const buy = pair?.querySelector('.figma-buy-now');
    if (buy) {
      const bounds = pair.getBoundingClientRect(), phone = buy.getBoundingClientRect();
      pair.style.setProperty('--flow-phone-right', (phone.right - bounds.left) + 'px');
      pair.style.setProperty('--flow-phone-top', (phone.top - bounds.top) + 'px');
      pair.style.setProperty('--flow-scale', phone.width / 299.107);
    }
  };
  measure();
  window.addEventListener('load', measure, { once: true });
  document.fonts.ready.then(measure);
  window.addEventListener("resize", measure, { passive: true });
})();
