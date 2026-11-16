// 캐슬 캐논 랜딩 페이지 동작입니다. 처음 나타남과 영상 재생과 정지를 처리합니다.
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var items = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { observer.observe(el); });
  }

  var video = document.getElementById("gameplay");
  var toggle = document.querySelector("[data-video-toggle]");
  if (!video || !toggle) { return; }
  var lang = document.documentElement.lang === "en" ? "en" : "ko";
  var label = { ko: { play: "재생", pause: "정지" }, en: { play: "Play", pause: "Pause" } }[lang];

  function sync() {
    var playing = !video.paused;
    toggle.textContent = playing ? label.pause : label.play;
    toggle.setAttribute("aria-pressed", playing ? "true" : "false");
  }
  video.addEventListener("play", sync);
  video.addEventListener("pause", sync);
  toggle.addEventListener("click", function () {
    if (video.paused) { video.play().catch(function () {}); } else { video.pause(); }
  });
  if (!reduceMotion) {
    video.play().catch(function () {});
  }
  sync();
})();
