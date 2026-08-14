// ============================================
// RAZDAR — Public Seller Store Front Page
// ============================================

import sellers from '../../data/sellers.js';
import products from '../../data/products.js';
import ProductCard from '../../components/ProductCard.js';
import events from '../../core/events.js';
import { getIcon } from '../../utils/icons.js';

export async function renderSellerStorePage() {
  const app = document.getElementById('app');

  const seller = sellers[0];
  const sellerProducts = products.filter(p => p.seller.id === seller.id || p.category === 'electronics');

  let isFollowing = false;

  app.innerHTML = `
    <div class="page-body">
      <div class="container">
        <!-- Store Header Banner -->
        <div class="card overflow-hidden mb-8" style="position:relative;">
          <div style="height:220px;background:url('${seller.banner}') center/cover no-repeat;"></div>
          <div class="p-6 flex flex-between flex-wrap gap-6 items-end" style="background:var(--bg-card);margin-top:-40px;position:relative;z-index:2;border-radius:var(--radius-xl);">
            <div class="flex items-center gap-4">
              <img src="${seller.logo}" style="width:88px;height:88px;border-radius:var(--radius-xl);border:4px solid var(--bg-card);object-fit:cover;" />
              <div>
                <div class="flex items-center gap-2">
                  <h1 style="font-size:var(--fs-2xl);">${seller.name}</h1>
                  <span class="badge badge-primary">✓ VERIFIED SELLER</span>
                </div>
                <div class="text-sm text-secondary mt-1">
                  ${seller.rating} ★ Rating • ${seller.followers} Followers • Joined ${seller.joinedDate}
                </div>
                <p class="text-xs text-tertiary mt-2">${seller.description}</p>
              </div>
            </div>

            <button class="btn ${isFollowing ? 'btn-secondary' : 'btn-primary'} btn-lg" id="seller-follow-btn">
              ${isFollowing ? 'Following' : '+ Follow Store'}
            </button>
          </div>
        </div>

        <!-- Store Products -->
        <h2 class="mb-6">Store Catalog (${sellerProducts.length})</h2>
        <div class="grid grid-products">
          ${sellerProducts.map(p => ProductCard.render(p)).join('')}
        </div>
      </div>
    </div>
  `;

  app.querySelector('#seller-follow-btn')?.addEventListener('click', (e) => {
    isFollowing = !isFollowing;
    e.target.textContent = isFollowing ? 'Following' : '+ Follow Store';
    events.emit('toast:show', {
      type: 'success',
      title: isFollowing ? 'Store Followed' : 'Unfollowed Store',
      message: `You are now ${isFollowing ? 'following' : 'no longer following'} ${seller.name}.`
    });
  });

  ProductCard.attachEvents(app, products);
}

export default renderSellerStorePage;
