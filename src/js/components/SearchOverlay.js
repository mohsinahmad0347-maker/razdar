// ============================================
// RAZDAR — Search Overlay Component
// ============================================

import events from '../core/events.js';
import store from '../core/store.js';
import products from '../data/products.js';
import { getIcon } from '../utils/icons.js';
import { formatPrice } from '../utils/formatters.js';

export class SearchOverlay {
  constructor() {
    this.container = document.getElementById('search-overlay');
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();

    events.on('search:open', () => this.open());
  }

  render() {
    const recentSearches = store.state.recentSearches;

    this.container.className = 'search-overlay';
    this.container.innerHTML = `
      <div class="search-box">
        <div class="search-input-wrap">
          ${getIcon('search')}
          <input type="text" id="global-search-input" placeholder="Search products, categories, brands..." autofocus />
          <button class="btn-icon btn-ghost" id="search-close-btn">${getIcon('x')}</button>
        </div>
        <div class="search-results-area" id="search-results-content">
          <!-- Recent Searches -->
          <div class="mb-4">
            <div class="search-section-title">Recent Searches</div>
            <div style="display:flex;gap:var(--sp-2);flex-wrap:wrap;padding:var(--sp-2);">
              ${recentSearches.map(term => `
                <button class="chip recent-search-chip" data-term="${term}">${term}</button>
              `).join('')}
            </div>
          </div>

          <!-- Trending Categories -->
          <div>
            <div class="search-section-title">Trending Categories</div>
            <div style="display:flex;gap:var(--sp-2);flex-wrap:wrap;padding:var(--sp-2);">
              <a href="#/category/electronics" class="chip">Electronics</a>
              <a href="#/category/mobiles" class="chip">Mobiles</a>
              <a href="#/category/shoes" class="chip">Shoes & Sneakers</a>
              <a href="#/category/watches" class="chip">Watches</a>
              <a href="#/category/gaming" class="chip">Gaming Gear</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const input = this.container.querySelector('#global-search-input');
    const content = this.container.querySelector('#search-results-content');
    const closeBtn = this.container.querySelector('#search-close-btn');

    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    this.container.addEventListener('click', (e) => {
      if (e.target === this.container) this.close();

      const chip = e.target.closest('.recent-search-chip');
      if (chip) {
        const term = chip.getAttribute('data-term');
        if (input) {
          input.value = term;
          this.performSearch(term);
        }
      }
    });

    if (input) {
      input.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query.length > 0) {
          this.performSearch(query);
        } else {
          this.renderDefaultResults();
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const query = input.value.trim();
          if (query) {
            store.addRecentSearch(query);
            this.close();
            window.location.hash = `#/search?q=${encodeURIComponent(query)}`;
          }
        }
        if (e.key === 'Escape') this.close();
      });
    }
  }

  performSearch(query) {
    const content = this.container.querySelector('#search-results-content');
    if (!content) return;

    const matched = products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase())
    );

    if (matched.length === 0) {
      content.innerHTML = `
        <div style="padding:var(--sp-8);text-align:center;color:var(--text-secondary);">
          <p>No products found matching "<strong>${query}</strong>"</p>
        </div>
      `;
      return;
    }

    content.innerHTML = `
      <div class="search-section-title">Products (${matched.length})</div>
      ${matched.map(p => `
        <div class="search-result-item" onclick="window.location.hash='#/product/${p.id}'; document.getElementById('search-overlay').classList.remove('active');">
          <img src="${p.images[0]}" alt="${p.name}" />
          <div class="result-info">
            <div class="result-name">${p.name}</div>
            <div class="result-category">${p.brand} • ${p.category}</div>
          </div>
          <div class="result-price">${formatPrice(p.price)}</div>
        </div>
      `).join('')}
    `;
  }

  renderDefaultResults() {
    this.render();
    this.bindEvents();
  }

  open() {
    this.container.classList.add('active');
    const input = this.container.querySelector('#global-search-input');
    if (input) setTimeout(() => input.focus(), 100);
  }

  close() {
    this.container.classList.remove('active');
  }
}

export default SearchOverlay;
