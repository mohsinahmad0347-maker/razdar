// ============================================
// RAZDAR — SPA Hash Router
// ============================================

class Router {
  constructor() {
    this.routes     = {};
    this.currentRoute = null;
    this._cleanupFns  = [];
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  add(path, handler) { this.routes[path] = handler; return this; }

  onLeave(fn) { this._cleanupFns.push(fn); }

  _runCleanup() {
    this._cleanupFns.forEach(fn => { try { fn(); } catch(_){} });
    this._cleanupFns = [];
  }

  // Returns the current path, e.g. "/shop" or "/"
  getPath() {
    const hash = window.location.hash; // e.g. "#/shop?q=x"
    if (!hash || hash === '#' || hash === '#/') return '/';
    // slice off the leading '#', keep everything before '?'
    return hash.slice(1).split('?')[0] || '/';
  }

  // Returns query params as an object
  getQuery() {
    const hash = window.location.hash;
    const qi   = hash.indexOf('?');
    if (qi === -1) return {};
    const obj  = {};
    hash.slice(qi + 1).split('&').forEach(pair => {
      const [k, v] = pair.split('=');
      if (k) obj[decodeURIComponent(k)] = decodeURIComponent(v || '');
    });
    return obj;
  }

  match(path) {
    // 1. Exact match (handles '/' and all static routes)
    if (this.routes[path] !== undefined) {
      return { handler: this.routes[path], params: {} };
    }
    // 2. Parametric match (e.g. /product/:id)
    for (const route of Object.keys(this.routes)) {
      if (!route.includes(':')) continue;
      const rParts = route.split('/');
      const pParts = path.split('/');
      if (rParts.length !== pParts.length) continue;
      const params = {};
      let ok = true;
      for (let i = 0; i < rParts.length; i++) {
        if (rParts[i].startsWith(':')) {
          params[rParts[i].slice(1)] = decodeURIComponent(pParts[i]);
        } else if (rParts[i] !== pParts[i]) {
          ok = false; break;
        }
      }
      if (ok) return { handler: this.routes[route], params };
    }
    return null;
  }

  async handleRoute() {
    const path   = this.getPath();
    const query  = this.getQuery();
    const appEl  = document.getElementById('app');

    this._runCleanup();

    // Fade out
    appEl.style.opacity = '0';
    appEl.style.transition = 'opacity .15s ease';
    await new Promise(r => setTimeout(r, 150));

    const found = this.match(path);

    if (found) {
      this.currentRoute = path;
      try {
        await found.handler({ ...found.params, ...query });
      } catch (err) {
        console.error('[RAZDAR] Route error on', path, err);
        appEl.innerHTML = `
          <div style="min-height:60vh;display:flex;flex-direction:column;align-items:center;
                      justify-content:center;gap:16px;padding:40px;text-align:center;">
            <div style="font-size:48px;">⚠️</div>
            <h2>Something went wrong</h2>
            <p style="color:#737373;">${err.message || 'An unexpected error occurred.'}</p>
            <a href="#/" style="padding:10px 24px;background:#C6FF00;color:#000;
               border-radius:8px;font-weight:600;text-decoration:none;">Go Home</a>
          </div>`;
      }
    } else {
      this.currentRoute = null;
      // Try /404 page, else inline fallback
      const notFound = this.routes['/404'];
      if (notFound) {
        try { await notFound({}); } catch(_) {}
      } else {
        appEl.innerHTML = `
          <div style="min-height:60vh;display:flex;flex-direction:column;align-items:center;
                      justify-content:center;gap:16px;padding:40px;text-align:center;">
            <div style="font-size:64px;">404</div>
            <h2>Page Not Found</h2>
            <p style="color:#737373;">The page <strong>${path}</strong> does not exist.</p>
            <a href="#/" style="padding:10px 24px;background:#C6FF00;color:#000;
               border-radius:8px;font-weight:600;text-decoration:none;">Go Home</a>
          </div>`;
      }
    }

    // Fade in
    appEl.style.opacity = '1';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigate(path) { window.location.hash = path; }

  start() { this.handleRoute(); }
}

export const router = new Router();
export default router;
