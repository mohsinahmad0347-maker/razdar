// ============================================
// RAZDAR — Live Chat & Customer Support Widget
// ============================================

import events from '../core/events.js';
import { getIcon } from '../utils/icons.js';

export class ChatWidget {
  constructor() {
    this.container = document.getElementById('chat-widget');
    this.isOpen = false;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <button class="chat-btn" id="chat-toggle-btn" title="Live Support Chat">
        ${getIcon('messageSquare')}
      </button>

      <div class="modal-overlay" id="chat-modal-overlay" style="z-index:var(--z-modal);">
        <div class="modal" style="max-width:380px;height:500px;display:flex;flex-direction:column;">
          <div class="modal-header" style="background:var(--primary);color:var(--text-on-primary);">
            <div class="flex items-center gap-2">
              <div class="avatar avatar-sm avatar-initials" style="background:#fff;color:var(--primary);">R</div>
              <div>
                <div style="font-weight:600;font-size:14px;">RAZDAR Support</div>
                <div style="font-size:10px;opacity:0.8;">Online • Instant Assistant</div>
              </div>
            </div>
            <button class="btn-icon btn-ghost" id="chat-close-btn" style="color:#fff;">${getIcon('x')}</button>
          </div>
          <div class="modal-body" id="chat-messages" style="flex:1;overflow-y:auto;padding:var(--sp-4);display:flex;flex-direction:column;gap:var(--sp-3);">
            <div style="background:var(--bg-tertiary);padding:var(--sp-3);border-radius:var(--radius-lg);max-width:85%;font-size:13px;align-self:flex-start;">
              👋 Hello! Welcome to RAZDAR support. How can I help you today?
            </div>
            <div style="display:flex;gap:var(--sp-2);flex-wrap:wrap;margin-top:var(--sp-2);">
              <button class="chip chat-quick-chip" data-msg="Track my order">Track my order</button>
              <button class="chip chat-quick-chip" data-msg="Return policy">Return policy</button>
              <button class="chip chat-quick-chip" data-msg="Payment options">Payment options</button>
            </div>
          </div>
          <div class="modal-footer" style="padding:var(--sp-3);">
            <form id="chat-form" style="display:flex;gap:var(--sp-2);width:100%;">
              <input type="text" id="chat-input" class="form-input" placeholder="Type your message..." style="font-size:13px;padding:var(--sp-2) var(--sp-3);" />
              <button type="submit" class="btn btn-primary btn-sm">Send</button>
            </form>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const toggleBtn = this.container.querySelector('#chat-toggle-btn');
    const overlay = this.container.querySelector('#chat-modal-overlay');
    const closeBtn = this.container.querySelector('#chat-close-btn');
    const form = this.container.querySelector('#chat-form');
    const messages = this.container.querySelector('#chat-messages');

    const toggle = () => {
      this.isOpen = !this.isOpen;
      if (overlay) overlay.classList.toggle('active', this.isOpen);
    };

    if (toggleBtn) toggleBtn.addEventListener('click', toggle);
    if (closeBtn) closeBtn.addEventListener('click', toggle);

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('#chat-input');
        if (input && input.value.trim()) {
          const userMsg = input.value.trim();

          // Append User Message
          const userMsgElem = document.createElement('div');
          userMsgElem.style.cssText = 'background:var(--primary);color:var(--text-on-primary);padding:var(--sp-3);border-radius:var(--radius-lg);max-width:85%;font-size:13px;align-self:flex-end;';
          userMsgElem.textContent = userMsg;
          messages.appendChild(userMsgElem);

          input.value = '';
          messages.scrollTop = messages.scrollHeight;

          // Bot reply simulation
          setTimeout(() => {
            const botMsgElem = document.createElement('div');
            botMsgElem.style.cssText = 'background:var(--bg-tertiary);padding:var(--sp-3);border-radius:var(--radius-lg);max-width:85%;font-size:13px;align-self:flex-start;';
            botMsgElem.textContent = `Thanks for reaching out! Our agent is reviewing your query regarding "${userMsg.slice(0, 30)}...". You can also check our FAQ page for instant answers!`;
            messages.appendChild(botMsgElem);
            messages.scrollTop = messages.scrollHeight;
          }, 800);
        }
      });
    }

    this.container.addEventListener('click', (e) => {
      const chip = e.target.closest('.chat-quick-chip');
      if (chip) {
        const msg = chip.getAttribute('data-msg');
        const input = form.querySelector('#chat-input');
        if (input) {
          input.value = msg;
          form.dispatchEvent(new Event('submit'));
        }
      }
    });
  }
}

export default ChatWidget;
