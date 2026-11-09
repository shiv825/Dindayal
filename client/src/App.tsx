import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StoryBubbles } from './components/StoryBubbles';
import { HeroStage } from './components/HeroStage';
import { ProductGrid } from './components/ProductGrid';
import { WholesaleCalculator } from './components/WholesaleCalculator';
import { VideoDocModal } from './components/VideoDocModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';
import { Product, ProductCategory, CartItem, SiteSettings } from './types';
import { api, fallbackProducts, fallbackSettings } from './lib/api';
import { MessageSquare } from 'lucide-react';

export const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [settings, setSettings] = useState<SiteSettings>(fallbackSettings);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load initial data from API / Supabase
  const loadData = async () => {
    try {
      const [fetchedProducts, fetchedSettings] = await Promise.all([
        api.getProducts(),
        api.getSettings(),
      ]);
      setProducts(fetchedProducts);
      setSettings(fetchedSettings);
    } catch (e) {
      console.log('Using local fallback state');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Quick WhatsApp Quote for a specific product
  const handleQuickInquiry = (product: Product) => {
    const text = encodeURIComponent(
      `Hello Dindayal Jute & Craft team, I want to inquire about bulk wholesale pricing for: ${product.title} (Retail MRP ₹${product.price_inr}). Please share bulk discount tiers.`
    );
    window.open(`https://wa.me/919830296606?text=${text}`, '_blank');
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#FAF7F2] text-[#24221E]">
      {/* Navigation Header */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('products-catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Story Bubbles */}
      <StoryBubbles
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('products-catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenVideo={() => setIsVideoModalOpen(true)}
      />

      {/* Hero Stage with Bengal Looms Story & Room Visualizer */}
      <HeroStage
        onOpenVideo={() => setIsVideoModalOpen(true)}
        onExploreProducts={() => {
          const el = document.getElementById('products-catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Artisan Product Catalog */}
      <ProductGrid
        products={products}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddToCart={handleAddToCart}
        onQuickInquiry={handleQuickInquiry}
      />

      {/* B2B Wholesale & Mill Calculator */}
      <WholesaleCalculator />

      {/* Footer with verified business credentials */}
      <Footer />

      {/* Modals & Drawers */}
      <VideoDocModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={settings.documentary_video_url}
        posterUrl={settings.video_poster_url}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        settings={settings}
        onUpdateSettings={(newSettings) => setSettings(newSettings)}
        products={products}
        onRefreshProducts={loadData}
      />

      {/* Floating WhatsApp Action Pill */}
      <a
        href="https://wa.me/919830296606?text=Hello%20Dindayal%20Jute%20%26%20Craft,%20I%20have%20an%20inquiry%20regarding%20handcrafted%20jute%20mats."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border-2 border-white"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare size={22} fill="white" />
      </a>
    </div>
  );
};

export default App;

