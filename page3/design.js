(() => {
  const sections = [...document.querySelectorAll(".design-section")];
  const update = () => {
    const mobile = window.innerWidth <= 760;
    const scale = mobile
      ? (document.documentElement.clientWidth - 40) / 1660
      : Math.min(document.documentElement.clientWidth / 1920, 1);
    document.documentElement.style.setProperty("--design-scale", scale);
    for (const section of sections) {
      section.style.setProperty(
        "--design-scale",
        mobile && section.classList.contains("is-expanded") ? 0.8 : scale,
      );
    }
  };
  for (const button of document.querySelectorAll(".detail-toggle")) {
    button.addEventListener("click", () => {
      const section = button.closest(".design-section");
      const expanded = section.classList.toggle("is-expanded");
      button.setAttribute("aria-expanded", String(expanded));
      button.textContent = expanded ? "Fit diagram to screen" : "View details";
      update();
    });
  }
  update();
  window.addEventListener("resize", update, { passive: true });
  const video = document.querySelector(".interaction-video");
  if (video) {
    video.muted = true;
    const play = () => video.play().catch(() => {});
    play();
    video.addEventListener("loadeddata", play, { once: true });
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) play();
    });
  }
})();
