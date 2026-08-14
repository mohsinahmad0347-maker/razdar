// ============================================
// RAZDAR — SPA Router (Hash-based, optimized)
// ============================================

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.beforeHooks = [];
    this.afterHooks = [];
    // Cleanup registry: components can register a destroy() callback
    this._cleanupFns = [];
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  add(path, handler) {
    this.routes[path] = handler;
    return this;
  }

  before(hook) {
    this.beforeHooks.push(hook);
    return this;
  }

  after(hook) {
    this.afterHooks.push(hook);
    return this;
  }

  // Pages call this to register cleanup (e.g. carousel.destroy())
  onLeave(fn) {
    this._cleanupFns.push(fn);
  }

  _runCleanup() {
    this._cleanupFns.forEach(fn => { try { fn(); } catch (_) {} });
    this._cleanupFns = [];
  }

  getRoute() {
    return window.location.hash.slice(1) || '/';
  }

  getParams() {
    const hash = this.getRoute();
    const parts = hash.split('?');
    const params = {};
    if (parts[1]) {
      parts[1].split('&').forEach(p => {
        const [k, v] = p.split('=');
        params[decodeURIComponent(k)] = decodeURIComponent(v || '');
      });
    }
    return params;
  }

  matchRoute(path) {
    for (const route in this.routes) {
      const routeParts = route.split('/');
      const pathParts = path.split('?')[0].split('/');
      if (routeParts.length !== pathParts.length) continue;

      const params = {};
      let match = true;
      for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(':')) {
          params[routeParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
        } else if (routeParts[i] !== pathParts[i]) {
          match = false;
          break;
        }
      }
      if (match) return { handler: this.routes[route], params };
    }
    return null;
  }

  async handleRoute() {
    const path = this.getRoute();
    const queryParams = this.getParams();

    // Destroy any components from the previous page
    this._runCleanup();

    for (const hook of this.beforeHooks) {
      if (await hook(path) === false) return;
    }

    const match = this.matchRoute(path);
    const appEl = document.getElementById('app');

    if (match) {
      this.currentRoute = path;

      appEl.classList.add('page-transition-exit');
      await new Promise(r => setTimeout(r, 150));
      appEl.classList.remove('page-transition-exit');

      try {
        await match.handler({ ...match.params, ...queryParams });
      } catch (err) {
        console.error('Route error:', err);
        appEl.innerHTML = `<div class="empty-state min-h-screen">
          <div class="empty-state-icon">⚠️</div>
          <h3>Something went wrong</h3>
          <p>Please try again later</p>
          <a href="#/" class="btn btn-primary mt-4">Go Home</a>
        </div>`;
      }

      appEl.classList.add('page-transition-enter');
      setTimeout(() => appEl.classList.remove('page-transition-enter'), 500);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } else {
      if (this.routes['/404']) {
        await this.routes['/404']();
      } else {
        appEl.innerHTML = `<div class="empty-state min-h-screen">
          <h3>Page Not Found</h3>
          <a href="#/" class="btn btn-primary mt-4">Go Home</a>
        </div>`;
      }
    }

    for (const hook of this.afterHooks) {
      await hook(path);
    }
  }

  navigate(path) {
    window.location.hash = path;
  }

  start() {
    this.handleRoute();
  }
}

export const router = new Router();
export default router;
