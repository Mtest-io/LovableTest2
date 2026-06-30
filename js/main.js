/**
 * MMC Digital Labs v4 — main.js
 * • Carga header.html y footer.html desde /components/
 * • Header se auto-oculta a los 3 s, reaparece con mouse/touch/scroll-up
 * • Menú hamburguesa en móvil
 * • Link activo en nav
 * • Back-to-top
 * • Año en footer
 */
(function () {
  'use strict';

  /* ── BASE PATH ─────────────────────────────────────────── */
  function base() {
    const d = (window.location.pathname.match(/\//g) || []).length - 1;
    return d > 0 ? '../'.repeat(d) : './';
  }

  /* ── LOAD COMPONENT ────────────────────────────────────── */
  async function load(id, file) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const r = await fetch(base() + 'components/' + file);
      if (!r.ok) throw new Error(r.status);
      el.outerHTML = await r.text();
    } catch (e) {
      console.warn('[MMC] No se cargó ' + file, e.message);
    }
  }

  /* ── ACTIVE NAV LINK ───────────────────────────────────── */
  function setActive() {
    const cur = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#site-header .nav-links a').forEach(a => {
      const href = (a.getAttribute('href') || '').split('/').pop();
      if (href === cur || (cur === '' && href === 'index.html')) a.classList.add('active');
    });
  }

  /* ── HAMBURGER ─────────────────────────────────────────── */
  function initMenu() {
    const toggle = document.getElementById('nav-toggle');
    const links  = document.getElementById('nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.textContent = open ? '✕' : '☰';
    });
    // Cerrar al hacer clic en un link
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.textContent = '☰';
    }));
  }

  /* ── HEADER AUTO-HIDE ──────────────────────────────────── */
  const DELAY = 3000;
  let timer, prevY = 0, hidden = false;

  function show() {
    const h = document.getElementById('site-header');
    if (!h) return;
    // No ocultar si el menú móvil está abierto
    if (document.getElementById('nav-links')?.classList.contains('open')) { reset(); return; }
    h.classList.remove('hidden');
    hidden = false;
    reset();
  }

  function hide() {
    const h = document.getElementById('site-header');
    if (!h) return;
    if (document.getElementById('nav-links')?.classList.contains('open')) { reset(); return; }
    h.classList.add('hidden');
    hidden = true;
  }

  function reset() { clearTimeout(timer); timer = setTimeout(hide, DELAY); }

  function initHide() {
    show();
    document.addEventListener('mousemove', e => { if (e.clientY < 70 || !hidden) show(); }, { passive: true });
    let t0 = 0;
    document.addEventListener('touchstart', e => { t0 = e.touches[0].clientY; }, { passive: true });
    document.addEventListener('touchmove',  e => { if (e.touches[0].clientY - t0 > 20 || t0 < 60) show(); }, { passive: true });
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < prevY) show(); else reset();
      prevY = y;
    }, { passive: true });
    document.addEventListener('click',   show, { passive: true });
    document.addEventListener('keydown', show, { passive: true });
  }

  /* ── BACK TO TOP ───────────────────────────────────────── */
  function initBTT() {
    const btn = document.getElementById('btt');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 300), { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── FOOTER YEAR ───────────────────────────────────────── */
  function setYear() {
    const el = document.getElementById('yr');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ── SMOOTH ANCHOR ─────────────────────────────────────── */
  function initScroll() {
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      const off = (document.getElementById('site-header')?.offsetHeight || 58) + 12;
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - off, behavior: 'smooth' });
    });
  }

  /* ── INIT ──────────────────────────────────────────────── */
  async function init() {
    await Promise.all([
      load('header-placeholder', 'header.html'),
      load('footer-placeholder', 'footer.html'),
    ]);
    setActive();
    setYear();
    initMenu();
    initHide();
    initBTT();
    initScroll();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
