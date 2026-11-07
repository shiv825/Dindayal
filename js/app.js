/**
 * Customer Storefront Controller
 * Manages Catalog, Filters, Search, Quick View, Cart Drawer, and Checkout with Payment
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize App
  initStorefront();
});

// State
let currentCategory = "all";
let currentSort = "featured";
let currentSearchQuery = "";
let currentQuickFilter = "all";
let selectedPaymentMethod = "upi";
let wishlist = new Set(JSON.parse(localStorage.getItem("dindayal_wishlist") || "[]"));

function initStorefront() {
  renderStoreBranding();
  renderProducts();
  updateCartBadge();
  setupEventListeners();
  init3DTilt();
  initInteractiveRopes();
  calculateBulkPrice();

  // Listen to store updates
  window.store.subscribe((event, data) => {
    if (event === "settings_updated") {
      renderStoreBranding();
      renderCartDrawer();
    } else if (event === "products_updated") {
      renderProducts();
    } else if (event === "cart_updated") {
      updateCartBadge();
      renderCartDrawer();
    }
  });
}

/**
 * Render Store Branding and Basic Details
 * Reflects any changes made from the Admin Portal in real time!
 */
function renderStoreBranding() {
  const settings = window.store.getSettings();

  // Top Announcement
  const annEl = document.getElementById("topAnnouncementText");
  if (annEl) annEl.textContent = settings.announcementText;

  // Header Brand
  const brandTitleEl = document.getElementById("brandStoreName");
  if (brandTitleEl) brandTitleEl.textContent = settings.storeName;
  const brandSubEl = document.getElementById("brandSubtitle");
  if (brandSubEl) brandSubEl.textContent = settings.brandSubtitle;

  // Header Contact links
  const topPhone = document.getElementById("topPhoneLink");
  if (topPhone) {
    topPhone.href = `tel:${settings.phone.replace(/[^0-9+]/g, '')}`;
    topPhone.innerHTML = `📞 ${settings.phone}`;
  }
  const topEmail = document.getElementById("topEmailLink");
  if (topEmail) {
    topEmail.href = `mailto:${settings.email}`;
    topEmail.innerHTML = `✉️ ${settings.email}`;
  }

  // Footer Contacts
  const footAbout = document.getElementById("footerStoreTagline");
  if (footAbout) footAbout.textContent = settings.tagline;

  const footPhone = document.getElementById("footerPhone");
  if (footPhone) {
    footPhone.href = `tel:${settings.phone.replace(/[^0-9+]/g, '')}`;
    footPhone.textContent = `${settings.phone} / ${settings.altPhone}`;
  }

  const footEmail = document.getElementById("footerEmail");
  if (footEmail) {
    footEmail.href = `mailto:${settings.email}`;
    footEmail.textContent = settings.email;
  }

  const footAddress = document.getElementById("footerAddress");
  if (footAddress) footAddress.textContent = settings.address;

  const footGstin = document.getElementById("footerGstin");
  if (footGstin) footGstin.textContent = `GSTIN: ${settings.gstin}`;

  // WhatsApp Floating Button
  const waBtn = document.getElementById("whatsappFloatingBtn");
  if (waBtn) {
    const cleanWa = settings.whatsappNumber.replace(/[^0-9]/g, '');
    waBtn.href = `https://wa.me/${cleanWa}?text=${encodeURIComponent("Hello! I am inquiring about Jute Products from your website " + settings.storeName)}`;
  }

  // Dynamic Video Sources (Controlled Live from Admin Portal)
  const loomVid = document.getElementById("loomAmbientVideo");
  if (loomVid && settings.ambientVideoUrl) {
    const currentSrc = loomVid.querySelector("source") ? loomVid.querySelector("source").src : loomVid.src;
    if (currentSrc !== settings.ambientVideoUrl) {
      loomVid.src = settings.ambientVideoUrl;
      const srcEl = loomVid.querySelector("source");
      if (srcEl) srcEl.src = settings.ambientVideoUrl;
      loomVid.load();
      loomVid.play().catch(() => {});
    }
  }

  const docVid = document.getElementById("modalVideoPlayer");
  if (docVid && settings.documentaryVideoUrl) {
    const currentDocSrc = docVid.querySelector("source") ? docVid.querySelector("source").src : docVid.src;
    if (currentDocSrc !== settings.documentaryVideoUrl) {
      docVid.src = settings.documentaryVideoUrl;
      const docSrcEl = docVid.querySelector("source");
      if (docSrcEl) docSrcEl.src = settings.documentaryVideoUrl;
      docVid.load();
    }
  }
}

/**
 * Render Product Catalog with Filters and Sorting
 */
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const allProducts = window.store.getProducts();

  // 1. Filter by category
  let filtered = allProducts.filter(p => {
    if (currentCategory === "all") return true;
    return p.category === currentCategory;
  });

  // 1b. Quick filter chips
  if (currentQuickFilter === "bestseller") {
    filtered = filtered.filter(p => p.badgeType === "bestseller" || p.featured || p.rating >= 4.9);
  } else if (currentQuickFilter === "under999") {
    filtered = filtered.filter(p => p.price <= 999);
  }

  // 2. Filter by search query
  if (currentSearchQuery.trim()) {
    const q = currentSearchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.badge && p.badge.toLowerCase().includes(q))
    );
  }

  // 3. Sort
  filtered.sort((a, b) => {
    if (currentSort === "price-low") return a.price - b.price;
    if (currentSort === "price-high") return b.price - a.price;
    if (currentSort === "rating") return b.rating - a.rating;
    // Featured default
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  // Update counter
  const counterEl = document.getElementById("catalogCount");
  if (counterEl) counterEl.textContent = `${filtered.length} Artisan Products Found`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-catalog">
        <div class="empty-catalog-icon">🔍</div>
        <h3 style="font-family: var(--font-heading); margin-bottom: 0.5rem; color: var(--primary);">No matching artisan products found</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Try adjusting your search terms or category filters.</p>
        <button class="btn btn-primary" onclick="resetFilters()">View All Collections</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => {
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    const badgeHtml = product.badge ? `<span class="badge badge-${product.badgeType || 'eco'} product-badge-tag">${product.badge}</span>` : '';
    const discountHtml = discount > 0 ? `<span class="product-discount-pill">-${discount}%</span>` : '';
    const isWished = wishlist.has(product.id);

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-thumb-wrapper" onclick="openProductQuickView('${product.id}')">
          <img class="product-thumb" src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='assets/images/jute_tote_bag.jpg'">
          
          <div class="product-thumb-badges">
            ${badgeHtml}
            ${discountHtml}
          </div>

          <button class="product-wishlist-btn ${isWished ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist('${product.id}', this)" title="${isWished ? 'Remove from Wishlist' : 'Save to Wishlist'}">
            <span>${isWished ? '❤️' : '♡'}</span>
          </button>

          <button class="product-quick-view-btn" onclick="event.stopPropagation(); openProductQuickView('${product.id}')">
            <span>Quick View</span> 👁️
          </button>
        </div>
        <div class="product-body">
          <div class="product-category-meta">
            <span class="category-name-tag">${product.category.toUpperCase()}</span>
            <div class="product-rating">
              <span class="star-icons">★</span>
              <strong>${product.rating.toFixed(1)}</strong>
              <span class="review-count">(${product.reviewCount || 40})</span>
            </div>
          </div>
          <h3 class="product-title" onclick="openProductQuickView('${product.id}')">${product.name}</h3>
          <p class="product-desc">${product.shortDesc}</p>
          <div class="product-footer">
            <div class="product-price-block">
              <span class="price-current">${window.store.formatCurrency(product.price)}</span>
              ${product.originalPrice ? `<span class="price-original">${window.store.formatCurrency(product.originalPrice)}</span>` : ''}
            </div>
            <button class="add-cart-btn" onclick="handleAddToCart('${product.id}')" ${!product.inStock ? 'disabled' : ''}>
              ${product.inStock ? `<span class="cart-plus-icon">+</span> <span>Add to Bag</span>` : `<span>Out of Stock</span>`}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  // Reinitialize 3D tilt on newly rendered product cards
  init3DTilt();
}

function resetFilters() {
  currentCategory = "all";
  currentQuickFilter = "all";
  currentSearchQuery = "";
  const searchInput = document.getElementById("mainSearchInput");
  if (searchInput) searchInput.value = "";
  const categorySelect = document.getElementById("categoryFilterSelect");
  if (categorySelect) categorySelect.value = "all";
  document.querySelectorAll(".category-pill").forEach(pill => {
    pill.classList.toggle("active", pill.dataset.category === "all");
  });
  document.querySelectorAll(".chip-btn").forEach((chip, idx) => {
    chip.classList.toggle("active", idx === 0);
  });
  renderProducts();
}

/**
 * Handle Add to Cart with Toast and Animation
 */
function handleAddToCart(productId, qty = 1) {
  const success = window.store.addToCart(productId, qty);
  if (success) {
    const product = window.store.getProductById(productId);
    showToast(`Added ${qty} × "${product.name}" to cart!`, "success");
    openCartDrawer();
  }
}

/**
 * Quick View Modal
 */
function openProductQuickView(productId) {
  const product = window.store.getProductById(productId);
  if (!product) return;

  const modal = document.getElementById("quickViewModal");
  const modalBody = document.getElementById("quickViewModalBody");
  if (!modal || !modalBody) return;

  let specsHtml = "";
  if (product.specs) {
    specsHtml = Object.entries(product.specs).map(([key, value]) => `
      <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border-light); padding: 0.35rem 0; font-size: 0.85rem;">
        <span style="color: var(--text-muted); font-weight: 600;">${key}:</span>
        <span style="color: var(--text-main); font-weight: 500;">${value}</span>
      </div>
    `).join("");
  }

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  modalBody.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1.1fr; gap: 2rem;">
      <div>
        <div style="position: relative; border-radius: var(--radius-md); overflow: hidden; border: 1.5px solid var(--border); background: var(--bg-subtle);">
          <img src="${product.image}" alt="${product.name}" style="width: 100%; aspect-ratio: 1/1; object-fit: cover;">
          <div style="position: absolute; bottom: 0.75rem; left: 0.75rem; right: 0.75rem; display: flex; gap: 0.5rem; justify-content: center;">
            <span class="badge-pill">🌱 100% Eco-Friendly</span>
            <span class="badge-pill">✨ Bengal Artisan</span>
          </div>
        </div>
      </div>
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span class="product-badge-tag">${product.badge || 'Natural Jute'}</span>
          <span style="color: #f59e0b; font-family: var(--font-heading); font-size: 0.85rem; font-weight: 700;">★ ${product.rating.toFixed(1)} (${product.reviewCount} reviews)</span>
        </div>
        <h2 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: var(--primary); margin-bottom: 0.5rem; line-height: 1.2;">${product.name}</h2>
        <div style="display: flex; align-items: baseline; gap: 0.85rem; margin-bottom: 1rem;">
          <span style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--primary);">${window.store.formatCurrency(product.price)}</span>
          ${product.originalPrice ? `<span style="text-decoration: line-through; color: var(--text-light); font-size: 1rem;">${window.store.formatCurrency(product.originalPrice)}</span>` : ''}
          ${discount > 0 ? `<span class="product-discount-pill">-${discount}% OFF</span>` : ''}
        </div>
        <p style="color: var(--text-muted); font-size: 0.925rem; line-height: 1.6; margin-bottom: 1.25rem;">${product.shortDesc}</p>
        
        <div style="background: var(--bg-subtle); border: 1px solid var(--border); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
          <h4 style="font-family: var(--font-heading); font-size: 0.85rem; font-weight: 800; text-transform: uppercase; color: var(--primary); margin-bottom: 0.5rem;">Material & Specifications</h4>
          ${specsHtml}
        </div>

        <div style="display: flex; align-items: center; gap: 1rem;">
          <div class="qty-control" style="padding: 0.2rem;">
            <button class="qty-btn" onclick="adjustQuickViewQty(-1)">-</button>
            <span class="qty-display" id="quickViewQty">1</span>
            <button class="qty-btn" onclick="adjustQuickViewQty(1)">+</button>
          </div>
          <button class="btn-main" style="flex: 1;" onclick="handleQuickViewAddToCart('${product.id}')">
            + Add to Bag 🛒
          </button>
          <button class="btn-outline" onclick="handleQuickViewBuyNow('${product.id}')">
            Buy Now ⚡
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");
}

function adjustQuickViewQty(delta) {
  const el = document.getElementById("quickViewQty");
  if (!el) return;
  let current = parseInt(el.textContent, 10) || 1;
  current = Math.max(1, current + delta);
  el.textContent = current;
}

function handleQuickViewAddToCart(productId) {
  const qtyEl = document.getElementById("quickViewQty");
  const qty = qtyEl ? parseInt(qtyEl.textContent, 10) || 1 : 1;
  handleAddToCart(productId, qty);
  closeModal("quickViewModal");
}

function handleQuickViewBuyNow(productId) {
  const qtyEl = document.getElementById("quickViewQty");
  const qty = qtyEl ? parseInt(qtyEl.textContent, 10) || 1 : 1;
  window.store.addToCart(productId, qty);
  closeModal("quickViewModal");
  openCheckoutModal();
}

/**
 * Slide-out Cart Drawer Controller
 */
function openCartDrawer() {
  renderCartDrawer();
  const drawer = document.getElementById("cartDrawerOverlay");
  if (drawer) drawer.classList.add("active");
}

function closeCartDrawer() {
  const drawer = document.getElementById("cartDrawerOverlay");
  if (drawer) drawer.classList.remove("active");
}

function updateCartBadge() {
  const badge = document.getElementById("headerCartBadge");
  if (badge) {
    const count = window.store.getCartCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-flex" : "none";
  }
}

function renderCartDrawer() {
  const listEl = document.getElementById("cartItemsList");
  const footerEl = document.getElementById("cartDrawerFooter");
  const progressFill = document.getElementById("cartProgressFill");
  const progressText = document.getElementById("cartProgressText");

  if (!listEl) return;

  const cart = window.store.getCart();
  const totals = window.store.getCartTotals();

  // Progress Bar for Free Shipping
  if (progressFill && progressText) {
    if (totals.subtotal >= totals.freeShippingThreshold) {
      progressFill.style.width = "100%";
      progressText.innerHTML = `🎉 Congratulations! Your order qualifies for <strong>FREE Delivery</strong>.`;
    } else {
      const pct = Math.min(100, Math.round((totals.subtotal / totals.freeShippingThreshold) * 100));
      progressFill.style.width = `${pct}%`;
      progressText.innerHTML = `Add <strong>${window.store.formatCurrency(totals.neededForFreeShipping)}</strong> more to unlock <strong>FREE Shipping</strong>!`;
    }
  }

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;">
        <div style="font-size: 3rem; margin-bottom: 0.75rem; color: var(--jute-gold);">🛍️</div>
        <h4 style="font-family: var(--font-heading); color: var(--primary); margin-bottom: 0.5rem;">Your cart is empty</h4>
        <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 1.5rem;">Discover our handcrafted eco-friendly jute bags, mats, and cords.</p>
        <button class="btn btn-secondary btn-sm" onclick="closeCartDrawer()">Explore Catalog</button>
      </div>
    `;
    if (footerEl) footerEl.style.display = "none";
    return;
  }

  if (footerEl) footerEl.style.display = "block";

  listEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span class="cart-item-price">${window.store.formatCurrency(item.price)}</span>
        <div class="cart-item-qty-row">
          <div class="qty-control">
            <button class="qty-btn" onclick="updateItemQty('${item.id}', ${item.qty - 1})">-</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="updateItemQty('${item.id}', ${item.qty + 1})">+</button>
          </div>
        </div>
      </div>
      <button class="cart-item-remove-btn" onclick="removeItemFromCart('${item.id}')" title="Remove item">
        ✕
      </button>
    </div>
  `).join("");

  // Render Cart Totals
  const coupon = window.store.getAppliedCoupon();
  const summaryEl = document.getElementById("cartDrawerSummary");
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="cart-summary-row">
        <span>Items Subtotal (${totals.itemCount} items)</span>
        <span>${window.store.formatCurrency(totals.subtotal)}</span>
      </div>
      ${totals.discount > 0 ? `
        <div class="cart-summary-row" style="color: var(--success); font-weight: 600;">
          <span>Coupon Discount (${coupon ? coupon.code : ''})</span>
          <span>- ${window.store.formatCurrency(totals.discount)}</span>
        </div>
      ` : ''}
      <div class="cart-summary-row">
        <span>Standard Shipping</span>
        <span>${totals.shipping === 0 ? '<strong style="color: var(--success)">FREE</strong>' : window.store.formatCurrency(totals.shipping)}</span>
      </div>
      <div class="cart-summary-row total-row">
        <span>Estimated Total</span>
        <span>${window.store.formatCurrency(totals.total)}</span>
      </div>
    `;
  }
}

function updateItemQty(productId, qty) {
  window.store.updateCartQty(productId, qty);
}

function removeItemFromCart(productId) {
  window.store.removeFromCart(productId);
  showToast("Item removed from your cart", "info");
}

function handleApplyCoupon() {
  const input = document.getElementById("cartCouponInput");
  if (!input) return;
  const res = window.store.applyCoupon(input.value);
  showToast(res.message, res.success ? "success" : "error");
}

/**
 * Checkout Modal & Payment Gateway Flow
 */
function openCheckoutModal() {
  closeCartDrawer();
  const cart = window.store.getCart();
  if (cart.length === 0) {
    showToast("Your cart is empty! Add items first.", "error");
    return;
  }

  const modal = document.getElementById("checkoutModal");
  if (!modal) return;

  renderCheckoutSummary();
  renderPaymentMethodView();

  modal.classList.add("active");
}

function renderCheckoutSummary() {
  const totals = window.store.getCartTotals();
  const cart = window.store.getCart();
  const summaryContainer = document.getElementById("checkoutOrderReview");
  if (!summaryContainer) return;

  summaryContainer.innerHTML = `
    <div style="background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1.25rem;">
      <h4 style="font-family: var(--font-heading); font-size: 1.05rem; color: var(--primary); margin-bottom: 0.75rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">
        Order Items (${totals.itemCount})
      </h4>
      <div style="max-height: 180px; overflow-y: auto; margin-bottom: 1rem;">
        ${cart.map(item => `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; font-size: 0.85rem;">
            <span>${item.qty} × ${item.name}</span>
            <strong style="color: var(--text-main);">${window.store.formatCurrency(item.price * item.qty)}</strong>
          </div>
        `).join("")}
      </div>
      <div style="border-top: 1px dashed var(--border); padding-top: 0.75rem; font-size: 0.88rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
          <span style="color: var(--text-muted);">Subtotal:</span>
          <span>${window.store.formatCurrency(totals.subtotal)}</span>
        </div>
        ${totals.discount > 0 ? `
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem; color: var(--success); font-weight: 600;">
            <span>Discount:</span>
            <span>- ${window.store.formatCurrency(totals.discount)}</span>
          </div>
        ` : ''}
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
          <span style="color: var(--text-muted);">Delivery:</span>
          <span>${totals.shipping === 0 ? '<span style="color: var(--success); font-weight: 700;">FREE</span>' : window.store.formatCurrency(totals.shipping)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 0.65rem; padding-top: 0.65rem; border-top: 1.5px solid var(--border); font-size: 1.2rem; font-weight: 800; color: var(--primary);">
          <span>Grand Total:</span>
          <span id="checkoutGrandTotalDisplay">${window.store.formatCurrency(totals.total)}</span>
        </div>
      </div>
    </div>
  `;
}

function switchPaymentMethod(method) {
  selectedPaymentMethod = method;
  document.querySelectorAll(".payment-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.method === method);
  });
  renderPaymentMethodView();
}

function renderPaymentMethodView() {
  const container = document.getElementById("paymentMethodContent");
  if (!container) return;

  const settings = window.store.getSettings();
  const totals = window.store.getCartTotals();

  if (selectedPaymentMethod === "upi") {
    // Generate authentic dynamic UPI QR code
    const upiUri = `upi://pay?pa=${encodeURIComponent(settings.upiId)}&pn=${encodeURIComponent(settings.upiName || settings.storeName)}&am=${totals.total}&cu=INR&tn=${encodeURIComponent("Jute Products Order")}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiUri)}`;

    container.innerHTML = `
      <div class="upi-pay-card">
        <h5 style="color: var(--primary); font-size: 0.95rem; font-weight: 700;">Instant UPI & QR Code Payment</h5>
        <p style="font-size: 0.8rem; color: var(--text-muted);">Scan this QR using Google Pay, PhonePe, Paytm or BHIM UPI to pay <strong>${window.store.formatCurrency(totals.total)}</strong></p>
        <div class="qr-code-placeholder">
          <img src="${qrUrl}" alt="UPI QR Code" onerror="this.onerror=null; this.src='https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi_pay_dindayal';">
        </div>
        <div style="background: #ffffff; display: inline-block; padding: 0.4rem 0.9rem; border-radius: var(--radius-sm); border: 1px solid var(--border); font-size: 0.85rem; font-family: monospace;">
          UPI ID: <strong>${settings.upiId}</strong>
        </div>
        <div class="upi-app-badges">
          <span class="upi-pill">GPay</span>
          <span class="upi-pill">PhonePe</span>
          <span class="upi-pill">Paytm</span>
          <span class="upi-pill">BHIM</span>
        </div>
        <div style="margin-top: 1rem; text-align: left;">
          <label class="form-label">UPI Reference / UTR Number (Optional verification):</label>
          <input type="text" class="form-control" id="upiTxnRef" placeholder="e.g. 409281729014 (12-digit UTR)" maxlength="16">
        </div>
      </div>
    `;
  } else if (selectedPaymentMethod === "card") {
    container.innerHTML = `
      <div>
        <div class="card-mockup">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div class="card-chip"></div>
            <span style="font-weight: 800; font-size: 0.9rem; letter-spacing: 1px;">DEBIT / CREDIT</span>
          </div>
          <div class="card-num-preview" id="cardMockNumber">•••• •••• •••• ••••</div>
          <div class="card-details-preview">
            <div>
              <span>Card Holder</span>
              <strong id="cardMockHolder">YOUR NAME</strong>
            </div>
            <div>
              <span>Expires</span>
              <strong id="cardMockExpiry">MM/YY</strong>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Card Number</label>
          <input type="text" class="form-control" id="cardNumberInput" placeholder="4532 •••• •••• 8829" maxlength="19" oninput="formatCardNumber(this)">
        </div>
        <div class="form-group">
          <label class="form-label">Cardholder Name</label>
          <input type="text" class="form-control" id="cardHolderInput" placeholder="Name on card" oninput="document.getElementById('cardMockHolder').textContent = this.value.toUpperCase() || 'YOUR NAME'">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Expiry Date</label>
            <input type="text" class="form-control" id="cardExpiryInput" placeholder="MM/YY" maxlength="5" oninput="formatCardExpiry(this)">
          </div>
          <div class="form-group">
            <label class="form-label">CVV Code</label>
            <input type="password" class="form-control" id="cardCvvInput" placeholder="•••" maxlength="4">
          </div>
        </div>
      </div>
    `;
  } else if (selectedPaymentMethod === "netbanking") {
    container.innerHTML = `
      <div>
        <label class="form-label">Choose your Bank for Secure NetBanking:</label>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; margin-bottom: 1rem;">
          <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.65rem; border: 1.5px solid var(--border); border-radius: var(--radius-md); cursor: pointer;">
            <input type="radio" name="nbBank" value="HDFC Bank" checked>
            <span style="font-size: 0.85rem; font-weight: 600;">HDFC Bank</span>
          </label>
          <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.65rem; border: 1.5px solid var(--border); border-radius: var(--radius-md); cursor: pointer;">
            <input type="radio" name="nbBank" value="State Bank of India">
            <span style="font-size: 0.85rem; font-weight: 600;">SBI</span>
          </label>
          <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.65rem; border: 1.5px solid var(--border); border-radius: var(--radius-md); cursor: pointer;">
            <input type="radio" name="nbBank" value="ICICI Bank">
            <span style="font-size: 0.85rem; font-weight: 600;">ICICI Bank</span>
          </label>
          <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.65rem; border: 1.5px solid var(--border); border-radius: var(--radius-md); cursor: pointer;">
            <input type="radio" name="nbBank" value="Axis Bank">
            <span style="font-size: 0.85rem; font-weight: 600;">Axis Bank</span>
          </label>
        </div>
        <select class="form-control" id="nbOtherBank">
          <option value="">-- Or Select Another Indian Bank --</option>
          <option value="Punjab National Bank">Punjab National Bank</option>
          <option value="Bank of Baroda">Bank of Baroda</option>
          <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
          <option value="Canara Bank">Canara Bank</option>
          <option value="Union Bank of India">Union Bank of India</option>
        </select>
      </div>
    `;
  } else if (selectedPaymentMethod === "cod") {
    container.innerHTML = `
      <div style="background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1.25rem; text-align: center;">
        <div style="font-size: 2.25rem; margin-bottom: 0.5rem;">💵</div>
        <h5 style="color: var(--primary); font-size: 1rem; font-weight: 700; margin-bottom: 0.35rem;">Cash on Delivery (COD)</h5>
        <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1rem;">
          Pay in cash or through UPI QR code presented by our courier executive when your eco-friendly jute package arrives at your doorstep.
        </p>
        <div style="background: #ffffff; padding: 0.75rem; border-radius: var(--radius-sm); border: 1px dashed var(--accent); font-size: 0.825rem; color: var(--text-main);">
          ✓ Safe contactless delivery available &nbsp;|&nbsp; ✓ 100% Genuine Jute Guarantee
        </div>
      </div>
    `;
  }
}

function formatCardNumber(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 16);
  let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
  input.value = formatted;
  const mock = document.getElementById("cardMockNumber");
  if (mock) mock.textContent = formatted || "•••• •••• •••• ••••";
}

function formatCardExpiry(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 4);
  if (val.length >= 2) {
    val = val.substring(0, 2) + '/' + val.substring(2);
  }
  input.value = val;
  const mock = document.getElementById("cardMockExpiry");
  if (mock) mock.textContent = val || "MM/YY";
}

/**
 * Place Order Submission with Payment Validation
 */
function handlePlaceOrderSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("checkoutName").value.trim();
  const phone = document.getElementById("checkoutPhone").value.trim();
  const email = document.getElementById("checkoutEmail").value.trim();
  const address = document.getElementById("checkoutAddress").value.trim();
  const city = document.getElementById("checkoutCity").value.trim();
  const state = document.getElementById("checkoutState").value.trim();
  const pincode = document.getElementById("checkoutPincode").value.trim();

  if (!name || !phone || !email || !address || !city || !pincode) {
    showToast("Please fill all required shipping address fields", "error");
    return;
  }

  // Validate Card fields if card selected
  if (selectedPaymentMethod === "card") {
    const cardNum = document.getElementById("cardNumberInput")?.value.replace(/\s/g, '');
    const cardExpiry = document.getElementById("cardExpiryInput")?.value;
    const cardCvv = document.getElementById("cardCvvInput")?.value;
    if (!cardNum || cardNum.length < 15 || !cardExpiry || !cardCvv) {
      showToast("Please enter complete and valid card details", "error");
      return;
    }
  }

  // Submit button loader simulation
  const submitBtn = document.getElementById("placeOrderSubmitBtn");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Processing Secure Payment...</span> ⏳`;
  }

  setTimeout(() => {
    const cart = window.store.getCart();
    const totals = window.store.getCartTotals();

    let methodLabel = "UPI";
    let paymentRef = "TXN-" + Math.floor(10000000 + Math.random() * 90000000);

    if (selectedPaymentMethod === "upi") {
      methodLabel = "UPI / QR Code Scan";
      const userRef = document.getElementById("upiTxnRef")?.value.trim();
      if (userRef) paymentRef = userRef;
    } else if (selectedPaymentMethod === "card") {
      methodLabel = "Credit / Debit Card";
    } else if (selectedPaymentMethod === "netbanking") {
      const selectedRadio = document.querySelector('input[name="nbBank"]:checked')?.value;
      const otherBank = document.getElementById("nbOtherBank")?.value;
      methodLabel = `NetBanking (${otherBank || selectedRadio || "HDFC Bank"})`;
    } else if (selectedPaymentMethod === "cod") {
      methodLabel = "Cash on Delivery (COD)";
      paymentRef = "COD-COLLECT-AT-DOOR";
    }

    const orderData = {
      customer: { name, phone, email, address, city, state, pincode },
      items: cart,
      paymentMethod: methodLabel,
      paymentRef: paymentRef,
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      total: totals.total,
      notes: document.getElementById("checkoutNotes")?.value.trim() || ""
    };

    const newOrder = window.store.createOrder(orderData);

    // Reset button
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Complete Payment & Place Order</span> 🔒`;
    }

    closeModal("checkoutModal");
    showOrderSuccessReceipt(newOrder);
  }, 1200);
}

/**
 * Display Order Success Modal with Printable Invoice
 */
function showOrderSuccessReceipt(order) {
  const modal = document.getElementById("orderSuccessModal");
  const body = document.getElementById("orderSuccessModalBody");
  if (!modal || !body) return;

  const settings = window.store.getSettings();

  body.innerHTML = `
    <div class="order-success-box print-invoice-area">
      <div class="success-icon-wrap">✓</div>
      <h2 style="font-family: var(--font-heading); color: var(--primary); margin-bottom: 0.35rem;">Thank You for Your Order!</h2>
      <p style="color: var(--text-muted); font-size: 0.95rem;">Your eco-friendly order has been successfully placed with <strong>${settings.storeName}</strong>.</p>
      
      <div class="order-id-badge">Order ID: ${order.id}</div>

      <div style="background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1.25rem; text-align: left; margin: 1.5rem 0;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
          <div>
            <strong style="color: var(--primary); font-size: 0.95rem;">Delivery To:</strong>
            <p style="font-size: 0.85rem; color: var(--text-main); margin-top: 0.2rem;">${order.customer.name} (${order.customer.phone})<br>${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}</p>
          </div>
          <div style="text-align: right;">
            <strong style="color: var(--primary); font-size: 0.95rem;">Payment Info:</strong>
            <p style="font-size: 0.85rem; color: var(--text-main); margin-top: 0.2rem;">Method: ${order.paymentMethod}<br>Status: <span style="color: var(--success); font-weight: 700;">${order.paymentStatus}</span></p>
          </div>
        </div>

        <h4 style="font-size: 0.9rem; color: var(--primary); margin-bottom: 0.5rem;">Ordered Items:</h4>
        <div style="margin-bottom: 0.75rem;">
          ${order.items.map(item => `
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.35rem;">
              <span>${item.qty} × ${item.name}</span>
              <strong>${window.store.formatCurrency(item.price * item.qty)}</strong>
            </div>
          `).join("")}
        </div>

        <div style="border-top: 1px solid var(--border); padding-top: 0.75rem; display: flex; justify-content: space-between; font-size: 1.15rem; font-weight: 800; color: var(--primary);">
          <span>Total Amount Paid:</span>
          <span>${window.store.formatCurrency(order.total)}</span>
        </div>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-primary" onclick="window.print()">
          🖨️ Print / Download Receipt
        </button>
        <button class="btn btn-secondary" onclick="closeModal('orderSuccessModal')">
          Continue Shopping
        </button>
      </div>
    </div>
  `;

  modal.classList.add("active");
}

/**
 * B2B Bulk Quotation Modal Controller
 */
function openB2BModal() {
  const modal = document.getElementById("b2bModal");
  if (modal) modal.classList.add("active");
}

function handleB2BSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("b2bName").value;
  const company = document.getElementById("b2bCompany").value;
  const phone = document.getElementById("b2bPhone").value;
  const product = document.getElementById("b2bProductInterest").value;
  const qty = document.getElementById("b2bQuantity").value;

  showToast(`Thank you ${name}! Your wholesale inquiry for ${qty} units of ${product} has been sent to Dindayal Ropes & Indian Jute House. Our team will contact you within 2 hours.`, "success");
  closeModal("b2bModal");
}

/**
 * Event Listeners Setup
 */
function setupEventListeners() {
  // Category Navigation Pills
  document.querySelectorAll(".category-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".category-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.dataset.category;
      renderProducts();
    });
  });

  // Search input live filtering
  const searchInput = document.getElementById("mainSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value;
      renderProducts();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // Category filter select (secondary filter)
  const categoryFilterSelect = document.getElementById("categoryFilterSelect");
  if (categoryFilterSelect) {
    categoryFilterSelect.addEventListener("change", (e) => {
      currentCategory = e.target.value;
      // sync with category pill
      document.querySelectorAll(".category-pill").forEach(pill => {
        pill.classList.toggle("active", pill.dataset.category === currentCategory);
      });
      renderProducts();
    });
  }
}

/**
 * Modal Helpers
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
}

/**
 * Toast Notifications
 */
function showToast(message, type = "info") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icon = type === "success" ? "✓" : type === "error" ? "⚠️" : "ℹ️";
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Wishlist Toggle
function toggleWishlist(productId, btnEl) {
  const product = window.store.getProductById(productId);
  if (!product) return;
  
  if (wishlist.has(productId)) {
    wishlist.delete(productId);
    if (btnEl) {
      btnEl.classList.remove("active");
      btnEl.innerHTML = "<span>♡</span>";
    }
    showToast(`Removed "${product.name}" from your wishlist.`, "info");
  } else {
    wishlist.add(productId);
    if (btnEl) {
      btnEl.classList.add("active");
      btnEl.innerHTML = "<span>❤️</span>";
    }
    showToast(`Saved "${product.name}" to your wishlist!`, "success");
  }
  localStorage.setItem("dindayal_wishlist", JSON.stringify([...wishlist]));
}

// Hero Interactive Showcase Switcher
function switchHeroProduct(imgUrl, title, badge, btnEl) {
  const heroImg = document.getElementById("heroFeaturedImage");
  const heroBadge = document.getElementById("heroImgBadge");
  if (heroImg) {
    heroImg.style.opacity = "0.3";
    heroImg.style.transform = "scale(0.97)";
    setTimeout(() => {
      heroImg.src = imgUrl;
      heroImg.alt = title;
      heroImg.style.opacity = "1";
      heroImg.style.transform = "scale(1)";
    }, 180);
  }
  if (heroBadge) {
    heroBadge.textContent = badge;
  }
  document.querySelectorAll(".hero-thumb-btn").forEach(btn => btn.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
}

// Set Category Filter and Smooth Scroll
function setCategoryFilter(category) {
  currentCategory = category;
  currentQuickFilter = "all";
  document.querySelectorAll(".category-pill").forEach(pill => {
    pill.classList.toggle("active", pill.dataset.category === category);
  });
  const categorySelect = document.getElementById("categoryFilterSelect");
  if (categorySelect) categorySelect.value = category;
  document.querySelectorAll(".chip-btn").forEach((chip, i) => chip.classList.toggle("active", i === 0));
  renderProducts();
  const catalog = document.getElementById("catalogSection");
  if (catalog) {
    catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Apply Quick Filter Chips
function applyQuickFilter(filterType, btnEl) {
  currentQuickFilter = filterType;
  document.querySelectorAll(".chip-btn").forEach(b => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
  renderProducts();
}

// Global functions accessible in HTML inline handlers
window.handleAddToCart = handleAddToCart;
window.openProductQuickView = openProductQuickView;
window.adjustQuickViewQty = adjustQuickViewQty;
window.handleQuickViewAddToCart = handleQuickViewAddToCart;
window.handleQuickViewBuyNow = handleQuickViewBuyNow;
window.openCartDrawer = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;
window.updateItemQty = updateItemQty;
window.removeItemFromCart = removeItemFromCart;
window.handleApplyCoupon = handleApplyCoupon;
window.openCheckoutModal = openCheckoutModal;
window.switchPaymentMethod = switchPaymentMethod;
window.handlePlaceOrderSubmit = handlePlaceOrderSubmit;
window.openB2BModal = openB2BModal;
window.handleB2BSubmit = handleB2BSubmit;
window.closeModal = closeModal;
window.resetFilters = resetFilters;
window.formatCardNumber = formatCardNumber;
window.formatCardExpiry = formatCardExpiry;
window.switchHeroProduct = switchHeroProduct;
window.setCategoryFilter = setCategoryFilter;
window.applyQuickFilter = applyQuickFilter;
window.toggleWishlist = toggleWishlist;

// Subtle & Smooth 3D Perspective Card Tilt (Gentle Micro-Interaction)
function init3DTilt() {
  const tiltElements = document.querySelectorAll("[data-tilt]");
  tiltElements.forEach(card => {
    if (card._hasTiltListener) return;
    card._hasTiltListener = true;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Gentle, subtle tilt (capped at 3 degrees max to avoid jitter)
      const rotateX = ((y - centerY) / centerY) * -3.5;
      const rotateY = ((x - centerX) / centerX) * 3.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;

      let glare = card.querySelector(".tilt-glare");
      if (!glare) {
        glare = document.createElement("div");
        glare.className = "tilt-glare";
        card.appendChild(glare);
      }
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
      const glare = card.querySelector(".tilt-glare");
      if (glare) glare.style.background = "none";
    });
  });
}

// Copy Swinging Coupon Tag
function copySwingingCoupon(code) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(() => {
      showToast(`🎉 Coupon ${code} copied! (FLAT 15% OFF applied)`, "success");
      const input = document.getElementById("cartCouponInput");
      if (input) input.value = code;
    }).catch(() => {
      showToast(`Use coupon code: ${code} for 15% OFF!`, "info");
    });
  } else {
    showToast(`Use coupon code: ${code} for 15% OFF!`, "info");
    const input = document.getElementById("cartCouponInput");
    if (input) input.value = code;
  }
}

// Interactive Hanging Ropes Sway Tracking Mouse
function initInteractiveRopes() {
  const heroSection = document.getElementById("heroStageSection");
  const ropeLeft = document.getElementById("ropeMatCraftUnit");
  const ropeRight = document.getElementById("ropeArtisanUnit");
  if (!heroSection) return;

  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    const mouseXNorm = (e.clientX - rect.left) / rect.width - 0.5;
    const swayAngleLeft = mouseXNorm * 8;
    const swayAngleRight = mouseXNorm * -7;
    if (ropeLeft) ropeLeft.style.transform = `rotate(${swayAngleLeft.toFixed(1)}deg)`;
    if (ropeRight) ropeRight.style.transform = `rotate(${swayAngleRight.toFixed(1)}deg)`;
  });

  heroSection.addEventListener("mouseleave", () => {
    if (ropeLeft) ropeLeft.style.transform = "";
    if (ropeRight) ropeRight.style.transform = "";
  });
}

// Artisan Loom & Mat Weaving Video Controller
function toggleLoomVideoPlay() {
  const vid = document.getElementById("loomAmbientVideo");
  const icon = document.getElementById("vPlayIcon");
  const text = document.getElementById("vPlayText");
  if (!vid) return;

  if (vid.paused) {
    vid.play();
    if (icon) icon.textContent = "⏸";
    if (text) text.textContent = "Pause Ambient Video";
  } else {
    vid.pause();
    if (icon) icon.textContent = "▶";
    if (text) text.textContent = "Play Ambient Video";
  }
}

function toggleLoomVideoAudio() {
  const vid = document.getElementById("loomAmbientVideo");
  const icon = document.getElementById("vMuteIcon");
  const text = document.getElementById("vMuteText");
  if (!vid) return;

  vid.muted = !vid.muted;
  if (vid.muted) {
    if (icon) icon.textContent = "🔇";
    if (text) text.textContent = "Sound Off";
  } else {
    if (icon) icon.textContent = "🔊";
    if (text) text.textContent = "Sound On";
    vid.volume = 0.5;
  }
}

const matCraftStepsData = {
  1: {
    badge: "Step 01 • River Retting",
    title: "Hooghly River Natural Retting",
    desc: "Artisans bundle mature jute stems and gently submerge them in flowing river currents for 14-21 days. Microbes naturally soften the pectins, yielding strong, glossy golden bast fibers with zero chemicals.",
    img: "assets/images/jute_floor_mat.jpg"
  },
  2: {
    badge: "Step 02 • 3-Ply Braiding",
    title: "Artisanal 3-Strand Braid Twisting",
    desc: "Generational weavers take raw bundles of golden fiber and twist 3 individual strands into continuous, uniform high-tensile cords (8mm to 12mm thick) designed to withstand decades of heavy foot pressure.",
    img: "assets/images/jute_twisted_rope.jpg"
  },
  3: {
    badge: "Step 03 • Concentric Mandala Coiling",
    title: "Concentric Spiral Needle Lock-Stitching",
    desc: "Seated at low wooden craft benches, master artisans coil the braided rope outwards from the center. Each concentric circle is hand-sewn with a heavy curved steel needle and unbleached jute twine.",
    img: "assets/images/jute_table_mat.jpg"
  },
  4: {
    badge: "Step 04 • Solar Curing & Finishing",
    title: "Bengal Solar Curing & Heat-Press",
    desc: "Every completed rug is sun-cured in open village courtyards under Bengal sunlight. Artisans singe surface micro-fuzz and flatten edges on weighted teak tables before zero-plastic paper wrapping.",
    img: "assets/images/jute_door_mat.jpg"
  }
};

function selectMatCraftStep(stepNum, el) {
  document.querySelectorAll(".mat-step-tab").forEach(tab => tab.classList.remove("active"));
  if (el) el.classList.add("active");

  const data = matCraftStepsData[stepNum];
  if (!data) return;

  const badgeEl = document.getElementById("matStepLiveBadge");
  const titleEl = document.getElementById("matStepDetailTitle");
  const descEl = document.getElementById("matStepDetailDesc");
  const imgEl = document.getElementById("matStepPreviewImg");

  if (badgeEl) badgeEl.textContent = data.badge;
  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;
  if (imgEl) {
    imgEl.style.opacity = "0.3";
    setTimeout(() => {
      imgEl.src = data.img;
      imgEl.style.opacity = "1";
    }, 180);
  }
}

function formatVideoUrl(url, autoplay = false) {
  if (!url) return "";
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?${autoplay ? 'autoplay=1&' : ''}rel=0&modestbranding=1`;
  }
  return url;
}

function openVideoDocModal() {
  const modal = document.getElementById("videoDocModal");
  const frame = document.getElementById("modalVideoFrame");
  const settings = window.store.getSettings();
  const rawUrl = settings.documentaryVideoUrl || "https://www.youtube.com/watch?v=BHbDLSXmtBA";
  
  if (modal && frame) {
    const formattedUrl = formatVideoUrl(rawUrl, true);
    if (formattedUrl.includes("youtube.com/embed/")) {
      frame.innerHTML = `
        <iframe id="modalVideoIframe" src="${formattedUrl}" title="Bengal Artisan Jute Mat Crafting" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width: 100%; height: 100%; border: none; border-radius: var(--radius-md);"></iframe>
      `;
    } else {
      frame.innerHTML = `
        <video id="modalVideoPlayer" controls autoplay playsinline poster="${settings.videoPosterUrl || 'assets/images/jute_floor_mat.jpg'}" style="width: 100%; height: 100%; border-radius: var(--radius-md); object-fit: cover;">
          <source src="${formattedUrl}" type="video/mp4">
          Your browser does not support HTML5 video.
        </video>
      `;
    }
    modal.classList.add("active");
  }
}

function closeVideoDocModal() {
  const modal = document.getElementById("videoDocModal");
  const frame = document.getElementById("modalVideoFrame");
  if (frame) frame.innerHTML = "";
  if (modal) modal.classList.remove("active");
}

// Room Staging Switcher (Concept 1 Atelier Feature)
const heroRoomData = {
  rug: {
    img: "assets/images/jute_floor_mat.jpg",
    badge: "4.0 Ft Mandala Rug",
    alt: "Hand-Braided Mandala Jute Floor Rug in Living Room"
  },
  dining: {
    img: "assets/images/jute_table_mat.jpg",
    badge: "Set of 6 Placemats",
    alt: "Braided Jute Dining Table Placemats and Coasters"
  },
  balcony: {
    img: "assets/images/jute_planter_basket.jpg",
    badge: "Botanical Planters",
    alt: "Handwoven Jute Planter Baskets in Sunlit Balcony"
  }
};

function switchHeroRoom(roomKey, btnEl) {
  document.querySelectorAll(".room-tab-btn").forEach(btn => btn.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  const data = heroRoomData[roomKey];
  if (!data) return;

  const img = document.getElementById("heroFeaturedImage");
  const badge = document.getElementById("heroImgBadge");
  if (img) {
    img.style.opacity = "0.3";
    setTimeout(() => {
      img.src = data.img;
      img.alt = data.alt;
      img.style.opacity = "1";
    }, 150);
  }
  if (badge) badge.textContent = data.badge;
}

// Wholesale Direct Mill Calculator (Concept 3 Feature)
function calculateBulkPrice() {
  const select = document.getElementById("calcProductSelect");
  const slider = document.getElementById("calcQtySlider");
  const qtyDisplay = document.getElementById("calcQtyDisplay");
  const customPrint = document.getElementById("calcCustomPrint");
  if (!select || !slider) return;

  const qty = parseInt(slider.value, 10);
  if (qtyDisplay) qtyDisplay.textContent = `${qty} Pieces`;

  const opt = select.options[select.selectedIndex];
  const retail = parseFloat(opt.dataset.retail) || 499;
  const bulk100 = parseFloat(opt.dataset.bulk100) || 240;
  const bulk500 = parseFloat(opt.dataset.bulk500) || 185;

  // Tier pricing
  let unitPrice = bulk100;
  if (qty >= 500) {
    unitPrice = bulk500;
  } else if (qty >= 250) {
    unitPrice = Math.round(bulk500 + (bulk100 - bulk500) * 0.35);
  } else if (qty >= 100) {
    unitPrice = bulk100;
  } else {
    unitPrice = Math.round(bulk100 * 1.15);
  }

  if (customPrint && !customPrint.checked) {
    unitPrice = Math.max(50, unitPrice - 15);
  }

  const retailTotal = Math.round(retail * qty);
  const millTotal = Math.round(unitPrice * qty);
  const saved = Math.max(0, retailTotal - millTotal);
  const discountPct = Math.round((saved / retailTotal) * 100);

  const unitEl = document.getElementById("calcUnitPrice");
  const pillEl = document.getElementById("calcDiscountPill");
  const retEl = document.getElementById("calcRetailTotal");
  const millEl = document.getElementById("calcMillTotal");
  const saveEl = document.getElementById("calcSavedAmount");

  if (unitEl) unitEl.textContent = window.store.formatCurrency(unitPrice);
  if (pillEl) pillEl.textContent = `${discountPct}% OFF Retail`;
  if (retEl) retEl.textContent = window.store.formatCurrency(retailTotal);
  if (millEl) millEl.textContent = window.store.formatCurrency(millTotal);
  if (saveEl) saveEl.textContent = `${window.store.formatCurrency(saved)} (${discountPct}%)`;
}

function sendBulkWhatsAppQuote() {
  const select = document.getElementById("calcProductSelect");
  const slider = document.getElementById("calcQtySlider");
  const customPrint = document.getElementById("calcCustomPrint");
  const settings = window.store.getSettings();

  const productName = select ? select.options[select.selectedIndex].text : "Jute Products";
  const qty = slider ? slider.value : "100";
  const unitPrice = document.getElementById("calcUnitPrice") ? document.getElementById("calcUnitPrice").textContent : "";
  const millTotal = document.getElementById("calcMillTotal") ? document.getElementById("calcMillTotal").textContent : "";
  const hasPrint = customPrint && customPrint.checked ? "Yes (Custom Logo Included)" : "No (Plain Unprinted)";

  const msg = `Hello ${settings.storeName}! I am requesting an official wholesale B2B quote from your website:
• Product: ${productName}
• Quantity: ${qty} Pieces
• Custom Logo Print: ${hasPrint}
• Estimated Mill Total: ${millTotal} (${unitPrice}/piece)
Please share formal proforma invoice and lead time.`;

  const cleanWa = settings.whatsappNumber.replace(/[^0-9]/g, '');
  window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(msg)}`, '_blank');
}

function scrollToCalculator() {
  const el = document.getElementById("bulkCalculator");
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Window bindings
window.copySwingingCoupon = copySwingingCoupon;
window.toggleLoomVideoPlay = toggleLoomVideoPlay;
window.toggleLoomVideoAudio = toggleLoomVideoAudio;
window.selectMatCraftStep = selectMatCraftStep;
window.openVideoDocModal = openVideoDocModal;
window.closeVideoDocModal = closeVideoDocModal;
window.init3DTilt = init3DTilt;
window.switchHeroRoom = switchHeroRoom;
window.calculateBulkPrice = calculateBulkPrice;
window.sendBulkWhatsAppQuote = sendBulkWhatsAppQuote;
window.scrollToCalculator = scrollToCalculator;

// Floating Back-to-Top Button Scroll Listener
window.addEventListener("scroll", () => {
  const btn = document.getElementById("backToTopBtn");
  if (btn) {
    if (window.scrollY > 350) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }
});

// Search Keyboard Shortcut (Ctrl + K / Cmd + K)
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    const search = document.getElementById("mainSearchInput");
    if (search) {
      search.focus();
      search.select();
    }
  }
});

// Discreet Store Owner Shortcut: Press Ctrl + Shift + A or Ctrl + Alt + A to access the private Admin Portal
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) || 
      (e.ctrlKey && e.altKey && (e.key === "A" || e.key === "a"))) {
    e.preventDefault();
    window.location.href = "/admin";
  }
});
