// ============================================
// RAZDAR — Orders Data
// ============================================

export const orders = [
  {
    id: 'ORD-98421',
    date: '2026-08-10',
    total: 449.98,
    status: 'Delivered', // 'Order Placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered'
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    trackingNumber: 'RZD-TRK-884219',
    estimatedDelivery: 'August 12, 2026',
    items: [
      { id: 'prod-1', name: 'Apex Pro ANC Wireless Headphones', price: 299.99, quantity: 1, color: 'Lime Spark', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80' },
      { id: 'prod-7', name: 'Phantom Nitro Running Shoes', price: 149.99, quantity: 1, size: 'US 10', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80' }
    ],
    timeline: [
      { step: 'Order Placed', date: 'Aug 10, 09:30 AM', completed: true },
      { step: 'Confirmed', date: 'Aug 10, 10:15 AM', completed: true },
      { step: 'Packed', date: 'Aug 10, 04:00 PM', completed: true },
      { step: 'Shipped', date: 'Aug 11, 08:30 AM', completed: true },
      { step: 'Out for Delivery', date: 'Aug 12, 09:00 AM', completed: true },
      { step: 'Delivered', date: 'Aug 12, 02:45 PM', completed: true }
    ],
    shippingAddress: {
      name: 'Mohsin Ahmad',
      street: '452 Innovation Blvd, Suite 300',
      city: 'San Francisco',
      province: 'CA',
      postalCode: '94107',
      country: 'USA'
    }
  },
  {
    id: 'ORD-98422',
    date: '2026-08-13',
    total: 1099.99,
    status: 'Shipped',
    paymentStatus: 'Paid',
    paymentMethod: 'Digital Wallet',
    trackingNumber: 'RZD-TRK-991204',
    estimatedDelivery: 'August 15, 2026',
    items: [
      { id: 'prod-3', name: 'Volt X Ultra 5G (512GB)', price: 1099.99, quantity: 1, color: 'Titanium Gray', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=400&q=80' }
    ],
    timeline: [
      { step: 'Order Placed', date: 'Aug 13, 01:10 PM', completed: true },
      { step: 'Confirmed', date: 'Aug 13, 01:25 PM', completed: true },
      { step: 'Packed', date: 'Aug 13, 06:00 PM', completed: true },
      { step: 'Shipped', date: 'Aug 14, 08:00 AM', completed: true },
      { step: 'Out for Delivery', date: 'Pending', completed: false },
      { step: 'Delivered', date: 'Pending', completed: false }
    ],
    shippingAddress: {
      name: 'Mohsin Ahmad',
      street: '452 Innovation Blvd, Suite 300',
      city: 'San Francisco',
      province: 'CA',
      postalCode: '94107',
      country: 'USA'
    }
  }
];

export default orders;
