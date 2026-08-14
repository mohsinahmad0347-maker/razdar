// ============================================
// RAZDAR — FAQ Page (Interactive Accordions)
// ============================================

import { getIcon } from '../utils/icons.js';

export async function renderFAQPage() {
  const app = document.getElementById('app');

  const faqs = [
    { q: 'How can I place an order on RAZDAR?', a: 'Browse our extensive catalog, select your desired color/size variants, click "Add to Cart", and proceed to checkout. You can check out as a guest or sign in for reward points.' },
    { q: 'What payment methods are available?', a: 'We accept Cash on Delivery (COD), Credit/Debit Cards (Visa, MasterCard, Amex), PayPal, Apple Pay, and Direct Bank Transfers.' },
    { q: 'How can I track my order status?', a: 'Go to your Customer Dashboard > Track Order page or click the tracking link sent to your registered email address.' },
    { q: 'What is RAZDAR\'s 30-day return policy?', a: 'If you are not 100% satisfied with your purchase, you can initiate a return or exchange within 30 days of delivery for a full refund.' },
    { q: 'How long does delivery take?', a: 'Standard shipping takes 3-5 business days. Express Priority Air delivery arrives in 1-2 business days.' },
    { q: 'How can I contact support?', a: 'Click the live chat button at the bottom right corner, visit our Contact page, or email support@razdar.com.' }
  ];

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>Frequently Asked Questions</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>FAQ</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container container-md">
        <div class="accordion" id="faq-accordion">
          ${faqs.map((f, i) => `
            <div class="accordion-item ${i === 0 ? 'active' : ''}">
              <div class="accordion-header">
                <span>${f.q}</span>
                <span class="accordion-icon">${getIcon('chevronDown')}</span>
              </div>
              <div class="accordion-body" style="${i === 0 ? 'max-height:200px;' : ''}">
                <div class="accordion-body-inner">
                  ${f.a}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Attach accordion toggle logic
  app.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion-body');
      const isActive = item.classList.contains('active');

      if (isActive) {
        item.classList.remove('active');
        if (body) body.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        if (body) body.style.maxHeight = `${body.scrollHeight + 30}px`;
      }
    });
  });
}

export default renderFAQPage;
