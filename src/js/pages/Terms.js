// ============================================
// RAZDAR — Terms & Conditions Page
// ============================================

export async function renderTermsPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>Terms & Conditions</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Terms & Conditions</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container container-md">
        <div class="card p-8">
          <h2 class="mb-4">RAZDAR Terms of Service</h2>
          <p class="text-secondary mb-4" style="line-height:1.7;">
            By accessing or using the RAZDAR website and mobile services, you agree to be bound by these Terms and Conditions.
          </p>
          <h3 class="mb-2 mt-6">1. Marketplace Platform</h3>
          <p class="text-secondary mb-4" style="line-height:1.7;">
            RAZDAR operates a global multi-seller marketplace connecting customers with verified independent merchants and brand stores.
          </p>
          <h3 class="mb-2 mt-6">2. Order Acceptance</h3>
          <p class="text-secondary" style="line-height:1.7;">
            All orders placed on RAZDAR are subject to product availability and order confirmation. We reserve the right to cancel suspicious or fraudulent orders.
          </p>
        </div>
      </div>
    </div>
  `;
}

export default renderTermsPage;
