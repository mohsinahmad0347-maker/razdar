// ============================================
// RAZDAR — Coupons Data
// ============================================

export const coupons = [
  {
    code: 'NEWUSER20',
    discount: '20% OFF',
    value: 0.20,
    type: 'percentage',
    minOrder: 50,
    expiry: 'Dec 31, 2026',
    description: 'Special 20% discount on your first RAZDAR order.'
  },
  {
    code: 'SAVE30',
    discount: '$30 OFF',
    value: 30,
    type: 'fixed',
    minOrder: 150,
    expiry: 'Sep 30, 2026',
    description: 'Flat $30 discount on orders over $150.'
  },
  {
    code: 'FLASH50',
    discount: '50% OFF',
    value: 0.50,
    type: 'percentage',
    minOrder: 200,
    expiry: 'Aug 20, 2026',
    description: 'Mega Flash Sale coupon! Max savings $100.'
  },
  {
    code: 'FREESHIP',
    discount: 'FREE SHIPPING',
    value: 'shipping',
    type: 'shipping',
    minOrder: 30,
    expiry: 'Dec 31, 2026',
    description: 'Complimentary standard shipping on all orders.'
  }
];

export default coupons;
