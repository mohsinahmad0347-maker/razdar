(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();class H{constructor(){this.listeners={}}on(e,t){return this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t),()=>this.off(e,t)}off(e,t){this.listeners[e]&&(this.listeners[e]=this.listeners[e].filter(s=>s!==t))}emit(e,t){this.listeners[e]&&this.listeners[e].forEach(s=>{try{s(t)}catch(i){console.error(`Error in event listener for ${e}:`,i)}})}}const p=new H;class O{constructor(){this.state={theme:localStorage.getItem("razdar_theme")||"dark",cart:JSON.parse(localStorage.getItem("razdar_cart"))||[],wishlist:JSON.parse(localStorage.getItem("razdar_wishlist"))||[],compare:JSON.parse(localStorage.getItem("razdar_compare"))||[],user:JSON.parse(localStorage.getItem("razdar_user"))||null,role:localStorage.getItem("razdar_role")||"customer",notifications:JSON.parse(localStorage.getItem("razdar_notifications"))||[{id:1,title:"Welcome to RAZDAR!",text:'Enjoy your premium shopping experience. "Your World. Your Choice."',time:"Just now",unread:!0,icon:"sparkles"},{id:2,title:"Flash Sale Live",text:"Get up to 60% off on Next-Gen Electronics!",time:"1h ago",unread:!0,icon:"zap"}],recentSearches:JSON.parse(localStorage.getItem("razdar_recent_searches"))||["Smart Watch","Wireless Headphones","Sneakers","Mechanical Keyboard"],recentlyViewed:JSON.parse(localStorage.getItem("razdar_recently_viewed"))||[]},this.initTheme()}initTheme(){document.documentElement.setAttribute("data-theme",this.state.theme)}toggleTheme(){const e=this.state.theme==="dark"?"light":"dark";this.state.theme=e,localStorage.setItem("razdar_theme",e),document.documentElement.setAttribute("data-theme",e),p.emit("theme:change",e)}getCart(){return this.state.cart}getCartCount(){return this.state.cart.reduce((e,t)=>e+t.quantity,0)}getCartSubtotal(){return this.state.cart.reduce((e,t)=>e+t.price*t.quantity,0)}addToCart(e,t=1,s=null,i=null){const o=this.state.cart.findIndex(n=>n.id===e.id&&n.color===s&&n.size===i);o>-1?this.state.cart[o].quantity+=t:this.state.cart.push({...e,quantity:t,color:s||(e.colors?e.colors[0]:null),size:i||(e.sizes?e.sizes[0]:null)}),this.saveCart(),p.emit("cart:updated",this.state.cart),p.emit("toast:show",{type:"success",title:"Added to Cart",message:`${e.name} has been added to your shopping cart.`})}updateCartQuantity(e,t,s=null,i=null){const o=this.state.cart.find(n=>n.id===e&&n.color===s&&n.size===i);o&&(t<=0?this.removeFromCart(e,s,i):(o.quantity=t,this.saveCart(),p.emit("cart:updated",this.state.cart)))}removeFromCart(e,t=null,s=null){this.state.cart=this.state.cart.filter(i=>!(i.id===e&&i.color===t&&i.size===s)),this.saveCart(),p.emit("cart:updated",this.state.cart),p.emit("toast:show",{type:"info",title:"Item Removed",message:"Item was removed from your cart."})}clearCart(){this.state.cart=[],this.saveCart(),p.emit("cart:updated",this.state.cart)}saveCart(){localStorage.setItem("razdar_cart",JSON.stringify(this.state.cart))}getWishlist(){return this.state.wishlist}isInWishlist(e){return this.state.wishlist.some(t=>t.id===e)}toggleWishlist(e){this.isInWishlist(e.id)?(this.state.wishlist=this.state.wishlist.filter(t=>t.id!==e.id),p.emit("toast:show",{type:"info",title:"Removed from Wishlist",message:`${e.name} removed from your saved items.`})):(this.state.wishlist.push(e),p.emit("toast:show",{type:"success",title:"Added to Wishlist",message:`${e.name} saved to your wishlist.`})),this.saveWishlist(),p.emit("wishlist:updated",this.state.wishlist)}saveWishlist(){localStorage.setItem("razdar_wishlist",JSON.stringify(this.state.wishlist))}getCompare(){return this.state.compare}toggleCompare(e){if(this.state.compare.some(s=>s.id===e.id))this.state.compare=this.state.compare.filter(s=>s.id!==e.id);else{if(this.state.compare.length>=4){p.emit("toast:show",{type:"warning",title:"Limit Reached",message:"You can compare a maximum of 4 products."});return}this.state.compare.push(e)}localStorage.setItem("razdar_compare",JSON.stringify(this.state.compare)),p.emit("compare:updated",this.state.compare)}getUser(){return this.state.user}isLoggedIn(){return!!this.state.user}login(e,t="customer"){this.state.user=e,this.state.role=t,localStorage.setItem("razdar_user",JSON.stringify(e)),localStorage.setItem("razdar_role",t),p.emit("user:change",e),p.emit("toast:show",{type:"success",title:"Welcome Back!",message:`Signed in as ${e.name}`})}logout(){this.state.user=null,this.state.role="customer",localStorage.removeItem("razdar_user"),localStorage.setItem("razdar_role","customer"),p.emit("user:change",null),p.emit("toast:show",{type:"info",title:"Signed Out",message:"You have been successfully signed out."})}addRecentlyViewed(e){this.state.recentlyViewed=this.state.recentlyViewed.filter(t=>t.id!==e.id),this.state.recentlyViewed.unshift(e),this.state.recentlyViewed.length>10&&this.state.recentlyViewed.pop(),localStorage.setItem("razdar_recently_viewed",JSON.stringify(this.state.recentlyViewed))}addRecentSearch(e){if(!e||!e.trim())return;const t=e.trim();this.state.recentSearches=this.state.recentSearches.filter(s=>s.toLowerCase()!==t.toLowerCase()),this.state.recentSearches.unshift(t),this.state.recentSearches.length>8&&this.state.recentSearches.pop(),localStorage.setItem("razdar_recent_searches",JSON.stringify(this.state.recentSearches))}}const c=new O;class G{constructor(){this.routes={},this.currentRoute=null,this.beforeHooks=[],this.afterHooks=[],window.addEventListener("hashchange",()=>this.handleRoute())}add(e,t){return this.routes[e]=t,this}before(e){return this.beforeHooks.push(e),this}after(e){return this.afterHooks.push(e),this}getRoute(){return window.location.hash.slice(1)||"/"}getParams(){const t=this.getRoute().split("?"),s={};return t[1]&&t[1].split("&").forEach(i=>{const[o,n]=i.split("=");s[decodeURIComponent(o)]=decodeURIComponent(n||"")}),s}matchRoute(e){for(const t in this.routes){const s=t.split("/"),i=e.split("?")[0].split("/");if(s.length!==i.length)continue;const o={};let n=!0;for(let d=0;d<s.length;d++)if(s[d].startsWith(":"))o[s[d].slice(1)]=decodeURIComponent(i[d]);else if(s[d]!==i[d]){n=!1;break}if(n)return{handler:this.routes[t],params:o}}return null}async handleRoute(){const e=this.getRoute(),t=this.getParams();for(const o of this.beforeHooks)if(await o(e)===!1)return;const s=this.matchRoute(e),i=document.getElementById("app");if(s){this.currentRoute=e,i.classList.add("page-transition-exit"),await new Promise(o=>setTimeout(o,150)),i.classList.remove("page-transition-exit");try{await s.handler({...s.params,...t})}catch(o){console.error("Route error:",o),i.innerHTML=`<div class="empty-state min-h-screen">
          <div class="empty-state-icon">⚠️</div>
          <h3>Something went wrong</h3>
          <p>Please try again later</p>
          <a href="#/" class="btn btn-primary mt-4">Go Home</a>
        </div>`}i.classList.add("page-transition-enter"),setTimeout(()=>i.classList.remove("page-transition-enter"),500),window.scrollTo({top:0,behavior:"smooth"})}else this.routes["/404"]?await this.routes["/404"]():i.innerHTML=`<div class="empty-state min-h-screen">
          <h3>Page Not Found</h3>
          <p>The page you're looking for doesn't exist</p>
          <a href="#/" class="btn btn-primary mt-4">Go Home</a>
        </div>`;for(const o of this.afterHooks)await o(e)}navigate(e){window.location.hash=e}start(){this.handleRoute()}}const z=new G;class W{constructor(){this.loaderPercent=0,this.isLoaded=!1}init(){this.startLoader(),this.bindGlobalEvents(),this.initScrollReveal(),this.initRippleEffect()}startLoader(){document.body.classList.add("loader-active");const e=document.querySelector(".loader-progress-fill"),t=document.querySelector(".loader-ring-fill"),s=document.querySelector(".loader-percent"),i=document.getElementById("app-loader"),o=setInterval(()=>{if(this.loaderPercent+=Math.floor(Math.random()*12)+5,this.loaderPercent>=100)this.loaderPercent=100,clearInterval(o),e&&(e.style.width="100%"),s&&(s.textContent="100%"),t&&(t.style.strokeDashoffset="0"),setTimeout(()=>{i&&i.classList.add("hidden"),document.body.classList.remove("loader-active"),this.isLoaded=!0,p.emit("app:loaded")},600);else if(e&&(e.style.width=`${this.loaderPercent}%`),s&&(s.textContent=`${this.loaderPercent}%`),t){const n=283-283*(this.loaderPercent/100);t.style.strokeDashoffset=n}},40)}initRippleEffect(){document.addEventListener("click",e=>{const t=e.target.closest(".btn");if(!t)return;const s=t.getBoundingClientRect(),i=document.createElement("span"),o=Math.max(s.width,s.height),n=o/2;i.style.width=i.style.height=`${o}px`,i.style.left=`${e.clientX-s.left-n}px`,i.style.top=`${e.clientY-s.top-n}px`,i.classList.add("ripple");const d=t.getElementsByClassName("ripple")[0];d&&d.remove(),t.appendChild(i)})}initScrollReveal(){const e={root:null,rootMargin:"0px",threshold:.1},t=new IntersectionObserver(i=>{i.forEach(o=>{o.isIntersecting&&o.target.classList.add("revealed")})},e),s=()=>{document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach(o=>t.observe(o))};p.on("route:changed",()=>{setTimeout(s,100)}),setTimeout(s,700)}bindGlobalEvents(){p.on("theme:toggle",()=>{c.toggleTheme()}),document.addEventListener("click",e=>{const t=e.target.closest('a[href^="#"]');t&&t.getAttribute("href").startsWith("#/")})}}const K=new W,D={search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',shoppingBag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',moon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',star:'<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',repeat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',chevronRight:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',chevronLeft:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',chevronDown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',minus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',messageSquare:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',truck:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',shieldCheck:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',zap:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',list:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',store:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',layoutDashboard:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="15" width="7" height="6"/></svg>',tag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',sparkles:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/></svg>',logOut:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>'},a=(r,e="")=>{const t=D[r]||D.sparkles;return e?t.replace("<svg ",`<svg class="${e}" `):t};class j{constructor(){this.container=document.getElementById("navbar"),this.init()}init(){this.render(),this.bindEvents(),p.on("cart:updated",()=>this.updateBadges()),p.on("wishlist:updated",()=>this.updateBadges()),p.on("user:change",()=>this.render())}render(){const e=c.getUser(),t=c.getCartCount(),s=c.getWishlist().length;c.state.theme,this.container.className="navbar",this.container.innerHTML=`
      <div class="navbar-inner">
        <!-- Logo -->
        <a href="#/" class="navbar-brand">
          <div class="brand-icon">R</div>
          <span class="brand-text">RAZDAR</span>
        </a>

        <!-- Desktop Navigation -->
        <ul class="navbar-nav">
          <li><a href="#/" class="nav-link">Home</a></li>
          <li><a href="#/shop" class="nav-link">Shop</a></li>
          <li><a href="#/categories" class="nav-link">Categories</a></li>
          <li><a href="#/deals" class="nav-link">Deals</a></li>
          <li><a href="#/new-arrivals" class="nav-link">New Arrivals</a></li>
          <li><a href="#/about" class="nav-link">About</a></li>
          <li><a href="#/contact" class="nav-link">Contact</a></li>
        </ul>

        <!-- Right Side Controls -->
        <div class="navbar-actions">
          <!-- Search -->
          <button class="navbar-action-btn" id="nav-search-btn" title="Search">
            ${a("search")}
          </button>

          <!-- Wishlist -->
          <a href="#/wishlist" class="navbar-action-btn" title="Wishlist">
            ${a("heart")}
            <span class="badge-count wishlist-count" style="${s>0?"":"display:none;"}">${s}</span>
          </a>

          <!-- Cart -->
          <a href="#/cart" class="navbar-action-btn" title="Shopping Cart">
            ${a("shoppingBag")}
            <span class="badge-count cart-count" style="${t>0?"":"display:none;"}">${t}</span>
          </a>

          <!-- Notifications -->
          <div class="dropdown" id="notification-dropdown">
            <button class="navbar-action-btn" id="nav-notif-btn" title="Notifications">
              ${a("bell")}
              <span class="badge-count">2</span>
            </button>
            <div class="notification-panel" id="notification-panel">
              <div class="notification-panel-header">
                <h4 style="margin:0;font-size:14px;">Notifications</h4>
                <span class="badge badge-primary">2 New</span>
              </div>
              <div class="notification-list">
                <div class="notification-item unread">
                  <div class="notification-icon" style="background:var(--primary-muted);color:var(--primary);">
                    ${a("sparkles")}
                  </div>
                  <div class="notification-body">
                    <div class="notification-title">Welcome to RAZDAR</div>
                    <div class="notification-text">Your World. Your Choice. Enjoy premium shopping.</div>
                    <div class="notification-time">Just now</div>
                  </div>
                </div>
                <div class="notification-item unread">
                  <div class="notification-icon" style="background:var(--warning-bg);color:var(--warning);">
                    ${a("zap")}
                  </div>
                  <div class="notification-body">
                    <div class="notification-title">Flash Sale Live</div>
                    <div class="notification-text">Up to 60% off on Next-Gen Electronics</div>
                    <div class="notification-time">1h ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- User Menu / Account -->
          ${e?`
            <div class="dropdown" id="user-menu-dropdown">
              <button class="navbar-action-btn" id="user-menu-btn" title="Account">
                <div class="avatar avatar-sm avatar-initials">${e.name.charAt(0)}</div>
              </button>
              <div class="dropdown-menu">
                <div style="padding:var(--sp-2) var(--sp-3);border-bottom:1px solid var(--border-secondary);">
                  <div style="font-weight:600;font-size:14px;">${e.name}</div>
                  <div style="font-size:11px;color:var(--text-tertiary);">${e.email}</div>
                </div>
                <a href="#/dashboard" class="dropdown-item">${a("user")} Dashboard</a>
                <a href="#/dashboard/orders" class="dropdown-item">${a("shoppingBag")} My Orders</a>
                <a href="#/seller/dashboard" class="dropdown-item">${a("store")} Seller Hub</a>
                <a href="#/admin/dashboard" class="dropdown-item">${a("layoutDashboard")} Admin Panel</a>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" id="nav-logout-btn" style="color:var(--danger);width:100%;text-align:left;">
                  ${a("logOut")} Logout
                </button>
              </div>
            </div>
          `:`
            <a href="#/login" class="btn btn-primary btn-sm hide-sm" style="margin-left:var(--sp-2);">
              Sign In
            </a>
          `}

          <!-- Theme Toggle Switch -->
          <div class="theme-toggle" id="theme-toggle-btn" title="Toggle Light/Dark Theme"></div>

          <!-- Mobile Hamburger Toggle -->
          <button class="menu-toggle" id="mobile-menu-toggle">
            <div class="hamburger">
              <span></span><span></span><span></span>
            </div>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-nav-overlay" id="mobile-overlay"></div>
      <div class="mobile-nav" id="mobile-nav">
        <div class="mobile-nav-header">
          <div class="navbar-brand">
            <div class="brand-icon">R</div>
            <span class="brand-text">RAZDAR</span>
          </div>
          <button class="btn-icon btn-ghost" id="mobile-close-btn">${a("x")}</button>
        </div>
        <div class="mobile-nav-links">
          <a href="#/">${a("home")} Home</a>
          <a href="#/shop">${a("shoppingBag")} Shop</a>
          <a href="#/categories">${a("grid")} Categories</a>
          <a href="#/deals">${a("zap")} Deals</a>
          <a href="#/new-arrivals">${a("sparkles")} New Arrivals</a>
          <a href="#/wishlist">${a("heart")} Wishlist (${s})</a>
          <a href="#/cart">${a("shoppingBag")} Cart (${t})</a>
          <div class="sidebar-nav-divider"></div>
          ${e?`
            <a href="#/dashboard">${a("user")} Customer Dashboard</a>
            <a href="#/seller/dashboard">${a("store")} Seller Dashboard</a>
            <a href="#/admin/dashboard">${a("layoutDashboard")} Admin Panel</a>
          `:`
            <a href="#/login">${a("user")} Login / Register</a>
            <a href="#/seller/register">${a("store")} Sell on RAZDAR</a>
          `}
        </div>
        <div class="mobile-nav-footer">
          <p style="font-size:12px;color:var(--text-tertiary);text-align:center;">RAZDAR — Your World. Your Choice.</p>
        </div>
      </div>
    `}updateBadges(){const e=this.container.querySelector(".cart-count"),t=this.container.querySelector(".wishlist-count"),s=c.getCartCount(),i=c.getWishlist().length;e&&(e.textContent=s,e.style.display=s>0?"flex":"none",e.classList.add("animate-bounce"),setTimeout(()=>e.classList.remove("animate-bounce"),1e3)),t&&(t.textContent=i,t.style.display=i>0?"flex":"none")}bindEvents(){window.addEventListener("scroll",()=>{window.scrollY>20?this.container.classList.add("scrolled"):this.container.classList.remove("scrolled")}),this.container.addEventListener("click",e=>{if(e.target.closest("#theme-toggle-btn")&&c.toggleTheme(),e.target.closest("#nav-search-btn")&&p.emit("search:open"),e.target.closest("#nav-notif-btn")){const i=this.container.querySelector("#notification-panel");i&&i.classList.toggle("active")}if(e.target.closest("#user-menu-btn")){const i=this.container.querySelector("#user-menu-dropdown");i&&i.classList.toggle("active")}e.target.closest("#nav-logout-btn")&&(c.logout(),window.location.hash="#/"),(e.target.closest("#mobile-menu-toggle")||e.target.closest("#mobile-close-btn")||e.target.closest("#mobile-overlay"))&&this.toggleMobileMenu(),e.target.closest(".mobile-nav-links a")&&this.toggleMobileMenu(!1)})}toggleMobileMenu(e=null){const t=this.container.querySelector("#mobile-nav"),s=this.container.querySelector("#mobile-overlay"),i=this.container.querySelector("#mobile-menu-toggle"),o=t==null?void 0:t.classList.contains("active");(e!==null?e:!o)?(t==null||t.classList.add("active"),s==null||s.classList.add("active"),i==null||i.classList.add("active"),document.body.classList.add("no-scroll")):(t==null||t.classList.remove("active"),s==null||s.classList.remove("active"),i==null||i.classList.remove("active"),document.body.classList.remove("no-scroll"))}}class U{constructor(){this.container=document.getElementById("footer"),this.init()}init(){this.render()}render(){this.container.className="footer",this.container.innerHTML=`
      <div class="footer-main">
        <div class="container">
          <div class="footer-grid">
            <!-- Brand Column -->
            <div class="footer-col brand-col">
              <div class="navbar-brand">
                <div class="brand-icon">R</div>
                <span class="brand-text">RAZDAR</span>
              </div>
              <p class="footer-brand-text">
                Your World. Your Choice. Premium global marketplace delivering next-generation tech, high fashion, lifestyle, and curated daily deals.
              </p>
              <div class="footer-social">
                <a href="#" aria-label="Facebook">FB</a>
                <a href="#" aria-label="Instagram">IG</a>
                <a href="#" aria-label="Twitter">TW</a>
                <a href="#" aria-label="LinkedIn">IN</a>
                <a href="#" aria-label="YouTube">YT</a>
              </div>
            </div>

            <!-- RAZDAR Info -->
            <div class="footer-col">
              <h4>RAZDAR</h4>
              <ul>
                <li><a href="#/about">About Us</a></li>
                <li><a href="#/careers">Careers</a></li>
                <li><a href="#/contact">Contact Us</a></li>
                <li><a href="#/blog">Official Blog</a></li>
                <li><a href="#/sustainability">Sustainability</a></li>
              </ul>
            </div>

            <!-- Customer Service -->
            <div class="footer-col">
              <h4>Customer Service</h4>
              <ul>
                <li><a href="#/faq">Help Center & FAQ</a></li>
                <li><a href="#/dashboard/orders">Shipping & Delivery</a></li>
                <li><a href="#/refund-policy">Returns & Refunds</a></li>
                <li><a href="#/dashboard/track-order">Track Order</a></li>
                <li><a href="#/support">Support Ticket</a></li>
              </ul>
            </div>

            <!-- Shopping -->
            <div class="footer-col">
              <h4>Shopping</h4>
              <ul>
                <li><a href="#/categories">All Categories</a></li>
                <li><a href="#/deals">Flash Deals</a></li>
                <li><a href="#/new-arrivals">New Arrivals</a></li>
                <li><a href="#/best-sellers">Best Sellers</a></li>
                <li><a href="#/coupons">Coupons & Offers</a></li>
              </ul>
            </div>

            <!-- Seller Hub -->
            <div class="footer-col">
              <h4>Seller Hub</h4>
              <ul>
                <li><a href="#/seller/register">Sell on RAZDAR</a></li>
                <li><a href="#/seller/dashboard">Seller Center</a></li>
                <li><a href="#/seller-policies">Seller Policies</a></li>
                <li><a href="#/fulfillment">RAZDAR Fulfillment</a></li>
              </ul>
            </div>
          </div>

          <!-- Newsletter Banner inside footer -->
          <div class="newsletter-section mt-12">
            <h2>Get the Best Deals in Your Inbox</h2>
            <p>Subscribe for secret flash sales, product drops, and 20% off your first purchase.</p>
            <form class="newsletter-form" id="newsletter-form">
              <input type="email" placeholder="Enter your email address..." required id="newsletter-input" />
              <button type="submit" class="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="container">
          <div class="footer-bottom-inner">
            <div class="footer-copyright">
              © 2026 <strong>RAZDAR Inc.</strong> All rights reserved. Your World. Your Choice.
            </div>
            <div style="display:flex;gap:var(--sp-4);font-size:12px;color:var(--text-tertiary);">
              <a href="#/privacy-policy">Privacy Policy</a>
              <a href="#/terms">Terms & Conditions</a>
              <a href="#/refund-policy">Refund Policy</a>
            </div>
            <div class="footer-payments">
              <span>VISA</span>
              <span>MasterCard</span>
              <span>PayPal</span>
              <span>ApplePay</span>
              <span>COD</span>
            </div>
          </div>
        </div>
      </div>
    `;const e=this.container.querySelector("#newsletter-form");e&&e.addEventListener("submit",t=>{t.preventDefault();const s=e.querySelector("#newsletter-input");s&&s.value&&(p.emit("toast:show",{type:"success",title:"Subscribed!",message:"Thank you for subscribing to RAZDAR insider deals."}),s.value="")})}}class V{constructor(){this.container=document.getElementById("bottom-nav"),this.init()}init(){this.render(),p.on("cart:updated",()=>this.render()),p.on("wishlist:updated",()=>this.render())}render(){const e=c.getCartCount(),t=c.getWishlist().length,s=window.location.hash||"#/";this.container.className="bottom-nav",this.container.innerHTML=`
      <div class="bottom-nav-inner">
        <a href="#/" class="bottom-nav-item ${s==="#/"?"active":""}">
          ${a("home")}
          <span>Home</span>
        </a>
        <a href="#/shop" class="bottom-nav-item ${s.includes("#/shop")?"active":""}">
          ${a("grid")}
          <span>Shop</span>
        </a>
        <a href="#/wishlist" class="bottom-nav-item ${s.includes("#/wishlist")?"active":""}">
          ${a("heart")}
          <span>Wishlist</span>
          ${t>0?`<span class="badge-count">${t}</span>`:""}
        </a>
        <a href="#/cart" class="bottom-nav-item ${s.includes("#/cart")?"active":""}">
          ${a("shoppingBag")}
          <span>Cart</span>
          ${e>0?`<span class="badge-count">${e}</span>`:""}
        </a>
        <a href="#/dashboard" class="bottom-nav-item ${s.includes("#/dashboard")?"active":""}">
          ${a("user")}
          <span>Account</span>
        </a>
      </div>
    `}}const m=[{id:"prod-1",name:"Apex Pro ANC Wireless Headphones",category:"electronics",brand:"AudioTech",price:299.99,oldPrice:399.99,discount:25,rating:4.9,reviewsCount:342,stock:45,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"],colors:["Graphite Black","Lime Spark"],sizes:[],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"Immerse yourself in studio quality sound with Active Noise Cancellation, 40-hour battery life, spatial audio, and memory foam earcups.",specs:{"Driver Size":"40mm Neodymium","Battery Life":"40 Hours ANC On",Connectivity:"Bluetooth 5.3"},reviews:[{id:"r1",user:"Alex Rivers",avatar:"https://i.pravatar.cc/150?u=a042581f4e29026704d",rating:5,date:"2 days ago",text:"Absolute best sound quality experience.",helpfulCount:24}],faqs:[{q:"Can I connect to two devices?",a:"Yes, multipoint connectivity allows simultaneous connection."}]},{id:"prod-2",name:"Spatial Surround Soundbar 300W",category:"electronics",brand:"AudioTech",price:189,oldPrice:249,discount:24,rating:4.7,reviewsCount:128,stock:18,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80"],colors:["Graphite Black"],sizes:[],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"3.1 channel Dolby Atmos surround sound system with wireless subwoofer.",specs:{Power:"300W",Audio:"Dolby Atmos"},reviews:[],faqs:[]},{id:"prod-101",name:"SonicPulse Hi-Fi Earbuds",category:"electronics",brand:"AudioTech",price:129.99,oldPrice:169.99,discount:23,rating:4.8,reviewsCount:210,stock:60,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!0,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"],colors:["Lime Spark","Matte Black"],sizes:[],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"True wireless earbuds with transparency mode and IPX7 water resistance.",specs:{Battery:"32 Hours Total",Waterproof:"IPX7"},reviews:[],faqs:[]},{id:"prod-102",name:"Lumix Smart Home Security Camera 4K",category:"electronics",brand:"VisionTech",price:99,oldPrice:139,discount:28,rating:4.6,reviewsCount:95,stock:30,inStock:!0,isTrending:!1,isBestSeller:!1,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80"],colors:["White","Black"],sizes:[],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"4K Ultra HD AI motion tracking security camera with night vision and two-way audio.",specs:{Resolution:"4K UHD","Night Vision":"Color Night Vision"},reviews:[],faqs:[]},{id:"prod-3",name:"Volt X Ultra 5G (512GB)",category:"mobiles",brand:"Volt",price:1099.99,oldPrice:1299.99,discount:15,rating:4.9,reviewsCount:512,stock:22,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80"],colors:["Titanium Gray","Lime Green"],sizes:["256GB","512GB","1TB"],seller:{id:"s2",name:"Volt Store Official",rating:4.9,followers:"84.2K",verified:!0},description:"200MP quad camera, Snapdragon 8 Gen 3, 144Hz AMOLED screen, and 120W HyperCharge.",specs:{Display:'6.8" 144Hz AMOLED',Camera:"200MP"},reviews:[],faqs:[]},{id:"prod-4",name:"Nova Lite 5G Smartphone",category:"mobiles",brand:"Nova",price:349,oldPrice:429,discount:18,rating:4.6,reviewsCount:184,stock:60,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!1,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"],colors:["Ocean Blue","Midnight Black"],sizes:["128GB","256GB"],seller:{id:"s2",name:"Volt Store Official",rating:4.9,followers:"84.2K",verified:!0},description:"108MP camera, 5000mAh battery, and 90Hz AMOLED display in a slim body.",specs:{Display:'6.67" AMOLED',Battery:"5000mAh"},reviews:[],faqs:[]},{id:"prod-201",name:"Aero Fold Z Dual Screen Phone",category:"mobiles",brand:"Volt",price:1399,oldPrice:1699,discount:17,rating:4.9,reviewsCount:88,stock:10,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80"],colors:["Graphite Black","Emerald Green"],sizes:["512GB"],seller:{id:"s2",name:"Volt Store Official",rating:4.9,followers:"84.2K",verified:!0},description:"Futuristic foldable OLED screen device with stylus support and armor aluminum hinge.",specs:{Display:'7.6" Inner Foldable OLED',RAM:"16GB"},reviews:[],faqs:[]},{id:"prod-202",name:"PixelCraft Pro Gaming Phone",category:"mobiles",brand:"Nexus",price:799,oldPrice:949,discount:15,rating:4.8,reviewsCount:160,stock:25,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!1,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"],colors:["Cyber Black / Lime Trigger"],sizes:["256GB","512GB"],seller:{id:"s2",name:"Volt Store Official",rating:4.9,followers:"84.2K",verified:!0},description:"Built for eSports gamers with physical shoulder triggers and built-in cooling fan.",specs:{"Refresh Rate":"165Hz",Cooling:"Vapor Chamber + Fan"},reviews:[],faqs:[]},{id:"prod-5",name:"TitanBook Pro 16 M3 Workstation",category:"laptops",brand:"Titan",price:2499,oldPrice:2799,discount:10,rating:5,reviewsCount:89,stock:12,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"],colors:["Space Gray","Dark Graphite"],sizes:["32GB RAM / 1TB SSD"],seller:{id:"s3",name:"Titan Tech",rating:4.9,followers:"45.1K",verified:!0},description:"Liquid Retina XDR screen, 16-core CPU, 40-core GPU workstation.",specs:{Display:'16.2" XDR',CPU:"M3 Max"},reviews:[],faqs:[]},{id:"prod-6",name:"Zenith Air 14 Ultrabook",category:"laptops",brand:"Zenith",price:899.99,oldPrice:1099.99,discount:18,rating:4.7,reviewsCount:204,stock:35,inStock:!0,isTrending:!1,isBestSeller:!1,isNewArrival:!0,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80"],colors:["Silver"],sizes:["16GB RAM / 512GB SSD"],seller:{id:"s3",name:"Titan Tech",rating:4.9,followers:"45.1K",verified:!0},description:"1.1kg aluminum chassis with Intel Core Ultra 7 processor and 18h battery.",specs:{Weight:"1.1 kg",Display:'14" OLED'},reviews:[],faqs:[]},{id:"prod-301",name:"Blade X RTX 4090 Gaming Laptop",category:"laptops",brand:"Nexus",price:2899,oldPrice:3299,discount:12,rating:4.9,reviewsCount:114,stock:8,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!1,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80"],colors:["Anodized Black"],sizes:["64GB RAM / 2TB SSD"],seller:{id:"s3",name:"Titan Tech",rating:4.9,followers:"45.1K",verified:!0},description:"Extreme eSports gaming laptop with RTX 4090 GPU and 240Hz QHD display.",specs:{GPU:"RTX 4090 16GB",Screen:'17.3" 240Hz'},reviews:[],faqs:[]},{id:"prod-302",name:"ChromeSlim Flex 2-in-1 Convertible",category:"laptops",brand:"Zenith",price:549,oldPrice:699,discount:21,rating:4.5,reviewsCount:78,stock:40,inStock:!0,isTrending:!1,isBestSeller:!1,isNewArrival:!0,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"],colors:["Platinum Silver"],sizes:["8GB RAM / 256GB SSD"],seller:{id:"s3",name:"Titan Tech",rating:4.9,followers:"45.1K",verified:!0},description:"360-degree touchscreen convertible laptop for students and mobile professionals.",specs:{Touchscreen:'13.3" IPS Touch',Battery:"14 Hours"},reviews:[],faqs:[]},{id:"prod-401",name:"Quantum Desktop PC i9 RTX 4080",category:"computers",brand:"Titan",price:2199,oldPrice:2499,discount:12,rating:4.9,reviewsCount:65,stock:14,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80"],colors:["Tempered Glass Black"],sizes:["32GB RAM / 2TB NVMe"],seller:{id:"s3",name:"Titan Tech",rating:4.9,followers:"45.1K",verified:!0},description:"Custom liquid-cooled desktop rig engineered for heavy 3D rendering and 4K gaming.",specs:{CPU:"Intel i9-14900K",GPU:"RTX 4080 Super"},reviews:[],faqs:[]},{id:"prod-402",name:'UltraWide Curved 34" QD-OLED Monitor',category:"computers",brand:"VisionTech",price:849,oldPrice:1099,discount:22,rating:4.9,reviewsCount:142,stock:20,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!0,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"],colors:["Graphite Metal"],sizes:["34 Inch"],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"175Hz 0.03ms Quantum Dot OLED curved monitor with HDR1000 and USB-C 90W power.",specs:{Resolution:"3440 x 1440","Refresh Rate":"175Hz OLED"},reviews:[],faqs:[]},{id:"prod-403",name:"StudioOne All-In-One 4K Desktop",category:"computers",brand:"Titan",price:1599,oldPrice:1899,discount:15,rating:4.7,reviewsCount:45,stock:12,inStock:!0,isTrending:!1,isBestSeller:!1,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80"],colors:["Silver Aluminum"],sizes:["27 Inch 4K"],seller:{id:"s3",name:"Titan Tech",rating:4.9,followers:"45.1K",verified:!0},description:"Ultra-thin all-in-one workstation with 27-inch 4K touchscreen and wireless peripheral kit.",specs:{Display:'27" 4K Multi-Touch',RAM:"32GB"},reviews:[],faqs:[]},{id:"prod-404",name:"ProStation Mini PC M2 Enterprise",category:"computers",brand:"Titan",price:699,oldPrice:849,discount:17,rating:4.8,reviewsCount:82,stock:28,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80"],colors:["Space Gray"],sizes:["16GB / 512GB"],seller:{id:"s3",name:"Titan Tech",rating:4.9,followers:"45.1K",verified:!0},description:"Palm-sized powerhouse computer driving triple 4K displays with zero fan noise.",specs:{"Form Factor":"Ultra Compact Mini",Ports:"Dual Thunderbolt 4"},reviews:[],faqs:[]},{id:"prod-501",name:"Essential Oversized Streetwear Tee",category:"fashion",brand:"RAZDAR Originals",price:39.99,oldPrice:49.99,discount:20,rating:4.8,reviewsCount:310,stock:120,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"],colors:["Lime Accent","Graphite Black","Chalk White"],sizes:["S","M","L","XL"],seller:{id:"s7",name:"RAZDAR Apparel",rating:5,followers:"120K",verified:!0},description:"Heavyweight 280GSM combed cotton crewneck t-shirt with drop shoulders.",specs:{Material:"280GSM Combed Cotton",Fit:"Oversized Boxy"},reviews:[],faqs:[]},{id:"prod-502",name:"Luxury Cashmere Knit Sweater",category:"fashion",brand:"Aura",price:159,oldPrice:210,discount:24,rating:4.9,reviewsCount:94,stock:35,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80"],colors:["Oatmeal","Midnight Black"],sizes:["S","M","L"],seller:{id:"s7",name:"RAZDAR Apparel",rating:5,followers:"120K",verified:!0},description:"100% pure Mongolian cashmere pullover sweater for ultimate soft luxury warmth.",specs:{Material:"100% Cashmere",Care:"Dry Clean Only"},reviews:[],faqs:[]},{id:"prod-503",name:"Urban Cargo Techwear Pants",category:"fashion",brand:"RAZDAR Originals",price:89.99,oldPrice:119.99,discount:25,rating:4.7,reviewsCount:185,stock:65,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80"],colors:["Matte Black","Olive Drab"],sizes:["30","32","34","36"],seller:{id:"s7",name:"RAZDAR Apparel",rating:5,followers:"120K",verified:!0},description:"Water-repellent stretch ripstop pants with multi-utility tactical pockets.",specs:{Material:"Ripstop Stretch Nylon",Pockets:"6 Tactical Pockets"},reviews:[],faqs:[]},{id:"prod-504",name:"Designer Quilted Puffer Jacket",category:"fashion",brand:"Aura",price:199,oldPrice:260,discount:23,rating:4.9,reviewsCount:140,stock:22,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"],colors:["Glossy Black","Lime Spark Line"],sizes:["M","L","XL"],seller:{id:"s7",name:"RAZDAR Apparel",rating:5,followers:"120K",verified:!0},description:"700-fill power thermal insulation winter jacket with detachable hood.",specs:{Fill:"700-Fill Goose Down",Waterproof:"DWR Finish"},reviews:[],faqs:[]},{id:"prod-13",name:"Minimalist Heavyweight Hoodie",category:"mens-fashion",brand:"RAZDAR Originals",price:79.99,oldPrice:99.99,discount:20,rating:4.8,reviewsCount:290,stock:100,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"],colors:["Graphite Charcoal","Lime Spark Accent"],sizes:["S","M","L","XL"],seller:{id:"s7",name:"RAZDAR Apparel",rating:5,followers:"120K",verified:!0},description:"480GSM organic French Terry cotton double-layered hood hoodie.",specs:{Fabric:"100% Organic French Terry (480GSM)"},reviews:[],faqs:[]},{id:"prod-601",name:"Tailored Slim Fit Italian Blazer",category:"mens-fashion",brand:"Aethelgard",price:249,oldPrice:320,discount:22,rating:4.9,reviewsCount:72,stock:18,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80"],colors:["Charcoal Navy","Graphite Black"],sizes:["38R","40R","42R"],seller:{id:"s7",name:"RAZDAR Apparel",rating:5,followers:"120K",verified:!0},description:"Precision-tailored Super 120s wool blend blazer for modern executive sophistication.",specs:{Material:"Super 120s Wool Blend",Lining:"Silk Touch"},reviews:[],faqs:[]},{id:"prod-602",name:"Vintage Genuine Leather Biker Jacket",category:"mens-fashion",brand:"Strider",price:299,oldPrice:399,discount:25,rating:4.9,reviewsCount:165,stock:14,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80"],colors:["Antique Black","Dark Espresso"],sizes:["M","L","XL"],seller:{id:"s7",name:"RAZDAR Apparel",rating:5,followers:"120K",verified:!0},description:"Hand-distressed full grain cowhide leather jacket with heavy YKK zips.",specs:{Material:"100% Full Grain Leather",Zippers:"YKK Heavy Duty"},reviews:[],faqs:[]},{id:"prod-603",name:"Classic Oxford Cotton Dress Shirt",category:"mens-fashion",brand:"RAZDAR Originals",price:49.99,oldPrice:65,discount:23,rating:4.7,reviewsCount:210,stock:80,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"],colors:["Sky Blue","Pure White"],sizes:["S","M","L","XL"],seller:{id:"s7",name:"RAZDAR Apparel",rating:5,followers:"120K",verified:!0},description:"Non-iron 100% long-staple cotton Oxford shirt with button-down collar.",specs:{Material:"Long-Staple Cotton",Care:"Wrinkle Resistant"},reviews:[],faqs:[]},{id:"prod-14",name:"Elegance Trench Coat",category:"womens-fashion",brand:"Aura",price:189,oldPrice:249,discount:24,rating:4.9,reviewsCount:145,stock:25,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80"],colors:["Classic Camel","Graphite Black"],sizes:["XS","S","M","L"],seller:{id:"s7",name:"RAZDAR Apparel",rating:5,followers:"120K",verified:!0},description:"Double-breasted trench coat tailored from water-resistant cotton twill.",specs:{Material:"Cotton Twill Blend"},reviews:[],faqs:[]},{id:"prod-701",name:"Silk Evening Wrap Maxi Dress",category:"womens-fashion",brand:"Aura",price:169,oldPrice:220,discount:23,rating:4.9,reviewsCount:118,stock:20,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!0,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80"],colors:["Emerald Green","Midnight Ruby"],sizes:["S","M","L"],seller:{id:"s7",name:"RAZDAR Apparel",rating:5,followers:"120K",verified:!0},description:"Flowing 100% mulberry silk wrap gown with V-neckline and waist tie.",specs:{Material:"100% Mulberry Silk"},reviews:[],faqs:[]},{id:"prod-702",name:"Structured Leather Crossbody Tote",category:"womens-fashion",brand:"Aethelgard",price:210,oldPrice:280,discount:25,rating:4.8,reviewsCount:95,stock:15,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!1,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"],colors:["Black Gold Hardware","Cognac Tan"],sizes:["Medium Tote"],seller:{id:"s5",name:"Luxury Vault",rating:5,followers:"15.3K",verified:!0},description:"Handcrafted Italian saffiano leather handbag with gold metal feet.",specs:{Material:"Italian Saffiano Leather"},reviews:[],faqs:[]},{id:"prod-703",name:"Pleated High-Waisted Wide Leg Trousers",category:"womens-fashion",brand:"Aura",price:79,oldPrice:99,discount:20,rating:4.7,reviewsCount:160,stock:45,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!0,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"],colors:["Beige Sand","Graphite Charcoal"],sizes:["S","M","L"],seller:{id:"s7",name:"RAZDAR Apparel",rating:5,followers:"120K",verified:!0},description:"Sophisticated wide-leg pants with front pleats and side slant pockets.",specs:{Material:"Crepe Poly Blend"},reviews:[],faqs:[]},{id:"prod-7",name:"Phantom Nitro Running Shoes",category:"shoes",brand:"Strider",price:149.99,oldPrice:199.99,discount:25,rating:4.8,reviewsCount:420,stock:50,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"],colors:["Lime Spark / Graphite"],sizes:["US 8","US 9","US 10","US 11"],seller:{id:"s4",name:"Urban Sole",rating:4.7,followers:"28.9K",verified:!0},description:"Carbon fiber plate propulsion with nitro foam cushioning.",specs:{Cushioning:"Nitro Foam"},reviews:[],faqs:[]},{id:"prod-8",name:"Street Icon Leather Sneakers",category:"shoes",brand:"Strider",price:119,oldPrice:149,discount:20,rating:4.6,reviewsCount:195,stock:40,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!1,isFlashSale:!1,freeShipping:!1,images:["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"],colors:["Pure White","Classic Black"],sizes:["US 8","US 9","US 10"],seller:{id:"s4",name:"Urban Sole",rating:4.7,followers:"28.9K",verified:!0},description:"Handcrafted Italian leather upper with rubber cupsole.",specs:{Material:"Full Grain Leather"},reviews:[],faqs:[]},{id:"prod-801",name:"Apex Trail Waterproof Hiking Boots",category:"shoes",brand:"Strider",price:179,oldPrice:220,discount:18,rating:4.9,reviewsCount:132,stock:30,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!0,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80"],colors:["Earth Brown / Lime Accent"],sizes:["US 9","US 10","US 11"],seller:{id:"s4",name:"Urban Sole",rating:4.7,followers:"28.9K",verified:!0},description:"Gore-Tex waterproof lining with Vibram high-traction rubber lug outsole.",specs:{Outsole:"Vibram Megagrip"},reviews:[],faqs:[]},{id:"prod-802",name:"Executive Chelsea Ankle Boots",category:"shoes",brand:"Aethelgard",price:189,oldPrice:240,discount:21,rating:4.8,reviewsCount:88,stock:22,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80"],colors:["Burnished Chestnut","Graphite Black"],sizes:["US 8","US 9","US 10"],seller:{id:"s4",name:"Urban Sole",rating:4.7,followers:"28.9K",verified:!0},description:"Goodyear welted leather Chelsea boot with elastic side gores.",specs:{Construction:"Goodyear Welted"},reviews:[],faqs:[]},{id:"prod-9",name:"Chrono Vanguard Automatic Watch",category:"watches",brand:"Aethelgard",price:599,oldPrice:799,discount:25,rating:4.9,reviewsCount:76,stock:10,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"],colors:["Graphite Dial"],sizes:[],seller:{id:"s5",name:"Luxury Vault",rating:5,followers:"15.3K",verified:!0},description:"Swiss-movement automatic watch with sapphire crystal glass.",specs:{Movement:"Swiss ETA Automatic"},reviews:[],faqs:[]},{id:"prod-10",name:"Horizon Smartwatch Ultra",category:"watches",brand:"Volt",price:279.99,oldPrice:349.99,discount:20,rating:4.8,reviewsCount:310,stock:28,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"],colors:["Titanium Lime"],sizes:["45mm","49mm"],seller:{id:"s2",name:"Volt Store Official",rating:4.9,followers:"84.2K",verified:!0},description:"Rugged titanium case, ECG sensor, GPS, and 7-day battery.",specs:{Battery:"7 Days"},reviews:[],faqs:[]},{id:"prod-901",name:"Oceanic Diver 300M Tool Watch",category:"watches",brand:"Aethelgard",price:450,oldPrice:590,discount:23,rating:4.9,reviewsCount:64,stock:15,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!0,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"],colors:["Sunburst Blue Dial"],sizes:["41mm Case"],seller:{id:"s5",name:"Luxury Vault",rating:5,followers:"15.3K",verified:!0},description:"300m professional diver watch with ceramic bezel and luminescent markers.",specs:{"Water Resistance":"300 Meters"},reviews:[],faqs:[]},{id:"prod-902",name:"Minimalist Steel Mesh Dress Watch",category:"watches",brand:"Aura",price:149,oldPrice:199,discount:25,rating:4.7,reviewsCount:140,stock:50,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80"],colors:["Rose Gold","Silver Steel"],sizes:["38mm Case"],seller:{id:"s5",name:"Luxury Vault",rating:5,followers:"15.3K",verified:!0},description:"Ultra-thin 6mm case with quick-release Milanese mesh strap.",specs:{Thickness:"6mm Ultra Slim"},reviews:[],faqs:[]},{id:"prod-15",name:"HydraGlow Vitamin C Serum",category:"beauty",brand:"Lumiere",price:45,oldPrice:60,discount:25,rating:4.8,reviewsCount:840,stock:120,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"],colors:[],sizes:["30ml"],seller:{id:"s8",name:"Lumiere Skincare",rating:4.9,followers:"34K",verified:!0},description:"15% L-Ascorbic Acid serum with Hyaluronic Acid.",specs:{Volume:"30ml"},reviews:[],faqs:[]},{id:"prod-1001",name:"Midnight Rose Eau De Parfum 100ml",category:"beauty",brand:"Lumiere",price:120,oldPrice:155,discount:22,rating:4.9,reviewsCount:230,stock:45,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"],colors:[],sizes:["100ml"],seller:{id:"s8",name:"Lumiere Skincare",rating:4.9,followers:"34K",verified:!0},description:"Sensual blend of Damask rose, amber resin, and warm vanilla sandalwood.",specs:{"Fragrance Type":"Eau De Parfum"},reviews:[],faqs:[]},{id:"prod-1002",name:"Pro Sculpt LED Therapy Face Mask",category:"beauty",brand:"Lumiere",price:199,oldPrice:260,discount:23,rating:4.8,reviewsCount:175,stock:25,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!0,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"],colors:["Matte White"],sizes:[],seller:{id:"s8",name:"Lumiere Skincare",rating:4.9,followers:"34K",verified:!0},description:"Medical-grade red & blue light LED treatment mask for collagen boost.",specs:{Technology:"7-Color LED Wavelengths"},reviews:[],faqs:[]},{id:"prod-1003",name:"Botanical Repairing Facial Cream",category:"beauty",brand:"Lumiere",price:65,oldPrice:85,discount:23,rating:4.7,reviewsCount:310,stock:75,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"],colors:[],sizes:["50ml Jar"],seller:{id:"s8",name:"Lumiere Skincare",rating:4.9,followers:"34K",verified:!0},description:"Ceramide and squalane deep moisture barrier recovery cream.",specs:{"Key Active":"5-Ceramide Complex"},reviews:[],faqs:[]},{id:"prod-1101",name:"Smart Ambient RGB Glow Floor Lamp",category:"home-living",brand:"Hygge",price:89,oldPrice:119,discount:25,rating:4.8,reviewsCount:190,stock:40,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"],colors:["Graphite Black"],sizes:[],seller:{id:"s9",name:"Nordic Spaces",rating:4.9,followers:"19.2K",verified:!0},description:"Minimalist corner floor light syncs with music, Alexa, and Google Assistant.",specs:{Controls:"App + Voice Sync"},reviews:[],faqs:[]},{id:"prod-1102",name:"Egyptian Cotton 1000TC Bedding Set",category:"home-living",brand:"Hygge",price:139,oldPrice:180,discount:22,rating:4.9,reviewsCount:155,stock:30,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!1,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"],colors:["Crisp White","Slate Gray"],sizes:["Queen","King"],seller:{id:"s9",name:"Nordic Spaces",rating:4.9,followers:"19.2K",verified:!0},description:"Silky sateen weave 1000 thread count Egyptian cotton sheet set.",specs:{"Thread Count":"1000TC Sateen"},reviews:[],faqs:[]},{id:"prod-1103",name:"Ultrasonic Ceramic Aroma Diffuser",category:"home-living",brand:"Hygge",price:49,oldPrice:65,discount:24,rating:4.7,reviewsCount:220,stock:55,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!0,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"],colors:["Terracotta","Matte White"],sizes:["300ml Tank"],seller:{id:"s9",name:"Nordic Spaces",rating:4.9,followers:"19.2K",verified:!0},description:"Whisper-quiet essential oil humidifier diffuser with warm ambient light LED.",specs:{Coverage:"400 sq ft"},reviews:[],faqs:[]},{id:"prod-1104",name:"Precision Barista Pour-Over Kettle",category:"home-living",brand:"Hygge",price:79,oldPrice:99,discount:20,rating:4.8,reviewsCount:140,stock:35,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80"],colors:["Matte Black"],sizes:["0.9 Liters"],seller:{id:"s9",name:"Nordic Spaces",rating:4.9,followers:"19.2K",verified:!0},description:"Gooseneck variable temperature kettle with built-in stopwatch timer.",specs:{Power:"1200W Fast Boil"},reviews:[],faqs:[]},{id:"prod-16",name:"Nordic Minimalist Lounge Chair",category:"furniture",brand:"Hygge",price:349,oldPrice:449,discount:22,rating:4.9,reviewsCount:92,stock:8,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80"],colors:["Boucle White","Graphite Gray"],sizes:[],seller:{id:"s9",name:"Nordic Spaces",rating:4.9,followers:"19.2K",verified:!0},description:"Solid oak wood frame with textured boucle upholstery.",specs:{Frame:"Solid American Oak"},reviews:[],faqs:[]},{id:"prod-1201",name:"Ergonomic Mesh Executive Office Desk Chair",category:"furniture",brand:"Hygge",price:299,oldPrice:399,discount:25,rating:4.8,reviewsCount:310,stock:25,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&q=80"],colors:["Graphite Black"],sizes:["Adjustable Height"],seller:{id:"s9",name:"Nordic Spaces",rating:4.9,followers:"19.2K",verified:!0},description:"Adaptive lumbar support, 4D armrests, and breathable Italian mesh back.",specs:{Support:"Dynamic Lumbar Tracking"},reviews:[],faqs:[]},{id:"prod-1202",name:"Scandinavian Solid Walnut Dining Table",category:"furniture",brand:"Hygge",price:699,oldPrice:899,discount:22,rating:5,reviewsCount:45,stock:5,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80"],colors:["Natural Walnut"],sizes:["6 Seater (180cm)"],seller:{id:"s9",name:"Nordic Spaces",rating:4.9,followers:"19.2K",verified:!0},description:"Crafted from 100% kiln-dried American walnut timber with bevelled edges.",specs:{Wood:"100% Solid Walnut"},reviews:[],faqs:[]},{id:"prod-1203",name:"Floating Modern TV Media Console",category:"furniture",brand:"Hygge",price:249,oldPrice:320,discount:22,rating:4.7,reviewsCount:88,stock:14,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"],colors:["Matte Black / Oak Slats"],sizes:["160cm Wide"],seller:{id:"s9",name:"Nordic Spaces",rating:4.9,followers:"19.2K",verified:!0},description:"Wall-mounted floating entertainment center with cable management channels.",specs:{Mounting:"Heavy Duty Wall Anchors Included"},reviews:[],faqs:[]},{id:"prod-1301",name:"Artisanal Cold-Pressed Extra Virgin Olive Oil",category:"grocery",brand:"Gourmet Selection",price:24.99,oldPrice:32,discount:21,rating:4.9,reviewsCount:380,stock:150,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"],colors:[],sizes:["750ml Bottle"],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"Single-estate harvest organic Greek olive oil with low acidity.",specs:{Origin:"Crete, Greece"},reviews:[],faqs:[]},{id:"prod-1302",name:"Organic Whole Bean Specialty Coffee 1kg",category:"grocery",brand:"Gourmet Selection",price:29.99,oldPrice:38,discount:21,rating:4.9,reviewsCount:520,stock:200,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80"],colors:[],sizes:["1kg Bag"],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"100% Arabica Ethiopian Yirgacheffe medium roast coffee beans.",specs:{Roast:"Medium Artisanal Roast"},reviews:[],faqs:[]},{id:"prod-1303",name:"Raw Wildflower Honey 500g",category:"grocery",brand:"Gourmet Selection",price:18.5,oldPrice:24,discount:22,rating:4.8,reviewsCount:290,stock:100,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!0,isFlashSale:!1,freeShipping:!1,images:["https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80"],colors:[],sizes:["500g Glass Jar"],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"Unfiltered, unheated pure raw honey harvested from wild mountain apiaries.",specs:{Purity:"100% Raw Unpasteurized"},reviews:[],faqs:[]},{id:"prod-1304",name:"Matcha Ceremonial Grade Green Tea",category:"grocery",brand:"Gourmet Selection",price:34,oldPrice:45,discount:24,rating:4.9,reviewsCount:410,stock:90,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80"],colors:[],sizes:["100g Tin"],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"First-harvest shade-grown Japanese matcha powder rich in L-Theanine.",specs:{Origin:"Uji, Kyoto, Japan"},reviews:[],faqs:[]},{id:"prod-1401",name:"Pro Fitness Adjustable Dumbbell Set 24kg",category:"sports",brand:"Strider",price:249,oldPrice:320,discount:22,rating:4.9,reviewsCount:380,stock:20,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1517649763962-0c6232661c00?auto=format&fit=crop&w=800&q=80"],colors:["Graphite Lime Accent"],sizes:["2.5kg to 24kg per dumbbell"],seller:{id:"s4",name:"Urban Sole",rating:4.7,followers:"28.9K",verified:!0},description:"Quick-dial weight adjustment dumbbell system replacing 15 sets of weights.",specs:{Adjustment:"Quick Turn Dial"},reviews:[],faqs:[]},{id:"prod-1402",name:"Non-Slip Eco Rubber Yoga Mat 6mm",category:"sports",brand:"Strider",price:49,oldPrice:65,discount:24,rating:4.8,reviewsCount:260,stock:65,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80"],colors:["Sage Green","Midnight Black"],sizes:["6mm Thick"],seller:{id:"s4",name:"Urban Sole",rating:4.7,followers:"28.9K",verified:!0},description:"100% natural tree rubber mat with alignment laser grid lines.",specs:{Material:"Natural Tree Rubber"},reviews:[],faqs:[]},{id:"prod-1403",name:"SpeedPro Smart Jump Rope with LED Count",category:"sports",brand:"Strider",price:35,oldPrice:48,discount:27,rating:4.7,reviewsCount:145,stock:80,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!0,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=800&q=80"],colors:["Lime Spark"],sizes:[],seller:{id:"s4",name:"Urban Sole",rating:4.7,followers:"28.9K",verified:!0},description:"Bluetooth sync smart jump rope tracks jump counts, calories burned, and speed.",specs:{Connectivity:"Bluetooth App Sync"},reviews:[],faqs:[]},{id:"prod-1404",name:"HydroFlow Insulated Stainless Steel Bottle 1L",category:"sports",brand:"Strider",price:29.99,oldPrice:39.99,discount:25,rating:4.9,reviewsCount:510,stock:120,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80"],colors:["Matte Black","Lime Edition"],sizes:["1.0 Liter"],seller:{id:"s4",name:"Urban Sole",rating:4.7,followers:"28.9K",verified:!0},description:"Vacuum insulated double-wall bottle keeps drinks cold for 24h or hot for 12h.",specs:{Insulation:"24h Cold / 12h Hot"},reviews:[],faqs:[]},{id:"prod-11",name:"CyberGrid Mechanical Keyboard RGB",category:"gaming",brand:"Nexus",price:129.99,oldPrice:169.99,discount:23,rating:4.9,reviewsCount:650,stock:75,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"],colors:["Graphite / Lime Caps"],sizes:[],seller:{id:"s6",name:"Nexus Gaming",rating:4.8,followers:"62.0K",verified:!0},description:"Hot-swappable mechanical switches, gasket mount design, per-key RGB.",specs:{Switches:"Linear Yellow"},reviews:[],faqs:[]},{id:"prod-12",name:"Viper Wireless Ultra-light Gaming Mouse",category:"gaming",brand:"Nexus",price:89.99,oldPrice:119.99,discount:25,rating:4.8,reviewsCount:410,stock:60,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80"],colors:["Lime Edition"],sizes:[],seller:{id:"s6",name:"Nexus Gaming",rating:4.8,followers:"62.0K",verified:!0},description:"49g ultra-lightweight chassis with 30,000 DPI optical sensor.",specs:{Weight:"49g"},reviews:[],faqs:[]},{id:"prod-1501",name:"AeroPulse 7.1 Wireless Gaming Headset",category:"gaming",brand:"Nexus",price:149,oldPrice:189,discount:21,rating:4.8,reviewsCount:290,stock:45,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"],colors:["Cyber Black / Lime Mic"],sizes:[],seller:{id:"s6",name:"Nexus Gaming",rating:4.8,followers:"62.0K",verified:!0},description:"Lossless 2.4GHz wireless headset with spatial 7.1 audio and broadcast noise-canceling mic.",specs:{Latency:"< 15ms Wireless"},reviews:[],faqs:[]},{id:"prod-1502",name:"ErgoThrone RGB Ergonomic Gaming Chair",category:"gaming",brand:"Nexus",price:299,oldPrice:399,discount:25,rating:4.9,reviewsCount:180,stock:12,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=800&q=80"],colors:["Graphite Black / Lime Trim"],sizes:[],seller:{id:"s6",name:"Nexus Gaming",rating:4.8,followers:"62.0K",verified:!0},description:"Cold-cure memory foam cushion gaming seat with magnetic headrest pill and 4D armrests.",specs:{Recline:"165 Degrees"},reviews:[],faqs:[]},{id:"prod-17",name:"Polarized Aviator Sunglasses",category:"accessories",brand:"Solstice",price:89,oldPrice:120,discount:25,rating:4.7,reviewsCount:160,stock:45,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"],colors:["Gold / Green Glass"],sizes:[],seller:{id:"s10",name:"Optics Co",rating:4.8,followers:"9.8K",verified:!0},description:"Titanium wireframe with UV400 anti-glare TAC polarized lenses.",specs:{"UV Protection":"UV400 100%"},reviews:[],faqs:[]},{id:"prod-1601",name:"Minimalist RFID Bifold Leather Wallet",category:"accessories",brand:"Aethelgard",price:49,oldPrice:65,discount:24,rating:4.8,reviewsCount:340,stock:80,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"],colors:["Vintage Tan","Graphite Black"],sizes:[],seller:{id:"s5",name:"Luxury Vault",rating:5,followers:"15.3K",verified:!0},description:"Full-grain Italian leather wallet with built-in RFID blocking shield.",specs:{Security:"RFID Blocking"},reviews:[],faqs:[]},{id:"prod-1602",name:"Urban Commuter Waterproof Backpack 25L",category:"accessories",brand:"RAZDAR Originals",price:99,oldPrice:130,discount:23,rating:4.9,reviewsCount:220,stock:40,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"],colors:["Matte Black"],sizes:["25 Liter Capacity"],seller:{id:"s7",name:"RAZDAR Apparel",rating:5,followers:"120K",verified:!0},description:"TSA-friendly laptop backpack with magnetic fidlock buckles and USB charging pass-through.",specs:{"Laptop Sleeve":'Fits up to 16" Laptops'},reviews:[],faqs:[]},{id:"prod-1603",name:"Leather Apple Watch Band Strap 45mm",category:"accessories",brand:"Aethelgard",price:39,oldPrice:55,discount:29,rating:4.8,reviewsCount:190,stock:65,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"],colors:["Saddle Brown","Black Stitching"],sizes:["44/45/49mm"],seller:{id:"s5",name:"Luxury Vault",rating:5,followers:"15.3K",verified:!0},description:"Genuine Horween leather watch band with stainless steel deployment buckle.",specs:{Material:"Horween Leather"},reviews:[],faqs:[]},{id:"prod-1701",name:"Dual 4K Dash Cam Front and Rear GPS",category:"automotive",brand:"VisionTech",price:149,oldPrice:199,discount:25,rating:4.8,reviewsCount:180,stock:35,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"],colors:["Stealth Black"],sizes:[],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"4K Ultra HD dash camera with Starvis sensor, 24h parking monitor, and WiFi sync.",specs:{Camera:"Sony Starvis 4K"},reviews:[],faqs:[]},{id:"prod-1702",name:"Portable High-Pressure Cordless Tire Inflator",category:"automotive",brand:"VisionTech",price:69,oldPrice:89,discount:22,rating:4.8,reviewsCount:310,stock:50,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"],colors:["Graphite Lime Accent"],sizes:["150 PSI Max"],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"Rechargeable digital air pump inflates car tires in minutes with preset auto-shutoff.",specs:{Pressure:"150 PSI Max"},reviews:[],faqs:[]},{id:"prod-1703",name:"Ceramic Coating Car Detail Kit",category:"automotive",brand:"VisionTech",price:45,oldPrice:60,discount:25,rating:4.7,reviewsCount:140,stock:60,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!0,isFlashSale:!1,freeShipping:!1,images:["https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80"],colors:[],sizes:["500ml Bottle + Microfiber"],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"9H nano hydrophobic ceramic shine spray coating protecting car paint from scratches.",specs:{Durability:"12 Months Protection"},reviews:[],faqs:[]},{id:"prod-1704",name:"MagSafe Wireless Car Phone Mount",category:"automotive",brand:"Volt",price:39.99,oldPrice:49.99,discount:20,rating:4.8,reviewsCount:420,stock:90,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80"],colors:["Black Ring"],sizes:["15W Fast Charge"],seller:{id:"s2",name:"Volt Store Official",rating:4.9,followers:"84.2K",verified:!0},description:"Strong N52 magnetic air vent car charger with 15W wireless charging.",specs:{Magnets:"16 N52 Neodymium"},reviews:[],faqs:[]},{id:"prod-1801",name:"Interactive STEM Robotics Coding Kit",category:"kids",brand:"PlayLearn",price:79,oldPrice:99,discount:20,rating:4.9,reviewsCount:160,stock:35,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80"],colors:["Multicolor"],sizes:["Ages 6-12"],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"Build and code 5 custom smart robots using drag-and-drop mobile block coding.",specs:{"Age Range":"6 to 12 Years"},reviews:[],faqs:[]},{id:"prod-1802",name:"Plush Organic Cotton Toddler Pajama Set",category:"kids",brand:"PlayLearn",price:29.99,oldPrice:39.99,discount:25,rating:4.8,reviewsCount:210,stock:70,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80"],colors:["Starry Blue","Blush Pink"],sizes:["2T","3T","4T","5T"],seller:{id:"s7",name:"RAZDAR Apparel",rating:5,followers:"120K",verified:!0},description:"100% GOTS certified organic cotton snug-fit 2-piece sleepwear.",specs:{Certification:"GOTS Organic"},reviews:[],faqs:[]},{id:"prod-1803",name:"Wooden Montessori Learning Activity Board",category:"kids",brand:"PlayLearn",price:39,oldPrice:52,discount:25,rating:4.9,reviewsCount:180,stock:45,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80"],colors:["Natural Wood"],sizes:["Ages 1-4"],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"Sensory busy board with latches, gears, and clock for fine motor skills development.",specs:{Material:"Natural Birch Wood"},reviews:[],faqs:[]},{id:"prod-1804",name:"HD Kid Camera with Instant Thermal Printer",category:"kids",brand:"PlayLearn",price:49,oldPrice:65,discount:24,rating:4.7,reviewsCount:125,stock:40,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!0,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80"],colors:["Dino Green","Unicorn Pink"],sizes:["Includes 3 Paper Rolls"],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"Zero-ink instant camera prints black & white photos in seconds for creative kids.",specs:{"Print Type":"Zero-Ink Thermal"},reviews:[],faqs:[]},{id:"prod-1901",name:"System Architecture & Distributed Systems",category:"books",brand:"TechPress",price:44.99,oldPrice:59.99,discount:25,rating:4.9,reviewsCount:410,stock:60,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80"],colors:[],sizes:["Hardcover Edition"],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"Master large-scale cloud microservices, fault tolerance, and database sharding.",specs:{Pages:"620 Pages"},reviews:[],faqs:[]},{id:"prod-1902",name:"Minimalist Architecture & Design Coffee Table Book",category:"books",brand:"TechPress",price:65,oldPrice:85,discount:23,rating:4.9,reviewsCount:130,stock:25,inStock:!0,isTrending:!0,isBestSeller:!1,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"],colors:[],sizes:["Deluxe Linen Hardcover"],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"High-definition photography celebrating Scandinavian and Japanese minimalist interiors.",specs:{Cover:"Linen Hardcover"},reviews:[],faqs:[]},{id:"prod-1903",name:"The Art of Financial Freedom & Investing",category:"books",brand:"TechPress",price:19.99,oldPrice:27.99,discount:28,rating:4.8,reviewsCount:890,stock:150,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80"],colors:[],sizes:["Paperback Edition"],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"Practical guide to building wealth, passive income streams, and stock markets.",specs:{Format:"Paperback"},reviews:[],faqs:[]},{id:"prod-1904",name:"Mastering AI Prompt Engineering & LLMs",category:"books",brand:"TechPress",price:34.99,oldPrice:45,discount:22,rating:4.9,reviewsCount:320,stock:80,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80"],colors:[],sizes:["Paperback"],seller:{id:"s1",name:"TechMatrix",rating:4.8,followers:"12.4K",verified:!0},description:"Comprehensive technical handbook for building autonomous AI agents and RAG pipelines.",specs:{"Publication Year":"2026"},reviews:[],faqs:[]},{id:"prod-18",name:"Sterling Silver Chain Necklace",category:"jewelry",brand:"Aethelgard",price:129,oldPrice:160,discount:19,rating:4.8,reviewsCount:78,stock:30,inStock:!0,isTrending:!1,isBestSeller:!1,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"],colors:["Silver","18K Gold Plated"],sizes:["18 inch","22 inch"],seller:{id:"s5",name:"Luxury Vault",rating:5,followers:"15.3K",verified:!0},description:"Solid 925 sterling silver diamond-cut Cuban link chain necklace.",specs:{Purity:"925 Sterling Silver"},reviews:[],faqs:[]},{id:"prod-2001",name:"18K Solid Gold Solitaire Diamond Ring 1.0ct",category:"jewelry",brand:"Aethelgard",price:1499,oldPrice:1899,discount:21,rating:5,reviewsCount:42,stock:6,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!0,isFlashSale:!1,freeShipping:!0,images:["https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"],colors:["Yellow Gold","White Gold"],sizes:["Size 6","Size 7","Size 8"],seller:{id:"s5",name:"Luxury Vault",rating:5,followers:"15.3K",verified:!0},description:"IGI certified 1.0 carat lab-grown VVS1 brilliant cut solitaire diamond ring.",specs:{"Diamond Clarity":"VVS1 Colorless (D)"},reviews:[],faqs:[]},{id:"prod-2002",name:"Natural Freshwater Pearl Drop Earrings",category:"jewelry",brand:"Aethelgard",price:89,oldPrice:120,discount:25,rating:4.9,reviewsCount:110,stock:25,inStock:!0,isTrending:!1,isBestSeller:!0,isNewArrival:!0,isFlashSale:!0,freeShipping:!0,images:["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"],colors:["White Pearl / Gold Hoop"],sizes:[],seller:{id:"s5",name:"Luxury Vault",rating:5,followers:"15.3K",verified:!0},description:"Baroque lustrous freshwater pearls suspended on 18K gold vermeil hoops.",specs:{Pearls:"100% Real Freshwater"},reviews:[],faqs:[]},{id:"prod-2003",name:"Chunky Gold Plated Herringbone Bracelet",category:"jewelry",brand:"Aethelgard",price:59,oldPrice:79,discount:25,rating:4.8,reviewsCount:165,stock:50,inStock:!0,isTrending:!0,isBestSeller:!0,isNewArrival:!1,isFlashSale:!0,freeShipping:!1,images:["https://images.unsplash.com/photo-1611591475777-233cd73be3df?auto=format&fit=crop&w=800&q=80"],colors:["18K Gold Plated"],sizes:["7 Inch"],seller:{id:"s5",name:"Luxury Vault",rating:5,followers:"15.3K",verified:!0},description:"Flat fluid snake chain herringbone bracelet in 18K heavy gold plating.",specs:{Plating:"18K Heavy Gold Vermeil"},reviews:[],faqs:[]}],v=r=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}).format(r);class Z{constructor(){this.container=document.getElementById("search-overlay"),this.init()}init(){this.render(),this.bindEvents(),p.on("search:open",()=>this.open())}render(){const e=c.state.recentSearches;this.container.className="search-overlay",this.container.innerHTML=`
      <div class="search-box">
        <div class="search-input-wrap">
          ${a("search")}
          <input type="text" id="global-search-input" placeholder="Search products, categories, brands..." autofocus />
          <button class="btn-icon btn-ghost" id="search-close-btn">${a("x")}</button>
        </div>
        <div class="search-results-area" id="search-results-content">
          <!-- Recent Searches -->
          <div class="mb-4">
            <div class="search-section-title">Recent Searches</div>
            <div style="display:flex;gap:var(--sp-2);flex-wrap:wrap;padding:var(--sp-2);">
              ${e.map(t=>`
                <button class="chip recent-search-chip" data-term="${t}">${t}</button>
              `).join("")}
            </div>
          </div>

          <!-- Trending Categories -->
          <div>
            <div class="search-section-title">Trending Categories</div>
            <div style="display:flex;gap:var(--sp-2);flex-wrap:wrap;padding:var(--sp-2);">
              <a href="#/category/electronics" class="chip">Electronics</a>
              <a href="#/category/mobiles" class="chip">Mobiles</a>
              <a href="#/category/shoes" class="chip">Shoes & Sneakers</a>
              <a href="#/category/watches" class="chip">Watches</a>
              <a href="#/category/gaming" class="chip">Gaming Gear</a>
            </div>
          </div>
        </div>
      </div>
    `}bindEvents(){const e=this.container.querySelector("#global-search-input");this.container.querySelector("#search-results-content");const t=this.container.querySelector("#search-close-btn");t&&t.addEventListener("click",()=>this.close()),this.container.addEventListener("click",s=>{s.target===this.container&&this.close();const i=s.target.closest(".recent-search-chip");if(i){const o=i.getAttribute("data-term");e&&(e.value=o,this.performSearch(o))}}),e&&(e.addEventListener("input",s=>{const i=s.target.value.trim();i.length>0?this.performSearch(i):this.renderDefaultResults()}),e.addEventListener("keydown",s=>{if(s.key==="Enter"){const i=e.value.trim();i&&(c.addRecentSearch(i),this.close(),window.location.hash=`#/search?q=${encodeURIComponent(i)}`)}s.key==="Escape"&&this.close()}))}performSearch(e){const t=this.container.querySelector("#search-results-content");if(!t)return;const s=m.filter(i=>i.name.toLowerCase().includes(e.toLowerCase())||i.category.toLowerCase().includes(e.toLowerCase())||i.brand.toLowerCase().includes(e.toLowerCase()));if(s.length===0){t.innerHTML=`
        <div style="padding:var(--sp-8);text-align:center;color:var(--text-secondary);">
          <p>No products found matching "<strong>${e}</strong>"</p>
        </div>
      `;return}t.innerHTML=`
      <div class="search-section-title">Products (${s.length})</div>
      ${s.map(i=>`
        <div class="search-result-item" onclick="window.location.hash='#/product/${i.id}'; document.getElementById('search-overlay').classList.remove('active');">
          <img src="${i.images[0]}" alt="${i.name}" />
          <div class="result-info">
            <div class="result-name">${i.name}</div>
            <div class="result-category">${i.brand} • ${i.category}</div>
          </div>
          <div class="result-price">${v(i.price)}</div>
        </div>
      `).join("")}
    `}renderDefaultResults(){this.render(),this.bindEvents()}open(){this.container.classList.add("active");const e=this.container.querySelector("#global-search-input");e&&setTimeout(()=>e.focus(),100)}close(){this.container.classList.remove("active")}}class Y{constructor(){this.container=document.getElementById("toast-container"),this.container||(this.container=document.createElement("div"),this.container.id="toast-container",this.container.className="toast-container",document.body.appendChild(this.container)),this.init()}init(){p.on("toast:show",e=>this.show(e))}show({type:e="info",title:t="",message:s="",duration:i=4e3}){const o=document.createElement("div");o.className=`toast toast-${e}`;let n="sparkles";e==="success"&&(n="check"),e==="error"&&(n="x"),e==="warning"&&(n="zap"),o.innerHTML=`
      <div class="toast-icon">${a(n)}</div>
      <div class="toast-body">
        <div class="toast-title">${t}</div>
        <div class="toast-message">${s}</div>
      </div>
      <button class="toast-close">${a("x")}</button>
      <div class="toast-progress" style="animation: countDown ${i}ms linear forwards;"></div>
    `,this.container.appendChild(o);const d=o.querySelector(".toast-close"),l=()=>{o.classList.add("removing"),setTimeout(()=>o.remove(),300)};d&&d.addEventListener("click",l),setTimeout(l,i)}}class Q{constructor(){this.container=document.getElementById("modal-container"),this.init()}init(){p.on("modal:quickview",e=>this.openQuickView(e)),p.on("modal:open",e=>this.openCustomModal(e))}openQuickView(e){this.container&&(this.container.innerHTML=`
      <div class="modal-overlay active" id="modal-overlay">
        <div class="modal modal-lg">
          <div class="modal-header">
            <h3 style="margin:0;">Quick View</h3>
            <button class="btn-icon btn-ghost" id="modal-close-btn">${a("x")}</button>
          </div>
          <div class="modal-body">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-6);">
              <!-- Image Gallery -->
              <div>
                <img id="quickview-main-img" src="${e.images[0]}" alt="${e.name}" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:var(--radius-xl);" />
                ${e.images.length>1?`
                  <div style="display:flex;gap:var(--sp-2);margin-top:var(--sp-3);">
                    ${e.images.map((t,s)=>`
                      <img class="quickview-thumb" src="${t}" style="width:50px;height:50px;border-radius:var(--radius-md);cursor:pointer;object-fit:cover;border:2px solid ${s===0?"var(--primary)":"transparent"};" />
                    `).join("")}
                  </div>
                `:""}
              </div>

              <!-- Product Details -->
              <div>
                <div class="text-xs text-tertiary text-uppercase mb-1">${e.brand} • ${e.category}</div>
                <h2 style="font-size:var(--fs-xl);margin-bottom:var(--sp-2);">${e.name}</h2>
                
                <div class="flex items-center gap-2 mb-3">
                  <span class="star-filled">${a("star")}</span>
                  <span style="font-weight:600;font-size:14px;">${e.rating}</span>
                  <span class="text-xs text-tertiary">(${e.reviewsCount} reviews)</span>
                </div>

                <div class="flex items-baseline gap-3 mb-4">
                  <span style="font-family:var(--font-heading);font-size:var(--fs-2xl);font-weight:700;color:var(--primary);">${v(e.price)}</span>
                  ${e.oldPrice?`<span style="text-decoration:line-through;color:var(--text-muted);">${v(e.oldPrice)}</span>`:""}
                </div>

                <p style="font-size:14px;color:var(--text-secondary);line-height:1.5;margin-bottom:var(--sp-4);">
                  ${e.description}
                </p>

                <!-- Color selector if available -->
                ${e.colors&&e.colors.length>0?`
                  <div class="mb-4">
                    <label class="form-label mb-2">Color: <strong id="qv-selected-color">${e.colors[0]}</strong></label>
                    <div class="flex gap-2">
                      ${e.colors.map((t,s)=>`
                        <button class="btn btn-secondary btn-sm qv-color-btn ${s===0?"border-focus":""}" data-color="${t}">${t}</button>
                      `).join("")}
                    </div>
                  </div>
                `:""}

                <!-- Actions -->
                <div class="flex gap-3 mt-6">
                  <button class="btn btn-cart-premium flex-1" id="qv-add-cart-btn" style="height:40px;font-size:12px;">
                    ${a("shoppingBag")} Add to Cart
                  </button>
                  <a href="#/product/${e.id}" class="btn btn-secondary btn-lg" id="qv-details-link">
                    Full Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,this.bindModalEvents(e))}openCustomModal({title:e,content:t,confirmText:s="Confirm",onConfirm:i}){if(!this.container)return;this.container.innerHTML=`
      <div class="modal-overlay active" id="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3>${e}</h3>
            <button class="btn-icon btn-ghost" id="modal-close-btn">${a("x")}</button>
          </div>
          <div class="modal-body">
            ${t}
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="modal-cancel-btn">Cancel</button>
            <button class="btn btn-primary" id="modal-confirm-btn">${s}</button>
          </div>
        </div>
      </div>
    `;const o=this.container.querySelector("#modal-overlay"),n=this.container.querySelector("#modal-close-btn"),d=this.container.querySelector("#modal-cancel-btn"),l=this.container.querySelector("#modal-confirm-btn"),h=()=>{this.container.innerHTML=""};n&&n.addEventListener("click",h),d&&d.addEventListener("click",h),o&&o.addEventListener("click",g=>{g.target===o&&h()}),l&&l.addEventListener("click",()=>{i&&i(),h()})}bindModalEvents(e){var g;const t=this.container.querySelector("#modal-overlay"),s=this.container.querySelector("#modal-close-btn"),i=this.container.querySelector("#qv-details-link"),o=this.container.querySelector("#qv-add-cart-btn"),n=this.container.querySelector("#quickview-main-img"),d=this.container.querySelectorAll(".quickview-thumb");let l=((g=e.colors)==null?void 0:g[0])||null;const h=()=>{this.container.innerHTML=""};s&&s.addEventListener("click",h),i&&i.addEventListener("click",h),t&&t.addEventListener("click",f=>{f.target===t&&h()}),d.forEach(f=>{f.addEventListener("click",()=>{n&&(n.src=f.src),d.forEach(w=>w.style.borderColor="transparent"),f.style.borderColor="var(--primary)"})}),o&&o.addEventListener("click",()=>{c.addToCart(e,1,l),h()})}}class J{constructor(){this.container=document.getElementById("chat-widget"),this.isOpen=!1,this.init()}init(){this.render()}render(){this.container&&(this.container.innerHTML=`
      <button class="chat-btn" id="chat-toggle-btn" title="Live Support Chat">
        ${a("messageSquare")}
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
            <button class="btn-icon btn-ghost" id="chat-close-btn" style="color:#fff;">${a("x")}</button>
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
    `,this.bindEvents())}bindEvents(){const e=this.container.querySelector("#chat-toggle-btn"),t=this.container.querySelector("#chat-modal-overlay"),s=this.container.querySelector("#chat-close-btn"),i=this.container.querySelector("#chat-form"),o=this.container.querySelector("#chat-messages"),n=()=>{this.isOpen=!this.isOpen,t&&t.classList.toggle("active",this.isOpen)};e&&e.addEventListener("click",n),s&&s.addEventListener("click",n),i&&i.addEventListener("submit",d=>{d.preventDefault();const l=i.querySelector("#chat-input");if(l&&l.value.trim()){const h=l.value.trim(),g=document.createElement("div");g.style.cssText="background:var(--primary);color:var(--text-on-primary);padding:var(--sp-3);border-radius:var(--radius-lg);max-width:85%;font-size:13px;align-self:flex-end;",g.textContent=h,o.appendChild(g),l.value="",o.scrollTop=o.scrollHeight,setTimeout(()=>{const f=document.createElement("div");f.style.cssText="background:var(--bg-tertiary);padding:var(--sp-3);border-radius:var(--radius-lg);max-width:85%;font-size:13px;align-self:flex-start;",f.textContent=`Thanks for reaching out! Our agent is reviewing your query regarding "${h.slice(0,30)}...". You can also check our FAQ page for instant answers!`,o.appendChild(f),o.scrollTop=o.scrollHeight},800)}}),this.container.addEventListener("click",d=>{const l=d.target.closest(".chat-quick-chip");if(l){const h=l.getAttribute("data-msg"),g=i.querySelector("#chat-input");g&&(g.value=h,i.dispatchEvent(new Event("submit")))}})}}const _=[{id:1,tag:"GLOBAL MARKETPLACE",title:"Discover Everything You Love",desc:"Explore millions of premium products from top verified global sellers with lightning-fast delivery.",ctaText:"Shop Now",ctaLink:"#/shop",image:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"},{id:2,tag:"NEXT-GEN TECH",title:"Next-Gen Electronics & Audio",desc:"Immerse yourself in flagship audio, ultra-fast 5G smartphones, and modern smart hardware.",ctaText:"Explore Electronics",ctaLink:"#/category/electronics",image:"https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1600&q=80"},{id:3,tag:"CURATED FASHION",title:"Premium Fashion Collection",desc:"Elevate your wardrobe with minimalist heavy cottons, tailored outerwear, and Italian leather.",ctaText:"Explore Fashion",ctaLink:"#/category/fashion",image:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80"},{id:4,tag:"MODERN LIVING",title:"Upgrade Your Lifestyle",desc:"Transform your home with Scandinavian lounge furniture, ergonomic office setups, and smart decor.",ctaText:"Shop Lifestyle",ctaLink:"#/category/home-living",image:"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80"},{id:5,tag:"LIMITED TIME OFFERS",title:"Exclusive Flash Deals Up To 60% Off",desc:"Unbeatable prices on high-demand gadgets, designer wear, and premium timepieces.",ctaText:"View Deals",ctaLink:"#/deals",image:"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80"}];class X{constructor(e="hero-carousel"){this.container=document.getElementById(e),this.currentIndex=0,this.autoPlayInterval=null,this.slides=_,this.isPaused=!1}render(){this.container&&(this.container.className="hero",this.container.innerHTML=`
      ${this.slides.map((e,t)=>`
        <div class="hero-slide ${t===0?"active":""}" data-index="${t}">
          <div class="hero-slide-bg" style="background-image: url('${e.image}');"></div>
          <div class="hero-slide-overlay"></div>
          <div class="hero-slide-content">
            <span class="hero-slide-tag">${e.tag}</span>
            <h1 class="hero-slide-title">${e.title}</h1>
            <p class="hero-slide-desc">${e.desc}</p>
            <div class="hero-slide-cta">
              <a href="${e.ctaLink}" class="btn btn-primary btn-lg">
                ${e.ctaText}
              </a>
              <a href="#/shop" class="btn btn-secondary btn-lg">
                Browse Shop
              </a>
            </div>
          </div>
        </div>
      `).join("")}

      <!-- Next / Prev Controls -->
      <button class="hero-nav prev" id="hero-prev">${a("chevronLeft")}</button>
      <button class="hero-nav next" id="hero-next">${a("chevronRight")}</button>

      <!-- Dots -->
      <div class="hero-dots">
        ${this.slides.map((e,t)=>`
          <div class="hero-dot ${t===0?"active":""}" data-dot="${t}"></div>
        `).join("")}
      </div>

      <!-- Auto Progress bar -->
      <div class="hero-progress" id="hero-progress"></div>
    `,this.bindEvents(),this.startAutoPlay())}goToSlide(e){e<0&&(e=this.slides.length-1),e>=this.slides.length&&(e=0),this.currentIndex=e;const t=this.container.querySelectorAll(".hero-slide"),s=this.container.querySelectorAll(".hero-dot");t.forEach((i,o)=>{i.classList.toggle("active",o===e)}),s.forEach((i,o)=>{i.classList.toggle("active",o===e)}),this.resetProgressBar()}nextSlide(){this.goToSlide(this.currentIndex+1)}prevSlide(){this.goToSlide(this.currentIndex-1)}startAutoPlay(){this.stopAutoPlay(),this.resetProgressBar();let e=0;this.autoPlayInterval=setInterval(()=>{if(this.isPaused)return;e+=1;const t=this.container.querySelector("#hero-progress");t&&(t.style.width=`${e}%`),e>=100&&this.nextSlide()},50)}stopAutoPlay(){this.autoPlayInterval&&(clearInterval(this.autoPlayInterval),this.autoPlayInterval=null)}resetProgressBar(){const e=this.container.querySelector("#hero-progress");e&&(e.style.width="0%")}bindEvents(){const e=this.container.querySelector("#hero-prev"),t=this.container.querySelector("#hero-next"),s=this.container.querySelector(".hero-dots");e&&e.addEventListener("click",()=>{this.prevSlide(),this.startAutoPlay()}),t&&t.addEventListener("click",()=>{this.nextSlide(),this.startAutoPlay()}),s&&s.addEventListener("click",i=>{const o=i.target.closest(".hero-dot");if(o){const n=parseInt(o.getAttribute("data-dot"),10);this.goToSlide(n),this.startAutoPlay()}}),this.container.addEventListener("mouseenter",()=>{this.isPaused=!0}),this.container.addEventListener("mouseleave",()=>{this.isPaused=!1})}destroy(){this.stopAutoPlay()}}class N{static render(e){return`
      <div class="category-card" onclick="window.location.hash='#/category/${e.id}'">
        <div class="category-card-icon">
          ${a(e.icon||"grid")}
        </div>
        <div class="category-card-name">${e.name}</div>
        <div class="category-card-count">${e.count} Products</div>
      </div>
    `}}class b{static render(e){var i;const t=c.isInWishlist(e.id),s=((i=e.images)==null?void 0:i[0])||"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80";return`
      <div class="product-card" data-product-id="${e.id}">
        <!-- Image & Actions -->
        <div class="product-card-img">
          <a href="#/product/${e.id}">
            <img src="${s}" alt="${e.name}" loading="lazy" />
          </a>
          
          <!-- Badges -->
          <div class="product-card-badges">
            ${e.discount?`<span class="product-card-badge badge-sale">-${e.discount}%</span>`:""}
            ${e.isNewArrival?'<span class="product-card-badge badge-new">NEW</span>':""}
            ${e.isTrending?'<span class="product-card-badge badge-hot">HOT</span>':""}
            ${e.freeShipping?'<span class="product-card-badge badge-free-ship">FREE SHIP</span>':""}
          </div>

          <!-- Action Buttons (Wishlist, Compare, Quick View) -->
          <div class="product-card-actions">
            <button class="product-card-action ${t?"wishlisted":""}" data-action="wishlist" title="${t?"Remove from Wishlist":"Add to Wishlist"}">
              ${a("heart")}
            </button>
            <button class="product-card-action" data-action="compare" title="Compare Product">
              ${a("repeat")}
            </button>
            <button class="product-card-action" data-action="quickview" title="Quick View">
              ${a("eye")}
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="product-card-body">
          <div class="product-card-category">${e.category}</div>
          <h3 class="product-card-name">
            <a href="#/product/${e.id}">${e.name}</a>
          </h3>
          
          <!-- Rating -->
          <div class="product-card-rating">
            <div class="stars">
              ${b.renderStars(e.rating||5)}
            </div>
            <span class="review-count">(${e.reviewsCount||0})</span>
          </div>

          <!-- Price -->
          <div class="product-card-price">
            <span class="current-price">${v(e.price)}</span>
            ${e.oldPrice?`<span class="old-price">${v(e.oldPrice)}</span>`:""}
          </div>

          <!-- Stock -->
          <div class="product-card-stock ${e.inStock?"in-stock":"out-stock"}">
            ${e.inStock?`In Stock (${e.stock} left)`:"Out of Stock"}
          </div>
        </div>

        <!-- Footer / Cart Buttons -->
        <div class="product-card-footer">
          <button class="btn btn-cart-premium btn-full" data-action="add-cart">
            ${a("shoppingBag")} Add to Cart
          </button>
        </div>
      </div>
    `}static renderStars(e){let t="";const s=Math.floor(e),i=e%1>=.5;for(let o=0;o<5;o++)o<s?t+=`<span class="star-filled">${a("star")}</span>`:o===s&&i?t+=`<span class="star-half">${a("star")}</span>`:t+=`<span class="star-empty">${a("star")}</span>`;return t}static attachEvents(e,t){e.addEventListener("click",s=>{const i=s.target.closest(".product-card");if(!i)return;const o=i.getAttribute("data-product-id"),n=t.find(f=>f.id===o);if(!n)return;const d=s.target.closest('[data-action="wishlist"]');if(d){s.preventDefault(),c.toggleWishlist(n);const f=c.isInWishlist(n.id);d.classList.toggle("wishlisted",f);return}if(s.target.closest('[data-action="compare"]')){s.preventDefault(),c.toggleCompare(n);return}if(s.target.closest('[data-action="quickview"]')){s.preventDefault(),p.emit("modal:quickview",n);return}if(s.target.closest('[data-action="add-cart"]')){s.preventDefault(),c.addToCart(n,1);return}})}}const E=[{id:"electronics",name:"Electronics",icon:"cpu",count:1420,image:"https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80",description:"Next-gen audio, smart home devices, gadgets & innovative gear."},{id:"mobiles",name:"Mobiles",icon:"smartphone",count:850,image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",description:"Flagship smartphones, budget devices & premium mobile accessories."},{id:"laptops",name:"Laptops",icon:"laptop",count:430,image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",description:"Ultra-thin notebooks, creator workstations & high-performance machines."},{id:"computers",name:"Computers",icon:"monitor",count:320,image:"https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=600&q=80",description:"Desktop rigs, 4K monitors, ergonomic mounts & PC hardware."},{id:"fashion",name:"Fashion",icon:"shirt",count:3100,image:"https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80",description:"Curated modern fashion for every style and season."},{id:"mens-fashion",name:"Men's Fashion",icon:"user-check",count:1850,image:"https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80",description:"Suits, streetwear, jackets, casual shirts & activewear."},{id:"womens-fashion",name:"Women's Fashion",icon:"heart",count:2200,image:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",description:"Dresses, designer bags, chic tops & seasonal collections."},{id:"shoes",name:"Shoes",icon:"footprints",count:940,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",description:"Performance running shoes, luxury sneakers & boots."},{id:"watches",name:"Watches",icon:"watch",count:510,image:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",description:"Automatic chronographs, smartwatches & luxury timepieces."},{id:"beauty",name:"Beauty",icon:"sparkles",count:780,image:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",description:"Skincare essentials, premium fragrances & cosmetics."},{id:"home-living",name:"Home & Living",icon:"home",count:1100,image:"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80",description:"Modern decor, smart lighting, kitchenware & bedding."},{id:"furniture",name:"Furniture",icon:"armchair",count:390,image:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",description:"Ergonomic desks, luxury sofas & Scandinavian dining sets."},{id:"grocery",name:"Grocery",icon:"shopping-bag",count:1600,image:"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",description:"Organic produce, gourmet pantry items & daily essentials."},{id:"sports",name:"Sports",icon:"activity",count:670,image:"https://images.unsplash.com/photo-1517649763962-0c6232661c00?auto=format&fit=crop&w=600&q=80",description:"Fitness gear, outdoor equipment & athletic apparel."},{id:"gaming",name:"Gaming",icon:"gamepad-2",count:890,image:"https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80",description:"Consoles, mechanical keyboards, gaming mice & VR headsets."},{id:"accessories",name:"Accessories",icon:"glasses",count:1250,image:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",description:"Sunglasses, leather wallets, backpacks & travel gear."},{id:"automotive",name:"Automotive",icon:"car",count:410,image:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",description:"Car care products, dashcams & vehicle electronics."},{id:"kids",name:"Kids",icon:"smile",count:920,image:"https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80",description:"Toys, educational games, children apparel & nursery items."},{id:"books",name:"Books",icon:"book-open",count:1500,image:"https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80",description:"Bestsellers, tech guides, literature & coffee table books."},{id:"jewelry",name:"Jewelry",icon:"gem",count:340,image:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",description:"Fine silver, gold necklaces, gemstone rings & bracelets."}];async function ee(){const r=document.getElementById("app"),e=m.filter(n=>n.isTrending),t=m.filter(n=>n.isFlashSale),s=m.filter(n=>n.isBestSeller),i=m.filter(n=>n.isNewArrival);r.innerHTML=`
    <!-- Hero Carousel Section -->
    <div id="hero-carousel-wrap"></div>

    <!-- Featured Categories Section -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Top Categories</h2>
          <a href="#/categories" class="view-all">View All Categories ${a("chevronRight")}</a>
        </div>
        <div class="grid grid-categories">
          ${E.slice(0,12).map(n=>N.render(n)).join("")}
        </div>
      </div>
    </section>

    <!-- Flash Sale Section with Countdown -->
    <section class="section" style="background:var(--bg-secondary);border-block:1px solid var(--border-primary);">
      <div class="container">
        <div class="section-header flash-sale-header">
          <div class="flex items-center gap-3">
            <h2 style="color:var(--primary);">${a("zap")} Flash Sale</h2>
            <div class="countdown" id="home-flash-countdown">
              <div class="countdown-item">
                <div class="countdown-value" id="cd-hours">08</div>
                <div class="countdown-label">Hours</div>
              </div>
              <span class="countdown-sep">:</span>
              <div class="countdown-item">
                <div class="countdown-value" id="cd-mins">45</div>
                <div class="countdown-label">Mins</div>
              </div>
              <span class="countdown-sep">:</span>
              <div class="countdown-item">
                <div class="countdown-value" id="cd-secs">30</div>
                <div class="countdown-label">Secs</div>
              </div>
            </div>
          </div>
          <a href="#/deals" class="view-all">See All Deals ${a("chevronRight")}</a>
        </div>
        
        <div class="grid grid-products" id="flash-products-grid">
          ${t.slice(0,4).map(n=>b.render(n)).join("")}
        </div>
      </div>
    </section>

    <!-- Trending Products -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Trending Products</h2>
          <a href="#/shop?sort=trending" class="view-all">Explore Trending ${a("chevronRight")}</a>
        </div>
        <div class="grid grid-products" id="trending-products-grid">
          ${e.map(n=>b.render(n)).join("")}
        </div>
      </div>
    </section>

    <!-- Promo Banner Section -->
    <section class="section-sm">
      <div class="container">
        <div class="card-glass p-8 flex flex-between flex-wrap gap-6" style="background:linear-gradient(135deg, var(--graphite-800), var(--graphite-900));border:1px solid var(--primary-muted);">
          <div>
            <span class="badge badge-primary mb-2">LIMITED TIME</span>
            <h2 style="font-size:var(--fs-3xl);color:#fff;margin-bottom:var(--sp-2);">Upgrade Your Tech Ecosystem</h2>
            <p style="color:var(--text-secondary);max-width:480px;">Save up to $300 on flagship laptops, smartphones and active noise canceling headsets.</p>
          </div>
          <a href="#/shop?category=electronics" class="btn btn-primary btn-xl">
            Explore Offers ${a("chevronRight")}
          </a>
        </div>
      </div>
    </section>

    <!-- Best Sellers -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Best Sellers</h2>
          <a href="#/shop?sort=best-seller" class="view-all">View All ${a("chevronRight")}</a>
        </div>
        <div class="grid grid-products" id="bestseller-products-grid">
          ${s.map(n=>b.render(n)).join("")}
        </div>
      </div>
    </section>

    <!-- New Arrivals -->
    <section class="section" style="background:var(--bg-secondary);">
      <div class="container">
        <div class="section-header">
          <h2>New Arrivals</h2>
          <a href="#/new-arrivals" class="view-all">Discover New ${a("chevronRight")}</a>
        </div>
        <div class="grid grid-products" id="newarrivals-products-grid">
          ${i.map(n=>b.render(n)).join("")}
        </div>
      </div>
    </section>

    <!-- Value Propositions -->
    <section class="section-sm" style="border-top:1px solid var(--border-primary);">
      <div class="container">
        <div class="grid grid-4 text-center">
          <div class="card p-6 flex flex-col items-center gap-3">
            <div class="category-card-icon">${a("truck")}</div>
            <h4 style="font-size:16px;">Fast Global Shipping</h4>
            <p class="text-xs text-secondary">Free delivery on orders over $50 worldwide.</p>
          </div>
          <div class="card p-6 flex flex-col items-center gap-3">
            <div class="category-card-icon">${a("shieldCheck")}</div>
            <h4 style="font-size:16px;">100% Secure Checkout</h4>
            <p class="text-xs text-secondary">256-bit SSL encrypted safe payments.</p>
          </div>
          <div class="card p-6 flex flex-col items-center gap-3">
            <div class="category-card-icon">${a("repeat")}</div>
            <h4 style="font-size:16px;">30-Day Money Back</h4>
            <p class="text-xs text-secondary">Hassle-free 30 days return and exchange policy.</p>
          </div>
          <div class="card p-6 flex flex-col items-center gap-3">
            <div class="category-card-icon">${a("sparkles")}</div>
            <h4 style="font-size:16px;">24/7 Dedicated Support</h4>
            <p class="text-xs text-secondary">Instant assistance via live chat and email support.</p>
          </div>
        </div>
      </div>
    </section>
  `,document.getElementById("hero-carousel-wrap")&&new X("hero-carousel-wrap").render(),b.attachEvents(r,m),te()}function te(){let r=31530;const e=setInterval(()=>{if(r--,r<=0){clearInterval(e);return}const t=Math.floor(r/3600),s=Math.floor(r%3600/60),i=r%60,o=document.getElementById("cd-hours"),n=document.getElementById("cd-mins"),d=document.getElementById("cd-secs");o&&(o.textContent=String(t).padStart(2,"0")),n&&(n.textContent=String(s).padStart(2,"0")),d&&(d.textContent=String(i).padStart(2,"0"))},1e3)}async function M(r={}){const e=document.getElementById("app");let t=[...m];r.category&&(t=t.filter(s=>s.category.toLowerCase()===r.category.toLowerCase())),r.q&&(t=t.filter(s=>s.name.toLowerCase().includes(r.q.toLowerCase()))),e.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>Shop All Products</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Shop</span>
          ${r.category?`<span class="separator">/</span><span>${r.category}</span>`:""}
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="shop-layout">
          <!-- Filter Sidebar -->
          <aside class="filter-sidebar">
            <div class="card p-5">
              <h3 class="mb-4" style="font-size:18px;">Filters</h3>
              
              <!-- Categories -->
              <div class="filter-section">
                <div class="filter-section-title">Categories</div>
                <div class="filter-options">
                  <a href="#/shop" class="filter-option ${r.category?"":"font-bold text-lime"}">
                    <span>All Products</span>
                    <span class="count">${m.length}</span>
                  </a>
                  ${E.map(s=>`
                    <a href="#/shop?category=${s.id}" class="filter-option ${r.category===s.id?"font-bold text-lime":""}">
                      <span>${s.name}</span>
                      <span class="count">${s.count}</span>
                    </a>
                  `).join("")}
                </div>
              </div>

              <!-- Price Range -->
              <div class="filter-section mt-6">
                <div class="filter-section-title">Price Range</div>
                <div class="price-range mt-2">
                  <input type="number" placeholder="Min $" id="price-min" value="0" />
                  <span class="text-tertiary">-</span>
                  <input type="number" placeholder="Max $" id="price-max" value="3000" />
                </div>
              </div>

              <!-- Stock Availability -->
              <div class="filter-section mt-6">
                <div class="filter-section-title">Availability</div>
                <div class="filter-options">
                  <label class="checkbox-wrapper">
                    <input type="checkbox" id="filter-in-stock" checked />
                    <span>In Stock Only</span>
                  </label>
                  <label class="checkbox-wrapper">
                    <input type="checkbox" id="filter-on-sale" />
                    <span>On Sale</span>
                  </label>
                  <label class="checkbox-wrapper">
                    <input type="checkbox" id="filter-free-ship" />
                    <span>Free Shipping</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <!-- Main Shop Grid -->
          <main>
            <!-- Controls Bar -->
            <div class="card p-4 mb-6 flex flex-between flex-wrap gap-4 items-center">
              <div class="text-sm text-secondary">
                Showing <strong class="text-primary">${t.length}</strong> products
              </div>
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <label class="text-sm text-secondary">Sort by:</label>
                  <select class="form-input" style="width:auto;padding:var(--sp-2) var(--sp-4);" id="shop-sort-select">
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Products Grid -->
            <div class="grid grid-products" id="shop-products-grid">
              ${t.length>0?t.map(s=>b.render(s)).join(""):`<div class="empty-state w-full" style="grid-column:1/-1;">
                  <div class="empty-state-icon">${a("shoppingBag")}</div>
                  <h3>No products found</h3>
                  <p>Try resetting your filters or search keywords.</p>
                  <a href="#/shop" class="btn btn-primary mt-4">Reset Filters</a>
                </div>`}
            </div>
          </main>
        </div>
      </div>
    </div>
  `,b.attachEvents(e,m)}async function se(){const r=document.getElementById("app");r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>All Product Categories</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Categories</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="grid grid-categories">
          ${E.map(e=>N.render(e)).join("")}
        </div>
      </div>
    </div>
  `}async function ae(r={}){var f,w,x,P,A,k,S;const e=document.getElementById("app"),t=r.id||"prod-1",s=m.find(u=>u.id===t)||m[0];c.addRecentlyViewed(s);const i=m.filter(u=>u.category===s.category&&u.id!==s.id).slice(0,4);let o=1,n=((f=s.colors)==null?void 0:f[0])||null,d=((w=s.sizes)==null?void 0:w[0])||null;e.innerHTML=`
    <div class="page-header">
      <div class="container">
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/shop?category=${s.category}">${s.category}</a>
          <span class="separator">/</span>
          <span>${s.name}</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <!-- Main Product Section -->
        <div class="grid grid-2 gap-8 mb-12">
          <!-- Gallery -->
          <div>
            <div style="position:relative;border-radius:var(--radius-2xl);overflow:hidden;background:var(--bg-secondary);border:1px solid var(--border-primary);">
              <img id="pd-main-img" src="${s.images[0]}" alt="${s.name}" style="width:100%;aspect-ratio:1;object-fit:cover;" />
              ${s.discount?`<span class="badge badge-danger" style="position:absolute;top:16px;left:16px;font-size:12px;">-${s.discount}% OFF</span>`:""}
            </div>
            
            ${s.images.length>1?`
              <div class="flex gap-3 mt-4 overflow-x-auto">
                ${s.images.map((u,y)=>`
                  <img class="pd-thumb" src="${u}" style="width:72px;height:72px;border-radius:var(--radius-lg);cursor:pointer;object-fit:cover;border:2px solid ${y===0?"var(--primary)":"var(--border-primary)"};" />
                `).join("")}
              </div>
            `:""}
          </div>

          <!-- Specs & Buy Box -->
          <div>
            <div class="flex items-center gap-2 mb-2 text-xs text-tertiary text-uppercase tracking-wider">
              <span>${s.brand}</span> • <span>${s.category}</span>
            </div>
            
            <h1 style="font-size:var(--fs-3xl);margin-bottom:var(--sp-3);">${s.name}</h1>

            <div class="flex items-center gap-3 mb-4">
              <div class="stars stars-lg">${b.renderStars(s.rating)}</div>
              <span class="font-bold">${s.rating}</span>
              <span class="text-tertiary">(${s.reviewsCount} reviews)</span>
              <span class="badge badge-success">${s.inStock?"In Stock":"Out of Stock"}</span>
            </div>

            <!-- Price -->
            <div class="flex items-baseline gap-4 mb-6 p-4 rounded-xl" style="background:var(--bg-secondary);border:1px solid var(--border-primary);">
              <span style="font-family:var(--font-heading);font-size:var(--fs-4xl);font-weight:800;color:var(--primary);">${v(s.price)}</span>
              ${s.oldPrice?`<span style="text-decoration:line-through;color:var(--text-muted);font-size:var(--fs-lg);">${v(s.oldPrice)}</span>`:""}
              ${s.freeShipping?'<span class="badge badge-primary">FREE SHIPPING</span>':""}
            </div>

            <p class="text-secondary mb-6" style="line-height:1.6;">${s.description}</p>

            <!-- Color Options -->
            ${s.colors&&s.colors.length>0?`
              <div class="mb-5">
                <label class="form-label mb-2">Color: <strong id="pd-color-label" class="text-primary">${n}</strong></label>
                <div class="flex gap-2">
                  ${s.colors.map((u,y)=>`
                    <button class="btn btn-secondary btn-sm pd-color-btn ${y===0?"border-focus":""}" data-color="${u}">${u}</button>
                  `).join("")}
                </div>
              </div>
            `:""}

            <!-- Size Options -->
            ${s.sizes&&s.sizes.length>0?`
              <div class="mb-6">
                <label class="form-label mb-2">Size / Variant: <strong id="pd-size-label" class="text-primary">${d}</strong></label>
                <div class="flex gap-2 flex-wrap">
                  ${s.sizes.map((u,y)=>`
                    <button class="btn btn-secondary btn-sm pd-size-btn ${y===0?"border-focus":""}" data-size="${u}">${u}</button>
                  `).join("")}
                </div>
              </div>
            `:""}

            <!-- Quantity & CTA Buttons -->
            <div class="flex gap-4 mb-6">
              <div class="qty-selector">
                <button class="qty-btn" id="pd-qty-minus">-</button>
                <span class="qty-value" id="pd-qty-val">1</span>
                <button class="qty-btn" id="pd-qty-plus">+</button>
              </div>

              <button class="btn btn-cart-premium flex-1" id="pd-add-cart-btn" style="height:44px;font-size:13px;">
                ${a("shoppingBag")} Add to Cart
              </button>

              <button class="btn btn-secondary btn-xl" id="pd-buy-now-btn">
                Buy Now
              </button>

              <button class="btn btn-icon btn-secondary btn-xl ${c.isInWishlist(s.id)?"wishlisted":""}" id="pd-wishlist-btn">
                ${a("heart")}
              </button>
            </div>

            <!-- Seller Box -->
            <div class="card p-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="avatar avatar-initials">S</div>
                <div>
                  <div class="font-semibold text-sm">${s.seller.name} ${s.seller.verified?"✓":""}</div>
                  <div class="text-xs text-tertiary">${s.seller.followers} Followers • ${s.seller.rating} ★ Rating</div>
                </div>
              </div>
              <a href="#/seller/store" class="btn btn-outline btn-sm">Visit Store</a>
            </div>
          </div>
        </div>

        <!-- Specifications & Reviews Tabs -->
        <div class="card mb-12 p-6">
          <div class="tabs">
            <button class="tab-btn active" data-tab="desc">Description</button>
            <button class="tab-btn" data-tab="specs">Specifications</button>
            <button class="tab-btn" data-tab="reviews">Customer Reviews (${s.reviews.length})</button>
            <button class="tab-btn" data-tab="faqs">Q & A (${s.faqs.length})</button>
          </div>

          <div class="tab-content">
            <!-- Tab 1: Description -->
            <div class="tab-pane active" id="tab-desc">
              <h3 class="mb-3">Product Overview</h3>
              <p class="text-secondary" style="line-height:1.7;">${s.description}</p>
            </div>

            <!-- Tab 2: Specs Table -->
            <div class="tab-pane" id="tab-specs">
              <h3 class="mb-4">Technical Specifications</h3>
              <div class="data-table-wrap">
                <table class="data-table">
                  <tbody>
                    ${Object.entries(s.specs||{}).map(([u,y])=>`
                      <tr>
                        <td style="font-weight:600;width:30%;color:var(--text-secondary);">${u}</td>
                        <td>${y}</td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Tab 3: Reviews -->
            <div class="tab-pane" id="tab-reviews">
              <h3 class="mb-4">Customer Reviews</h3>
              ${s.reviews.length>0?s.reviews.map(u=>`
                <div class="card p-4 mb-3">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-3">
                      <img src="${u.avatar}" class="avatar avatar-sm" />
                      <div>
                        <div class="font-semibold text-sm">${u.user}</div>
                        <div class="text-xs text-tertiary">${u.date}</div>
                      </div>
                    </div>
                    <div class="stars">${b.renderStars(u.rating)}</div>
                  </div>
                  <p class="text-secondary text-sm">${u.text}</p>
                </div>
              `).join(""):'<p class="text-secondary">No reviews yet for this product. Be the first to review!</p>'}
            </div>

            <!-- Tab 4: Q&A -->
            <div class="tab-pane" id="tab-faqs">
              <h3 class="mb-4">Questions & Answers</h3>
              ${s.faqs.length>0?s.faqs.map(u=>`
                <div class="mb-4 p-4 rounded-xl" style="background:var(--bg-secondary);">
                  <div class="font-bold text-sm mb-1">Q: ${u.q}</div>
                  <div class="text-sm text-secondary">A: ${u.a}</div>
                </div>
              `).join(""):'<p class="text-secondary">Have a question? Ask our seller community below!</p>'}
            </div>
          </div>
        </div>

        <!-- Related Products Section -->
        ${i.length>0?`
          <div class="mt-12">
            <div class="section-header">
              <h2>Recommended For You</h2>
            </div>
            <div class="grid grid-products">
              ${i.map(u=>b.render(u)).join("")}
            </div>
          </div>
        `:""}
      </div>
    </div>
  `;const l=e.querySelectorAll(".tab-btn"),h=e.querySelectorAll(".tab-pane");l.forEach(u=>{u.addEventListener("click",()=>{l.forEach(C=>C.classList.remove("active")),h.forEach(C=>C.classList.remove("active")),u.classList.add("active");const y=e.querySelector(`#tab-${u.getAttribute("data-tab")}`);y&&y.classList.add("active")})});const g=e.querySelector("#pd-qty-val");(x=e.querySelector("#pd-qty-minus"))==null||x.addEventListener("click",()=>{o>1&&(o--,g&&(g.textContent=o))}),(P=e.querySelector("#pd-qty-plus"))==null||P.addEventListener("click",()=>{o++,g&&(g.textContent=o)}),(A=e.querySelector("#pd-add-cart-btn"))==null||A.addEventListener("click",()=>{c.addToCart(s,o,n,d)}),(k=e.querySelector("#pd-buy-now-btn"))==null||k.addEventListener("click",()=>{c.addToCart(s,o,n,d),window.location.hash="#/checkout"}),(S=e.querySelector("#pd-wishlist-btn"))==null||S.addEventListener("click",u=>{c.toggleWishlist(s),u.currentTarget.classList.toggle("wishlisted",c.isInWishlist(s.id))}),b.attachEvents(e,m)}const R=[{code:"NEWUSER20",discount:"20% OFF",value:.2,type:"percentage",minOrder:50,expiry:"Dec 31, 2026",description:"Special 20% discount on your first RAZDAR order."},{code:"SAVE30",discount:"$30 OFF",value:30,type:"fixed",minOrder:150,expiry:"Sep 30, 2026",description:"Flat $30 discount on orders over $150."},{code:"FLASH50",discount:"50% OFF",value:.5,type:"percentage",minOrder:200,expiry:"Aug 20, 2026",description:"Mega Flash Sale coupon! Max savings $100."},{code:"FREESHIP",discount:"FREE SHIPPING",value:"shipping",type:"shipping",minOrder:30,expiry:"Dec 31, 2026",description:"Complimentary standard shipping on all orders."}];async function I(){const r=document.getElementById("app"),e=m.filter(t=>t.discount>0);r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>Exclusive Deals & Flash Sales</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Deals</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <!-- Coupon Cards Section -->
        <h2 class="mb-6">Active Discount Coupons</h2>
        <div class="grid grid-2 gap-4 mb-12">
          ${R.map(t=>`
            <div class="coupon-card">
              <div class="coupon-left">
                <div class="coupon-discount">${t.discount}</div>
                <div class="text-xs text-secondary mt-1">Min order $${t.minOrder}</div>
              </div>
              <div class="coupon-right">
                <div class="font-bold text-base mb-1">${t.description}</div>
                <div class="text-xs text-tertiary mb-3">Expires: ${t.expiry}</div>
                <button class="coupon-code copy-coupon-btn" data-code="${t.code}">
                  <span>Code: ${t.code}</span>
                  ${a("tag")}
                </button>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Flash Sale Products -->
        <h2 class="mb-6">Mega Discounts & Clearance</h2>
        <div class="grid grid-products">
          ${e.map(t=>b.render(t)).join("")}
        </div>
      </div>
    </div>
  `,r.querySelectorAll(".copy-coupon-btn").forEach(t=>{t.addEventListener("click",()=>{const s=t.getAttribute("data-code");navigator.clipboard.writeText(s),p.emit("toast:show",{type:"success",title:"Coupon Copied!",message:`Coupon code "${s}" copied to clipboard.`})})}),b.attachEvents(r,m)}async function ie(){const r=document.getElementById("app"),e=m.filter(t=>t.isNewArrival);r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>New Arrivals</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>New Arrivals</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="grid grid-products">
          ${e.map(t=>b.render(t)).join("")}
        </div>
      </div>
    </div>
  `,b.attachEvents(r,m)}async function re(r={}){const e=document.getElementById("app"),t=r.q||"",s=m.filter(i=>i.name.toLowerCase().includes(t.toLowerCase())||i.category.toLowerCase().includes(t.toLowerCase())||i.brand.toLowerCase().includes(t.toLowerCase()));e.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>Search Results for "${t}"</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Search</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="mb-6 font-medium text-secondary">
          Found <strong class="text-primary">${s.length}</strong> items matching your query.
        </div>
        ${s.length>0?`
          <div class="grid grid-products">
            ${s.map(i=>b.render(i)).join("")}
          </div>
        `:`
          <div class="empty-state">
            <h3>No Products Found</h3>
            <p>We couldn't find anything matching "${t}". Try searching for another keyword like "headphone", "shoes", or "phone".</p>
            <a href="#/shop" class="btn btn-primary mt-4">View All Products</a>
          </div>
        `}
      </div>
    </div>
  `,b.attachEvents(e,m)}async function B(){var d;const r=document.getElementById("app"),e=c.getCart(),t=c.getCartSubtotal();let s=0;const i=t>50||t===0?0:9.99,o=t*.08,n=Math.max(0,t-s+i+o);r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>Shopping Cart</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Cart</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        ${e.length===0?`
          <div class="empty-state">
            <div class="empty-state-icon">${a("shoppingBag")}</div>
            <h3>Your Shopping Cart is Empty</h3>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <a href="#/shop" class="btn btn-primary btn-lg mt-4">Start Shopping</a>
          </div>
        `:`
          <div class="grid" style="grid-template-columns:1fr 340px;gap:var(--sp-8);">
            <!-- Cart Items List -->
            <div>
              <div class="data-table-wrap mb-6">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${e.map(l=>`
                      <tr data-cart-id="${l.id}" data-color="${l.color||""}" data-size="${l.size||""}">
                        <td>
                          <div class="flex items-center gap-3">
                            <img src="${l.images[0]}" style="width:60px;height:60px;border-radius:var(--radius-lg);object-fit:cover;" />
                            <div>
                              <a href="#/product/${l.id}" class="font-semibold text-sm link">${l.name}</a>
                              <div class="text-xs text-tertiary">
                                ${l.color?`Color: ${l.color}`:""} ${l.size?`• Size: ${l.size}`:""}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="font-semibold">${v(l.price)}</td>
                        <td>
                          <div class="qty-selector">
                            <button class="qty-btn cart-qty-btn" data-change="-1">-</button>
                            <span class="qty-value">${l.quantity}</span>
                            <button class="qty-btn cart-qty-btn" data-change="1">+</button>
                          </div>
                        </td>
                        <td class="font-bold text-lime">${v(l.price*l.quantity)}</td>
                        <td>
                          <button class="btn-icon btn-ghost cart-remove-btn" title="Remove Item" style="color:var(--danger);">
                            ${a("trash")}
                          </button>
                        </td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>

              <div class="flex flex-between">
                <a href="#/shop" class="btn btn-secondary">
                  ${a("chevronLeft")} Continue Shopping
                </a>
                <button class="btn btn-ghost" id="cart-clear-btn" style="color:var(--danger);">
                  Clear Cart
                </button>
              </div>
            </div>

            <!-- Order Summary Sidebar -->
            <div>
              <div class="card p-6">
                <h3 class="mb-4" style="font-size:18px;">Order Summary</h3>
                
                <!-- Coupon input -->
                <div class="form-group mb-4">
                  <label class="form-label">Have a Coupon?</label>
                  <div class="flex gap-2">
                    <input type="text" id="coupon-code-input" class="form-input" placeholder="e.g. NEWUSER20" />
                    <button class="btn btn-outline" id="coupon-apply-btn">Apply</button>
                  </div>
                </div>

                <div class="divider mb-4"></div>

                <div class="flex flex-between mb-2 text-sm text-secondary">
                  <span>Subtotal</span>
                  <span>${v(t)}</span>
                </div>
                <div class="flex flex-between mb-2 text-sm text-secondary">
                  <span>Estimated Shipping</span>
                  <span>${i===0?'<strong class="text-success">FREE</strong>':v(i)}</span>
                </div>
                <div class="flex flex-between mb-2 text-sm text-secondary">
                  <span>Estimated Tax (8%)</span>
                  <span>${v(o)}</span>
                </div>

                <div class="divider my-4"></div>

                <div class="flex flex-between mb-6">
                  <span class="font-bold text-lg">Grand Total</span>
                  <span class="font-bold text-2xl text-lime">${v(n)}</span>
                </div>

                <a href="#/checkout" class="btn btn-primary btn-xl btn-full mb-3">
                  Proceed to Checkout ${a("chevronRight")}
                </a>

                <p class="text-xs text-tertiary text-center">
                  🔒 256-bit SSL encrypted safe checkout
                </p>
              </div>
            </div>
          </div>
        `}
      </div>
    </div>
  `,r.addEventListener("click",l=>{const h=l.target.closest("tr[data-cart-id]");if(!h)return;const g=h.getAttribute("data-cart-id"),f=h.getAttribute("data-color")||null,w=h.getAttribute("data-size")||null,x=l.target.closest(".cart-qty-btn");if(x){const A=parseInt(x.getAttribute("data-change"),10),k=e.find(S=>S.id===g&&(S.color||"")===(f||"")&&(S.size||"")===(w||""));k&&(c.updateCartQuantity(g,k.quantity+A,f,w),B());return}if(l.target.closest(".cart-remove-btn")){c.removeFromCart(g,f,w),B();return}}),(d=r.querySelector("#cart-clear-btn"))==null||d.addEventListener("click",()=>{c.clearCart(),B()})}async function oe(){const r=document.getElementById("app"),e=c.getCart();if(e.length===0){window.location.hash="#/cart";return}const t=c.getCartSubtotal(),s=t*.08,i=t>50?0:9.99,o=t+s+i;let n=1;r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>Checkout</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/cart">Cart</a>
          <span class="separator">/</span>
          <span>Checkout</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <!-- Steps Indicator -->
        <div class="checkout-steps max-w-container-md m-auto mb-10">
          <div class="checkout-step ${n>=1?"active":""} ${n>1?"completed":""}" id="step-ind-1">
            <div class="checkout-step-number">1</div>
            <span class="checkout-step-label">Info</span>
          </div>
          <div class="checkout-step ${n>=2?"active":""} ${n>2?"completed":""}" id="step-ind-2">
            <div class="checkout-step-number">2</div>
            <span class="checkout-step-label">Shipping</span>
          </div>
          <div class="checkout-step ${n>=3?"active":""} ${n>3?"completed":""}" id="step-ind-3">
            <div class="checkout-step-number">3</div>
            <span class="checkout-step-label">Delivery</span>
          </div>
          <div class="checkout-step ${n>=4?"active":""} ${n>4?"completed":""}" id="step-ind-4">
            <div class="checkout-step-number">4</div>
            <span class="checkout-step-label">Payment</span>
          </div>
          <div class="checkout-step ${n>=5?"active":""}" id="step-ind-5">
            <div class="checkout-step-number">5</div>
            <span class="checkout-step-label">Review</span>
          </div>
        </div>

        <div class="grid" style="grid-template-columns:1fr 340px;gap:var(--sp-8);">
          <!-- Step Forms -->
          <div class="card p-6" id="checkout-form-container">
            <!-- Dynamic Content loaded per step -->
          </div>

          <!-- Order Summary Sidebar -->
          <div>
            <div class="card p-6">
              <h3 class="mb-4" style="font-size:18px;">Order Summary</h3>
              <div class="flex flex-col gap-3 mb-4" style="max-height:220px;overflow-y:auto;">
                ${e.map(l=>`
                  <div class="flex items-center gap-3">
                    <img src="${l.images[0]}" style="width:44px;height:44px;border-radius:var(--radius-md);object-fit:cover;" />
                    <div style="flex:1;">
                      <div class="text-xs font-semibold">${l.name}</div>
                      <div class="text-xs text-tertiary">Qty: ${l.quantity}</div>
                    </div>
                    <div class="text-xs font-bold">${v(l.price*l.quantity)}</div>
                  </div>
                `).join("")}
              </div>

              <div class="divider mb-4"></div>

              <div class="flex flex-between mb-2 text-sm text-secondary">
                <span>Subtotal</span>
                <span>${v(t)}</span>
              </div>
              <div class="flex flex-between mb-2 text-sm text-secondary">
                <span>Shipping</span>
                <span>${i===0?"FREE":v(i)}</span>
              </div>
              <div class="flex flex-between mb-2 text-sm text-secondary">
                <span>Tax</span>
                <span>${v(s)}</span>
              </div>

              <div class="divider my-4"></div>

              <div class="flex flex-between mb-4">
                <span class="font-bold text-lg">Total</span>
                <span class="font-bold text-2xl text-lime">${v(o)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;function d(l){var g,f,w,x,P,A,k,S,u;n=l;const h=document.getElementById("checkout-form-container");if(h){for(let y=1;y<=5;y++){const C=document.getElementById(`step-ind-${y}`);C&&(C.classList.toggle("active",y<=l),C.classList.toggle("completed",y<l))}l===1?(h.innerHTML=`
        <h3 class="mb-4">Step 1 — Customer Information</h3>
        <div class="form-group mb-4">
          <label class="form-label">Full Name <span class="required">*</span></label>
          <input type="text" class="form-input" id="co-name" value="Mohsin Ahmad" required />
        </div>
        <div class="grid grid-2 gap-4 mb-6">
          <div class="form-group">
            <label class="form-label">Email Address <span class="required">*</span></label>
            <input type="email" class="form-input" id="co-email" value="customer@razdar.com" required />
          </div>
          <div class="form-group">
            <label class="form-label">Phone Number <span class="required">*</span></label>
            <input type="tel" class="form-input" id="co-phone" value="+1 (555) 234-5678" required />
          </div>
        </div>
        <button class="btn btn-primary btn-lg" id="co-next-1">Next: Shipping Address ${a("chevronRight")}</button>
      `,(g=document.getElementById("co-next-1"))==null||g.addEventListener("click",()=>d(2))):l===2?(h.innerHTML=`
        <h3 class="mb-4">Step 2 — Shipping Address</h3>
        <div class="form-group mb-4">
          <label class="form-label">Street Address <span class="required">*</span></label>
          <input type="text" class="form-input" id="co-street" value="452 Innovation Blvd, Suite 300" required />
        </div>
        <div class="grid grid-2 gap-4 mb-4">
          <div class="form-group">
            <label class="form-label">City <span class="required">*</span></label>
            <input type="text" class="form-input" value="San Francisco" />
          </div>
          <div class="form-group">
            <label class="form-label">Province / State <span class="required">*</span></label>
            <input type="text" class="form-input" value="California" />
          </div>
        </div>
        <div class="grid grid-2 gap-4 mb-6">
          <div class="form-group">
            <label class="form-label">Postal Code <span class="required">*</span></label>
            <input type="text" class="form-input" value="94107" />
          </div>
          <div class="form-group">
            <label class="form-label">Country <span class="required">*</span></label>
            <input type="text" class="form-input" value="United States" />
          </div>
        </div>
        <div class="flex gap-4">
          <button class="btn btn-secondary btn-lg" id="co-prev-2">Back</button>
          <button class="btn btn-primary btn-lg" id="co-next-2">Next: Delivery Method ${a("chevronRight")}</button>
        </div>
      `,(f=document.getElementById("co-prev-2"))==null||f.addEventListener("click",()=>d(1)),(w=document.getElementById("co-next-2"))==null||w.addEventListener("click",()=>d(3))):l===3?(h.innerHTML=`
        <h3 class="mb-4">Step 3 — Delivery Method</h3>
        <div class="flex flex-col gap-3 mb-6">
          <label class="radio-wrapper card p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <input type="radio" name="delivery" value="standard" checked />
              <div>
                <div class="font-semibold">Standard Shipping (3-5 Business Days)</div>
                <div class="text-xs text-tertiary">Reliable ground shipping with tracking</div>
              </div>
            </div>
            <strong class="text-success">${i===0?"FREE":v(i)}</strong>
          </label>

          <label class="radio-wrapper card p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <input type="radio" name="delivery" value="express" />
              <div>
                <div class="font-semibold">Express Air Priority (1-2 Business Days)</div>
                <div class="text-xs text-tertiary">Lightning fast priority delivery</div>
              </div>
            </div>
            <strong>$19.99</strong>
          </label>
        </div>
        <div class="flex gap-4">
          <button class="btn btn-secondary btn-lg" id="co-prev-3">Back</button>
          <button class="btn btn-primary btn-lg" id="co-next-3">Next: Payment ${a("chevronRight")}</button>
        </div>
      `,(x=document.getElementById("co-prev-3"))==null||x.addEventListener("click",()=>d(2)),(P=document.getElementById("co-next-3"))==null||P.addEventListener("click",()=>d(4))):l===4?(h.innerHTML=`
        <h3 class="mb-4">Step 4 — Payment Options</h3>
        <div class="flex flex-col gap-3 mb-6">
          <label class="radio-wrapper card p-4">
            <input type="radio" name="payment" value="cod" checked />
            <span class="font-semibold ml-2">Cash on Delivery (COD)</span>
          </label>
          <label class="radio-wrapper card p-4">
            <input type="radio" name="payment" value="card" />
            <span class="font-semibold ml-2">Credit / Debit Card (Visa, MasterCard, Amex)</span>
          </label>
          <label class="radio-wrapper card p-4">
            <input type="radio" name="payment" value="wallet" />
            <span class="font-semibold ml-2">Digital Wallet (Apple Pay, PayPal, Google Pay)</span>
          </label>
        </div>
        <div class="flex gap-4">
          <button class="btn btn-secondary btn-lg" id="co-prev-4">Back</button>
          <button class="btn btn-primary btn-lg" id="co-next-4">Next: Final Review ${a("chevronRight")}</button>
        </div>
      `,(A=document.getElementById("co-prev-4"))==null||A.addEventListener("click",()=>d(3)),(k=document.getElementById("co-next-4"))==null||k.addEventListener("click",()=>d(5))):l===5&&(h.innerHTML=`
        <h3 class="mb-4">Step 5 — Final Order Review</h3>
        <div class="card p-4 mb-4" style="background:var(--bg-secondary);">
          <div class="text-sm font-semibold mb-1">Shipping To:</div>
          <div class="text-xs text-secondary">Mohsin Ahmad • 452 Innovation Blvd, Suite 300, San Francisco, CA 94107</div>
        </div>
        <div class="card p-4 mb-6" style="background:var(--bg-secondary);">
          <div class="text-sm font-semibold mb-1">Payment Method:</div>
          <div class="text-xs text-secondary">Cash on Delivery / Direct Verification</div>
        </div>

        <div class="flex gap-4">
          <button class="btn btn-secondary btn-lg" id="co-prev-5">Back</button>
          <button class="btn btn-primary btn-xl flex-1" id="co-place-order-btn">
            ${a("check")} Place Order Now (${v(o)})
          </button>
        </div>
      `,(S=document.getElementById("co-prev-5"))==null||S.addEventListener("click",()=>d(4)),(u=document.getElementById("co-place-order-btn"))==null||u.addEventListener("click",()=>{c.clearCart(),window.location.hash="#/order-success"}))}}d(1)}async function ne(){const r=document.getElementById("app"),e=`RZD-${Math.floor(1e5+Math.random()*9e5)}`;r.innerHTML=`
    <div class="page-body">
      <div class="container container-sm text-center">
        <div class="order-success">
          <div class="success-check">
            ${a("check")}
          </div>

          <span class="badge badge-success mb-3">ORDER CONFIRMED</span>
          <h1 style="font-size:var(--fs-4xl);margin-bottom:var(--sp-2);">Thank You For Your Order!</h1>
          <p class="text-secondary mb-6" style="max-width:440px;">
            Your order <strong>#${e}</strong> has been successfully placed. We have sent a confirmation email with full tracking details.
          </p>

          <div class="card p-6 w-full text-left mb-8">
            <div class="flex flex-between mb-3 text-sm">
              <span class="text-tertiary">Order ID:</span>
              <span class="font-bold">${e}</span>
            </div>
            <div class="flex flex-between mb-3 text-sm">
              <span class="text-tertiary">Estimated Delivery:</span>
              <span class="font-semibold text-lime">In 2 - 4 Business Days</span>
            </div>
            <div class="flex flex-between mb-3 text-sm">
              <span class="text-tertiary">Payment Method:</span>
              <span>Cash on Delivery</span>
            </div>
            <div class="flex flex-between text-sm">
              <span class="text-tertiary">Status:</span>
              <span class="badge badge-primary">Processing</span>
            </div>
          </div>

          <div class="flex gap-4 w-full justify-center">
            <a href="#/dashboard/track-order" class="btn btn-primary btn-lg flex-1">
              ${a("truck")} Track Order Status
            </a>
            <a href="#/shop" class="btn btn-secondary btn-lg flex-1">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  `}const $=[{id:"usr-1",name:"Mohsin Ahmad",email:"customer@razdar.com",role:"customer",phone:"+1 (555) 234-5678",avatar:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",address:{street:"452 Innovation Blvd, Suite 300",city:"San Francisco",province:"California",country:"United States",postalCode:"94107"},ordersCount:8,points:1250,wishlistCount:5},{id:"usr-2",name:"TechMatrix Store",email:"seller@razdar.com",role:"seller",phone:"+1 (555) 987-6543",avatar:"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",storeName:"TechMatrix Official",sales:1420,revenue:"$184,250.00"},{id:"usr-3",name:"RAZDAR Super Admin",email:"admin@razdar.com",role:"admin",phone:"+1 (555) 000-1111",avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",permissions:["all"]}];async function le(){var e,t,s,i;const r=document.getElementById("app");r.innerHTML=`
    <div class="page-body">
      <div class="container container-sm">
        <div class="card p-8">
          <div class="text-center mb-8">
            <div class="navbar-brand justify-center mb-2">
              <div class="brand-icon">R</div>
              <span class="brand-text">RAZDAR</span>
            </div>
            <h2>Sign In to Your Account</h2>
            <p class="text-secondary text-sm">Access your orders, wishlist, and rewards.</p>
          </div>

          <!-- Demo Account Selector for instant testing -->
          <div class="mb-6 p-4 rounded-xl" style="background:var(--primary-subtle);border:1px solid var(--primary-muted);">
            <div class="text-xs font-bold text-lime mb-2 uppercase">Quick Demo Login:</div>
            <div class="flex gap-2 flex-wrap">
              <button class="btn btn-secondary btn-sm" id="demo-customer">Customer Account</button>
              <button class="btn btn-secondary btn-sm" id="demo-seller">Seller Account</button>
              <button class="btn btn-secondary btn-sm" id="demo-admin">Admin Account</button>
            </div>
          </div>

          <form id="login-form">
            <div class="form-group mb-4">
              <label class="form-label">Email or Phone Number</label>
              <input type="email" id="login-email" class="form-input" placeholder="e.g. customer@razdar.com" value="customer@razdar.com" required />
            </div>

            <div class="form-group mb-4">
              <div class="flex flex-between">
                <label class="form-label">Password</label>
                <a href="#/forgot-password" class="text-xs text-lime">Forgot Password?</a>
              </div>
              <input type="password" id="login-password" class="form-input" value="123456" required />
            </div>

            <div class="flex flex-between items-center mb-6">
              <label class="checkbox-wrapper">
                <input type="checkbox" checked />
                <span class="text-sm">Remember me</span>
              </label>
            </div>

            <button type="submit" class="btn btn-primary btn-xl btn-full mb-4">
              Sign In ${a("chevronRight")}
            </button>
          </form>

          <div class="separator my-6">OR</div>

          <p class="text-center text-sm text-secondary">
            Don't have an account? <a href="#/register" class="text-lime font-semibold">Register Now</a>
          </p>
        </div>
      </div>
    </div>
  `,(e=r.querySelector("#login-form"))==null||e.addEventListener("submit",o=>{o.preventDefault();const n=$[0];c.login(n,"customer"),window.location.hash="#/dashboard"}),(t=r.querySelector("#demo-customer"))==null||t.addEventListener("click",()=>{c.login($[0],"customer"),window.location.hash="#/dashboard"}),(s=r.querySelector("#demo-seller"))==null||s.addEventListener("click",()=>{c.login($[1],"seller"),window.location.hash="#/seller/dashboard"}),(i=r.querySelector("#demo-admin"))==null||i.addEventListener("click",()=>{c.login($[2],"admin"),window.location.hash="#/admin/dashboard"})}async function de(){var e;const r=document.getElementById("app");r.innerHTML=`
    <div class="page-body">
      <div class="container container-sm">
        <div class="card p-8">
          <div class="text-center mb-8">
            <div class="navbar-brand justify-center mb-2">
              <div class="brand-icon">R</div>
              <span class="brand-text">RAZDAR</span>
            </div>
            <h2>Create Your Account</h2>
            <p class="text-secondary text-sm">Join RAZDAR for exclusive discounts and rewards.</p>
          </div>

          <form id="register-form">
            <div class="form-group mb-4">
              <label class="form-label">Full Name <span class="required">*</span></label>
              <input type="text" class="form-input" placeholder="e.g. Mohsin Ahmad" required />
            </div>

            <div class="grid grid-2 gap-4 mb-4">
              <div class="form-group">
                <label class="form-label">Email Address <span class="required">*</span></label>
                <input type="email" class="form-input" placeholder="name@example.com" required />
              </div>
              <div class="form-group">
                <label class="form-label">Phone Number <span class="required">*</span></label>
                <input type="tel" class="form-input" placeholder="+1 (555) 000-0000" required />
              </div>
            </div>

            <div class="grid grid-2 gap-4 mb-4">
              <div class="form-group">
                <label class="form-label">Password <span class="required">*</span></label>
                <input type="password" class="form-input" placeholder="••••••••" required />
              </div>
              <div class="form-group">
                <label class="form-label">Confirm Password <span class="required">*</span></label>
                <input type="password" class="form-input" placeholder="••••••••" required />
              </div>
            </div>

            <label class="checkbox-wrapper mb-6">
              <input type="checkbox" required checked />
              <span class="text-xs text-secondary">
                I agree to RAZDAR's <a href="#/terms" class="text-lime">Terms of Service</a> and <a href="#/privacy-policy" class="text-lime">Privacy Policy</a>.
              </span>
            </label>

            <button type="submit" class="btn btn-primary btn-xl btn-full mb-4">
              Create Account ${a("chevronRight")}
            </button>
          </form>

          <p class="text-center text-sm text-secondary">
            Already have an account? <a href="#/login" class="text-lime font-semibold">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  `,(e=r.querySelector("#register-form"))==null||e.addEventListener("submit",t=>{t.preventDefault(),c.login({name:"New Customer",email:"newuser@razdar.com",role:"customer"}),window.location.hash="#/dashboard"})}async function ce(){var e;const r=document.getElementById("app");r.innerHTML=`
    <div class="page-body">
      <div class="container container-sm">
        <div class="card p-8 text-center">
          <div class="navbar-brand justify-center mb-2">
            <div class="brand-icon">R</div>
            <span class="brand-text">RAZDAR</span>
          </div>
          <h2 class="mb-2">Reset Password</h2>
          <p class="text-secondary text-sm mb-6">Enter your registered email address and we'll send you an OTP verification code.</p>

          <form id="fp-form">
            <div class="form-group mb-6 text-left">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-input" placeholder="e.g. user@example.com" required />
            </div>

            <button type="submit" class="btn btn-primary btn-xl btn-full mb-4">
              Send Reset Code ${a("chevronRight")}
            </button>
          </form>

          <a href="#/login" class="text-sm text-secondary link">Back to Login</a>
        </div>
      </div>
    </div>
  `,(e=r.querySelector("#fp-form"))==null||e.addEventListener("submit",t=>{t.preventDefault(),p.emit("toast:show",{type:"success",title:"Reset Code Sent",message:"Check your email inbox for the password reset OTP code."}),window.location.hash="#/login"})}async function pe(){const r=document.getElementById("app"),e=c.getWishlist();r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>My Wishlist</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Wishlist</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        ${e.length===0?`
          <div class="empty-state">
            <div class="empty-state-icon">${a("heart")}</div>
            <h3>Your Wishlist is Empty</h3>
            <p>Save products you love to your wishlist to track price changes and buy later.</p>
            <a href="#/shop" class="btn btn-primary btn-lg mt-4">Explore Products</a>
          </div>
        `:`
          <div class="grid grid-products">
            ${e.map(t=>b.render(t)).join("")}
          </div>
        `}
      </div>
    </div>
  `,b.attachEvents(r,m)}async function T(){const r=document.getElementById("app");r.innerHTML=`
    <div class="page-header text-center">
      <div class="container container-md">
        <h1 style="font-size:var(--fs-5xl);">About RAZDAR</h1>
        <p class="text-secondary text-lg mt-2">Your World. Your Choice.</p>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <!-- Our Story -->
        <div class="grid grid-2 gap-8 items-center mb-16">
          <div>
            <span class="badge badge-primary mb-3">OUR STORY</span>
            <h2 class="mb-4">Building the Future of Global E-Commerce</h2>
            <p class="text-secondary mb-4" style="line-height:1.7;">
              RAZDAR was founded with a singular vision: to create a high-end, seamless e-commerce marketplace that empowers buyers with limitless choice while giving verified sellers a powerful global stage.
            </p>
            <p class="text-secondary" style="line-height:1.7;">
              From next-gen consumer tech to handcrafted luxury fashion and Scandinavian interior design, RAZDAR curates the world's finest products into one unified, ultra-fast platform.
            </p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" style="border-radius:var(--radius-2xl);width:100%;box-shadow:var(--shadow-xl);" />
          </div>
        </div>

        <!-- Statistics Counter Grid -->
        <div class="card p-8 mb-16" style="background:linear-gradient(135deg, var(--graphite-800), var(--graphite-900));border:1px solid var(--primary-muted);">
          <div class="grid grid-4 text-center">
            <div>
              <div style="font-family:var(--font-heading);font-size:var(--fs-4xl);font-weight:800;color:var(--primary);">100K+</div>
              <div class="text-sm text-secondary mt-1">Happy Customers</div>
            </div>
            <div>
              <div style="font-family:var(--font-heading);font-size:var(--fs-4xl);font-weight:800;color:var(--primary);">50K+</div>
              <div class="text-sm text-secondary mt-1">Curated Products</div>
            </div>
            <div>
              <div style="font-family:var(--font-heading);font-size:var(--fs-4xl);font-weight:800;color:var(--primary);">1K+</div>
              <div class="text-sm text-secondary mt-1">Verified Sellers</div>
            </div>
            <div>
              <div style="font-family:var(--font-heading);font-size:var(--fs-4xl);font-weight:800;color:var(--primary);">99%</div>
              <div class="text-sm text-secondary mt-1">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        <!-- Our Core Values -->
        <div class="text-center mb-10">
          <h2>Why Choose RAZDAR</h2>
        </div>
        <div class="grid grid-3 gap-6">
          <div class="card p-6">
            <div class="category-card-icon mb-4">${a("sparkles")}</div>
            <h3 class="mb-2" style="font-size:18px;">Customer First</h3>
            <p class="text-secondary text-sm" style="line-height:1.6;">Every feature, interaction, and policy is engineered to delight you from browsing to unboxing.</p>
          </div>
          <div class="card p-6">
            <div class="category-card-icon mb-4">${a("shieldCheck")}</div>
            <h3 class="mb-2" style="font-size:18px;">Secure Shopping</h3>
            <p class="text-secondary text-sm" style="line-height:1.6;">Bank-grade SSL encryption and anti-fraud monitoring ensure 100% buyer protection.</p>
          </div>
          <div class="card p-6">
            <div class="category-card-icon mb-4">${a("truck")}</div>
            <h3 class="mb-2" style="font-size:18px;">Fast Delivery</h3>
            <p class="text-secondary text-sm" style="line-height:1.6;">Global logistics network ensuring rapid order fulfillment and live tracking.</p>
          </div>
        </div>
      </div>
    </div>
  `}async function ue(){var e;const r=document.getElementById("app");r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>Contact Us</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Contact</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="grid grid-2 gap-8 mb-12">
          <!-- Form -->
          <div class="card p-6">
            <h3 class="mb-4">Send Us a Message</h3>
            <form id="contact-form">
              <div class="form-group mb-4">
                <label class="form-label">Your Name</label>
                <input type="text" class="form-input" placeholder="e.g. Mohsin Ahmad" required />
              </div>
              <div class="form-group mb-4">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-input" placeholder="name@example.com" required />
              </div>
              <div class="form-group mb-4">
                <label class="form-label">Subject</label>
                <input type="text" class="form-input" placeholder="Order Inquiry, Feedback, etc." required />
              </div>
              <div class="form-group mb-6">
                <label class="form-label">Message</label>
                <textarea class="form-input" rows="5" placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-lg btn-full">
                Send Message ${a("chevronRight")}
              </button>
            </form>
          </div>

          <!-- Contact Details Cards -->
          <div class="flex flex-col gap-4">
            <div class="card p-6 flex items-start gap-4">
              <div class="category-card-icon">${a("messageSquare")}</div>
              <div>
                <h4 style="font-size:16px;">Customer Support</h4>
                <p class="text-sm text-secondary">Our dedicated team is ready to help 24/7.</p>
                <div class="font-bold text-lime mt-2">support@razdar.com</div>
              </div>
            </div>

            <div class="card p-6 flex items-start gap-4">
              <div class="category-card-icon">${a("store")}</div>
              <div>
                <h4 style="font-size:16px;">Seller Partnership</h4>
                <p class="text-sm text-secondary">Want to sell your products on RAZDAR?</p>
                <div class="font-bold text-lime mt-2">sellers@razdar.com</div>
              </div>
            </div>

            <div class="card p-6 flex items-start gap-4">
              <div class="category-card-icon">${a("truck")}</div>
              <div>
                <h4 style="font-size:16px;">Global HQ</h4>
                <p class="text-sm text-secondary">452 Innovation Blvd, Suite 300<br/>San Francisco, CA 94107, USA</p>
                <div class="font-bold text-lime mt-2">+1 (555) 234-5678</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,(e=r.querySelector("#contact-form"))==null||e.addEventListener("submit",t=>{t.preventDefault(),p.emit("toast:show",{type:"success",title:"Message Sent!",message:"Thank you for reaching out. We will get back to you within 24 hours."}),t.target.reset()})}async function he(){const r=document.getElementById("app"),e=[{q:"How can I place an order on RAZDAR?",a:'Browse our extensive catalog, select your desired color/size variants, click "Add to Cart", and proceed to checkout. You can check out as a guest or sign in for reward points.'},{q:"What payment methods are available?",a:"We accept Cash on Delivery (COD), Credit/Debit Cards (Visa, MasterCard, Amex), PayPal, Apple Pay, and Direct Bank Transfers."},{q:"How can I track my order status?",a:"Go to your Customer Dashboard > Track Order page or click the tracking link sent to your registered email address."},{q:"What is RAZDAR's 30-day return policy?",a:"If you are not 100% satisfied with your purchase, you can initiate a return or exchange within 30 days of delivery for a full refund."},{q:"How long does delivery take?",a:"Standard shipping takes 3-5 business days. Express Priority Air delivery arrives in 1-2 business days."},{q:"How can I contact support?",a:"Click the live chat button at the bottom right corner, visit our Contact page, or email support@razdar.com."}];r.innerHTML=`
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
          ${e.map((t,s)=>`
            <div class="accordion-item ${s===0?"active":""}">
              <div class="accordion-header">
                <span>${t.q}</span>
                <span class="accordion-icon">${a("chevronDown")}</span>
              </div>
              <div class="accordion-body" style="${s===0?"max-height:200px;":""}">
                <div class="accordion-body-inner">
                  ${t.a}
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `,r.querySelectorAll(".accordion-header").forEach(t=>{t.addEventListener("click",()=>{const s=t.parentElement,i=s.querySelector(".accordion-body");s.classList.contains("active")?(s.classList.remove("active"),i&&(i.style.maxHeight="0")):(s.classList.add("active"),i&&(i.style.maxHeight=`${i.scrollHeight+30}px`))})})}async function ve(){const r=document.getElementById("app");r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>Privacy Policy</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container container-md">
        <div class="card p-8">
          <h2 class="mb-4">Your Privacy Matters to RAZDAR</h2>
          <p class="text-secondary mb-4" style="line-height:1.7;">
            Last updated: August 14, 2026. RAZDAR Inc. ("RAZDAR", "we", "our") is committed to protecting your personal information and buyer privacy.
          </p>

          <h3 class="mb-2 mt-6">1. Information We Collect</h3>
          <p class="text-secondary mb-4" style="line-height:1.7;">
            We collect personal information you provide when creating an account, placing an order, subscribing to newsletter, or contacting customer support (including full name, shipping address, email, phone number).
          </p>

          <h3 class="mb-2 mt-6">2. How We Use Your Data</h3>
          <p class="text-secondary mb-4" style="line-height:1.7;">
            Your data is used solely to process orders, facilitate seller logistics, handle buyer queries, prevent fraudulent transactions, and deliver personalized product recommendations.
          </p>

          <h3 class="mb-2 mt-6">3. Security Standards</h3>
          <p class="text-secondary" style="line-height:1.7;">
            All financial transactions are protected using industry-standard 256-bit SSL encryption. We never sell or rent your personal information to third parties.
          </p>
        </div>
      </div>
    </div>
  `}async function F(){const r=document.getElementById("app");r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>Terms & Conditions</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Terms & Conditions</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container container-md">
        <div class="card p-8">
          <h2 class="mb-4">RAZDAR Terms of Service</h2>
          <p class="text-secondary mb-4" style="line-height:1.7;">
            By accessing or using the RAZDAR website and mobile services, you agree to be bound by these Terms and Conditions.
          </p>
          <h3 class="mb-2 mt-6">1. Marketplace Platform</h3>
          <p class="text-secondary mb-4" style="line-height:1.7;">
            RAZDAR operates a global multi-seller marketplace connecting customers with verified independent merchants and brand stores.
          </p>
          <h3 class="mb-2 mt-6">2. Order Acceptance</h3>
          <p class="text-secondary" style="line-height:1.7;">
            All orders placed on RAZDAR are subject to product availability and order confirmation. We reserve the right to cancel suspicious or fraudulent orders.
          </p>
        </div>
      </div>
    </div>
  `}async function me(){const r=document.getElementById("app");r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>Refund & Return Policy</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Refund Policy</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container container-md">
        <div class="card p-8">
          <h2 class="mb-4">30-Day Money Back Guarantee</h2>
          <p class="text-secondary mb-4" style="line-height:1.7;">
            We want you to love everything you order from RAZDAR. If you are not satisfied for any reason, you may request a return within 30 days of receiving your package.
          </p>
          <h3 class="mb-2 mt-6">Return Conditions</h3>
          <ul class="text-secondary" style="line-height:1.8;padding-left:20px;">
            <li>Items must be unworn, unused, and in original packaging with tags intact.</li>
            <li>Electronics must include all original cable accessories and manual cards.</li>
            <li>Refunds will be processed back to your original payment method within 3 business days of package inspection.</li>
          </ul>
        </div>
      </div>
    </div>
  `}async function ge(){const r=document.getElementById("app");r.innerHTML=`
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
            ${a("home")} Back to RAZDAR Home
          </a>
        </div>
      </div>
    </div>
  `}const q=[{id:"ORD-98421",date:"2026-08-10",total:449.98,status:"Delivered",paymentStatus:"Paid",paymentMethod:"Credit Card",trackingNumber:"RZD-TRK-884219",estimatedDelivery:"August 12, 2026",items:[{id:"prod-1",name:"Apex Pro ANC Wireless Headphones",price:299.99,quantity:1,color:"Lime Spark",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"},{id:"prod-7",name:"Phantom Nitro Running Shoes",price:149.99,quantity:1,size:"US 10",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80"}],timeline:[{step:"Order Placed",date:"Aug 10, 09:30 AM",completed:!0},{step:"Confirmed",date:"Aug 10, 10:15 AM",completed:!0},{step:"Packed",date:"Aug 10, 04:00 PM",completed:!0},{step:"Shipped",date:"Aug 11, 08:30 AM",completed:!0},{step:"Out for Delivery",date:"Aug 12, 09:00 AM",completed:!0},{step:"Delivered",date:"Aug 12, 02:45 PM",completed:!0}],shippingAddress:{name:"Mohsin Ahmad",street:"452 Innovation Blvd, Suite 300",city:"San Francisco",province:"CA",postalCode:"94107",country:"USA"}},{id:"ORD-98422",date:"2026-08-13",total:1099.99,status:"Shipped",paymentStatus:"Paid",paymentMethod:"Digital Wallet",trackingNumber:"RZD-TRK-991204",estimatedDelivery:"August 15, 2026",items:[{id:"prod-3",name:"Volt X Ultra 5G (512GB)",price:1099.99,quantity:1,color:"Titanium Gray",image:"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=400&q=80"}],timeline:[{step:"Order Placed",date:"Aug 13, 01:10 PM",completed:!0},{step:"Confirmed",date:"Aug 13, 01:25 PM",completed:!0},{step:"Packed",date:"Aug 13, 06:00 PM",completed:!0},{step:"Shipped",date:"Aug 14, 08:00 AM",completed:!0},{step:"Out for Delivery",date:"Pending",completed:!1},{step:"Delivered",date:"Pending",completed:!1}],shippingAddress:{name:"Mohsin Ahmad",street:"452 Innovation Blvd, Suite 300",city:"San Francisco",province:"CA",postalCode:"94107",country:"USA"}}];async function fe(){const r=document.getElementById("app"),e=c.getUser()||{name:"Mohsin Ahmad",email:"customer@razdar.com"},t=c.getWishlist().length;r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>Customer Dashboard</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Dashboard</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <!-- Dashboard Sidebar -->
          <aside class="dashboard-sidebar">
            <div class="flex items-center gap-3 mb-6 p-2">
              <div class="avatar avatar-initials avatar-lg">${e.name.charAt(0)}</div>
              <div>
                <div class="font-bold text-base">${e.name}</div>
                <div class="text-xs text-tertiary">${e.email}</div>
              </div>
            </div>

            <nav class="sidebar-nav">
              <a href="#/dashboard" class="sidebar-nav-item active">${a("layoutDashboard")} Dashboard</a>
              <a href="#/dashboard/orders" class="sidebar-nav-item">${a("shoppingBag")} My Orders</a>
              <a href="#/dashboard/track-order" class="sidebar-nav-item">${a("truck")} Track Order</a>
              <a href="#/wishlist" class="sidebar-nav-item">${a("heart")} Wishlist (${t})</a>
              <a href="#/dashboard/profile" class="sidebar-nav-item">${a("user")} My Profile</a>
              <a href="#/dashboard/addresses" class="sidebar-nav-item">${a("home")} Addresses</a>
              <a href="#/dashboard/reviews" class="sidebar-nav-item">${a("star")} My Reviews</a>
              <a href="#/dashboard/settings" class="sidebar-nav-item">${a("tag")} Settings</a>
            </nav>
          </aside>

          <!-- Dashboard Content Area -->
          <main class="dashboard-content">
            <!-- Stats Cards -->
            <div class="grid grid-4 gap-4 mb-8">
              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Total Orders</div>
                  <div class="stat-card-icon" style="background:var(--primary-muted);color:var(--primary);">${a("shoppingBag")}</div>
                </div>
                <div class="stat-card-value">8</div>
                <div class="stat-card-trend up">All-time purchases</div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Pending Orders</div>
                  <div class="stat-card-icon" style="background:var(--warning-bg);color:var(--warning);">${a("truck")}</div>
                </div>
                <div class="stat-card-value">1</div>
                <div class="stat-card-trend">In transit</div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Delivered Orders</div>
                  <div class="stat-card-icon" style="background:var(--success-bg);color:var(--success);">${a("check")}</div>
                </div>
                <div class="stat-card-value">7</div>
                <div class="stat-card-trend up">Completed</div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Reward Points</div>
                  <div class="stat-card-icon" style="background:var(--info-bg);color:var(--info);">${a("sparkles")}</div>
                </div>
                <div class="stat-card-value">1,250</div>
                <div class="stat-card-trend up">Value $12.50</div>
              </div>
            </div>

            <!-- Recent Orders Table -->
            <div class="flex flex-between items-center mb-4">
              <h3 style="font-size:18px;">Recent Orders</h3>
              <a href="#/dashboard/orders" class="link text-sm font-semibold">View All</a>
            </div>

            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${q.map(s=>`
                    <tr>
                      <td class="font-bold">${s.id}</td>
                      <td class="text-sm text-secondary">${s.date}</td>
                      <td class="font-bold text-lime">${v(s.total)}</td>
                      <td><span class="badge badge-success">${s.paymentStatus}</span></td>
                      <td><span class="badge ${s.status==="Delivered"?"badge-success":"badge-primary"}">${s.status}</span></td>
                      <td>
                        <a href="#/dashboard/track-order" class="btn btn-outline btn-sm">
                          Track Order
                        </a>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  `}async function be(){var t;const r=document.getElementById("app"),e=c.getUser()||{name:"Mohsin Ahmad",email:"customer@razdar.com",phone:"+1 (555) 234-5678"};r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>My Profile</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/dashboard">Dashboard</a>
          <span class="separator">/</span>
          <span>Profile</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/dashboard" class="sidebar-nav-item">${a("layoutDashboard")} Dashboard</a>
              <a href="#/dashboard/profile" class="sidebar-nav-item active">${a("user")} My Profile</a>
              <a href="#/dashboard/orders" class="sidebar-nav-item">${a("shoppingBag")} My Orders</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <h3 class="mb-4">Edit Personal Information</h3>
            <form id="profile-form">
              <div class="form-group mb-4">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-input" value="${e.name}" required />
              </div>
              <div class="grid grid-2 gap-4 mb-4">
                <div class="form-group">
                  <label class="form-label">Email Address</label>
                  <input type="email" class="form-input" value="${e.email}" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Phone Number</label>
                  <input type="tel" class="form-input" value="${e.phone||"+1 (555) 234-5678"}" required />
                </div>
              </div>
              <button type="submit" class="btn btn-primary btn-lg mt-4">Save Changes</button>
            </form>
          </main>
        </div>
      </div>
    </div>
  `,(t=r.querySelector("#profile-form"))==null||t.addEventListener("submit",s=>{s.preventDefault(),p.emit("toast:show",{type:"success",title:"Profile Updated",message:"Your personal information has been saved successfully."})})}async function ye(){const r=document.getElementById("app");r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>My Orders</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/dashboard">Dashboard</a>
          <span class="separator">/</span>
          <span>Orders</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/dashboard" class="sidebar-nav-item">${a("layoutDashboard")} Dashboard</a>
              <a href="#/dashboard/orders" class="sidebar-nav-item active">${a("shoppingBag")} My Orders</a>
              <a href="#/dashboard/track-order" class="sidebar-nav-item">${a("truck")} Track Order</a>
              <a href="#/wishlist" class="sidebar-nav-item">${a("heart")} Wishlist</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${q.map(e=>`
                    <tr>
                      <td class="font-bold">${e.id}</td>
                      <td class="text-sm text-secondary">${e.date}</td>
                      <td class="text-sm">${e.items.length} Product(s)</td>
                      <td class="font-bold text-lime">${v(e.total)}</td>
                      <td><span class="badge ${e.status==="Delivered"?"badge-success":"badge-primary"}">${e.status}</span></td>
                      <td>
                        <a href="#/dashboard/track-order" class="btn btn-outline btn-sm">
                          Track Status
                        </a>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  `}async function we(){const r=document.getElementById("app"),e=q[1];r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>Track Your Order</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/dashboard">Dashboard</a>
          <span class="separator">/</span>
          <span>Track Order</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <!-- Sidebar -->
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/dashboard" class="sidebar-nav-item">${a("layoutDashboard")} Dashboard</a>
              <a href="#/dashboard/orders" class="sidebar-nav-item">${a("shoppingBag")} My Orders</a>
              <a href="#/dashboard/track-order" class="sidebar-nav-item active">${a("truck")} Track Order</a>
              <a href="#/wishlist" class="sidebar-nav-item">${a("heart")} Wishlist</a>
            </nav>
          </aside>

          <!-- Tracking Content -->
          <main class="dashboard-content">
            <div class="card p-6 mb-8" style="background:var(--bg-secondary);">
              <div class="flex flex-between flex-wrap gap-4 items-center">
                <div>
                  <div class="text-xs text-tertiary uppercase tracking-wider">Tracking Number</div>
                  <div class="font-bold text-lg text-lime">${e.trackingNumber}</div>
                </div>
                <div>
                  <div class="text-xs text-tertiary uppercase tracking-wider">Order ID</div>
                  <div class="font-bold text-base">${e.id}</div>
                </div>
                <div>
                  <div class="text-xs text-tertiary uppercase tracking-wider">Estimated Delivery</div>
                  <div class="font-bold text-base text-success">${e.estimatedDelivery}</div>
                </div>
              </div>
            </div>

            <!-- Timeline -->
            <h3 class="mb-6">Order Status Progression</h3>
            <div class="timeline card p-6 mb-8">
              ${e.timeline.map((t,s)=>`
                <div class="timeline-item ${t.completed?"completed":""} ${t.step===e.status?"active":""}">
                  <div class="timeline-dot"></div>
                  <div class="timeline-title">${t.step}</div>
                  <div class="timeline-desc">${t.date}</div>
                </div>
              `).join("")}
            </div>

            <!-- Items in Package -->
            <h3 class="mb-4">Package Contents</h3>
            <div class="card p-4">
              ${e.items.map(t=>`
                <div class="flex items-center justify-between p-2">
                  <div class="flex items-center gap-3">
                    <img src="${t.image}" style="width:48px;height:48px;border-radius:var(--radius-md);object-fit:cover;" />
                    <div>
                      <div class="font-semibold text-sm">${t.name}</div>
                      <div class="text-xs text-tertiary">Qty: ${t.quantity} ${t.color?`• ${t.color}`:""}</div>
                    </div>
                  </div>
                  <div class="font-bold">${v(t.price)}</div>
                </div>
              `).join("")}
            </div>
          </main>
        </div>
      </div>
    </div>
  `}async function Se(){const r=document.getElementById("app");r.innerHTML=`
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
              <a href="#/dashboard" class="sidebar-nav-item">${a("layoutDashboard")} Dashboard</a>
              <a href="#/dashboard/addresses" class="sidebar-nav-item active">${a("home")} Addresses</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <div class="flex flex-between items-center mb-6">
              <h3>Shipping Addresses</h3>
              <button class="btn btn-primary btn-sm">${a("plus")} Add New Address</button>
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
  `}async function xe(){const r=document.getElementById("app");r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>My Product Reviews</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/dashboard">Dashboard</a>
          <span class="separator">/</span>
          <span>My Reviews</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/dashboard" class="sidebar-nav-item">${a("layoutDashboard")} Dashboard</a>
              <a href="#/dashboard/reviews" class="sidebar-nav-item active">${a("star")} My Reviews</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <h3 class="mb-4">Reviews Written by You</h3>
            <div class="card p-4 mb-4">
              <div class="flex items-center justify-between mb-2">
                <div class="font-bold text-sm">Apex Pro ANC Wireless Headphones</div>
                <div class="stars"><span class="star-filled">${a("star")}</span><span class="star-filled">${a("star")}</span><span class="star-filled">${a("star")}</span><span class="star-filled">${a("star")}</span><span class="star-filled">${a("star")}</span></div>
              </div>
              <p class="text-sm text-secondary">"Absolute best sound quality I have ever experienced. The Lime Spark accents look sick!"</p>
              <div class="text-xs text-tertiary mt-2">Reviewed on Aug 11, 2026</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  `}async function ke(){var e;const r=document.getElementById("app");r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>Account Settings</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/dashboard">Dashboard</a>
          <span class="separator">/</span>
          <span>Settings</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/dashboard" class="sidebar-nav-item">${a("layoutDashboard")} Dashboard</a>
              <a href="#/dashboard/settings" class="sidebar-nav-item active">${a("tag")} Settings</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <h3 class="mb-4">Password & Security</h3>
            <form id="settings-pw-form" class="mb-8">
              <div class="form-group mb-4">
                <label class="form-label">Current Password</label>
                <input type="password" class="form-input" required />
              </div>
              <div class="form-group mb-4">
                <label class="form-label">New Password</label>
                <input type="password" class="form-input" required />
              </div>
              <button type="submit" class="btn btn-primary">Update Password</button>
            </form>

            <h3 class="mb-4">Notification Preferences</h3>
            <div class="flex flex-col gap-3">
              <label class="checkbox-wrapper">
                <input type="checkbox" checked />
                <span>Order Status Update Emails</span>
              </label>
              <label class="checkbox-wrapper">
                <input type="checkbox" checked />
                <span>Flash Sale & Discount SMS Notifications</span>
              </label>
            </div>
          </main>
        </div>
      </div>
    </div>
  `,(e=r.querySelector("#settings-pw-form"))==null||e.addEventListener("submit",t=>{t.preventDefault(),p.emit("toast:show",{type:"success",title:"Password Updated",message:"Your account password has been updated."})})}async function Ae(){var e;const r=document.getElementById("app");r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>Sell on RAZDAR — Become a Merchant</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Seller Registration</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container container-md">
        <div class="card p-8">
          <div class="text-center mb-8">
            <span class="badge badge-primary mb-2">MERCHANT HUB</span>
            <h2>Expand Your Business Worldwide</h2>
            <p class="text-secondary text-sm">Reach 100K+ active buyers on RAZDAR marketplace.</p>
          </div>

          <form id="seller-reg-form">
            <div class="form-group mb-4">
              <label class="form-label">Store / Business Name <span class="required">*</span></label>
              <input type="text" class="form-input" placeholder="e.g. Apex Tech Official" required />
            </div>

            <div class="grid grid-2 gap-4 mb-4">
              <div class="form-group">
                <label class="form-label">Owner Name <span class="required">*</span></label>
                <input type="text" class="form-input" placeholder="Owner Full Name" required />
              </div>
              <div class="form-group">
                <label class="form-label">Business Category <span class="required">*</span></label>
                <select class="form-input">
                  <option>Electronics & Audio</option>
                  <option>Mobiles & Accessories</option>
                  <option>Fashion & Apparel</option>
                  <option>Home & Living</option>
                  <option>Gaming Gear</option>
                </select>
              </div>
            </div>

            <div class="grid grid-2 gap-4 mb-4">
              <div class="form-group">
                <label class="form-label">Business Email <span class="required">*</span></label>
                <input type="email" class="form-input" placeholder="seller@business.com" required />
              </div>
              <div class="form-group">
                <label class="form-label">Phone Number <span class="required">*</span></label>
                <input type="tel" class="form-input" placeholder="+1 (555) 000-0000" required />
              </div>
            </div>

            <div class="form-group mb-6">
              <label class="form-label">Business Address <span class="required">*</span></label>
              <input type="text" class="form-input" placeholder="HQ Address, City, Country" required />
            </div>

            <button type="submit" class="btn btn-primary btn-xl btn-full">
              Submit Seller Application ${a("chevronRight")}
            </button>
          </form>
        </div>
      </div>
    </div>
  `,(e=r.querySelector("#seller-reg-form"))==null||e.addEventListener("submit",t=>{t.preventDefault(),p.emit("toast:show",{type:"success",title:"Application Submitted!",message:"Your seller merchant application has been received and is under review."}),c.login({name:"Apex Tech Official",email:"seller@razdar.com",role:"seller"},"seller"),window.location.hash="#/seller/dashboard"})}const L=[{id:"s1",name:"TechMatrix",logo:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",banner:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",rating:4.8,reviewsCount:1420,followers:"12.4K",verified:!0,joinedDate:"Jan 2023",productsCount:48,description:"Premier supplier of high-end audio, soundbars, and consumer electronics."},{id:"s2",name:"Volt Store Official",logo:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",banner:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",rating:4.9,reviewsCount:5200,followers:"84.2K",verified:!0,joinedDate:"Nov 2022",productsCount:120,description:"Official flagship store for Volt Mobile, Smartwatches & Ultra devices."},{id:"s3",name:"Titan Tech",logo:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",banner:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",rating:4.9,reviewsCount:890,followers:"45.1K",verified:!0,joinedDate:"Mar 2023",productsCount:32,description:"High performance creator workstations, laptops, and ultra-thin devices."}];async function Ce(){const r=document.getElementById("app"),e=L[0];r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>Seller Merchant Hub</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Seller Hub</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <!-- Sidebar -->
          <aside class="dashboard-sidebar">
            <div class="flex items-center gap-3 mb-6 p-2">
              <img src="${e.logo}" class="avatar avatar-lg" />
              <div>
                <div class="font-bold text-base">${e.name} ✓</div>
                <div class="text-xs text-tertiary">Verified Merchant</div>
              </div>
            </div>

            <nav class="sidebar-nav">
              <a href="#/seller/dashboard" class="sidebar-nav-item active">${a("layoutDashboard")} Overview</a>
              <a href="#/seller/store" class="sidebar-nav-item">${a("store")} View My Store Page</a>
              <a href="#/seller/products" class="sidebar-nav-item">${a("grid")} Product Catalog</a>
            </nav>
          </aside>

          <!-- Main Dashboard Overview -->
          <main class="dashboard-content">
            <!-- Stats -->
            <div class="grid grid-4 gap-4 mb-8">
              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Total Revenue</div>
                  <div class="stat-card-icon" style="background:var(--primary-muted);color:var(--primary);">${a("sparkles")}</div>
                </div>
                <div class="stat-card-value">$184,250</div>
                <div class="stat-card-trend up">↑ +18.4% this month</div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Total Orders</div>
                  <div class="stat-card-icon" style="background:var(--info-bg);color:var(--info);">${a("shoppingBag")}</div>
                </div>
                <div class="stat-card-value">1,420</div>
                <div class="stat-card-trend up">↑ 42 new orders</div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Products Active</div>
                  <div class="stat-card-icon" style="background:var(--success-bg);color:var(--success);">${a("grid")}</div>
                </div>
                <div class="stat-card-value">48</div>
                <div class="stat-card-trend">All in stock</div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Store Followers</div>
                  <div class="stat-card-icon" style="background:var(--warning-bg);color:var(--warning);">${a("user")}</div>
                </div>
                <div class="stat-card-value">12.4K</div>
                <div class="stat-card-trend up">↑ +420 this week</div>
              </div>
            </div>

            <!-- Recent Merchant Orders -->
            <h3 class="mb-4">Recent Merchant Orders</h3>
            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="font-bold">ORD-98421</td>
                    <td>Mohsin Ahmad</td>
                    <td>Apex Pro ANC Headphones</td>
                    <td class="font-bold text-lime">$299.99</td>
                    <td><span class="badge badge-success">Delivered</span></td>
                  </tr>
                  <tr>
                    <td class="font-bold">ORD-98425</td>
                    <td>Sarah Jenkins</td>
                    <td>Spatial Soundbar 300W</td>
                    <td class="font-bold text-lime">$189.00</td>
                    <td><span class="badge badge-primary">Processing</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  `}async function $e(){var i;const r=document.getElementById("app"),e=L[0],t=m.filter(o=>o.seller.id===e.id||o.category==="electronics");let s=!1;r.innerHTML=`
    <div class="page-body">
      <div class="container">
        <!-- Store Header Banner -->
        <div class="card overflow-hidden mb-8" style="position:relative;">
          <div style="height:220px;background:url('${e.banner}') center/cover no-repeat;"></div>
          <div class="p-6 flex flex-between flex-wrap gap-6 items-end" style="background:var(--bg-card);margin-top:-40px;position:relative;z-index:2;border-radius:var(--radius-xl);">
            <div class="flex items-center gap-4">
              <img src="${e.logo}" style="width:88px;height:88px;border-radius:var(--radius-xl);border:4px solid var(--bg-card);object-fit:cover;" />
              <div>
                <div class="flex items-center gap-2">
                  <h1 style="font-size:var(--fs-2xl);">${e.name}</h1>
                  <span class="badge badge-primary">✓ VERIFIED SELLER</span>
                </div>
                <div class="text-sm text-secondary mt-1">
                  ${e.rating} ★ Rating • ${e.followers} Followers • Joined ${e.joinedDate}
                </div>
                <p class="text-xs text-tertiary mt-2">${e.description}</p>
              </div>
            </div>

            <button class="btn ${s?"btn-secondary":"btn-primary"} btn-lg" id="seller-follow-btn">
              ${s?"Following":"+ Follow Store"}
            </button>
          </div>
        </div>

        <!-- Store Products -->
        <h2 class="mb-6">Store Catalog (${t.length})</h2>
        <div class="grid grid-products">
          ${t.map(o=>b.render(o)).join("")}
        </div>
      </div>
    </div>
  `,(i=r.querySelector("#seller-follow-btn"))==null||i.addEventListener("click",o=>{s=!s,o.target.textContent=s?"Following":"+ Follow Store",p.emit("toast:show",{type:"success",title:s?"Store Followed":"Unfollowed Store",message:`You are now ${s?"following":"no longer following"} ${e.name}.`})}),b.attachEvents(r,m)}async function Pe(){var e;const r=document.getElementById("app");r.innerHTML=`
    <div class="page-header">
      <div class="container">
        <h1>Merchant Products Catalog</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/seller/dashboard">Seller Hub</a>
          <span class="separator">/</span>
          <span>Products</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/seller/dashboard" class="sidebar-nav-item">${a("layoutDashboard")} Overview</a>
              <a href="#/seller/products" class="sidebar-nav-item active">${a("grid")} Product Catalog</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <div class="flex flex-between items-center mb-6">
              <h3>My Products (${m.length})</h3>
              <button class="btn btn-primary btn-sm" id="seller-add-prod-btn">${a("plus")} Add New Product</button>
            </div>

            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${m.map(t=>`
                    <tr>
                      <td>
                        <div class="flex items-center gap-3">
                          <img src="${t.images[0]}" style="width:40px;height:40px;border-radius:var(--radius-md);object-fit:cover;" />
                          <span class="font-semibold text-sm">${t.name}</span>
                        </div>
                      </td>
                      <td class="text-sm text-secondary">${t.category}</td>
                      <td class="font-bold text-lime">${v(t.price)}</td>
                      <td>${t.stock} units</td>
                      <td><span class="badge ${t.inStock?"badge-success":"badge-danger"}">${t.inStock?"Active":"Draft"}</span></td>
                      <td>
                        <button class="btn btn-secondary btn-sm">Edit</button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  `,(e=r.querySelector("#seller-add-prod-btn"))==null||e.addEventListener("click",()=>{p.emit("toast:show",{type:"info",title:"Add Product Modal",message:"Merchant product creator drawer opened."})})}async function Te(){var e;const r=document.getElementById("app");r.innerHTML=`
    <div class="page-body">
      <div class="container container-sm">
        <div class="card p-8">
          <div class="text-center mb-8">
            <span class="badge badge-danger mb-2">SUPER ADMIN PORTAL</span>
            <h2>RAZDAR Admin Portal</h2>
            <p class="text-secondary text-sm">Authorized personnel security login.</p>
          </div>

          <form id="admin-login-form">
            <div class="form-group mb-4">
              <label class="form-label">Admin Email</label>
              <input type="email" class="form-input" value="admin@razdar.com" required />
            </div>

            <div class="form-group mb-6">
              <label class="form-label">Security Password</label>
              <input type="password" class="form-input" value="admin123" required />
            </div>

            <button type="submit" class="btn btn-primary btn-xl btn-full">
              Authenticate & Launch Control Center ${a("chevronRight")}
            </button>
          </form>
        </div>
      </div>
    </div>
  `,(e=r.querySelector("#admin-login-form"))==null||e.addEventListener("submit",t=>{t.preventDefault(),c.login($[2],"admin"),window.location.hash="#/admin/dashboard"})}async function qe(){const r=document.getElementById("app");r.innerHTML=`
    <div class="page-header" style="background:var(--graphite-900);color:#fff;">
      <div class="container">
        <h1>RAZDAR Super Admin Dashboard</h1>
        <div class="breadcrumb">
          <a href="#/" style="color:var(--lime-300);">Home</a>
          <span class="separator">/</span>
          <span>Control Panel</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <!-- Admin Sidebar -->
          <aside class="dashboard-sidebar">
            <div class="flex items-center gap-2 mb-6 p-2">
              <span class="badge badge-danger">SUPER ADMIN</span>
            </div>

            <nav class="sidebar-nav">
              <a href="#/admin/dashboard" class="sidebar-nav-item active">${a("layoutDashboard")} Overview</a>
              <a href="#/admin/users" class="sidebar-nav-item">${a("user")} User Management</a>
              <a href="#/admin/sellers" class="sidebar-nav-item">${a("store")} Seller Approvals</a>
              <a href="#/admin/products" class="sidebar-nav-item">${a("grid")} Product Catalog</a>
              <a href="#/admin/orders" class="sidebar-nav-item">${a("shoppingBag")} Global Orders</a>
              <a href="#/admin/inventory" class="sidebar-nav-item">${a("truck")} Inventory</a>
              <a href="#/admin/analytics" class="sidebar-nav-item">${a("sparkles")} Analytics</a>
              <a href="#/admin/coupons" class="sidebar-nav-item">${a("tag")} Coupons</a>
              <a href="#/admin/support" class="sidebar-nav-item">${a("messageSquare")} Support Tickets</a>
            </nav>
          </aside>

          <!-- Admin Main Content -->
          <main class="dashboard-content">
            <!-- Key Metric Stat Cards -->
            <div class="grid grid-4 gap-4 mb-8">
              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Total Platform Revenue</div>
                  <div class="stat-card-icon" style="background:var(--primary-muted);color:var(--primary);">${a("sparkles")}</div>
                </div>
                <div class="stat-card-value">$1,248,500</div>
                <div class="stat-card-trend up">↑ +24.5% vs last month</div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Total Orders</div>
                  <div class="stat-card-icon" style="background:var(--success-bg);color:var(--success);">${a("shoppingBag")}</div>
                </div>
                <div class="stat-card-value">12,450</div>
                <div class="stat-card-trend up">↑ +1,200 this week</div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Active Customers</div>
                  <div class="stat-card-icon" style="background:var(--info-bg);color:var(--info);">${a("user")}</div>
                </div>
                <div class="stat-card-value">104,200</div>
                <div class="stat-card-trend up">↑ +3,400 new users</div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Verified Sellers</div>
                  <div class="stat-card-icon" style="background:var(--warning-bg);color:var(--warning);">${a("store")}</div>
                </div>
                <div class="stat-card-value">1,050</div>
                <div class="stat-card-trend up">14 pending review</div>
              </div>
            </div>

            <!-- Revenue Progress Charts UI -->
            <div class="card p-6 mb-8">
              <div class="flex flex-between items-center mb-4">
                <h3>Monthly Revenue & Sales Growth</h3>
                <span class="badge badge-primary">2026 Live Data</span>
              </div>
              <div style="display:flex;align-items:flex-end;gap:var(--sp-4);height:180px;padding-top:var(--sp-4);border-bottom:1px solid var(--border-primary);">
                <div style="flex:1;background:var(--primary-muted);height:40%;border-radius:var(--radius-md) var(--radius-md) 0 0;position:relative;">
                  <span class="text-xs font-bold" style="position:absolute;top:-20px;width:100%;text-align:center;">Jan</span>
                </div>
                <div style="flex:1;background:var(--primary-muted);height:60%;border-radius:var(--radius-md) var(--radius-md) 0 0;position:relative;">
                  <span class="text-xs font-bold" style="position:absolute;top:-20px;width:100%;text-align:center;">Feb</span>
                </div>
                <div style="flex:1;background:var(--primary-muted);height:55%;border-radius:var(--radius-md) var(--radius-md) 0 0;position:relative;">
                  <span class="text-xs font-bold" style="position:absolute;top:-20px;width:100%;text-align:center;">Mar</span>
                </div>
                <div style="flex:1;background:var(--primary-muted);height:75%;border-radius:var(--radius-md) var(--radius-md) 0 0;position:relative;">
                  <span class="text-xs font-bold" style="position:absolute;top:-20px;width:100%;text-align:center;">Apr</span>
                </div>
                <div style="flex:1;background:var(--primary-muted);height:85%;border-radius:var(--radius-md) var(--radius-md) 0 0;position:relative;">
                  <span class="text-xs font-bold" style="position:absolute;top:-20px;width:100%;text-align:center;">May</span>
                </div>
                <div style="flex:1;background:var(--primary-muted);height:90%;border-radius:var(--radius-md) var(--radius-md) 0 0;position:relative;">
                  <span class="text-xs font-bold" style="position:absolute;top:-20px;width:100%;text-align:center;">Jun</span>
                </div>
                <div style="flex:1;background:var(--primary);height:100%;border-radius:var(--radius-md) var(--radius-md) 0 0;position:relative;">
                  <span class="text-xs font-bold text-lime" style="position:absolute;top:-20px;width:100%;text-align:center;">Aug</span>
                </div>
              </div>
            </div>

            <!-- Recent System Activity -->
            <h3 class="mb-4">Recent Marketplace Transactions</h3>
            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Seller Store</th>
                    <th>Amount</th>
                    <th>Commission (10%)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="font-bold">ORD-98421</td>
                    <td>Mohsin Ahmad</td>
                    <td>TechMatrix Official</td>
                    <td class="font-bold text-lime">$449.98</td>
                    <td class="font-bold">$44.99</td>
                    <td><span class="badge badge-success">Completed</span></td>
                  </tr>
                  <tr>
                    <td class="font-bold">ORD-98422</td>
                    <td>Mohsin Ahmad</td>
                    <td>Volt Store Official</td>
                    <td class="font-bold text-lime">$1,099.99</td>
                    <td class="font-bold">$109.99</td>
                    <td><span class="badge badge-primary">Processing</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  `}async function Be(){const r=document.getElementById("app");r.innerHTML=`
    <div class="page-header" style="background:var(--graphite-900);color:#fff;">
      <div class="container">
        <h1>User Management</h1>
        <div class="breadcrumb">
          <a href="#/admin/dashboard" style="color:var(--lime-300);">Control Panel</a>
          <span class="separator">/</span>
          <span>Users</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/admin/dashboard" class="sidebar-nav-item">${a("layoutDashboard")} Overview</a>
              <a href="#/admin/users" class="sidebar-nav-item active">${a("user")} User Management</a>
              <a href="#/admin/sellers" class="sidebar-nav-item">${a("store")} Seller Approvals</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <div class="flex flex-between items-center mb-6">
              <h3>Registered Users (${$.length})</h3>
              <input type="text" class="form-input" placeholder="Search user by email or name..." style="max-width:260px;" />
            </div>

            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${$.map(e=>`
                    <tr>
                      <td class="font-bold">${e.name}</td>
                      <td class="text-sm text-secondary">${e.email}</td>
                      <td><span class="badge ${e.role==="admin"?"badge-danger":e.role==="seller"?"badge-primary":"badge-secondary"}">${e.role.toUpperCase()}</span></td>
                      <td><span class="badge badge-success">Active</span></td>
                      <td>
                        <button class="btn btn-secondary btn-sm">Edit</button>
                        <button class="btn btn-ghost btn-sm" style="color:var(--danger);">Block</button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  `}async function Le(){const r=document.getElementById("app");r.innerHTML=`
    <div class="page-header" style="background:var(--graphite-900);color:#fff;">
      <div class="container">
        <h1>Seller Approvals & Verification</h1>
        <div class="breadcrumb">
          <a href="#/admin/dashboard" style="color:var(--lime-300);">Control Panel</a>
          <span class="separator">/</span>
          <span>Sellers</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/admin/dashboard" class="sidebar-nav-item">${a("layoutDashboard")} Overview</a>
              <a href="#/admin/sellers" class="sidebar-nav-item active">${a("store")} Seller Approvals</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <h3 class="mb-6">Merchant Stores (${L.length})</h3>
            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Seller Store</th>
                    <th>Followers</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${L.map(e=>`
                    <tr>
                      <td class="font-bold">${e.name}</td>
                      <td>${e.followers}</td>
                      <td>${e.rating} ★</td>
                      <td><span class="badge badge-success">Verified Merchant</span></td>
                      <td>
                        <button class="btn btn-outline btn-sm admin-verify-btn" data-seller="${e.name}">Verify Badges</button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  `,r.querySelectorAll(".admin-verify-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-seller");p.emit("toast:show",{type:"success",title:"Merchant Verified",message:`${t} verification status renewed.`})})})}async function Me(){const r=document.getElementById("app");r.innerHTML=`
    <div class="page-header" style="background:var(--graphite-900);color:#fff;">
      <div class="container">
        <h1>Global Product Catalog</h1>
        <div class="breadcrumb">
          <a href="#/admin/dashboard" style="color:var(--lime-300);">Control Panel</a>
          <span class="separator">/</span>
          <span>Products</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/admin/dashboard" class="sidebar-nav-item">${a("layoutDashboard")} Overview</a>
              <a href="#/admin/products" class="sidebar-nav-item active">${a("grid")} Product Catalog</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <div class="flex flex-between items-center mb-6">
              <h3>All Products (${m.length})</h3>
              <button class="btn btn-primary btn-sm" id="admin-add-prod-btn">${a("plus")} Add Product</button>
            </div>

            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Featured</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${m.map(e=>`
                    <tr>
                      <td class="font-semibold text-sm">${e.name}</td>
                      <td class="text-sm text-secondary">${e.category}</td>
                      <td class="font-bold text-lime">${v(e.price)}</td>
                      <td>${e.stock}</td>
                      <td><span class="badge ${e.isTrending?"badge-success":"badge-secondary"}">${e.isTrending?"Featured":"Standard"}</span></td>
                      <td>
                        <button class="btn btn-secondary btn-sm">Edit</button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  `}async function Re(){const r=document.getElementById("app");r.innerHTML=`
    <div class="page-header" style="background:var(--graphite-900);color:#fff;">
      <div class="container">
        <h1>Global Marketplace Orders</h1>
        <div class="breadcrumb">
          <a href="#/admin/dashboard" style="color:var(--lime-300);">Control Panel</a>
          <span class="separator">/</span>
          <span>Orders</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/admin/dashboard" class="sidebar-nav-item">${a("layoutDashboard")} Overview</a>
              <a href="#/admin/orders" class="sidebar-nav-item active">${a("shoppingBag")} Global Orders</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <h3 class="mb-6">All Platform Orders (${q.length})</h3>
            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${q.map(e=>`
                    <tr>
                      <td class="font-bold">${e.id}</td>
                      <td class="text-sm text-secondary">${e.date}</td>
                      <td>${e.shippingAddress.name}</td>
                      <td class="font-bold text-lime">${v(e.total)}</td>
                      <td><span class="badge ${e.status==="Delivered"?"badge-success":"badge-primary"}">${e.status}</span></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  `}async function Ee(){const r=document.getElementById("app");r.innerHTML=`
    <div class="page-header" style="background:var(--graphite-900);color:#fff;">
      <div class="container">
        <h1>Coupons & Promo Codes Manager</h1>
        <div class="breadcrumb">
          <a href="#/admin/dashboard" style="color:var(--lime-300);">Control Panel</a>
          <span class="separator">/</span>
          <span>Coupons</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/admin/dashboard" class="sidebar-nav-item">${a("layoutDashboard")} Overview</a>
              <a href="#/admin/coupons" class="sidebar-nav-item active">${a("tag")} Coupons</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <div class="flex flex-between items-center mb-6">
              <h3>Active Coupons (${R.length})</h3>
              <button class="btn btn-primary btn-sm" id="admin-create-coupon-btn">${a("plus")} Create Coupon</button>
            </div>

            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Discount</th>
                    <th>Min Order</th>
                    <th>Expiry</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${R.map(e=>`
                    <tr>
                      <td class="font-bold text-lime">${e.code}</td>
                      <td>${e.discount}</td>
                      <td>$${e.minOrder}</td>
                      <td>${e.expiry}</td>
                      <td><button class="btn btn-secondary btn-sm">Edit</button></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  `}async function De(){const r=document.getElementById("app");r.innerHTML='<div class="page-body"><div class="container"><div class="card p-8 text-center"><h2>Inventory Management</h2><p class="text-secondary mt-2">All warehouse stock levels are healthy.</p></div></div></div>'}async function Ie(){const r=document.getElementById("app");r.innerHTML='<div class="page-body"><div class="container"><div class="card p-8 text-center"><h2>Platform Analytics</h2><p class="text-secondary mt-2">Conversion rate: 4.8% • Total Traffic: 420K monthly visitors.</p></div></div></div>'}async function Fe(){const r=document.getElementById("app");r.innerHTML='<div class="page-body"><div class="container"><div class="card p-8 text-center"><h2>Support Ticket Center</h2><p class="text-secondary mt-2">0 open urgent support tickets.</p></div></div></div>'}new j;new U;new V;new Z;new Y;new Q;new J;z.add("/",ee).add("/shop",M).add("/categories",se).add("/category/:category",r=>M({category:r.category})).add("/product/:id",r=>ae({id:r.id})).add("/deals",I).add("/new-arrivals",ie).add("/best-sellers",M).add("/coupons",I).add("/search",r=>re(r)).add("/cart",B).add("/checkout",oe).add("/order-success",ne).add("/login",le).add("/register",de).add("/forgot-password",ce).add("/wishlist",pe).add("/about",T).add("/contact",ue).add("/faq",he).add("/privacy-policy",ve).add("/terms",F).add("/refund-policy",me).add("/dashboard",fe).add("/dashboard/profile",be).add("/dashboard/orders",ye).add("/dashboard/track-order",we).add("/dashboard/addresses",Se).add("/dashboard/reviews",xe).add("/dashboard/settings",ke).add("/seller/register",Ae).add("/seller/dashboard",Ce).add("/seller/store",$e).add("/seller/products",Pe).add("/sustainability",T).add("/careers",T).add("/blog",T).add("/seller-policies",F).add("/fulfillment",T).add("/admin/login",Te).add("/admin/dashboard",qe).add("/admin/users",Be).add("/admin/sellers",Le).add("/admin/products",Me).add("/admin/orders",Re).add("/admin/inventory",De).add("/admin/analytics",Ie).add("/admin/coupons",Ee).add("/admin/support",Fe).add("/404",ge);K.init();z.start();
