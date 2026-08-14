// ============================================
// RAZDAR — App Controller
// ============================================

import store  from './store.js';
import events from './events.js';

class App {
  init() {
    this._ripple();
    this._scrollReveal();
    this._globalEvents();
  }

  _ripple() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const d = Math.max(r.width, r.height);
      const s = document.createElement('span');
      s.className = 'ripple';
      s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;
      btn.querySelector('.ripple')?.remove();
      btn.appendChild(s);
    });
  }

  _scrollReveal() {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    const observe = () =>
      document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale')
        .forEach(el => io.observe(el));
    events.on('route:changed', () => setTimeout(observe, 100));
  }

  _globalEvents() {
    events.on('theme:toggle', () => store.toggleTheme());
  }
}

export const app = new App();
export default app;
