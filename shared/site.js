(() => {
  const contact = {
    email: "han.seung4639@gmail.com",
    phone: "834487132",
    linkedin: "https://www.linkedin.com/feed/",
  };
  const mountFooter = () => {
    if (document.querySelector("[data-site-footer]")) return;
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.dataset.siteFooter = "";
    footer.setAttribute("aria-label", "Contact Younni");
    footer.innerHTML = `
      <div class="footer-inner">
        <div class="footer-row">
          <div class="footer-message">
            <h2 class="footer-title">Let’s connect</h2>
            <p class="footer-copy">Let’s make something meaningful together.<br>Feel free to reach out.</p>
          </div>
          <nav class="footer-links" aria-label="Contact links">
            <a href="${contact.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:${contact.email}">Email</a>
            <a href="tel:${contact.phone}" aria-label="Phone: ${contact.phone}">Phone</a>
          </nav>
        </div>
        <p class="footer-copyright">© 2026 Younni Han</p>
      </div>`;
    document.body.append(footer);
  };
  // The older static exports hydrate with Next.js. Mount outside their content
  // after loading, and retain one shared footer if an old route rerenders.
  const start = () => {
    mountFooter();
    new MutationObserver(mountFooter).observe(document.body, {
      childList: true,
    });
  };
  const hasLegacyRuntime = document.querySelector('script[src*="/_next/"]');
  if (!hasLegacyRuntime || document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });

  // Use the updated static documents instead of the old Next route payloads.
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
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;
      if (
        !link ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      )
        return;
      const url = new URL(link.href, location.href);
      if (
        url.origin !== location.origin ||
        !/^\/(?:page[1-4]|aboutMe)?\/?$/.test(url.pathname)
      )
        return;
      if (url.pathname === location.pathname && url.hash) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      location.assign(url.href);
    },
    true,
  );
})();
