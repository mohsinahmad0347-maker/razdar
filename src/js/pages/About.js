// ============================================
// RAZDAR — About Page
// ============================================

import { getIcon } from '../utils/icons.js';

export async function renderAboutPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-header text-center">
      <div class="container container-md">
        <h1 style="font-size:var(--fs-5xl);">About RAZDAR</h1>
        <p class="text-secondary text-lg mt-2">Your World. Your Choice.</p>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <!-- Our Story -->
        <div class="grid grid-2 gap-8 items-center mb-16">
          <div>
            <span class="badge badge-primary mb-3">OUR STORY</span>
            <h2 class="mb-4">Building the Future of Global E-Commerce</h2>
            <p class="text-secondary mb-4" style="line-height:1.7;">
              RAZDAR was founded with a singular vision: to create a high-end, seamless e-commerce marketplace that empowers buyers with limitless choice while giving verified sellers a powerful global stage.
            </p>
            <p class="text-secondary" style="line-height:1.7;">
              From next-gen consumer tech to handcrafted luxury fashion and Scandinavian interior design, RAZDAR curates the world's finest products into one unified, ultra-fast platform.
            </p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" style="border-radius:var(--radius-2xl);width:100%;box-shadow:var(--shadow-xl);" />
          </div>
        </div>

        <!-- Statistics Counter Grid -->
        <div class="card p-8 mb-16" style="background:linear-gradient(135deg, var(--graphite-800), var(--graphite-900));border:1px solid var(--primary-muted);">
          <div class="grid grid-4 text-center">
            <div>
              <div style="font-family:var(--font-heading);font-size:var(--fs-4xl);font-weight:800;color:var(--primary);">100K+</div>
              <div class="text-sm text-secondary mt-1">Happy Customers</div>
            </div>
            <div>
              <div style="font-family:var(--font-heading);font-size:var(--fs-4xl);font-weight:800;color:var(--primary);">50K+</div>
              <div class="text-sm text-secondary mt-1">Curated Products</div>
            </div>
            <div>
              <div style="font-family:var(--font-heading);font-size:var(--fs-4xl);font-weight:800;color:var(--primary);">1K+</div>
              <div class="text-sm text-secondary mt-1">Verified Sellers</div>
            </div>
            <div>
              <div style="font-family:var(--font-heading);font-size:var(--fs-4xl);font-weight:800;color:var(--primary);">99%</div>
              <div class="text-sm text-secondary mt-1">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        <!-- Our Core Values -->
        <div class="text-center mb-10">
          <h2>Why Choose RAZDAR</h2>
        </div>
        <div class="grid grid-3 gap-6">
          <div class="card p-6">
            <div class="category-card-icon mb-4">${getIcon('sparkles')}</div>
            <h3 class="mb-2" style="font-size:18px;">Customer First</h3>
            <p class="text-secondary text-sm" style="line-height:1.6;">Every feature, interaction, and policy is engineered to delight you from browsing to unboxing.</p>
          </div>
          <div class="card p-6">
            <div class="category-card-icon mb-4">${getIcon('shieldCheck')}</div>
            <h3 class="mb-2" style="font-size:18px;">Secure Shopping</h3>
            <p class="text-secondary text-sm" style="line-height:1.6;">Bank-grade SSL encryption and anti-fraud monitoring ensure 100% buyer protection.</p>
          </div>
          <div class="card p-6">
            <div class="category-card-icon mb-4">${getIcon('truck')}</div>
            <h3 class="mb-2" style="font-size:18px;">Fast Delivery</h3>
            <p class="text-secondary text-sm" style="line-height:1.6;">Global logistics network ensuring rapid order fulfillment and live tracking.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export default renderAboutPage;
