import React, { useState } from 'react';
import {
  X,
  Video,
  Package,
  Plus,
  Trash2,
  Check,
  RefreshCw,
  Upload,
  Image as ImageIcon,
  Loader2,
  Search,
  ArrowLeft,
  CheckCircle2,
  CloudLightning,
  Edit3,
  Palette,
  Sparkles,
  Store,
  Sliders,
} from 'lucide-react';
import { Product, SiteSettings, ThemePalette } from '../types';
import { api } from '../lib/api';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
  onUpdateSettings: (newSettings: SiteSettings) => void;
  products: Product[];
  onRefreshProducts: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  products,
  onRefreshProducts,
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'add_product' | 'design_studio' | 'video_studio'>('catalog');

  // Search & Filter in Catalog
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogCategory, setCatalogCategory] = useState<string>('all');

  // Design & Store Studio State
  const [themePalette, setThemePalette] = useState<ThemePalette>(settings.theme_palette || 'emerald');
  const [storeName, setStoreName] = useState(settings.store_name || 'Dindayal & Craft');
  const [storeSubtitle, setStoreSubtitle] = useState(settings.store_subtitle || 'Indian Jute House • Estd. Kolkata');
  const [gstinNumber, setGstinNumber] = useState(settings.gstin_number || '19AACFD2094B1ZS');
  const [contactPhone, setContactPhone] = useState(settings.contact_phone || '+91 98302 96606');
  const [contactEmail, setContactEmail] = useState(settings.contact_email || 'info@indianjutehouse.com');
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsapp_number || '+919830296606');
  const [heroHeadline, setHeroHeadline] = useState(settings.hero_headline || 'Handcrafted Jute Mats & Eco Living, Woven with Soul.');
  const [heroSubtitle, setHeroSubtitle] = useState(settings.hero_subtitle || 'From the fertile delta of Bengal to modern sustainable homes. Hand-braided circular floor rugs, ribbed anti-slip entry mats, and artisan dining runners engineered for longevity and barefoot comfort.');
  const [trust1Val, setTrust1Val] = useState(settings.trust_badge_1_val || '100%');
  const [trust1Label, setTrust1Label] = useState(settings.trust_badge_1_label || 'Golden Bengal Fiber');
  const [trust2Val, setTrust2Val] = useState(settings.trust_badge_2_val || '10+ Yrs');
  const [trust2Label, setTrust2Label] = useState(settings.trust_badge_2_label || 'Artisan Loom Heritage');
  const [trust3Val, setTrust3Val] = useState(settings.trust_badge_3_val || 'Zero');
  const [trust3Label, setTrust3Label] = useState(settings.trust_badge_3_label || 'Microplastic Residue');
  const [rope1, setRope1] = useState(settings.rope_badge_1 || '🧶 Authentic Bengal Looms');
  const [rope2, setRope2] = useState(settings.rope_badge_2 || '✨ 100% Hand-Braided');
  const [rope3, setRope3] = useState(settings.rope_badge_3 || '🌿 Zero Microplastics');
  const [isSavingDesign, setIsSavingDesign] = useState(false);
  const [designSaveSuccess, setDesignSaveSuccess] = useState(false);

  // Video studio settings state
  const [ambientVideoUrl, setAmbientVideoUrl] = useState(settings.ambient_video_url);
  const [docVideoUrl, setDocVideoUrl] = useState(settings.documentary_video_url);
  const [videoPosterUrl, setVideoPosterUrl] = useState(settings.video_poster_url);
  const [announcementText, setAnnouncementText] = useState(settings.announcement_text);
  const [isSavingVideo, setIsSavingVideo] = useState(false);
  const [videoSaveSuccess, setVideoSaveSuccess] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  // New Product Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'floor_mats' | 'dining' | 'planters' | 'bags' | 'decor'>('floor_mats');
  const [newPrice, setNewPrice] = useState<number | ''>(1299);
  const [newMrp, setNewMrp] = useState<number | ''>(1999);
  const [newDimensions, setNewDimensions] = useState('4.0 Ft Diameter (120 cm)');
  const [newWeave, setNewWeave] = useState('Heavy Hand-Braided Spiral Weave');
  const [newImage, setNewImage] = useState('/assets/images/jute_floor_mat.jpg');
  const [newTag, setNewTag] = useState('Handcrafted Artisan Mat');
  const [newBadge, setNewBadge] = useState('⭐ New Arrival');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isUploadingProductImage, setIsUploadingProductImage] = useState(false);
  const [productAddSuccess, setProductAddSuccess] = useState(false);

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState<'floor_mats' | 'dining' | 'planters' | 'bags' | 'decor'>('floor_mats');
  const [editPrice, setEditPrice] = useState<number | ''>('');
  const [editMrp, setEditMrp] = useState<number | ''>('');
  const [editDimensions, setEditDimensions] = useState('');
  const [editWeave, setEditWeave] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editStock, setEditStock] = useState<number>(50);
  const [editBadge, setEditBadge] = useState('');
  const [editTag, setEditTag] = useState('');
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [isUploadingEditImage, setIsUploadingEditImage] = useState(false);
  const [editSuccessMessage, setEditSuccessMessage] = useState('');

  if (!isOpen) return null;

  // Preset dimension chips for 1-click convenience
  const dimensionPresets = [
    '4.0 Ft Diameter (120 cm)',
    '45 x 75 cm (18 x 30 in)',
    '6 Placemats + 1 Runner',
    '10" Height x 10" Dia',
    '16" x 14" x 6" inches',
    '60 cm Width x 80 cm Drop',
  ];

  // Preset weave chips for 1-click convenience
  const weavePresets = [
    'Heavy Hand-Braided Spiral Weave',
    'High-Tension Ribbed Coir-Jute Blend',
    'Fine Thread Braided Natural Gold',
    'Dual-Tone Rope Weave with Liner',
    'Laminated Jute Fabric (14x15 Weave)',
    'Hand-Knotted Fringe Macrame',
  ];

  // Open Edit Modal and prefill product data
  const handleStartEdit = (product: Product) => {
    setEditingProduct(product);
    setEditTitle(product.title);
    setEditCategory((product.category as any) || 'floor_mats');
    setEditPrice(product.price_inr);
    setEditMrp(product.mrp_inr);
    setEditDimensions(product.dimensions || '');
    setEditWeave(product.braid_weave_type || '');
    setEditImage(product.image_url);
    setEditStock(product.stock_qty || 50);
    setEditBadge(product.badge || '');
    setEditTag(product.tag || '');
    setEditSuccessMessage('');
  };

  // Cloudinary Upload for Edit Modal
  const handleEditImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingEditImage(true);
      const uploadedUrl = await api.uploadMedia(file, 'dindayal/products');
      setEditImage(uploadedUrl);
    } catch (err: any) {
      alert(`Cloudinary Upload Error: ${err.message}`);
    } finally {
      setIsUploadingEditImage(false);
    }
  };

  // Submit Product Updates
  const handleSaveEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editTitle || !editPrice) return;

    try {
      setIsSavingEdit(true);
      await api.updateProduct(editingProduct.id, {
        title: editTitle,
        category: editCategory,
        price_inr: Number(editPrice),
        mrp_inr: Number(editMrp) || Number(editPrice),
        dimensions: editDimensions,
        braid_weave_type: editWeave,
        image_url: editImage,
        stock_qty: editStock,
        badge: editBadge,
        tag: editTag,
      });

      setEditSuccessMessage('Product updated successfully!');
      onRefreshProducts();
      setTimeout(() => {
        setEditingProduct(null);
        setEditSuccessMessage('');
      }, 1200);
    } catch (err: any) {
      alert(`Failed to update product: ${err.message}`);
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Cloudinary Upload for Product Image
  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingProductImage(true);
      const uploadedUrl = await api.uploadMedia(file, 'dindayal/products');
      setNewImage(uploadedUrl);
    } catch (err: any) {
      alert(`Cloudinary Upload Error: ${err.message}`);
    } finally {
      setIsUploadingProductImage(false);
    }
  };

  // Cloudinary Upload for Video Poster or Clip
  const handleVideoMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'poster' | 'video') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingMedia(true);
      const uploadedUrl = await api.uploadMedia(file, 'dindayal/media');
      if (target === 'poster') {
        setVideoPosterUrl(uploadedUrl);
      } else {
        setAmbientVideoUrl(uploadedUrl);
      }
    } catch (err: any) {
      alert(`Upload Error: ${err.message}`);
    } finally {
      setIsUploadingMedia(false);
    }
  };

  // Convert raw YouTube URL to embed format automatically
  const formatYouTubeUrl = (url: string) => {
    if (url.includes('/embed/')) return url;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const handleApplyVideoPreset = (type: string) => {
    if (type === 'bengal_loom') {
      setDocVideoUrl('https://www.youtube.com/embed/BHbDLSXmtBA');
    } else if (type === 'braiding_craft') {
      setDocVideoUrl('https://www.youtube.com/embed/5qap5aO4i9A');
    } else if (type === 'fast_mp4') {
      setAmbientVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-weaving-a-basket-43845-large.mp4');
    }
  };

  const handleSaveVideoSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingVideo(true);
    const cleanedUrl = formatYouTubeUrl(docVideoUrl);
    setDocVideoUrl(cleanedUrl);

    const updated = await api.updateSettings({
      ambient_video_url: ambientVideoUrl,
      documentary_video_url: cleanedUrl,
      video_poster_url: videoPosterUrl,
      announcement_text: announcementText,
    });
    onUpdateSettings(updated);
    setIsSavingVideo(false);
    setVideoSaveSuccess(true);
    setTimeout(() => setVideoSaveSuccess(false), 3000);
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) {
      alert('Please provide a product title and price.');
      return;
    }

    setIsAddingProduct(true);
    try {
      await api.createProduct({
        title: newTitle,
        category: newCategory,
        price_inr: Number(newPrice),
        mrp_inr: Number(newMrp) || Number(newPrice),
        dimensions: newDimensions,
        braid_weave_type: newWeave,
        image_url: newImage,
        tag: newTag,
        badge: newBadge,
        stock_qty: 50,
        is_featured: true,
        is_bestseller: false,
      });

      setProductAddSuccess(true);
      onRefreshProducts();
      setTimeout(() => {
        setProductAddSuccess(false);
        setActiveTab('catalog');
        setNewTitle('');
      }, 1500);
    } catch (err: any) {
      alert(`Error adding product: ${err.message}`);
    } finally {
      setIsAddingProduct(false);
    }
  };

  const handleDeleteProduct = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      await api.deleteProduct(id);
      onRefreshProducts();
    }
  };

  // Save Design Studio & Basic Store Settings
  const handleSaveDesignStudio = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingDesign(true);
    try {
      const updated = await api.updateSettings({
        ...settings,
        theme_palette: themePalette,
        store_name: storeName,
        store_subtitle: storeSubtitle,
        gstin_number: gstinNumber,
        announcement_text: announcementText,
        contact_phone: contactPhone,
        contact_email: contactEmail,
        whatsapp_number: whatsappNumber,
        hero_headline: heroHeadline,
        hero_subtitle: heroSubtitle,
        trust_badge_1_val: trust1Val,
        trust_badge_1_label: trust1Label,
        trust_badge_2_val: trust2Val,
        trust_badge_2_label: trust2Label,
        trust_badge_3_val: trust3Val,
        trust_badge_3_label: trust3Label,
        rope_badge_1: rope1,
        rope_badge_2: rope2,
        rope_badge_3: rope3,
      });
      onUpdateSettings(updated);
      setDesignSaveSuccess(true);
      setTimeout(() => setDesignSaveSuccess(false), 2500);
    } catch (err: any) {
      alert(`Error saving design settings: ${err.message}`);
    } finally {
      setIsSavingDesign(false);
    }
  };

  // Filter products in catalog view
  const filteredCatalog = products.filter((p) => {
    const matchCat = catalogCategory === 'all' || p.category === catalogCategory;
    const matchSearch =
      p.title.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(catalogSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#F4EFE6] text-[#24221E] flex flex-col animate-fadeIn">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#1B3B2B] text-white px-4 sm:px-8 py-3.5 shadow-md flex items-center justify-between border-b border-[#28533E]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#D8A856] text-[#1B3B2B] flex items-center justify-center font-bold text-lg shadow-sm">
            🌿
          </div>
          <div>
            <h1 className="font-serif font-bold text-base sm:text-lg leading-tight">
              Dindayal Admin Studio
            </h1>
            <p className="text-[10px] text-[#EAD7B5] tracking-wide">
              Storefront Control, Cloudinary CDN & Artisan Loom Studio
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border border-white/20"
        >
          <ArrowLeft size={14} />
          <span>Back to Storefront</span>
        </button>
      </header>

      {/* Main Admin Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E7DFD1] shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#1B3B2B] flex items-center justify-center font-bold border border-[#E7DFD1]">
              <Package size={20} />
            </div>
            <div>
              <p className="text-[11px] text-[#7A756C] uppercase font-bold">Live Products</p>
              <p className="font-serif font-bold text-lg text-[#1B3B2B]">{products.length} Items</p>
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E7DFD1] shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#D8A856] flex items-center justify-center font-bold border border-[#E7DFD1]">
              <CloudLightning size={20} />
            </div>
            <div>
              <p className="text-[11px] text-[#7A756C] uppercase font-bold">Cloudinary Media</p>
              <p className="font-serif font-bold text-sm text-[#1B3B2B] truncate">Connected (fj2pbcqf)</p>
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E7DFD1] shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#25D366] flex items-center justify-center font-bold border border-[#E7DFD1]">
              <Video size={20} />
            </div>
            <div>
              <p className="text-[11px] text-[#7A756C] uppercase font-bold">Artisan Reel</p>
              <p className="font-serif font-bold text-sm text-[#1B3B2B]">YouTube Active</p>
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E7DFD1] shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#8B6B38] flex items-center justify-center font-bold border border-[#E7DFD1]">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-[11px] text-[#7A756C] uppercase font-bold">Supabase DB</p>
              <p className="font-serif font-bold text-sm text-[#1B3B2B]">PostgreSQL Live</p>
            </div>
          </div>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-[#E7DFD1] shadow-sm overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'catalog'
                ? 'bg-[#1B3B2B] text-white shadow-sm'
                : 'text-[#4A4740] hover:bg-[#F4EFE6]'
            }`}
          >
            <Package size={15} />
            <span>Manage Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add_product')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'add_product'
                ? 'bg-[#1B3B2B] text-white shadow-sm'
                : 'text-[#4A4740] hover:bg-[#F4EFE6]'
            }`}
          >
            <Plus size={15} />
            <span>Add New Product</span>
          </button>

          <button
            onClick={() => setActiveTab('design_studio')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'design_studio'
                ? 'bg-[#1B3B2B] text-white shadow-sm'
                : 'text-[#4A4740] hover:bg-[#F4EFE6]'
            }`}
          >
            <Palette size={15} />
            <span>🎨 Design & Store Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('video_studio')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'video_studio'
                ? 'bg-[#1B3B2B] text-white shadow-sm'
                : 'text-[#4A4740] hover:bg-[#F4EFE6]'
            }`}
          >
            <Video size={15} />
            <span>Artisan Loom & Video Studio</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: PRODUCT CATALOG MANAGER (WITH EDIT & DELETE) */}
        {/* ========================================================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-4">
            {/* Search and Action Bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#E7DFD1] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1">
                {/* Search */}
                <div className="relative flex-1 sm:max-w-xs">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A29C91]" />
                  <input
                    type="text"
                    placeholder="Search by title or category..."
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1] focus:outline-none focus:border-[#D8A856]"
                  />
                </div>

                {/* Filter */}
                <select
                  value={catalogCategory}
                  onChange={(e) => setCatalogCategory(e.target.value)}
                  className="text-xs py-2 px-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD1] text-[#4A4740] focus:outline-none focus:border-[#D8A856] cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="floor_mats">Floor Mats & Rugs</option>
                  <option value="dining">Dining Sets</option>
                  <option value="planters">Planters</option>
                  <option value="bags">Bags & Totes</option>
                  <option value="decor">Wall Decor</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onRefreshProducts}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-[#E7DFD1] bg-[#FAF7F2] hover:bg-[#EAE2D5] text-[#1B3B2B] transition-colors"
                >
                  <RefreshCw size={13} />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={() => setActiveTab('add_product')}
                  className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-[#1B3B2B] text-white hover:bg-[#12271D] transition-colors shadow-sm"
                >
                  <Plus size={14} />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Products Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCatalog.map((product) => {
                const discount = Math.round(((product.mrp_inr - product.price_inr) / product.mrp_inr) * 100);
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-[#E7DFD1] p-4 flex flex-col justify-between shadow-sm hover:border-[#D8A856] transition-all"
                  >
                    <div>
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#FAF7F2] mb-3 border border-[#E7DFD1]">
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                        {product.badge && (
                          <span className="absolute top-2 left-2 bg-[#1B3B2B] text-white text-[9px] font-bold px-2 py-0.5 rounded">
                            {product.badge}
                          </span>
                        )}
                        {discount > 0 && (
                          <span className="absolute top-2 right-2 bg-[#D8A856] text-[#1B3B2B] text-[9px] font-bold px-1.5 py-0.5 rounded">
                            {discount}% OFF
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-[#8B6B38] font-bold uppercase mb-1">
                        <span>{product.category.replace('_', ' ')}</span>
                        <span>Stock: {product.stock_qty || 50} units</span>
                      </div>

                      <h3 className="font-serif font-bold text-sm text-[#1B3B2B] line-clamp-1 mb-1">
                        {product.title}
                      </h3>

                      <div className="text-[11px] text-[#7A756C] space-y-0.5 mb-3">
                        {product.dimensions && <p>📏 {product.dimensions}</p>}
                        {product.braid_weave_type && <p>🧶 {product.braid_weave_type}</p>}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#FAF7F2] flex items-center justify-between">
                      <div>
                        <span className="font-serif font-bold text-base text-[#1B3B2B]">
                          ₹{product.price_inr}
                        </span>
                        {product.mrp_inr > product.price_inr && (
                          <span className="text-xs text-[#A29C91] line-through ml-1.5">
                            ₹{product.mrp_inr}
                          </span>
                        )}
                      </div>

                      {/* Action buttons: EDIT & DELETE */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleStartEdit(product)}
                          className="flex items-center gap-1 text-xs text-[#1B3B2B] hover:text-[#12271D] bg-[#FAF7F2] hover:bg-[#EAE2D5] border border-[#E7DFD1] px-3 py-1.5 rounded-lg transition-colors font-bold"
                          title="Edit this product"
                        >
                          <Edit3 size={13} />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(product.id, product.title)}
                          className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-100 px-2.5 py-1.5 rounded-lg transition-colors font-semibold"
                          title="Delete this product"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredCatalog.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-[#E7DFD1] p-6">
                <span className="text-3xl">🌾</span>
                <p className="font-bold text-sm text-[#1B3B2B] mt-2">No matching products found</p>
                <p className="text-xs text-[#7A756C] mt-0.5">Try searching another keyword or clear filters.</p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* EDIT PRODUCT MODAL (SUPER CONVENIENT & INSTANT LIVE SAVE) */}
        {/* ========================================================= */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#E7DFD1] shadow-2xl overflow-hidden p-6 sm:p-8 space-y-5 my-8">
              
              <div className="flex items-center justify-between border-b border-[#E7DFD1] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#1B3B2B] flex items-center justify-center font-bold">
                    <Edit3 size={16} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#1B3B2B]">
                      Edit Product Details
                    </h3>
                    <p className="text-[11px] text-[#7A756C]">
                      Updates apply instantly to your live store and database.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setEditingProduct(null)}
                  className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#EAE2D5] text-[#1B3B2B] flex items-center justify-center transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {editSuccessMessage && (
                <div className="bg-green-50 border border-green-200 text-green-800 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2">
                  <Check size={16} />
                  <span>{editSuccessMessage}</span>
                </div>
              )}

              <form onSubmit={handleSaveEditProduct} className="space-y-4">
                
                {/* Photo Editor */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8B6B38] mb-1.5">
                    Product Photo (Cloudinary CDN)
                  </label>
                  <div className="flex items-center gap-3 bg-[#FAF7F2] p-3 rounded-2xl border border-[#E7DFD1]">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-[#E7DFD1] flex-shrink-0 flex items-center justify-center">
                      {isUploadingEditImage ? (
                        <Loader2 size={18} className="text-[#1B3B2B] animate-spin" />
                      ) : (
                        <img src={editImage} alt="Preview" className="w-full h-full object-cover" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <label className="inline-flex items-center gap-1.5 bg-[#1B3B2B] hover:bg-[#12271D] text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-sm">
                        <Upload size={12} />
                        <span>{isUploadingEditImage ? 'Uploading...' : 'Upload New Photo'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={isUploadingEditImage}
                          className="hidden"
                          onChange={handleEditImageUpload}
                        />
                      </label>
                      <input
                        type="text"
                        value={editImage}
                        onChange={(e) => setEditImage(e.target.value)}
                        className="w-full px-2.5 py-1 text-xs rounded-lg bg-white border border-[#E7DFD1]"
                      />
                    </div>
                  </div>
                </div>

                {/* Title & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#8B6B38] mb-1">Product Title *</label>
                    <input
                      type="text"
                      required
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#8B6B38] mb-1">Category</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1] font-semibold text-[#1B3B2B]"
                    >
                      <option value="floor_mats">🛋️ Floor Mats & Rugs</option>
                      <option value="dining">🍽️ Dining Sets & Placemats</option>
                      <option value="planters">🪴 Planter Baskets</option>
                      <option value="bags">👜 Totes & Bags</option>
                      <option value="decor">🎨 Wall Decor</option>
                    </select>
                  </div>
                </div>

                {/* Pricing & Stock */}
                <div className="grid grid-cols-3 gap-3 bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E7DFD1]">
                  <div>
                    <label className="block text-[10px] font-bold text-[#8B6B38] mb-1">Selling Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value ? Number(e.target.value) : '')}
                      className="w-full px-3 py-1.5 text-xs font-bold rounded-xl bg-white border border-[#E7DFD1]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#8B6B38] mb-1">MRP Price (₹)</label>
                    <input
                      type="number"
                      value={editMrp}
                      onChange={(e) => setEditMrp(e.target.value ? Number(e.target.value) : '')}
                      className="w-full px-3 py-1.5 text-xs font-bold rounded-xl bg-white border border-[#E7DFD1]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#8B6B38] mb-1">Stock Quantity</label>
                    <input
                      type="number"
                      value={editStock}
                      onChange={(e) => setEditStock(Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs font-bold rounded-xl bg-white border border-[#E7DFD1]"
                    />
                  </div>
                </div>

                {/* Dimensions with Presets */}
                <div>
                  <label className="block text-[11px] font-bold text-[#8B6B38] mb-1">Dimensions</label>
                  <div className="flex flex-wrap gap-1 mb-1.5">
                    {dimensionPresets.slice(0, 4).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setEditDimensions(p)}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#E7DFD1] hover:bg-[#EAE2D5]"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={editDimensions}
                    onChange={(e) => setEditDimensions(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                  />
                </div>

                {/* Weave Type with Presets */}
                <div>
                  <label className="block text-[11px] font-bold text-[#8B6B38] mb-1">Weave Technique</label>
                  <div className="flex flex-wrap gap-1 mb-1.5">
                    {weavePresets.slice(0, 4).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setEditWeave(p)}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#E7DFD1] hover:bg-[#EAE2D5]"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={editWeave}
                    onChange={(e) => setEditWeave(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                  />
                </div>

                {/* Badge & Tag */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#8B6B38] mb-1">Badge (e.g. ⭐ Bestseller)</label>
                    <input
                      type="text"
                      value={editBadge}
                      onChange={(e) => setEditBadge(e.target.value)}
                      placeholder="⭐ Bestseller, 🔥 Trending"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#8B6B38] mb-1">Tag (Subtitle)</label>
                    <input
                      type="text"
                      value={editTag}
                      onChange={(e) => setEditTag(e.target.value)}
                      placeholder="Living Room Centerpiece"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E7DFD1]">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#FAF7F2] border border-[#E7DFD1] text-[#4A4740] hover:bg-[#EAE2D5]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingEdit || isUploadingEditImage}
                    className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold rounded-xl bg-[#1B3B2B] text-white hover:bg-[#12271D] transition-colors shadow-sm"
                  >
                    <Check size={14} />
                    <span>{isSavingEdit ? 'Saving...' : 'Save Changes Live'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: ADD NEW PRODUCT FORM (WITH PRESETS & CLOUDINARY) */}
        {/* ========================================================= */}
        {activeTab === 'add_product' && (
          <div className="bg-white rounded-3xl border border-[#E7DFD1] p-5 sm:p-8 shadow-sm max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[#E7DFD1] pb-4">
              <div>
                <h2 className="font-serif font-bold text-xl text-[#1B3B2B]">
                  Add New Jute Product
                </h2>
                <p className="text-xs text-[#7A756C] mt-0.5">
                  Upload high-res photo to Cloudinary CDN and publish live to store.
                </p>
              </div>

              {productAddSuccess && (
                <span className="flex items-center gap-1.5 text-xs font-bold text-green-800 bg-green-50 border border-green-200 px-3.5 py-1.5 rounded-full animate-bounce">
                  <Check size={14} />
                  Product Added Live!
                </span>
              )}
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-6">
              
              {/* Image Upload Zone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-2">
                  1. Product Photo (Cloudinary CDN Auto-Compression)
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E7DFD1]">
                  {/* Image Preview Thumbnail */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-white border-2 border-dashed border-[#D8A856] flex items-center justify-center flex-shrink-0 shadow-sm">
                    {isUploadingProductImage ? (
                      <div className="text-center p-2">
                        <Loader2 size={24} className="text-[#1B3B2B] animate-spin mx-auto mb-1" />
                        <span className="text-[10px] text-[#7A756C] font-bold">Uploading...</span>
                      </div>
                    ) : newImage ? (
                      <img src={newImage} alt="Product Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={32} className="text-[#A29C91]" />
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <label className="inline-flex items-center gap-2 bg-[#1B3B2B] hover:bg-[#12271D] text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-sm">
                      <Upload size={14} />
                      <span>{isUploadingProductImage ? 'Uploading to CDN...' : 'Choose Photo from Device'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploadingProductImage}
                        className="hidden"
                        onChange={handleProductImageUpload}
                      />
                    </label>

                    <p className="text-[11px] text-[#7A756C]">
                      Photo is automatically optimized into next-gen WebP format and hosted on global CDN.
                    </p>

                    <input
                      type="text"
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      placeholder="Or paste an image URL"
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-[#E7DFD1] text-[#55524B]"
                    />
                  </div>
                </div>
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1.5">
                    2. Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5ft Mandala Circular Braided Floor Rug"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1] focus:outline-none focus:border-[#D8A856]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1.5">
                    3. Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1] text-[#1B3B2B] font-semibold focus:outline-none focus:border-[#D8A856] cursor-pointer"
                  >
                    <option value="floor_mats">🛋️ Floor Mats & Rugs</option>
                    <option value="dining">🍽️ Dining Sets & Placemats</option>
                    <option value="planters">🪴 Planter Baskets & Pots</option>
                    <option value="bags">👜 Eco Totes & Bags</option>
                    <option value="decor">🎨 Wall Decor & Hangings</option>
                  </select>
                </div>
              </div>

              {/* Pricing (Selling Price & MRP) */}
              <div className="grid grid-cols-2 gap-4 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E7DFD1]">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3.5 py-2 text-sm font-bold rounded-xl bg-white border border-[#E7DFD1] text-[#1B3B2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1">
                    MRP Price (₹)
                  </label>
                  <input
                    type="number"
                    value={newMrp}
                    onChange={(e) => setNewMrp(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3.5 py-2 text-sm font-bold rounded-xl bg-white border border-[#E7DFD1] text-[#7A756C]"
                  />
                </div>

                {newPrice && newMrp && Number(newMrp) > Number(newPrice) && (
                  <div className="col-span-2 text-xs font-bold text-[#1B3B2B] flex items-center gap-1.5">
                    <span className="bg-[#D8A856] px-2 py-0.5 rounded text-[10px]">
                      {Math.round(((Number(newMrp) - Number(newPrice)) / Number(newMrp)) * 100)}% Customer Discount
                    </span>
                    <span>Customer saves ₹{Number(newMrp) - Number(newPrice)}</span>
                  </div>
                )}
              </div>

              {/* Quick Dimension Chips */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1.5">
                  4. Dimensions (Tap a quick preset or type custom):
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {dimensionPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setNewDimensions(preset)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                        newDimensions === preset
                          ? 'bg-[#1B3B2B] text-white border-[#1B3B2B]'
                          : 'bg-[#FAF7F2] text-[#55524B] border-[#E7DFD1] hover:bg-[#EAE2D5]'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={newDimensions}
                  onChange={(e) => setNewDimensions(e.target.value)}
                  placeholder="e.g. 5.0 Ft Dia (150 cm)"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                />
              </div>

              {/* Quick Weave Type Chips */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1.5">
                  5. Braid / Weave Technique (Tap a preset or type custom):
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {weavePresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setNewWeave(preset)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                        newWeave === preset
                          ? 'bg-[#1B3B2B] text-white border-[#1B3B2B]'
                          : 'bg-[#FAF7F2] text-[#55524B] border-[#E7DFD1] hover:bg-[#EAE2D5]'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={newWeave}
                  onChange={(e) => setNewWeave(e.target.value)}
                  placeholder="e.g. Spiral Hand-Braided"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4 border-t border-[#E7DFD1]">
                <button
                  type="submit"
                  disabled={isAddingProduct || isUploadingProductImage}
                  className="flex items-center gap-2 bg-[#1B3B2B] hover:bg-[#12271D] text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  <Plus size={16} />
                  <span>{isAddingProduct ? 'Publishing to DB...' : 'Publish Product to Store'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: STOREFRONT DESIGN & BASIC SETTINGS STUDIO */}
        {/* ========================================================= */}
        {activeTab === 'design_studio' && (
          <div className="bg-white rounded-3xl border border-[#E7DFD1] p-5 sm:p-8 shadow-sm max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E7DFD1] pb-4">
              <div>
                <h2 className="font-serif font-bold text-xl text-[#1B3B2B] flex items-center gap-2">
                  <Palette className="text-[#D8A856]" size={22} />
                  <span>Storefront Design & Brand Studio</span>
                </h2>
                <p className="text-xs text-[#7A756C] mt-0.5">
                  Customize theme colors, store identity, hero typography, and hanging rope badges in real-time.
                </p>
              </div>

              {designSaveSuccess && (
                <span className="flex items-center gap-1.5 text-xs font-bold text-green-800 bg-green-50 border border-green-200 px-3.5 py-1.5 rounded-full animate-bounce">
                  <Check size={14} />
                  Settings Saved Live!
                </span>
              )}
            </div>

            <form onSubmit={handleSaveDesignStudio} className="space-y-8">
              
              {/* 1. Theme Color Palette */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-3">
                  1. Visual Color Theme Palette
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      id: 'emerald',
                      name: '🌿 Emerald Earth',
                      desc: 'Deep Bengal Loom Forest & Gold',
                      primary: '#1B3B2B',
                      accent: '#D8A856',
                    },
                    {
                      id: 'gold',
                      name: '🍯 Royal Gold',
                      desc: 'Warm Ochre & Honey Brass',
                      primary: '#855716',
                      accent: '#D99B26',
                    },
                    {
                      id: 'terracotta',
                      name: '🏺 Terracotta Clay',
                      desc: 'Warm Bengal Earth & Clay',
                      primary: '#8D3F2D',
                      accent: '#D47A4A',
                    },
                    {
                      id: 'midnight',
                      name: '🌑 Midnight Atelier',
                      desc: 'Slate Charcoal & Brushed Gold',
                      primary: '#1E242B',
                      accent: '#C2A368',
                    },
                  ].map((palette) => (
                    <button
                      key={palette.id}
                      type="button"
                      onClick={() => setThemePalette(palette.id as ThemePalette)}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        themePalette === palette.id
                          ? 'border-2 border-[#1B3B2B] bg-[#FAF7F2] shadow-md ring-2 ring-[#D8A856]/40'
                          : 'border-[#E7DFD1] hover:border-[#D8A856] bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <span
                            className="w-4 h-4 rounded-full border border-black/10"
                            style={{ backgroundColor: palette.primary }}
                          />
                          <span
                            className="w-4 h-4 rounded-full border border-black/10"
                            style={{ backgroundColor: palette.accent }}
                          />
                        </div>
                        <h4 className="font-serif font-bold text-xs text-[#1B3B2B]">
                          {palette.name}
                        </h4>
                        <p className="text-[10px] text-[#7A756C] mt-0.5 leading-tight">
                          {palette.desc}
                        </p>
                      </div>
                      {themePalette === palette.id && (
                        <span className="mt-2 text-[9px] font-bold text-[#1B3B2B] bg-[#EAE2D5] px-2 py-0.5 rounded w-max">
                          Active Theme
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-time Live Preview Card */}
              <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#D8A856]/40 shadow-xs space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#E7DFD1]">
                  <span className="text-[11px] font-bold text-[#8B6B38] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={13} className="text-[#D8A856]" />
                    <span>Live Storefront Header Preview (Instant)</span>
                  </span>
                  <span className="text-[10px] text-[#7A756C]">Updates as you type</span>
                </div>

                <div className="bg-white rounded-xl p-3 border border-[#E7DFD1] space-y-2 text-xs">
                  {/* Announcement Preview */}
                  <div className="bg-[#1B3B2B] text-white px-2.5 py-1 rounded-lg text-[10px] truncate">
                    {announcementText}
                  </div>
                  
                  {/* Brand & Ropes Preview */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <strong className="text-[#1B3B2B] font-serif text-sm block">
                        {storeName}
                      </strong>
                      <span className="text-[9px] text-[#7A756C] uppercase font-bold tracking-wider">
                        {storeSubtitle}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="bg-[#1B3B2B] text-[#EAD7B5] text-[9px] px-2 py-0.5 rounded-full font-bold">
                        {rope1}
                      </span>
                      <span className="bg-[#D8A856] text-[#1B3B2B] text-[9px] px-2 py-0.5 rounded-full font-bold">
                        {rope2}
                      </span>
                    </div>
                  </div>

                  {/* Headline Preview */}
                  <div className="pt-1 border-t border-[#E7DFD1]/60">
                    <p className="font-serif font-bold text-xs text-[#1B3B2B] line-clamp-1">
                      {heroHeadline}
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. Basic Store Identity & Contacts */}
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-sm text-[#1B3B2B] border-b border-[#E7DFD1] pb-2">
                  2. Store Identity & Customer Support
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1">
                      Store Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      placeholder="Dindayal & Craft"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1] focus:outline-none focus:border-[#D8A856]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1">
                      Store Subtitle / Tagline *
                    </label>
                    <input
                      type="text"
                      required
                      value={storeSubtitle}
                      onChange={(e) => setStoreSubtitle(e.target.value)}
                      placeholder="Indian Jute House • Estd. Kolkata"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1] focus:outline-none focus:border-[#D8A856]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1">
                    Top Announcement Bar Ticker *
                  </label>
                  <input
                    type="text"
                    required
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    placeholder="Direct from Bengal Looms & Mills • 100% Eco-Braided Jute Mats & Rugs"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1] focus:outline-none focus:border-[#D8A856]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1">
                      Support Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 98302 96606"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1">
                      Support Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="info@indianjutehouse.com"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1">
                      Business GSTIN Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={gstinNumber}
                      onChange={(e) => setGstinNumber(e.target.value)}
                      placeholder="19AACFD2094B1ZS"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Hero Messaging & Trust Metrics */}
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-sm text-[#1B3B2B] border-b border-[#E7DFD1] pb-2">
                  3. Hero Typography & Trust Badges
                </h3>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1">
                    Main Hero Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={heroHeadline}
                    onChange={(e) => setHeroHeadline(e.target.value)}
                    placeholder="Handcrafted Jute Mats & Eco Living, Woven with Soul."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1] focus:outline-none focus:border-[#D8A856]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1">
                    Hero Subtitle Narrative *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    placeholder="From the fertile delta of Bengal to modern sustainable homes..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1] focus:outline-none focus:border-[#D8A856]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E7DFD1] space-y-1">
                    <span className="text-[10px] font-bold text-[#8B6B38] uppercase">Trust Badge 1</span>
                    <input
                      type="text"
                      value={trust1Val}
                      onChange={(e) => setTrust1Val(e.target.value)}
                      placeholder="100%"
                      className="w-full px-2 py-1 text-xs font-bold rounded-lg bg-white border border-[#E7DFD1]"
                    />
                    <input
                      type="text"
                      value={trust1Label}
                      onChange={(e) => setTrust1Label(e.target.value)}
                      placeholder="Golden Bengal Fiber"
                      className="w-full px-2 py-1 text-[11px] rounded-lg bg-white border border-[#E7DFD1]"
                    />
                  </div>

                  <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E7DFD1] space-y-1">
                    <span className="text-[10px] font-bold text-[#8B6B38] uppercase">Trust Badge 2</span>
                    <input
                      type="text"
                      value={trust2Val}
                      onChange={(e) => setTrust2Val(e.target.value)}
                      placeholder="10+ Yrs"
                      className="w-full px-2 py-1 text-xs font-bold rounded-lg bg-white border border-[#E7DFD1]"
                    />
                    <input
                      type="text"
                      value={trust2Label}
                      onChange={(e) => setTrust2Label(e.target.value)}
                      placeholder="Artisan Loom Heritage"
                      className="w-full px-2 py-1 text-[11px] rounded-lg bg-white border border-[#E7DFD1]"
                    />
                  </div>

                  <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E7DFD1] space-y-1">
                    <span className="text-[10px] font-bold text-[#8B6B38] uppercase">Trust Badge 3</span>
                    <input
                      type="text"
                      value={trust3Val}
                      onChange={(e) => setTrust3Val(e.target.value)}
                      placeholder="Zero"
                      className="w-full px-2 py-1 text-xs font-bold rounded-lg bg-white border border-[#E7DFD1]"
                    />
                    <input
                      type="text"
                      value={trust3Label}
                      onChange={(e) => setTrust3Label(e.target.value)}
                      placeholder="Microplastic Residue"
                      className="w-full px-2 py-1 text-[11px] rounded-lg bg-white border border-[#E7DFD1]"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Hanging Ropes Badges */}
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-sm text-[#1B3B2B] border-b border-[#E7DFD1] pb-2">
                  4. Top Hanging Ropes & Badges (Mobile + PC)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1">
                      Left Rope Badge
                    </label>
                    <input
                      type="text"
                      value={rope1}
                      onChange={(e) => setRope1(e.target.value)}
                      placeholder="🧶 Authentic Bengal Looms"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1">
                      Middle Rope Badge
                    </label>
                    <input
                      type="text"
                      value={rope2}
                      onChange={(e) => setRope2(e.target.value)}
                      placeholder="✨ 100% Hand-Braided"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1">
                      Right Rope Badge
                    </label>
                    <input
                      type="text"
                      value={rope3}
                      onChange={(e) => setRope3(e.target.value)}
                      placeholder="🌿 Zero Microplastics"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4 border-t border-[#E7DFD1]">
                <button
                  type="submit"
                  disabled={isSavingDesign}
                  className="flex items-center gap-2 bg-[#1B3B2B] hover:bg-[#12271D] text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  <Check size={16} />
                  <span>{isSavingDesign ? 'Saving Settings...' : '💾 Save Design & Store Settings Live'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: ARTISAN VIDEO & MEDIA STUDIO */}
        {/* ========================================================= */}
        {activeTab === 'video_studio' && (
          <div className="bg-white rounded-3xl border border-[#E7DFD1] p-5 sm:p-8 shadow-sm max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[#E7DFD1] pb-4">
              <div>
                <h2 className="font-serif font-bold text-xl text-[#1B3B2B]">
                  Artisan Loom & Video Studio
                </h2>
                <p className="text-xs text-[#7A756C] mt-0.5">
                  Change the video story shown to customers in the "Watch Loom Artisans" player.
                </p>
              </div>

              {videoSaveSuccess && (
                <span className="flex items-center gap-1.5 text-xs font-bold text-green-800 bg-green-50 border border-green-200 px-3.5 py-1.5 rounded-full animate-bounce">
                  <Check size={14} />
                  Settings Saved Live!
                </span>
              )}
            </div>

            {/* Quick 1-Click Video Presets */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD1] space-y-2.5">
              <span className="text-xs font-bold uppercase text-[#8B6B38] block">
                ⚡ 1-Click Tested Video Presets:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleApplyVideoPreset('bengal_loom')}
                  className="text-xs px-3.5 py-2 rounded-xl bg-white border border-[#E7DFD1] text-[#1B3B2B] hover:bg-[#EAE2D5] font-semibold transition-all shadow-sm"
                >
                  ▶ Bengal Loom Weaving (YouTube)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyVideoPreset('braiding_craft')}
                  className="text-xs px-3.5 py-2 rounded-xl bg-white border border-[#E7DFD1] text-[#1B3B2B] hover:bg-[#EAE2D5] font-semibold transition-all shadow-sm"
                >
                  ▶ Hand Braiding Technique (YouTube)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyVideoPreset('fast_mp4')}
                  className="text-xs px-3.5 py-2 rounded-xl bg-white border border-[#E7DFD1] text-[#1B3B2B] hover:bg-[#EAE2D5] font-semibold transition-all shadow-sm"
                >
                  ▶ Fast CDN Basket MP4
                </button>
              </div>
            </div>

            {/* Live Video Player Preview */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-2">
                Live Video Preview (What customers see when clicking "Watch Loom Artisans"):
              </label>
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-[#E7DFD1] shadow-md">
                {docVideoUrl.includes('youtube') || docVideoUrl.includes('youtu.be') ? (
                  <iframe
                    src={formatYouTubeUrl(docVideoUrl)}
                    title="Live Artisan Video Preview"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={docVideoUrl}
                    poster={videoPosterUrl}
                    controls
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>

            {/* Settings Form */}
            <form onSubmit={handleSaveVideoSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1">
                  Documentary / Modal Video URL (YouTube or MP4 stream) *
                </label>
                <input
                  type="text"
                  required
                  value={docVideoUrl}
                  onChange={(e) => setDocVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/embed/BHbDLSXmtBA or https://youtube.com/watch?v=..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1] focus:outline-none focus:border-[#D8A856]"
                />
                <p className="text-[11px] text-[#7A756C] mt-1">
                  Supports full YouTube URLs, short youtu.be links, or direct MP4 video files.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8B6B38]">
                    Video Poster Image URL
                  </label>
                  <label className="text-[11px] text-[#1B3B2B] font-semibold flex items-center gap-1 cursor-pointer hover:underline">
                    <Upload size={12} />
                    <span>Upload Poster to Cloudinary</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleVideoMediaUpload(e, 'poster')}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={videoPosterUrl}
                  onChange={(e) => setVideoPosterUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1">
                  Top Announcement Bar Message
                </label>
                <input
                  type="text"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                />
              </div>

              <div className="flex justify-end pt-3 border-t border-[#E7DFD1]">
                <button
                  type="submit"
                  disabled={isSavingVideo || isUploadingMedia}
                  className="flex items-center gap-2 bg-[#1B3B2B] hover:bg-[#12271D] text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  <Check size={16} />
                  <span>{isSavingVideo ? 'Saving to Database...' : 'Save Video Settings Live'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </main>
    </div>
  );
};
