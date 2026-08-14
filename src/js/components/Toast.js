// ============================================
// RAZDAR — Toast Notification System
// ============================================

import events from '../core/events.js';
import { getIcon } from '../utils/icons.js';

export class Toast {
  constructor() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
    this.init();
  }

  init() {
    events.on('toast:show', (toastData) => this.show(toastData));
  }

  show({ type = 'info', title = '', message = '', duration = 4000 }) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconName = 'sparkles';
    if (type === 'success') iconName = 'check';
    if (type === 'error') iconName = 'x';
    if (type === 'warning') iconName = 'zap';

    toast.innerHTML = `
      <div class="toast-icon">${getIcon(iconName)}</div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">${getIcon('x')}</button>
      <div class="toast-progress" style="animation: countDown ${duration}ms linear forwards;"></div>
    `;

    this.container.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close');
    const dismiss = () => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    };

    if (closeBtn) closeBtn.addEventListener('click', dismiss);
    setTimeout(dismiss, duration);
  }
}

export default Toast;
