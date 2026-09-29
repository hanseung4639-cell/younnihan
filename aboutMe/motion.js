(() => {
  const slots = [...document.querySelectorAll('.photo-slot')];
  if (!slots.length || !('IntersectionObserver' in window)) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 1023px)');
  const visible = new Set();
  const positions = new Map(slots.map(slot => [slot, {
    photo: slot.querySelector('.about-photo'),
    pan: 0,
    follow: 0,
    initialized: false,
  }]));
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const approach = (current, target, ease) =>
    Math.abs(target - current) < 0.05 ? target : current + (target - current) * ease;
  let frame = 0;
  let previousTime = 0;
  let previousScroll = scrollY;

  function paint(time) {
    frame = 0;
    if (reducedMotion.matches || document.hidden) return;
    const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16;
    previousTime = time;
    const ease = 1 - Math.exp(-elapsed / 110);
    const followEase = 1 - Math.exp(-elapsed / 150);
    const jumped = Math.abs(scrollY - previousScroll) > innerHeight * 0.75;
    previousScroll = scrollY;
    let unsettled = false;

    // Read stationary wrappers before writing transforms to avoid layout feedback.
    const measurements = [...visible].map(slot => [
      slot, slot.getBoundingClientRect(), positions.get(slot).photo.offsetHeight,
    ]);
    for (const [slot, rect, photoHeight] of measurements) {
      const progress = Math.max(-1, Math.min(1,
        (innerHeight - rect.top * 2 - rect.height) / (innerHeight + rect.height)));
      const target = progress * photoHeight * (compact.matches ? 0.012 : 0.025);
      const state = positions.get(slot);
      state.pan = approach(state.pan, target, ease);

      // Follow earlier than the old top-pinned sticky position, then gently
      // catch up when scrolling stops. Keep all travel inside this section.
      const room = Math.max(0, rect.height - photoHeight);
      const inset = clamp(innerHeight * 0.16, 48, 120);
      const followTarget = compact.matches ? 0 : clamp(inset - rect.top, 0, room);
      state.follow = !state.initialized || jumped
        ? followTarget
        : clamp(approach(state.follow, followTarget, followEase), 0, room);
      state.initialized = true;

      slot.style.setProperty('--photo-y', `${state.pan.toFixed(2)}px`);
      slot.style.setProperty('--photo-follow-y', `${state.follow.toFixed(2)}px`);
      if (Math.abs(target - state.pan) >= 0.05 || Math.abs(followTarget - state.follow) >= 0.05)
        unsettled = true;
    }
    if (unsettled) frame = requestAnimationFrame(paint);
    else previousTime = 0;
  }

  function schedule() {
    if (!frame && visible.size && !reducedMotion.matches && !document.hidden)
      frame = requestAnimationFrame(paint);
  }

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        visible.add(entry.target);
        if (!reducedMotion.matches) entry.target.classList.add('is-visible');
      } else {
        visible.delete(entry.target);
        positions.get(entry.target).initialized = false;
      }
    }
    schedule();
  }, { threshold: 0 });

  function configure() {
    cancelAnimationFrame(frame);
    frame = previousTime = 0;
    previousScroll = scrollY;
    for (const slot of slots) {
      slot.toggleAttribute('data-motion', !reducedMotion.matches);
      slot.toggleAttribute('data-follow', !reducedMotion.matches && !compact.matches);
      const state = positions.get(slot);
      state.initialized = false;
      state.follow = 0;
      slot.style.removeProperty('--photo-follow-y');
      if (reducedMotion.matches) {
        slot.classList.remove('is-visible');
        slot.style.removeProperty('--photo-y');
        state.pan = 0;
      }
    }
    schedule();
  }

  slots.forEach(slot => observer.observe(slot));
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('pageshow', schedule);
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(frame);
    frame = previousTime = 0;
    schedule();
  });
  reducedMotion.addEventListener('change', configure);
  compact.addEventListener('change', configure);
  configure();
})();
