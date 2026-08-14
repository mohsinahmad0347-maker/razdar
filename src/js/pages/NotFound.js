// ============================================
// RAZDAR — 404 Page
// ============================================

import { getIcon } from '../utils/icons.js';

export async function renderNotFoundPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-body flex items-center justify-center min-h-screen text-center" style="margin-top:-64px;">
      <div class="container container-sm">
        <div class="empty-state">
          <div style="font-family:var(--font-heading);font-size:120px;font-weight:900;color:var(--primary);line-height:1;margin-bottom:var(--sp-4);">
            404
          </div>
          <h2 style="font-size:var(--fs-3xl);margin-bottom:var(--sp-2);">Page Not Found</h2>
          <p class="text-secondary mb-6" style="max-width:380px;">
            The page you are looking for might have been removed, renamed, or is temporarily unavailable.
          </p>
          <a href="#/" class="btn btn-primary btn-xl">
            ${getIcon('home')} Back to RAZDAR Home
          </a>
        </div>
      </div>
    </div>
  `;
}

export default renderNotFoundPage;
