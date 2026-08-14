// ============================================
// RAZDAR — New Arrivals Page
// ============================================

import products from '../data/products.js';
import ProductCard from '../components/ProductCard.js';

export async function renderNewArrivalsPage() {
  const app = document.getElementById('app');

  const newProducts = products.filter(p => p.isNewArrival);

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>New Arrivals</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>New Arrivals</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="grid grid-products">
          ${newProducts.map(p => ProductCard.render(p)).join('')}
        </div>
      </div>
    </div>
  `;

  ProductCard.attachEvents(app, products);
}

export default renderNewArrivalsPage;
