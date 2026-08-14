// ============================================
// RAZDAR — App Controller & Initialization
// ============================================

import store from './store.js';
import events from './events.js';
// NOTE: router is NOT imported here — it's managed by main.js to avoid circular deps

class App {
  constructor() {
    this.loaderPercent = 0;
    this.isLoaded = false;
  }

  init() {
    this.startLoader();
    this.bindGlobalEvents();
    this.initScrollReveal();
    this.initRippleEffect();
  }

  // ── Loader Sequence ──
  startLoader() {
    document.body.classList.add('loader-active');
    const fill     = document.querySelector('.loader-progress-fill');
    const ringFill = document.querySelector('.loader-ring-fill');
    const percent  = document.querySelector('.loader-percent');
    const loader   = document.getElementById('app-loader');

    const hideLoader = () => {
      if (this.isLoaded) return;   // guard: run only once
      this.isLoaded = true;
      if (loader)  loader.classList.add('hidden');
      document.body.classList.remove('loader-active');
      events.emit('app:loaded');
    };

    // Hard safety net — always hides after 3 s no matter what
    const safetyTimer = setTimeout(hideLoader, 3000);

    const interval = setInterval(() => {
      this.loaderPercent += Math.floor(Math.random() * 12) + 5;

      if (this.loaderPercent >= 100) {
        this.loaderPercent = 100;
        clearInterval(interval);
        clearTimeout(safetyTimer);

        if (fill)     fill.style.width = '100%';
        if (percent)  percent.textContent = '100%';
        if (ringFill) ringFill.style.strokeDashoffset = '0';

        // Small pause so the user sees 100%, then hide
        setTimeout(hideLoader, 500);
      } else {
        if (fill)    fill.style.width = `${this.loaderPercent}%`;
        if (percent) percent.textContent = `${this.loaderPercent}%`;
        if (ringFill) {
          ringFill.style.strokeDashoffset =
            String(283 - 283 * (this.loaderPercent / 100));
        }
      }
    }, 40);
  }

  // ── Ripple Effect ──
  initRippleEffect() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      const rect     = btn.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height);
      const radius   = diameter / 2;
      const circle   = document.createElement('span');
      circle.style.cssText =
        `width:${diameter}px;height:${diameter}px;` +
        `left:${e.clientX - rect.left - radius}px;` +
        `top:${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple');
      btn.querySelector('.ripple')?.remove();
      btn.appendChild(circle);
    });
  }

  // ── Scroll Reveal ──
  initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );

    const observe = () =>
      document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale')
        .forEach(el => observer.observe(el));

    events.on('route:changed', () => setTimeout(observe, 100));
    setTimeout(observe, 700);
  }

  // ── Global Events ──
  bindGlobalEvents() {
    events.on('theme:toggle', () => store.toggleTheme());
  }
}

export const app = new App();
export default app;
