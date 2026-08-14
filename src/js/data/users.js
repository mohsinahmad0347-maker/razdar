// ============================================
// RAZDAR — Demo Users Data
// ============================================

export const users = [
  {
    id: 'usr-1',
    name: 'Mohsin Ahmad',
    email: 'customer@razdar.com',
    role: 'customer',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    address: {
      street: '452 Innovation Blvd, Suite 300',
      city: 'San Francisco',
      province: 'California',
      country: 'United States',
      postalCode: '94107'
    },
    ordersCount: 8,
    points: 1250,
    wishlistCount: 5
  },
  {
    id: 'usr-2',
    name: 'TechMatrix Store',
    email: 'seller@razdar.com',
    role: 'seller',
    phone: '+1 (555) 987-6543',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    storeName: 'TechMatrix Official',
    sales: 1420,
    revenue: '$184,250.00'
  },
  {
    id: 'usr-3',
    name: 'RAZDAR Super Admin',
    email: 'admin@razdar.com',
    role: 'admin',
    phone: '+1 (555) 000-1111',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    permissions: ['all']
  }
];

export default users;
