// ============================================
// RAZDAR — App Controller & Initialization
// ============================================

import store from './store.js';
import events from './events.js';
import router from './router.js';

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
    const fill = document.querySelector('.loader-progress-fill');
    const ringFill = document.querySelector('.loader-ring-fill');
    const percentText = document.querySelector('.loader-percent');
    const loader = document.getElementById('app-loader');

    const interval = setInterval(() => {
      this.loaderPercent += Math.floor(Math.random() * 12) + 5;

      if (this.loaderPercent >= 100) {
        this.loaderPercent = 100;
        clearInterval(interval);

        if (fill) fill.style.width = '100%';
        if (percentText) percentText.textContent = '100%';
        if (ringFill) ringFill.style.strokeDashoffset = '0';

        setTimeout(() => {
          if (loader) loader.classList.add('hidden');
          document.body.classList.remove('loader-active');
          this.isLoaded = true;
          events.emit('app:loaded');
        }, 600);
      } else {
        if (fill) fill.style.width = `${this.loaderPercent}%`;
        if (percentText) percentText.textContent = `${this.loaderPercent}%`;
        if (ringFill) {
          const dashoffset = 283 - (283 * (this.loaderPercent / 100));
          ringFill.style.strokeDashoffset = dashoffset;
        }
      }
    }, 40);
  }

  // ── Global Button Ripple Effect ──
  initRippleEffect() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn');
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple');

      const ripple = btn.getElementsByClassName('ripple')[0];
      if (ripple) {
        ripple.remove();
      }

      btn.appendChild(circle);
    });
  }

  // ── Scroll Reveal Observer ──
  initScrollReveal() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
      elements.forEach(el => observer.observe(el));
    };

    // Run on initial load and after route changes
    events.on('route:changed', () => {
      setTimeout(observeElements, 100);
    });
    setTimeout(observeElements, 700);
  }

  // ── Global Listeners ──
  bindGlobalEvents() {
    // Theme toggle handling
    events.on('theme:toggle', () => {
      store.toggleTheme();
    });

    // Handle hash links smooth scroll
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target && target.getAttribute('href').startsWith('#/')) {
        // Router will handle hash routes
        return;
      }
    });
  }
}

export const app = new App();
export default app;
