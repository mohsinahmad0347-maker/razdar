// ============================================
// RAZDAR — Shop Page
// ============================================

import products from '../data/products.js';
import categories from '../data/categories.js';
import ProductCard from '../components/ProductCard.js';
import { getIcon } from '../utils/icons.js';

export async function renderShopPage(params = {}) {
  const app = document.getElementById('app');

  let filteredProducts = [...products];

  // Apply Category Filter if passed
  if (params.category) {
    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === params.category.toLowerCase());
  }

  // Apply Search Query Filter if passed
  if (params.q) {
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(params.q.toLowerCase()));
  }

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>Shop All Products</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Shop</span>
          ${params.category ? `<span class="separator">/</span><span>${params.category}</span>` : ''}
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="shop-layout">
          <!-- Filter Sidebar -->
          <aside class="filter-sidebar">
            <div class="card p-5">
              <h3 class="mb-4" style="font-size:18px;">Filters</h3>
              
              <!-- Categories -->
              <div class="filter-section">
                <div class="filter-section-title">Categories</div>
                <div class="filter-options">
                  <a href="#/shop" class="filter-option ${!params.category ? 'font-bold text-lime' : ''}">
                    <span>All Products</span>
                    <span class="count">${products.length}</span>
                  </a>
                  ${categories.map(c => `
                    <a href="#/shop?category=${c.id}" class="filter-option ${params.category === c.id ? 'font-bold text-lime' : ''}">
                      <span>${c.name}</span>
                      <span class="count">${c.count}</span>
                    </a>
                  `).join('')}
                </div>
              </div>

              <!-- Price Range -->
              <div class="filter-section mt-6">
                <div class="filter-section-title">Price Range</div>
                <div class="price-range mt-2">
                  <input type="number" placeholder="Min $" id="price-min" value="0" />
                  <span class="text-tertiary">-</span>
                  <input type="number" placeholder="Max $" id="price-max" value="3000" />
                </div>
              </div>

              <!-- Stock Availability -->
              <div class="filter-section mt-6">
                <div class="filter-section-title">Availability</div>
                <div class="filter-options">
                  <label class="checkbox-wrapper">
                    <input type="checkbox" id="filter-in-stock" checked />
                    <span>In Stock Only</span>
                  </label>
                  <label class="checkbox-wrapper">
                    <input type="checkbox" id="filter-on-sale" />
                    <span>On Sale</span>
                  </label>
                  <label class="checkbox-wrapper">
                    <input type="checkbox" id="filter-free-ship" />
                    <span>Free Shipping</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <!-- Main Shop Grid -->
          <main>
            <!-- Controls Bar -->
            <div class="card p-4 mb-6 flex flex-between flex-wrap gap-4 items-center">
              <div class="text-sm text-secondary">
                Showing <strong class="text-primary">${filteredProducts.length}</strong> products
              </div>
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <label class="text-sm text-secondary">Sort by:</label>
                  <select class="form-input" style="width:auto;padding:var(--sp-2) var(--sp-4);" id="shop-sort-select">
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Products Grid -->
            <div class="grid grid-products" id="shop-products-grid">
              ${filteredProducts.length > 0 ? 
                filteredProducts.map(p => ProductCard.render(p)).join('') :
                `<div class="empty-state w-full" style="grid-column:1/-1;">
                  <div class="empty-state-icon">${getIcon('shoppingBag')}</div>
                  <h3>No products found</h3>
                  <p>Try resetting your filters or search keywords.</p>
                  <a href="#/shop" class="btn btn-primary mt-4">Reset Filters</a>
                </div>`
              }
            </div>
          </main>
        </div>
      </div>
    </div>
  `;

  // Attach card event listeners
  ProductCard.attachEvents(app, products);
}

export default renderShopPage;
