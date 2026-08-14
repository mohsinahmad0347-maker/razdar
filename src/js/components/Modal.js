// ============================================
// RAZDAR — Modal Dialog & Quick View Component
// ============================================

import events from '../core/events.js';
import store from '../core/store.js';
import { getIcon } from '../utils/icons.js';
import { formatPrice } from '../utils/formatters.js';

export class Modal {
  constructor() {
    this.container = document.getElementById('modal-container');
    this.init();
  }

  init() {
    events.on('modal:quickview', (product) => this.openQuickView(product));
    events.on('modal:open', (modalData) => this.openCustomModal(modalData));
  }

  openQuickView(product) {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="modal-overlay active" id="modal-overlay">
        <div class="modal modal-lg">
          <div class="modal-header">
            <h3 style="margin:0;">Quick View</h3>
            <button class="btn-icon btn-ghost" id="modal-close-btn">${getIcon('x')}</button>
          </div>
          <div class="modal-body">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-6);">
              <!-- Image Gallery -->
              <div>
                <img id="quickview-main-img" src="${product.images[0]}" alt="${product.name}" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:var(--radius-xl);" />
                ${product.images.length > 1 ? `
                  <div style="display:flex;gap:var(--sp-2);margin-top:var(--sp-3);">
                    ${product.images.map((img, i) => `
                      <img class="quickview-thumb" src="${img}" style="width:50px;height:50px;border-radius:var(--radius-md);cursor:pointer;object-fit:cover;border:2px solid ${i === 0 ? 'var(--primary)' : 'transparent'};" />
                    `).join('')}
                  </div>
                ` : ''}
              </div>

              <!-- Product Details -->
              <div>
                <div class="text-xs text-tertiary text-uppercase mb-1">${product.brand} • ${product.category}</div>
                <h2 style="font-size:var(--fs-xl);margin-bottom:var(--sp-2);">${product.name}</h2>
                
                <div class="flex items-center gap-2 mb-3">
                  <span class="star-filled">${getIcon('star')}</span>
                  <span style="font-weight:600;font-size:14px;">${product.rating}</span>
                  <span class="text-xs text-tertiary">(${product.reviewsCount} reviews)</span>
                </div>

                <div class="flex items-baseline gap-3 mb-4">
                  <span style="font-family:var(--font-heading);font-size:var(--fs-2xl);font-weight:700;color:var(--primary);">${formatPrice(product.price)}</span>
                  ${product.oldPrice ? `<span style="text-decoration:line-through;color:var(--text-muted);">${formatPrice(product.oldPrice)}</span>` : ''}
                </div>

                <p style="font-size:14px;color:var(--text-secondary);line-height:1.5;margin-bottom:var(--sp-4);">
                  ${product.description}
                </p>

                <!-- Color selector if available -->
                ${product.colors && product.colors.length > 0 ? `
                  <div class="mb-4">
                    <label class="form-label mb-2">Color: <strong id="qv-selected-color">${product.colors[0]}</strong></label>
                    <div class="flex gap-2">
                      ${product.colors.map((c, idx) => `
                        <button class="btn btn-secondary btn-sm qv-color-btn ${idx === 0 ? 'border-focus' : ''}" data-color="${c}">${c}</button>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}

                <!-- Actions -->
                <div class="flex gap-3 mt-6">
                  <button class="btn btn-cart-premium flex-1" id="qv-add-cart-btn" style="height:40px;font-size:12px;">
                    ${getIcon('shoppingBag')} Add to Cart
                  </button>
                  <a href="#/product/${product.id}" class="btn btn-secondary btn-lg" id="qv-details-link">
                    Full Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindModalEvents(product);
  }

  openCustomModal({ title, content, confirmText = 'Confirm', onConfirm }) {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="modal-overlay active" id="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3>${title}</h3>
            <button class="btn-icon btn-ghost" id="modal-close-btn">${getIcon('x')}</button>
          </div>
          <div class="modal-body">
            ${content}
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="modal-cancel-btn">Cancel</button>
            <button class="btn btn-primary" id="modal-confirm-btn">${confirmText}</button>
          </div>
        </div>
      </div>
    `;

    const overlay = this.container.querySelector('#modal-overlay');
    const closeBtn = this.container.querySelector('#modal-close-btn');
    const cancelBtn = this.container.querySelector('#modal-cancel-btn');
    const confirmBtn = this.container.querySelector('#modal-confirm-btn');

    const close = () => { this.container.innerHTML = ''; };

    if (closeBtn) closeBtn.addEventListener('click', close);
    if (cancelBtn) cancelBtn.addEventListener('click', close);
    if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        if (onConfirm) onConfirm();
        close();
      });
    }
  }

  bindModalEvents(product) {
    const overlay = this.container.querySelector('#modal-overlay');
    const closeBtn = this.container.querySelector('#modal-close-btn');
    const detailsLink = this.container.querySelector('#qv-details-link');
    const addCartBtn = this.container.querySelector('#qv-add-cart-btn');
    const mainImg = this.container.querySelector('#quickview-main-img');
    const thumbs = this.container.querySelectorAll('.quickview-thumb');

    let selectedColor = product.colors?.[0] || null;

    const close = () => { this.container.innerHTML = ''; };

    if (closeBtn) closeBtn.addEventListener('click', close);
    if (detailsLink) detailsLink.addEventListener('click', close);
    if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    thumbs.forEach(t => {
      t.addEventListener('click', () => {
        if (mainImg) mainImg.src = t.src;
        thumbs.forEach(thumb => thumb.style.borderColor = 'transparent');
        t.style.borderColor = 'var(--primary)';
      });
    });

    if (addCartBtn) {
      addCartBtn.addEventListener('click', () => {
        store.addToCart(product, 1, selectedColor);
        close();
      });
    }
  }
}

export default Modal;
