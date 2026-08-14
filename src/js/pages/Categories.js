// ============================================
// RAZDAR — Categories List Page
// ============================================

import categories from '../data/categories.js';
import CategoryCard from '../components/CategoryCard.js';

export async function renderCategoriesPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>All Product Categories</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Categories</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="grid grid-categories">
          ${categories.map(cat => CategoryCard.render(cat)).join('')}
        </div>
      </div>
    </div>
  `;
}

export default renderCategoriesPage;
