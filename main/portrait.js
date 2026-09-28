(() => {
  const hero = document.querySelector(".introduction");
  const anchor = document.querySelector(".portrait-orbit");
  const portrait = document.querySelector(".portrait-aura");
  if (!hero || !anchor || !portrait) return;

  const enabled = matchMedia(
    "(min-width: 1101px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  );
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  let bounds;
  let frame = 0;
  let lastTime = 0;
  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;

  function measure() {
    const area = hero.getBoundingClientRect();
    const base = anchor.getBoundingClientRect();
    // Measure the visible text, not the unused width of its grid column.
    const text = document.createTreeWalker(
      hero.firstElementChild,
      NodeFilter.SHOW_TEXT,
    );
    let textRight = area.left;
    let node;
    while ((node = text.nextNode())) {
      if (!node.textContent.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const rect of range.getClientRects())
        textRight = Math.max(textRight, rect.right);
    }
    bounds = {
      area,
      // The soft glow may extend behind copy, but the photograph never does.
      minX: Math.min(0, Math.max(-280, textRight + 32 - base.left)),
      maxX: Math.max(0, Math.min(240, innerWidth - 32 - base.right)),
    };
  }

  function paint(time) {
    const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
    lastTime = time;
    const ease = 1 - Math.exp(-elapsed / 125);
    x += (targetX - x) * ease;
    y += (targetY - y) * ease;
    const settled = Math.abs(targetX - x) + Math.abs(targetY - y) < 0.05;
    if (settled) {
      x = targetX;
      y = targetY;
    }
    portrait.style.setProperty("--portrait-x", `${x.toFixed(2)}px`);
    portrait.style.setProperty("--portrait-y", `${y.toFixed(2)}px`);
    portrait.style.setProperty(
      "--portrait-tilt",
      `${clamp(x / 55, -2, 2).toFixed(2)}deg`,
    );
    frame = settled ? 0 : requestAnimationFrame(paint);
    if (settled) lastTime = 0;
  }

  function animate() {
    if (!frame) frame = requestAnimationFrame(paint);
  }

  function reset() {
    targetX = targetY = 0;
    animate();
  }

  hero.addEventListener(
    "pointermove",
    (event) => {
      if (!enabled.matches || event.pointerType === "touch") return;
      if (!bounds) measure();
      const { area, minX, maxX } = bounds;
      if (minX > maxX) return reset();
      const horizontal =
        clamp((event.clientX - area.left) / area.width, 0, 1) * 2 - 1;
      const vertical =
        clamp((event.clientY - area.top) / area.height, 0, 1) * 2 - 1;
      targetX = clamp(horizontal * (horizontal < 0 ? 280 : 240), minX, maxX);
      targetY = vertical * 48;
      animate();
    },
    { passive: true },
  );
  hero.addEventListener("pointerleave", reset);
  window.addEventListener("blur", reset);
  window.addEventListener(
    "scroll",
    () => {
      bounds = null;
      reset();
    },
    { passive: true },
  );
  window.addEventListener(
    "resize",
    () => {
      bounds = null;
      reset();
    },
    { passive: true },
  );
  enabled.addEventListener("change", () => {
    cancelAnimationFrame(frame);
    frame = lastTime = x = y = targetX = targetY = 0;
    portrait.style.removeProperty("--portrait-x");
    portrait.style.removeProperty("--portrait-y");
    portrait.style.removeProperty("--portrait-tilt");
    bounds = null;
  });
})();
