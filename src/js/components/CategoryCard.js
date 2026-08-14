// ============================================
// RAZDAR — Category Card Component
// ============================================

import { getIcon } from '../utils/icons.js';

export class CategoryCard {
  static render(category) {
    return `
      <div class="category-card" onclick="window.location.hash='#/category/${category.id}'">
        <div class="category-card-icon">
          ${getIcon(category.icon || 'grid')}
        </div>
        <div class="category-card-name">${category.name}</div>
        <div class="category-card-count">${category.count} Products</div>
      </div>
    `;
  }
}

export default CategoryCard;
