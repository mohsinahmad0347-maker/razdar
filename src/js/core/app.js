// ============================================
// RAZDAR — App Controller
// ============================================
// NOTE: The loader is now fully self-contained in index.html inline JS.
// This file only handles post-load app init (scroll reveal, ripple, events).

import store from './store.js';
import events from './events.js';

class App {
  constructor() {
    this.isLoaded = false;
  }

  init() {
    this.bindGlobalEvents();
    this.initScrollReveal();
    this.initRippleEffect();
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
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('revealed');
      }),
      { threshold: 0.1 }
    );

    const observe = () =>
      document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale')
        .forEach(el => observer.observe(el));

    events.on('route:changed', () => setTimeout(observe, 100));
  }

  // ── Global Events ──
  bindGlobalEvents() {
    events.on('theme:toggle', () => store.toggleTheme());
  }
}

export const app = new App();
export default app;
