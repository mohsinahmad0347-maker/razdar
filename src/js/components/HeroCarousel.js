// ============================================
// RAZDAR — Hero Carousel Component (optimized)
// ============================================

import { heroSlides } from '../data/banners.js';
import { getIcon } from '../utils/icons.js';

export class HeroCarousel {
  constructor(containerId = 'hero-carousel') {
    this.container = document.getElementById(containerId);
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.progressRaf = null;       // requestAnimationFrame handle
    this.progressStart = null;     // timestamp when current slide started
    this.slides = heroSlides;
    this.isPaused = false;
    this._destroyed = false;
  }

  render() {
    if (!this.container) return;

    this.container.className = 'hero';
    this.container.innerHTML = `
      ${this.slides.map((slide, index) => `
        <div class="hero-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
          <!--
            First slide loads eagerly (above the fold).
            All other slides are lazy — browser skips them until needed.
          -->
          <img
            class="hero-slide-bg-img"
            src="${slide.image}"
            alt=""
            ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
            decoding="${index === 0 ? 'sync' : 'async'}"
          />
          <div class="hero-slide-overlay"></div>
          <div class="hero-slide-content">
            <span class="hero-slide-tag">${slide.tag}</span>
            <h1 class="hero-slide-title">${slide.title}</h1>
            <p class="hero-slide-desc">${slide.desc}</p>
            <div class="hero-slide-cta">
              <a href="${slide.ctaLink}" class="btn btn-primary btn-lg">${slide.ctaText}</a>
              <a href="#/shop" class="btn btn-secondary btn-lg">Browse Shop</a>
            </div>
          </div>
        </div>
      `).join('')}

      <button class="hero-nav prev" id="hero-prev">${getIcon('chevronLeft')}</button>
      <button class="hero-nav next" id="hero-next">${getIcon('chevronRight')}</button>

      <div class="hero-dots">
        ${this.slides.map((_, i) => `
          <div class="hero-dot ${i === 0 ? 'active' : ''}" data-dot="${i}"></div>
        `).join('')}
      </div>

      <div class="hero-progress" id="hero-progress"></div>
    `;

    this.bindEvents();
    this.startAutoPlay();
  }

  goToSlide(index) {
    if (index < 0) index = this.slides.length - 1;
    if (index >= this.slides.length) index = 0;
    this.currentIndex = index;

    this.container.querySelectorAll('.hero-slide').forEach((s, i) =>
      s.classList.toggle('active', i === index));
    this.container.querySelectorAll('.hero-dot').forEach((d, i) =>
      d.classList.toggle('active', i === index));

    this.resetProgress();
  }

  nextSlide() { this.goToSlide(this.currentIndex + 1); }
  prevSlide() { this.goToSlide(this.currentIndex - 1); }

  // rAF-based progress — zero setInterval overhead
  startAutoPlay() {
    this.stopAutoPlay();
    this.resetProgress();

    const SLIDE_DURATION = 5000; // ms

    const tick = (ts) => {
      if (this._destroyed) return;
      if (!this.isPaused) {
        if (this.progressStart === null) this.progressStart = ts;
        const elapsed = ts - this.progressStart;
        const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);

        const bar = this.container.querySelector('#hero-progress');
        if (bar) bar.style.width = `${pct}%`;

        if (elapsed >= SLIDE_DURATION) {
          this.nextSlide();   // resets progressStart via resetProgress()
        }
      } else {
        // While paused, shift start forward so we don't skip ahead
        this.progressStart = ts - (this._pausedAt || 0);
      }
      this.progressRaf = requestAnimationFrame(tick);
    };

    this.progressRaf = requestAnimationFrame(tick);
  }

  stopAutoPlay() {
    if (this.progressRaf) {
      cancelAnimationFrame(this.progressRaf);
      this.progressRaf = null;
    }
  }

  resetProgress() {
    this.progressStart = null;
    this._pausedAt = 0;
    const bar = this.container?.querySelector('#hero-progress');
    if (bar) bar.style.width = '0%';
  }

  bindEvents() {
    const prev = this.container.querySelector('#hero-prev');
    const next = this.container.querySelector('#hero-next');
    const dots = this.container.querySelector('.hero-dots');

    prev?.addEventListener('click', () => { this.prevSlide(); });
    next?.addEventListener('click', () => { this.nextSlide(); });

    dots?.addEventListener('click', (e) => {
      const dot = e.target.closest('.hero-dot');
      if (dot) this.goToSlide(parseInt(dot.dataset.dot, 10));
    });

    // Pause on hover — record how far into the slide we were
    this.container.addEventListener('mouseenter', () => {
      this.isPaused = true;
      if (this.progressStart !== null) {
        this._pausedAt = performance.now() - this.progressStart;
      }
    });
    this.container.addEventListener('mouseleave', () => {
      this.isPaused = false;
    });
  }

  // Call this when navigating away to stop the rAF loop
  destroy() {
    this._destroyed = true;
    this.stopAutoPlay();
  }
}

export default HeroCarousel;
