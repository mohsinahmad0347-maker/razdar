// ============================================
// RAZDAR — Refund & Returns Policy Page
// ============================================

export async function renderRefundPolicyPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>Refund & Return Policy</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Refund Policy</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container container-md">
        <div class="card p-8">
          <h2 class="mb-4">30-Day Money Back Guarantee</h2>
          <p class="text-secondary mb-4" style="line-height:1.7;">
            We want you to love everything you order from RAZDAR. If you are not satisfied for any reason, you may request a return within 30 days of receiving your package.
          </p>
          <h3 class="mb-2 mt-6">Return Conditions</h3>
          <ul class="text-secondary" style="line-height:1.8;padding-left:20px;">
            <li>Items must be unworn, unused, and in original packaging with tags intact.</li>
            <li>Electronics must include all original cable accessories and manual cards.</li>
            <li>Refunds will be processed back to your original payment method within 3 business days of package inspection.</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

export default renderRefundPolicyPage;
