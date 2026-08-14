// ============================================
// RAZDAR — Search Results Page
// ============================================

import products from '../data/products.js';
import ProductCard from '../components/ProductCard.js';

export async function renderSearchResultsPage(params = {}) {
  const app = document.getElementById('app');

  const query = params.q || '';
  const matchedProducts = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.brand.toLowerCase().includes(query.toLowerCase())
  );

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>Search Results for "${query}"</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Search</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="mb-6 font-medium text-secondary">
          Found <strong class="text-primary">${matchedProducts.length}</strong> items matching your query.
        </div>
        ${matchedProducts.length > 0 ? `
          <div class="grid grid-products">
            ${matchedProducts.map(p => ProductCard.render(p)).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <h3>No Products Found</h3>
            <p>We couldn't find anything matching "${query}". Try searching for another keyword like "headphone", "shoes", or "phone".</p>
            <a href="#/shop" class="btn btn-primary mt-4">View All Products</a>
          </div>
        `}
      </div>
    </div>
  `;

  ProductCard.attachEvents(app, products);
}

export default renderSearchResultsPage;
