// ============================================
// RAZDAR — Privacy Policy Page
// ============================================

export async function renderPrivacyPolicyPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>Privacy Policy</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container container-md">
        <div class="card p-8">
          <h2 class="mb-4">Your Privacy Matters to RAZDAR</h2>
          <p class="text-secondary mb-4" style="line-height:1.7;">
            Last updated: August 14, 2026. RAZDAR Inc. ("RAZDAR", "we", "our") is committed to protecting your personal information and buyer privacy.
          </p>

          <h3 class="mb-2 mt-6">1. Information We Collect</h3>
          <p class="text-secondary mb-4" style="line-height:1.7;">
            We collect personal information you provide when creating an account, placing an order, subscribing to newsletter, or contacting customer support (including full name, shipping address, email, phone number).
          </p>

          <h3 class="mb-2 mt-6">2. How We Use Your Data</h3>
          <p class="text-secondary mb-4" style="line-height:1.7;">
            Your data is used solely to process orders, facilitate seller logistics, handle buyer queries, prevent fraudulent transactions, and deliver personalized product recommendations.
          </p>

          <h3 class="mb-2 mt-6">3. Security Standards</h3>
          <p class="text-secondary" style="line-height:1.7;">
            All financial transactions are protected using industry-standard 256-bit SSL encryption. We never sell or rent your personal information to third parties.
          </p>
        </div>
      </div>
    </div>
  `;
}

export default renderPrivacyPolicyPage;
