/* ════════════════════════════════════════════════════════════════
   Franko Sanchez — Portfolio · Shared Behaviour
   Loaded on every page. Theme + accent persist via localStorage so
   one switch controls the whole site.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var THEME_KEY = 'portfolio-theme';   // 'warm' | 'white'
  var ACCENT_KEY = 'portfolio-accent'; // hex string

  /* ── Apply persisted prefs ASAP (also done inline in <head>) ──── */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }
  function applyAccent(hex) {
    document.documentElement.style.setProperty('--gold', hex);
    try { localStorage.setItem(ACCENT_KEY, hex); } catch (e) {}
  }
  function currentTheme() {
    try { return localStorage.getItem(THEME_KEY) || 'warm'; } catch (e) { return 'warm'; }
  }
  function currentAccent() {
    try { return localStorage.getItem(ACCENT_KEY) || '#b8934a'; } catch (e) { return '#b8934a'; }
  }

  // Ensure attribute is present even if the inline head script was absent
  if (!document.documentElement.getAttribute('data-theme')) {
    applyTheme(currentTheme());
  }
  var savedAccent = currentAccent();
  if (savedAccent && savedAccent !== '#b8934a') applyAccent(savedAccent);

  /* ── Nav shadow on scroll ──────────────────────────────────────── */
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /* ── Fade-up reveal ────────────────────────────────────────────── */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Snap everything visible immediately (no flash of blank), keep the
  // transition for genuine scroll reveals further down the page.
  document.querySelectorAll('.fade-up').forEach(function (el) {
    el.style.transition = 'none';
    el.classList.add('visible');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { el.style.transition = ''; });
    });
    observer.observe(el);
  });

  /* ── Skill bars ────────────────────────────────────────────────── */
  var barObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar-fill').forEach(function (bar) {
          var w = bar.style.width; bar.style.width = '0';
          setTimeout(function () { bar.style.width = w; }, 100);
        });
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skills-grid').forEach(function (el) { barObserver.observe(el); });

  /* ── Experience tabs (index only) ──────────────────────────────── */
  window.setExp = function (item) {
    document.querySelectorAll('.exp-item').forEach(function (i) { i.classList.remove('active'); });
    document.querySelectorAll('.exp-panel').forEach(function (p) { p.classList.remove('active'); });
    item.classList.add('active');
    var target = document.getElementById(item.dataset.target);
    if (target) target.classList.add('active');
  };

  /* ── Tweaks panel (injected, identical on every page) ──────────── */
  var hasHeroTweak = !!document.querySelector('.hero-headline');

  var heroRow = hasHeroTweak ? (
    '<div class="tweak-row">' +
      '<span class="tweak-label">Hero words</span>' +
      '<div class="tweak-toggle" data-group="hero">' +
        '<button class="tweak-opt active" data-hero="Field.|Data.|Code.">Field</button>' +
        '<button class="tweak-opt" data-hero="Think.|Build.|Ship.">Build</button>' +
        '<button class="tweak-opt" data-hero="Measure.|Automate.|Deliver.">Auto</button>' +
      '</div>' +
    '</div>'
  ) : '';

  var panel = document.createElement('div');
  panel.id = 'tweaks-panel';
  panel.innerHTML =
    '<div class="tweak-title">Tweaks</div>' +
    '<div class="tweak-row">' +
      '<span class="tweak-label">Background</span>' +
      '<div class="tweak-toggle" data-group="theme">' +
        '<button class="tweak-opt" data-theme-val="warm">Warm</button>' +
        '<button class="tweak-opt" data-theme-val="white">White</button>' +
      '</div>' +
    '</div>' +
    '<div class="tweak-row">' +
      '<span class="tweak-label">Accent colour</span>' +
      '<div class="tweak-options" data-group="accent">' +
        '<div class="tweak-swatch" style="background:#b8934a" data-accent="#b8934a" title="Gold"></div>' +
        '<div class="tweak-swatch" style="background:#4a7fb5" data-accent="#4a7fb5" title="Blue"></div>' +
        '<div class="tweak-swatch" style="background:#6b8f5e" data-accent="#6b8f5e" title="Green"></div>' +
        '<div class="tweak-swatch" style="background:#a8524a" data-accent="#a8524a" title="Terracotta"></div>' +
      '</div>' +
    '</div>' +
    heroRow;
  document.body.appendChild(panel);

  // Reflect persisted state in the controls
  function syncControls() {
    var t = currentTheme();
    panel.querySelectorAll('[data-theme-val]').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-theme-val') === t);
    });
    var a = currentAccent();
    panel.querySelectorAll('[data-accent]').forEach(function (s) {
      s.classList.toggle('active', s.getAttribute('data-accent') === a);
    });
  }
  syncControls();

  // Background toggle
  panel.querySelectorAll('[data-theme-val]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyTheme(btn.getAttribute('data-theme-val'));
      syncControls();
    });
  });
  // Accent swatches
  panel.querySelectorAll('[data-accent]').forEach(function (sw) {
    sw.addEventListener('click', function () {
      applyAccent(sw.getAttribute('data-accent'));
      syncControls();
    });
  });
  // Hero words
  panel.querySelectorAll('[data-hero]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var parts = btn.getAttribute('data-hero').split('|');
      var hl = document.querySelector('.hero-headline');
      if (hl) hl.innerHTML = parts[0] + '<br><span class="accent">' + parts[1] + '</span><br>' + parts[2];
      panel.querySelectorAll('[data-hero]').forEach(function (o) { o.classList.remove('active'); });
      btn.classList.add('active');
    });
  });

  // Host edit-mode protocol
  window.addEventListener('message', function (e) {
    if (!e.data) return;
    if (e.data.type === '__activate_edit_mode') panel.classList.add('open');
    if (e.data.type === '__deactivate_edit_mode') panel.classList.remove('open');
  });
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}
})();
