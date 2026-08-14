// ============================================
// RAZDAR — Seller Product Management Page
// ============================================

import products from '../../data/products.js';
import events from '../../core/events.js';
import { getIcon } from '../../utils/icons.js';
import { formatPrice } from '../../utils/formatters.js';

export async function renderSellerProducts() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>Merchant Products Catalog</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/seller/dashboard">Seller Hub</a>
          <span class="separator">/</span>
          <span>Products</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/seller/dashboard" class="sidebar-nav-item">${getIcon('layoutDashboard')} Overview</a>
              <a href="#/seller/products" class="sidebar-nav-item active">${getIcon('grid')} Product Catalog</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <div class="flex flex-between items-center mb-6">
              <h3>My Products (${products.length})</h3>
              <button class="btn btn-primary btn-sm" id="seller-add-prod-btn">${getIcon('plus')} Add New Product</button>
            </div>

            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${products.map(p => `
                    <tr>
                      <td>
                        <div class="flex items-center gap-3">
                          <img src="${p.images[0]}" style="width:40px;height:40px;border-radius:var(--radius-md);object-fit:cover;" />
                          <span class="font-semibold text-sm">${p.name}</span>
                        </div>
                      </td>
                      <td class="text-sm text-secondary">${p.category}</td>
                      <td class="font-bold text-lime">${formatPrice(p.price)}</td>
                      <td>${p.stock} units</td>
                      <td><span class="badge ${p.inStock ? 'badge-success' : 'badge-danger'}">${p.inStock ? 'Active' : 'Draft'}</span></td>
                      <td>
                        <button class="btn btn-secondary btn-sm">Edit</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  `;

  app.querySelector('#seller-add-prod-btn')?.addEventListener('click', () => {
    events.emit('toast:show', {
      type: 'info',
      title: 'Add Product Modal',
      message: 'Merchant product creator drawer opened.'
    });
  });
}

export default renderSellerProducts;
