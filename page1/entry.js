// Page1 is now a standalone HTML document. Bypass the old exported Next.js
// client route payload for this one destination; all other routes keep working.
document.addEventListener(
  "click",
  (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const link =
      event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (
      !link ||
      link.hasAttribute("download") ||
      (link.target && link.target !== "_self")
    )
      return;
    const url = new URL(link.href, window.location.href);
    if (
      url.origin !== window.location.origin ||
      !/^\/page1\/?$/.test(url.pathname)
    )
      return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign(url.href);
  },
  true,
);
