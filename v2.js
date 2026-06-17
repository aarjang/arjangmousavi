/* v2.js — motion system for Arjang Mousavi v2
   Vanilla, dependency-free. All effects degrade under prefers-reduced-motion. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;

  /* ---- Logo draw-on + hero entrance ---- */
  window.addEventListener("load", function () {
    document.querySelectorAll(".am-mark").forEach(function (m) { m.classList.add("drawn"); });
    var hero = document.querySelector(".hero h1");
    if (hero && !reduce) {
      hero.querySelectorAll(".line > span").forEach(function (s, i) {
        s.style.transition = "transform 1s var(--ease)";
        s.style.transform = "translateY(110%)";
        requestAnimationFrame(function () {
          setTimeout(function () { s.style.transform = "none"; }, 120 + i * 130);
        });
      });
    }
  });

  /* ---- Reveal on scroll ---- */
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll("[data-reveal],[data-reveal-line],.hairline-wipe").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll("[data-reveal],[data-reveal-line],.hairline-wipe").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Count-ups ---- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-target"));
    var dur = 1400, t0 = null;
    if (reduce) { el.textContent = formatN(target); return; }
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatN(target * eased, target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = formatN(target);
    }
    requestAnimationFrame(step);
  }
  function formatN(v, target) {
    if (target !== undefined && target % 1 !== 0) return v.toFixed(1);
    return Math.round(v).toString();
  }
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll("[data-target]").forEach(function (el) { cio.observe(el); });

  /* ---- Topbar scrolled state + section nav highlight ---- */
  var topbar = document.querySelector(".topbar");
  function onScroll() {
    if (topbar) topbar.classList.toggle("scrolled", window.scrollY > 24);
    updatePin();
  }

  /* ---- Pinned Selected Work timeline ---- */
  var pin = document.querySelector(".work-pin");
  var roles = pin ? Array.prototype.slice.call(pin.querySelectorAll(".role")) : [];
  var dots = pin ? Array.prototype.slice.call(pin.querySelectorAll(".pin-rail button")) : [];
  if (pin && roles.length) {
    if (reduce) {
      roles.forEach(function (r) { r.classList.add("active"); });
    } else {
      pin.style.height = (roles.length * 92) + "vh";
    }
  }
  var curIdx = -1;
  function setRole(i) {
    if (i === curIdx) return; curIdx = i;
    roles.forEach(function (r, j) { r.classList.toggle("active", j === i); });
    dots.forEach(function (d, j) { d.classList.toggle("on", j === i); });
  }
  function updatePin() {
    if (!pin || !roles.length || reduce) return;
    var stageH = window.innerHeight - 76;
    var rect = pin.getBoundingClientRect();
    var total = pin.offsetHeight - stageH;
    var scrolled = Math.min(Math.max(-rect.top, 0), total);
    var p = total > 0 ? scrolled / total : 0;
    var idx = Math.min(roles.length - 1, Math.floor(p * roles.length + 0.0001));
    setRole(idx);
  }
  dots.forEach(function (d, j) {
    d.addEventListener("click", function () {
      var stageH = window.innerHeight - 76;
      var total = pin.offsetHeight - stageH;
      var y = pin.offsetTop + (j + 0.5) / roles.length * total;
      window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
    });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () {
    if (pin && roles.length && !reduce) pin.style.height = (roles.length * 92) + "vh";
    updatePin();
  });
  onScroll();
  setRole(0);

  /* ---- Custom cursor + magnetic ---- */
  if (fine && !reduce) {
    var cur = document.createElement("div");
    cur.className = "cursor";
    document.body.appendChild(cur);
    var cx = window.innerWidth / 2, cy = window.innerHeight / 2, tx = cx, ty = cy;
    document.addEventListener("mousemove", function (e) { tx = e.clientX; ty = e.clientY; });
    (function raf() {
      cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22;
      cur.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)";
      requestAnimationFrame(raf);
    })();
    document.querySelectorAll("a, button, .magnetic, h1, .sec-title").forEach(function (el) {
      el.addEventListener("mouseenter", function () { cur.classList.add("ring"); });
      el.addEventListener("mouseleave", function () { cur.classList.remove("ring"); });
    });
    // magnetic pull on CTAs
    document.querySelectorAll(".btn, .nav-cta").forEach(function (el) {
      el.classList.add("magnetic");
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        el.style.transform = "translate(" + mx * 0.25 + "px," + my * 0.35 + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---- Email de-obfuscation ---- */
  document.querySelectorAll("[data-email]").forEach(function (el) {
    var user = el.getAttribute("data-user"), dom = el.getAttribute("data-domain");
    if (!user || !dom) return;
    var addr = user + "@" + dom;
    el.textContent = addr;
    el.setAttribute("href", "mailto:" + addr);
  });

  /* ---- Section number parallax ---- */
  if (!reduce) {
    var stamps = document.querySelectorAll("[data-parallax]");
    window.addEventListener("scroll", function () {
      stamps.forEach(function (s) {
        var r = s.getBoundingClientRect();
        var off = (r.top - window.innerHeight / 2) * -0.04;
        s.style.transform = "translateY(" + off + "px)";
      });
    }, { passive: true });
  }
})();
