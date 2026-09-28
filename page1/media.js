// User-supplied checkout preview. Set to an empty string to show only the poster.
const HERO_VIDEO_SRC = "/page1/assets/checkout.mp4";
const HERO_VIDEO_SPEED = 1.25;

(() => {
  const video = document.querySelector("#hero-video");
  const poster = document.querySelector("#hero-poster");
  if (!HERO_VIDEO_SRC || !video || !poster) return;

  const showPoster = () => {
    video.hidden = true;
    poster.hidden = false;
  };
  video.addEventListener(
    "loadeddata",
    () => {
      video.hidden = false;
      poster.hidden = true;
      video.playbackRate = HERO_VIDEO_SPEED;
      video.play().catch(showPoster);
    },
    { once: true },
  );
  video.addEventListener("error", showPoster);
  video.muted = true;
  video.autoplay = true;
  video.defaultPlaybackRate = HERO_VIDEO_SPEED;
  video.playbackRate = HERO_VIDEO_SPEED;
  video.src = HERO_VIDEO_SRC;
})();
