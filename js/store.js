/**
 * State Management & Data Persistence Layer
 * Keeps products, orders, cart, and store settings in LocalStorage
 */

const STORAGE_KEYS = {
  SETTINGS: "djh_store_settings_v2",
  PRODUCTS: "djh_products_v2",
  CART: "djh_cart_v2",
  ORDERS: "djh_orders_v2",
  COUPON: "djh_applied_coupon_v2"
};

class Store {
  constructor() {
    this.listeners = [];
    this.init();
  }

  init() {
    // Initialize Settings
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      this.saveSettings(DEFAULT_STORE_SETTINGS);
    }
    // Initialize Products
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      this.saveProducts(DEFAULT_PRODUCTS);
    }
    // Initialize Orders (with sample initial orders so admin portal is not blank)
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      const initialOrders = [
        {
          id: "ORD-94101",
          date: new Date(Date.now() - 3600 * 1000 * 24 * 2).toISOString(),
          customer: {
            name: "Ananya Sharma",
            email: "ananya.s@gmail.com",
            phone: "+91 98201 12345",
            address: "42 Park Street, Apt 3B",
            city: "Kolkata",
            state: "West Bengal",
            pincode: "700016"
          },
          items: [
            { id: "jute-bag-01", name: "Luxury Handcrafted Jute Tote Bag", price: 499, qty: 2, image: "assets/images/jute_tote_bag.jpg" },
            { id: "jute-mat-02", name: "Artisan Dining Table Mats & Coasters (Set of 6)", price: 799, qty: 1, image: "assets/images/jute_table_mat.jpg" }
          ],
          paymentMethod: "UPI (Google Pay)",
          paymentStatus: "Paid",
          paymentRef: "UPI-Ref-49204128",
          subtotal: 1797,
          shipping: 0,
          discount: 179,
          total: 1618,
          status: "Shipped",
          notes: "Handle with care, eco packaging requested"
        },
        {
          id: "ORD-94102",
          date: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
          customer: {
            name: "Rajesh Mukherjee",
            email: "mukherjee.r@tcs.com",
            phone: "+91 94330 98765",
            address: "DLF 2, Action Area 1, New Town",
            city: "Kolkata",
            state: "West Bengal",
            pincode: "700156"
          },
          items: [
            { id: "jute-mat-01", name: "Hand-Braided Round Jute Floor Rug (4 Ft)", price: 1899, qty: 1, image: "assets/images/jute_floor_mat.jpg" }
          ],
          paymentMethod: "Credit Card",
          paymentStatus: "Paid",
          paymentRef: "TXN-88294109",
          subtotal: 1899,
          shipping: 0,
          discount: 0,
          total: 1899,
          status: "Processing",
          notes: ""
        }
      ];
      this.saveOrders(initialOrders);
    }
  }

  // --- Subscriptions ---
  subscribe(fn) {
    this.listeners.push(fn);
  }

  notify(event, data) {
    this.listeners.forEach(fn => fn(event, data));
  }

  // --- Settings Management ---
  getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_STORE_SETTINGS, ...JSON.parse(data) } : DEFAULT_STORE_SETTINGS;
    } catch (e) {
      return DEFAULT_STORE_SETTINGS;
    }
  }

  saveSettings(newSettings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
    this.notify("settings_updated", newSettings);
  }

  updateSettingField(key, value) {
    const current = this.getSettings();
    current[key] = value;
    this.saveSettings(current);
  }

  resetSettingsToDefault() {
    this.saveSettings(DEFAULT_STORE_SETTINGS);
  }

  // --- Products CRUD ---
  getProducts() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return data ? JSON.parse(data) : DEFAULT_PRODUCTS;
    } catch (e) {
      return DEFAULT_PRODUCTS;
    }
  }

  saveProducts(products) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    this.notify("products_updated", products);
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => p.id === id);
  }

  addProduct(productData) {
    const products = this.getProducts();
    const newId = "jute-prod-" + Date.now().toString(36);
    const newProduct = {
      id: newId,
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
      featured: false,
      ...productData
    };
    products.unshift(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      this.saveProducts(products);
      return products[index];
    }
    return null;
  }

  deleteProduct(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    this.saveProducts(products);
    // Also remove from cart if present
    this.removeFromCart(id);
  }

  resetProductsToDefault() {
    this.saveProducts(DEFAULT_PRODUCTS);
  }

  // --- Cart Management ---
  getCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CART);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    this.notify("cart_updated", cart);
  }

  addToCart(productId, qty = 1) {
    const product = this.getProductById(productId);
    if (!product) return false;

    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
      cart[existingIndex].qty += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        qty: qty
      });
    }

    this.saveCart(cart);
    return true;
  }

  updateCartQty(productId, qty) {
    let cart = this.getCart();
    if (qty <= 0) {
      cart = cart.filter(item => item.id !== productId);
    } else {
      const item = cart.find(i => i.id === productId);
      if (item) {
        item.qty = qty;
      }
    }
    this.saveCart(cart);
  }

  removeFromCart(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
  }

  clearCart() {
    this.saveCart([]);
    this.clearCoupon();
  }

  getCartCount() {
    return this.getCart().reduce((sum, item) => sum + item.qty, 0);
  }

  getCartTotals() {
    const cart = this.getCart();
    const settings = this.getSettings();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const coupon = this.getAppliedCoupon();
    let discount = 0;
    if (coupon && coupon.valid) {
      if (coupon.type === "percentage") {
        discount = Math.round(subtotal * (coupon.value / 100));
      } else {
        discount = coupon.value;
      }
    }

    let shipping = 0;
    if (subtotal > 0 && subtotal < Number(settings.freeShippingThreshold || 999)) {
      shipping = Number(settings.shippingFee || 79);
    }

    const total = Math.max(0, subtotal - discount + shipping);

    return {
      subtotal,
      discount,
      shipping,
      total,
      freeShippingThreshold: Number(settings.freeShippingThreshold || 999),
      neededForFreeShipping: Math.max(0, Number(settings.freeShippingThreshold || 999) - subtotal),
      itemCount: this.getCartCount()
    };
  }

  // --- Coupon Codes ---
  getAppliedCoupon() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COUPON);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  applyCoupon(code) {
    const cleanCode = (code || "").trim().toUpperCase();
    if (cleanCode === "ECO10" || cleanCode === "JUTE10") {
      const coupon = { code: cleanCode, type: "percentage", value: 10, valid: true, desc: "10% Eco Discount" };
      localStorage.setItem(STORAGE_KEYS.COUPON, JSON.stringify(coupon));
      this.notify("cart_updated", this.getCart());
      return { success: true, message: "Coupon applied! You saved 10% on your order." };
    } else if (cleanCode === "FREESHIP") {
      const coupon = { code: cleanCode, type: "shipping", value: 79, valid: true, desc: "Free Shipping" };
      localStorage.setItem(STORAGE_KEYS.COUPON, JSON.stringify(coupon));
      this.notify("cart_updated", this.getCart());
      return { success: true, message: "Coupon applied! Free Shipping activated." };
    } else if (cleanCode === "KOLKATA100") {
      const coupon = { code: cleanCode, type: "flat", value: 100, valid: true, desc: "Flat ₹100 Off" };
      localStorage.setItem(STORAGE_KEYS.COUPON, JSON.stringify(coupon));
      this.notify("cart_updated", this.getCart());
      return { success: true, message: "Coupon applied! Flat ₹100 discount added." };
    }
    return { success: false, message: "Invalid promo code. Try 'ECO10' for 10% off!" };
  }

  clearCoupon() {
    localStorage.removeItem(STORAGE_KEYS.COUPON);
    this.notify("cart_updated", this.getCart());
  }

  // --- Orders Management ---
  getOrders() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveOrders(orders) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.notify("orders_updated", orders);
  }

  createOrder(orderData) {
    const orders = this.getOrders();
    const orderId = "ORD-" + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      status: "Placed",
      paymentStatus: orderData.paymentMethod.includes("COD") ? "Pending (Cash On Delivery)" : "Paid",
      ...orderData
    };
    orders.unshift(newOrder);
    this.saveOrders(orders);
    this.clearCart();
    return newOrder;
  }

  updateOrderStatus(orderId, newStatus) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      if (newStatus === "Delivered" && order.paymentStatus.includes("COD")) {
        order.paymentStatus = "Paid (Cash Collected)";
      }
      this.saveOrders(orders);
      return order;
    }
    return null;
  }

  deleteOrder(orderId) {
    let orders = this.getOrders();
    orders = orders.filter(o => o.id !== orderId);
    this.saveOrders(orders);
  }

  // --- Utilities ---
  formatCurrency(amount) {
    return "₹" + Number(amount || 0).toLocaleString("en-IN");
  }
}

// Global Store Instance
window.store = new Store();
