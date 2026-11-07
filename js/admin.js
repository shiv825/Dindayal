/**
 * Admin Portal Controller
 * Full CRUD for Products, Order Management, and Basic Store Settings Editor
 */

let isAdminLoggedIn = sessionStorage.getItem("dindayal_admin_auth") === "true";
let currentEditingProductId = null;

document.addEventListener("DOMContentLoaded", () => {
  initAdminPortal();
});

function initAdminPortal() {
  // If dedicated adminPortalBody container is on page, render view immediately
  const body = document.getElementById("adminPortalBody");
  if (body) {
    if (isAdminLoggedIn) {
      showAdminDashboard();
    } else {
      showAdminLoginView();
    }
  }

  // Listen for store updates to keep admin metrics fresh
  window.store.subscribe((event, data) => {
    if (isAdminLoggedIn) {
      if (event === "products_updated") {
        renderAdminProductsTable();
        renderAdminMetrics();
      } else if (event === "orders_updated") {
        renderAdminOrdersTable();
        renderAdminMetrics();
      } else if (event === "settings_updated") {
        renderAdminSettingsForm();
      }
    }
  });
}

/**
 * Open Admin Portal Modal (if modal exists)
 */
function openAdminPortal() {
  const modal = document.getElementById("adminPortalModal");
  if (!modal) {
    window.location.href = "/admin";
    return;
  }

  if (!isAdminLoggedIn) {
    showAdminLoginView();
  } else {
    showAdminDashboard();
  }

  modal.classList.add("active");
}

function showAdminLoginView() {
  const body = document.getElementById("adminPortalBody");
  if (!body) return;

  body.innerHTML = `
    <div style="max-width: 440px; margin: 3rem auto; text-align: center; padding: 2.25rem; background: #ffffff; border: 1.5px solid var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);">
      <div style="width: 68px; height: 68px; background: var(--primary); color: var(--jute-gold); border-radius: var(--radius-md); display: inline-flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 1.25rem; box-shadow: var(--shadow-sm);">
        🔐
      </div>
      <h3 style="font-family: var(--font-heading); color: var(--primary); font-size: 1.5rem; margin-bottom: 0.5rem;">Admin Access Portal</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.75rem;">Authorized management console for Dindayal & Indian Jute House.</p>
      
      <form onsubmit="handleAdminLogin(event)">
        <div class="form-group" style="text-align: left;">
          <label class="form-label" style="font-weight: 700; color: var(--primary);">Security Passcode / PIN:</label>
          <input type="password" class="form-control" id="adminPinInput" placeholder="Enter PIN (Default: admin123)" required autofocus style="padding: 0.85rem; font-size: 1rem;">
          <span style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem; display: block;">Default access passcode: <strong>admin123</strong> (configurable in settings)</span>
        </div>
        <button type="submit" class="btn btn-primary btn-block btn-lg" style="margin-top: 1.25rem;">
          Enter Admin Dashboard 🚀
        </button>
      </form>
      <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border-light); font-size: 0.85rem; color: var(--text-muted);">
        <a href="/" style="color: var(--primary); font-weight: 600;">← Return to Customer Storefront</a>
      </div>
    </div>
  `;
}

function handleAdminLogin(event) {
  event.preventDefault();
  const inputPin = document.getElementById("adminPinInput").value.trim();
  const settings = window.store.getSettings();

  if (inputPin === (settings.adminPin || "admin123")) {
    isAdminLoggedIn = true;
    sessionStorage.setItem("dindayal_admin_auth", "true");
    showToast("Admin authenticated successfully!", "success");
    showAdminDashboard();
  } else {
    showToast("Incorrect Admin Passcode. Try 'admin123'", "error");
  }
}

function handleAdminLogout() {
  isAdminLoggedIn = false;
  sessionStorage.removeItem("dindayal_admin_auth");
  showToast("Logged out of Admin Portal", "info");
  showAdminLoginView();
}

/**
 * Render Main Admin Dashboard
 */
function showAdminDashboard() {
  const body = document.getElementById("adminPortalBody");
  if (!body) return;

  body.innerHTML = `
    <!-- Admin Navigation Tabs -->
    <div class="admin-nav-tabs">
      <div class="admin-nav-tab active" data-tab="dashboard" onclick="switchAdminTab('dashboard')">
        📊 Overview
      </div>
      <div class="admin-nav-tab" data-tab="products" onclick="switchAdminTab('products')">
        📦 Product Catalog (Add/Edit)
      </div>
      <div class="admin-nav-tab" data-tab="orders" onclick="switchAdminTab('orders')">
        🛍️ Orders Management
      </div>
      <div class="admin-nav-tab" data-tab="settings" onclick="switchAdminTab('settings')">
        ⚙️ Store Details & Settings
      </div>
      <div style="margin-left: auto; display: flex; align-items: center; padding-right: 0.5rem;">
        <button class="btn btn-secondary btn-sm" onclick="handleAdminLogout()">Logout 🚪</button>
      </div>
    </div>

    <div style="padding: 1.75rem;">
      <!-- TAB 1: OVERVIEW DASHBOARD -->
      <div class="admin-tab-pane active" id="adminPane-dashboard">
        <div id="adminKpisContainer"></div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h4 style="font-family: var(--font-heading); color: var(--primary); font-size: 1.15rem;">Recent Customer Orders</h4>
          <button class="btn btn-secondary btn-sm" onclick="switchAdminTab('orders')">View All Orders →</button>
        </div>
        <div id="adminRecentOrdersTable"></div>
      </div>

      <!-- TAB 2: PRODUCTS CRUD -->
      <div class="admin-tab-pane" id="adminPane-products">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
          <div>
            <h3 style="font-family: var(--font-heading); color: var(--primary); font-size: 1.35rem;">Products Inventory</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted);">Add new jute bags, floor mats, twines, or update prices & stock</p>
          </div>
          <button class="btn btn-primary" onclick="openAddProductModal()">
            + Add New Jute Product
          </button>
        </div>
        <div id="adminProductsTableContainer"></div>
      </div>

      <!-- TAB 3: ORDERS MANAGEMENT -->
      <div class="admin-tab-pane" id="adminPane-orders">
        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-family: var(--font-heading); color: var(--primary); font-size: 1.35rem;">Customer Orders</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Track customer payments, change delivery statuses, and view invoices</p>
        </div>
        <div id="adminOrdersTableContainer"></div>
      </div>

      <!-- TAB 4: STORE DETAILS & SETTINGS -->
      <div class="admin-tab-pane" id="adminPane-settings">
        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-family: var(--font-heading); color: var(--primary); font-size: 1.35rem;">Edit Basic Store Details</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Changes made here immediately update phone numbers, emails, addresses, UPI ID, and announcement banners on the live customer website!</p>
        </div>
        <div id="adminSettingsContainer"></div>
      </div>
    </div>
  `;

  renderAdminMetrics();
  renderAdminProductsTable();
  renderAdminOrdersTable();
  renderAdminSettingsForm();
}

function switchAdminTab(tabName) {
  document.querySelectorAll(".admin-nav-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });
  document.querySelectorAll(".admin-tab-pane").forEach(pane => {
    pane.classList.toggle("active", pane.id === `adminPane-${tabName}`);
  });
}

/**
 * Render Overview KPI Metrics
 */
function renderAdminMetrics() {
  const container = document.getElementById("adminKpisContainer");
  if (!container) return;

  const products = window.store.getProducts();
  const orders = window.store.getOrders();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalItemsSold = orders.reduce((sum, o) => {
    return sum + (o.items ? o.items.reduce((s, i) => s + i.qty, 0) : 0);
  }, 0);
  const lowStockCount = products.filter(p => (p.stockCount || 0) < 30).length;

  container.innerHTML = `
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-icon-wrap">💰</div>
        <div class="kpi-meta">
          <h5>Total Revenue</h5>
          <div class="kpi-value">${window.store.formatCurrency(totalRevenue)}</div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon-wrap">📦</div>
        <div class="kpi-meta">
          <h5>Total Orders</h5>
          <div class="kpi-value">${orders.length}</div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon-wrap">🌾</div>
        <div class="kpi-meta">
          <h5>Total Products</h5>
          <div class="kpi-value">${products.length}</div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon-wrap">⚠️</div>
        <div class="kpi-meta">
          <h5>Low Stock Items</h5>
          <div class="kpi-value">${lowStockCount}</div>
        </div>
      </div>
    </div>
  `;

  // Render recent orders preview
  const recentTable = document.getElementById("adminRecentOrdersTable");
  if (recentTable) {
    const recent = orders.slice(0, 4);
    if (recent.length === 0) {
      recentTable.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">No orders placed yet.</p>`;
    } else {
      recentTable.innerHTML = `
        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${recent.map(o => `
                <tr>
                  <td><strong>${o.id}</strong></td>
                  <td>${o.customer.name}<br><span style="font-size: 0.75rem; color: var(--text-muted);">${o.customer.phone}</span></td>
                  <td><strong>${window.store.formatCurrency(o.total)}</strong></td>
                  <td><span class="badge ${o.paymentStatus.includes('Paid') ? 'badge-trending' : 'badge-bestseller'}">${o.paymentStatus}</span></td>
                  <td><span class="badge badge-industrial">${o.status}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    }
  }
}

/**
 * Products Table (CRUD)
 */
function renderAdminProductsTable() {
  const container = document.getElementById("adminProductsTableContainer");
  if (!container) return;

  const products = window.store.getProducts();

  container.innerHTML = `
    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Selling Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${products.map(p => `
            <tr>
              <td>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <img src="${p.image}" class="table-thumb" alt="${p.name}" onerror="this.src='assets/images/jute_tote_bag.jpg'">
                  <div>
                    <strong style="color: var(--primary);">${p.name}</strong>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${p.badge || 'Standard Jute'}</div>
                  </div>
                </div>
              </td>
              <td><span class="badge badge-eco">${p.category.toUpperCase()}</span></td>
              <td>
                <strong>${window.store.formatCurrency(p.price)}</strong>
                ${p.originalPrice ? `<span style="text-decoration: line-through; color: var(--text-light); font-size: 0.75rem; margin-left: 4px;">${window.store.formatCurrency(p.originalPrice)}</span>` : ''}
              </td>
              <td>
                <strong>${p.stockCount || 0}</strong> units
              </td>
              <td>
                <button class="btn btn-sm ${p.inStock ? 'btn-secondary' : 'btn-danger'}" style="font-size: 0.75rem; padding: 0.2rem 0.5rem;" onclick="handleToggleStock('${p.id}')">
                  ${p.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                </button>
              </td>
              <td>
                <div class="table-actions">
                  <button class="action-icon-btn" onclick="openEditProductModal('${p.id}')" title="Edit Product">✏️</button>
                  <button class="action-icon-btn delete" onclick="handleDeleteProduct('${p.id}')" title="Delete Product">🗑️</button>
                </div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function handleToggleStock(productId) {
  const product = window.store.getProductById(productId);
  if (product) {
    window.store.updateProduct(productId, { inStock: !product.inStock });
    showToast(`Updated stock status for "${product.name}"`, "info");
  }
}

function handleDeleteProduct(productId) {
  const product = window.store.getProductById(productId);
  if (!product) return;

  if (confirm(`Are you sure you want to delete "${product.name}" from the store catalog?`)) {
    window.store.deleteProduct(productId);
    showToast(`Product "${product.name}" deleted`, "success");
  }
}

/**
 * Add / Edit Product Modal Form
 */
function openAddProductModal() {
  currentEditingProductId = null;
  showProductFormModal("Add New Jute Product", {
    name: "",
    category: "bags",
    price: 499,
    originalPrice: 799,
    stockCount: 50,
    badge: "Eco-Friendly",
    badgeType: "eco",
    image: "assets/images/jute_tote_bag.jpg",
    shortDesc: "",
    specsMaterial: "100% Natural Golden Jute",
    specsDimensions: '15" x 14" x 5"',
    specsCapacity: "Up to 15 kg"
  });
}

function openEditProductModal(productId) {
  const p = window.store.getProductById(productId);
  if (!p) return;
  currentEditingProductId = productId;

  showProductFormModal("Edit Product: " + p.name, {
    name: p.name,
    category: p.category,
    price: p.price,
    originalPrice: p.originalPrice || p.price,
    stockCount: p.stockCount || 50,
    badge: p.badge || "",
    badgeType: p.badgeType || "eco",
    image: p.image,
    shortDesc: p.shortDesc,
    specsMaterial: p.specs?.["Material"] || "Natural Jute Fiber",
    specsDimensions: p.specs?.["Dimensions"] || p.specs?.["Diameter"] || "",
    specsCapacity: p.specs?.["Weight Capacity"] || p.specs?.["Package Contains"] || ""
  });
}

function showProductFormModal(title, initial) {
  const modal = document.getElementById("adminProductFormModal");
  const body = document.getElementById("adminProductFormModalBody");
  const titleEl = document.getElementById("adminProductFormTitle");
  if (!modal || !body) return;

  titleEl.textContent = title;

  body.innerHTML = `
    <form onsubmit="handleProductFormSubmit(event)">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Product Name / Title *</label>
          <input type="text" class="form-control" id="formProdName" value="${initial.name}" required placeholder="e.g. Designer Jute Tote Bag">
        </div>
        <div class="form-group">
          <label class="form-label">Category *</label>
          <select class="form-control" id="formProdCategory">
            <option value="bags" ${initial.category === 'bags' ? 'selected' : ''}>Jute Bags & Totes</option>
            <option value="mats" ${initial.category === 'mats' ? 'selected' : ''}>Jute Mats & Rugs</option>
            <option value="home" ${initial.category === 'home' ? 'selected' : ''}>Home Decor, Planters & Baskets</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Selling Price (₹) *</label>
          <input type="number" class="form-control" id="formProdPrice" value="${initial.price}" required min="1">
        </div>
        <div class="form-group">
          <label class="form-label">Original / MRP Price (₹)</label>
          <input type="number" class="form-control" id="formProdOriginalPrice" value="${initial.originalPrice}" min="1">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Available Stock Quantity *</label>
          <input type="number" class="form-control" id="formProdStock" value="${initial.stockCount}" required min="0">
        </div>
        <div class="form-group">
          <label class="form-label">Badge Tag (e.g. Bestseller, 100% Organic)</label>
          <input type="text" class="form-control" id="formProdBadge" value="${initial.badge}" placeholder="Trending, Artisan...">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Product Image Selection</label>
        <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 0.5rem;">
          <select class="form-control" id="formProdPresetImage" onchange="document.getElementById('formProdImageUrl').value = this.value; document.getElementById('formImagePreview').src = this.value;">
            <option value="assets/images/jute_tote_bag.jpg" ${initial.image.includes('tote') ? 'selected' : ''}>Image 1: Luxury Jute Tote Bag</option>
            <option value="assets/images/jute_printed_bag.jpg" ${initial.image.includes('printed') ? 'selected' : ''}>Image 2: Botanical Printed Handbag</option>
            <option value="assets/images/jute_laptop_sleeve.jpg" ${initial.image.includes('laptop') ? 'selected' : ''}>Image 3: Padded Jute Laptop Sleeve</option>
            <option value="assets/images/jute_floor_mat.jpg" ${initial.image.includes('floor') ? 'selected' : ''}>Image 4: Round Braided Floor Rug Mat</option>
            <option value="assets/images/jute_table_mat.jpg" ${initial.image.includes('table') ? 'selected' : ''}>Image 5: Dining Table Mats & Coasters</option>
            <option value="assets/images/jute_door_mat.jpg" ${initial.image.includes('door') ? 'selected' : ''}>Image 6: Welcome Border Door Mat</option>
            <option value="assets/images/jute_planter_basket.jpg" ${initial.image.includes('planter') ? 'selected' : ''}>Image 7: Woven Planter & Storage Basket</option>
            <option value="assets/images/jute_wall_hanging.jpg" ${initial.image.includes('wall') ? 'selected' : ''}>Image 8: Macramé Jute Wall Hanging</option>
          </select>
          <img id="formImagePreview" src="${initial.image}" style="width: 48px; height: 48px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--border);">
        </div>
        <input type="text" class="form-control" id="formProdImageUrl" value="${initial.image}" placeholder="Or paste external image URL (https://...)">
      </div>

      <div class="form-group">
        <label class="form-label">Short Description</label>
        <textarea class="form-control" id="formProdDesc" rows="2" placeholder="Brief summary for customer card..." required>${initial.shortDesc}</textarea>
      </div>

      <div style="background: var(--bg-subtle); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.25rem;">
        <h5 style="font-size: 0.85rem; color: var(--primary); font-weight: 700; margin-bottom: 0.5rem;">Material Specifications</h5>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Material Composition</label>
            <input type="text" class="form-control" id="formSpecMaterial" value="${initial.specsMaterial}">
          </div>
          <div class="form-group">
            <label class="form-label">Dimensions / Size</label>
            <input type="text" class="form-control" id="formSpecDimensions" value="${initial.specsDimensions}">
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
        <button type="button" class="btn btn-secondary" onclick="closeModal('adminProductFormModal')">Cancel</button>
        <button type="submit" class="btn btn-primary">Save Product</button>
      </div>
    </form>
  `;

  modal.classList.add("active");
}

function handleProductFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("formProdName").value.trim();
  const category = document.getElementById("formProdCategory").value;
  const price = parseFloat(document.getElementById("formProdPrice").value);
  const originalPrice = parseFloat(document.getElementById("formProdOriginalPrice").value) || price;
  const stockCount = parseInt(document.getElementById("formProdStock").value, 10);
  const badge = document.getElementById("formProdBadge").value.trim();
  const image = document.getElementById("formProdImageUrl").value.trim() || "assets/images/jute_tote_bag.jpg";
  const shortDesc = document.getElementById("formProdDesc").value.trim();
  const material = document.getElementById("formSpecMaterial").value.trim();
  const dimensions = document.getElementById("formSpecDimensions").value.trim();

  const productData = {
    name,
    category,
    price,
    originalPrice,
    stockCount,
    badge,
    image,
    shortDesc,
    specs: {
      "Material": material,
      "Dimensions": dimensions,
      "Eco Rating": "100% Biodegradable & Natural"
    }
  };

  if (currentEditingProductId) {
    window.store.updateProduct(currentEditingProductId, productData);
    showToast(`Updated product "${name}"!`, "success");
  } else {
    window.store.addProduct(productData);
    showToast(`New product "${name}" added to catalog!`, "success");
  }

  closeModal("adminProductFormModal");
}

/**
 * Orders Management
 */
function renderAdminOrdersTable() {
  const container = document.getElementById("adminOrdersTableContainer");
  if (!container) return;

  const orders = window.store.getOrders();

  if (orders.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; background: var(--bg); border-radius: var(--radius-md);">
        <h4>No Customer Orders Yet</h4>
        <p style="color: var(--text-muted); font-size: 0.88rem;">When customers buy products from the website, orders will appear here automatically.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Order ID & Date</th>
            <th>Customer Information</th>
            <th>Ordered Items</th>
            <th>Total Amount</th>
            <th>Payment Details</th>
            <th>Order Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${orders.map(o => {
            const dateStr = new Date(o.date).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' });
            return `
              <tr>
                <td>
                  <strong>${o.id}</strong><br>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">${dateStr}</span>
                </td>
                <td>
                  <strong>${o.customer.name}</strong><br>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">${o.customer.phone}</span><br>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">${o.customer.city}, ${o.customer.pincode}</span>
                </td>
                <td>
                  <div style="font-size: 0.8rem; max-width: 200px;">
                    ${o.items ? o.items.map(i => `${i.qty}× ${i.name}`).join("<br>") : 'N/A'}
                  </div>
                </td>
                <td>
                  <strong style="color: var(--primary); font-size: 1rem;">${window.store.formatCurrency(o.total)}</strong>
                </td>
                <td>
                  <div style="font-size: 0.8rem;">
                    <strong>${o.paymentMethod}</strong><br>
                    <span class="badge ${o.paymentStatus.includes('Paid') ? 'badge-trending' : 'badge-bestseller'}">${o.paymentStatus}</span>
                  </div>
                </td>
                <td>
                  <select class="form-control" style="font-size: 0.8rem; padding: 0.25rem 0.5rem; width: auto;" onchange="handleOrderStatusChange('${o.id}', this.value)">
                    <option value="Placed" ${o.status === 'Placed' ? 'selected' : ''}>Placed</option>
                    <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
                    <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                  </select>
                </td>
                <td>
                  <button class="action-icon-btn delete" onclick="handleDeleteOrder('${o.id}')" title="Delete Order">🗑️</button>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function handleOrderStatusChange(orderId, newStatus) {
  window.store.updateOrderStatus(orderId, newStatus);
  showToast(`Order ${orderId} marked as "${newStatus}"`, "success");
}

function handleDeleteOrder(orderId) {
  if (confirm(`Delete order ${orderId}?`)) {
    window.store.deleteOrder(orderId);
    showToast(`Order ${orderId} deleted`, "info");
  }
}

/**
 * Basic Store Details & Settings Form
 * The user requested: "we can change any basic detalis from admin portal"
 */
function renderAdminSettingsForm() {
  const container = document.getElementById("adminSettingsContainer");
  if (!container) return;

  const s = window.store.getSettings();

  container.innerHTML = `
    <form onsubmit="handleSaveStoreSettings(event)">
      <!-- Company & Brand Identity -->
      <div class="settings-section-card">
        <h4>🏢 Company & Brand Identity</h4>
        <p>Edit your brand title, subtitle, and primary tagline displayed on the header & hero section.</p>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Store / Company Name *</label>
            <input type="text" class="form-control" id="settStoreName" value="${s.storeName}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Brand Subtitle / Group Name</label>
            <input type="text" class="form-control" id="settBrandSubtitle" value="${s.brandSubtitle || ''}">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Brand Tagline / Mission Statement</label>
          <input type="text" class="form-control" id="settTagline" value="${s.tagline}">
        </div>

        <div class="form-group">
          <label class="form-label">Top Announcement Banner Bar (Promotions / News)</label>
          <input type="text" class="form-control" id="settAnnouncement" value="${s.announcementText}">
        </div>
      </div>

      <!-- Contact Details -->
      <div class="settings-section-card">
        <h4>📞 Official Contact & Communication Details</h4>
        <p>Customers will see these numbers, emails, and address across the site and in order receipts.</p>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Primary Phone / Mobile *</label>
            <input type="text" class="form-control" id="settPhone" value="${s.phone}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Alternate Phone / Mobile</label>
            <input type="text" class="form-control" id="settAltPhone" value="${s.altPhone || ''}">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">WhatsApp Contact Number (Without spaces, with country code) *</label>
            <input type="text" class="form-control" id="settWhatsapp" value="${s.whatsappNumber}" required placeholder="919836677089">
          </div>
          <div class="form-group">
            <label class="form-label">Customer Support Email *</label>
            <input type="email" class="form-control" id="settEmail" value="${s.email}" required>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Corporate Office Address</label>
          <textarea class="form-control" id="settAddress" rows="2">${s.address}</textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">GSTIN Number</label>
            <input type="text" class="form-control" id="settGstin" value="${s.gstin}">
          </div>
          <div class="form-group">
            <label class="form-label">Managing Partner / Owner Name</label>
            <input type="text" class="form-control" id="settPartner" value="${s.managingPartner || 'Mr. Likhit Gupta'}">
          </div>
        </div>
      </div>

      <!-- Payment & Shipping Settings -->
      <div class="settings-section-card">
        <h4>💳 Payment Gateway & Shipping Rules</h4>
        <p>Configure live UPI QR Code receiver information and free shipping thresholds.</p>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Merchant UPI ID (for QR Code Payments) *</label>
            <input type="text" class="form-control" id="settUpiId" value="${s.upiId}" required placeholder="dindayalropes@okhdfcbank">
          </div>
          <div class="form-group">
            <label class="form-label">Merchant / Business Name on UPI</label>
            <input type="text" class="form-control" id="settUpiName" value="${s.upiName || s.storeName}">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Free Delivery Threshold (₹)</label>
            <input type="number" class="form-control" id="settFreeShip" value="${s.freeShippingThreshold}" min="0">
          </div>
          <div class="form-group">
            <label class="form-label">Standard Shipping Charge (₹) for orders below threshold</label>
            <input type="number" class="form-control" id="settShipFee" value="${s.shippingFee}" min="0">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Admin Security Passcode / PIN</label>
          <input type="password" class="form-control" id="settAdminPin" value="${s.adminPin || 'admin123'}" placeholder="Change your admin passcode">
        </div>
      </div>

      <!-- Artisan Loom & Workers Video Settings -->
      <div class="settings-section-card">
        <h4>🎬 Artisan Loom &amp; Workers Video Settings (Mats &amp; Rugs Crafting)</h4>
        <p>Change the background video showing workers weaving mats on traditional looms, and the full documentary player video.</p>

        <div class="form-group">
          <label class="form-label">Workers Mat Weaving Video URL (Ambient Background Loop) *</label>
          <input type="text" class="form-control" id="settAmbientVideoUrl" value="${s.ambientVideoUrl || ''}" placeholder="Direct .webm / .mp4 video link of workers weaving mats">
          <small style="color: var(--text-muted); display: block; margin-top: 0.35rem;">
            This video loops in the background on the light theme behind the "Watch How Artisans Braid Mats by Hand" section.
          </small>
        </div>

        <div class="form-group">
          <label class="form-label">Full Documentary Video URL (Modal Player) *</label>
          <input type="text" class="form-control" id="settDocVideoUrl" value="${s.documentaryVideoUrl || ''}" placeholder="Direct .webm / .mp4 video link or stream">
          <small style="color: var(--text-muted); display: block; margin-top: 0.35rem;">
            Plays when customer clicks "Watch 4K Full Documentary" button.
          </small>
        </div>

        <div class="form-group">
          <label class="form-label">Video Poster / Fallback Image Path</label>
          <input type="text" class="form-control" id="settVideoPosterUrl" value="${s.videoPosterUrl || 'assets/images/jute_floor_mat.jpg'}" placeholder="assets/images/jute_floor_mat.jpg">
        </div>

        <div style="background: var(--bg-subtle); padding: 0.75rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border);">
          <span style="font-size: 0.82rem; font-weight: 700; color: var(--primary);">💡 Quick Presets:</span>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.4rem;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="setPresetVideo('tant_loom')" style="font-size: 0.75rem; padding: 0.25rem 0.65rem;">Bengal Loom Workers (Default)</button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="setPresetVideo('textile_loom')" style="font-size: 0.75rem; padding: 0.25rem 0.65rem;">Industrial Loom Clip</button>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <button type="button" class="btn btn-secondary btn-sm" onclick="handleResetSettingsDefault()">
          ↺ Reset to Reference Defaults
        </button>
        <button type="submit" class="btn btn-primary btn-lg">
          💾 Save All Basic Details
        </button>
      </div>
    </form>
  `;
}

function handleSaveStoreSettings(event) {
  event.preventDefault();

  const newSettings = {
    storeName: document.getElementById("settStoreName").value.trim(),
    brandSubtitle: document.getElementById("settBrandSubtitle").value.trim(),
    tagline: document.getElementById("settTagline").value.trim(),
    announcementText: document.getElementById("settAnnouncement").value.trim(),
    phone: document.getElementById("settPhone").value.trim(),
    altPhone: document.getElementById("settAltPhone").value.trim(),
    whatsappNumber: document.getElementById("settWhatsapp").value.trim(),
    email: document.getElementById("settEmail").value.trim(),
    address: document.getElementById("settAddress").value.trim(),
    gstin: document.getElementById("settGstin").value.trim(),
    managingPartner: document.getElementById("settPartner").value.trim(),
    upiId: document.getElementById("settUpiId").value.trim(),
    upiName: document.getElementById("settUpiName").value.trim(),
    freeShippingThreshold: Number(document.getElementById("settFreeShip").value) || 999,
    shippingFee: Number(document.getElementById("settShipFee").value) || 79,
    adminPin: document.getElementById("settAdminPin").value.trim() || "admin123",
    ambientVideoUrl: (document.getElementById("settAmbientVideoUrl") ? document.getElementById("settAmbientVideoUrl").value : "").trim(),
    documentaryVideoUrl: (document.getElementById("settDocVideoUrl") ? document.getElementById("settDocVideoUrl").value : "").trim(),
    videoPosterUrl: (document.getElementById("settVideoPosterUrl") ? document.getElementById("settVideoPosterUrl").value : "").trim()
  };

  window.store.saveSettings(newSettings);
  showToast("Store details & video settings saved! Changes are now live on the website.", "success");
}

function setPresetVideo(type) {
  const ambInput = document.getElementById("settAmbientVideoUrl");
  const docInput = document.getElementById("settDocVideoUrl");
  if (!ambInput || !docInput) return;
  if (type === 'tant_loom') {
    ambInput.value = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
    docInput.value = "https://www.youtube.com/watch?v=BHbDLSXmtBA";
    showToast("Preset set to Handmade Jute Mat Crafting video", "info");
  } else if (type === 'textile_loom' || type === 'braided_mat') {
    ambInput.value = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
    docInput.value = "https://www.youtube.com/watch?v=Oki9zW5X4cE";
    showToast("Preset set to Jute Braided Rug Masterclass video", "info");
  }
}
window.setPresetVideo = setPresetVideo;

function handleResetSettingsDefault() {
  if (confirm("Reset company details and settings back to original Indian Jute House / Dindayal Ropes defaults?")) {
    window.store.resetSettingsToDefault();
    showToast("Settings reset to defaults", "info");
    renderAdminSettingsForm();
  }
}

// Global Exports
window.openAdminPortal = openAdminPortal;
window.handleAdminLogin = handleAdminLogin;
window.handleAdminLogout = handleAdminLogout;
window.switchAdminTab = switchAdminTab;
window.handleToggleStock = handleToggleStock;
window.handleDeleteProduct = handleDeleteProduct;
window.openAddProductModal = openAddProductModal;
window.openEditProductModal = openEditProductModal;
window.handleProductFormSubmit = handleProductFormSubmit;
window.handleOrderStatusChange = handleOrderStatusChange;
window.handleDeleteOrder = handleDeleteOrder;
window.handleSaveStoreSettings = handleSaveStoreSettings;
window.handleResetSettingsDefault = handleResetSettingsDefault;

// Standalone Modal and Toast Helpers for admin.html
if (typeof window.closeModal !== "function") {
  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
  };
}

if (typeof window.showToast !== "function") {
  window.showToast = function(message, type = "info") {
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
  };
}
