// ============================================
// RAZDAR — Customer Addresses Page
// ============================================

import { getIcon } from '../../utils/icons.js';

export async function renderCustomerAddresses() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>Saved Addresses</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/dashboard">Dashboard</a>
          <span class="separator">/</span>
          <span>Addresses</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/dashboard" class="sidebar-nav-item">${getIcon('layoutDashboard')} Dashboard</a>
              <a href="#/dashboard/addresses" class="sidebar-nav-item active">${getIcon('home')} Addresses</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <div class="flex flex-between items-center mb-6">
              <h3>Shipping Addresses</h3>
              <button class="btn btn-primary btn-sm">${getIcon('plus')} Add New Address</button>
            </div>

            <div class="grid grid-2 gap-4">
              <div class="card p-5 border-focus">
                <span class="badge badge-primary mb-2">DEFAULT HOME</span>
                <div class="font-bold text-base">Mohsin Ahmad</div>
                <div class="text-sm text-secondary mt-1">452 Innovation Blvd, Suite 300</div>
                <div class="text-sm text-secondary">San Francisco, CA 94107, USA</div>
                <div class="text-sm text-secondary mt-1">+1 (555) 234-5678</div>
              </div>

              <div class="card p-5">
                <span class="badge badge-secondary mb-2">WORK / OFFICE</span>
                <div class="font-bold text-base">Mohsin Ahmad</div>
                <div class="text-sm text-secondary mt-1">100 Tech Park Way</div>
                <div class="text-sm text-secondary">San Jose, CA 95110, USA</div>
                <div class="text-sm text-secondary mt-1">+1 (555) 987-6543</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  `;
}

export default renderCustomerAddresses;
