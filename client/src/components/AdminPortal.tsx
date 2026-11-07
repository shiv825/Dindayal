import React, { useState } from 'react';
import { X, Video, Package, MessageSquare, Save, Plus, Trash2, Check, RefreshCw } from 'lucide-react';
import { Product, SiteSettings, WholesaleInquiry } from '../types';
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
  const [activeTab, setActiveTab] = useState<'video' | 'products' | 'inquiries'>('video');
  
  // Video settings local state
  const [ambientVideoUrl, setAmbientVideoUrl] = useState(settings.ambient_video_url);
  const [docVideoUrl, setDocVideoUrl] = useState(settings.documentary_video_url);
  const [videoPosterUrl, setVideoPosterUrl] = useState(settings.video_poster_url);
  const [announcementText, setAnnouncementText] = useState(settings.announcement_text);
  const [isSavingVideo, setIsSavingVideo] = useState(false);
  const [videoSaveSuccess, setVideoSaveSuccess] = useState(false);

  // New Product Modal State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'floor_mats' | 'dining' | 'planters' | 'bags' | 'ropes' | 'decor'>('floor_mats');
  const [newPrice, setNewPrice] = useState(999);
  const [newMrp, setNewMrp] = useState(1499);
  const [newDimensions, setNewDimensions] = useState('');
  const [newWeave, setNewWeave] = useState('');
  const [newImage, setNewImage] = useState('/assets/images/jute_floor_mat.jpg');
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  if (!isOpen) return null;

  // Preset videos
  const handleApplyPreset = (type: string) => {
    if (type === 'youtube_weaving') {
      setDocVideoUrl('https://www.youtube.com/embed/BHbDLSXmtBA');
    } else if (type === 'youtube_braiding') {
      setDocVideoUrl('https://www.youtube.com/embed/5qap5aO4i9A');
    } else if (type === 'mp4_craft') {
      setAmbientVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-weaving-a-basket-43845-large.mp4');
    }
  };

  const handleSaveVideoSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingVideo(true);
    const updated = await api.updateSettings({
      ambient_video_url: ambientVideoUrl,
      documentary_video_url: docVideoUrl,
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
    if (!newTitle) return;
    setIsAddingProduct(true);
    await api.createProduct({
      title: newTitle,
      category: newCategory,
      price_inr: newPrice,
      mrp_inr: newMrp,
      dimensions: newDimensions,
      braid_weave_type: newWeave,
      image_url: newImage,
      stock_qty: 50,
      is_featured: true,
      is_bestseller: false,
    });
    setNewTitle('');
    setIsAddingProduct(false);
    onRefreshProducts();
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await api.deleteProduct(id);
      onRefreshProducts();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl bg-[#FAF7F2] rounded-3xl border border-[#E7DFD1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1B3B2B] text-white">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚙️</span>
            <div>
              <h2 className="font-serif font-bold text-lg leading-tight">
                Dindayal Management & Video Portal
              </h2>
              <p className="text-xs text-[#EAD7B5]">
                Configure Artisan Videos, Product Catalog & Wholesale Leads
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E7DFD1] bg-white px-6">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'video'
                ? 'border-[#1B3B2B] text-[#1B3B2B]'
                : 'border-transparent text-[#7A756C] hover:text-[#1B3B2B]'
            }`}
          >
            <Video size={14} />
            <span>Artisan Loom & Video Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'products'
                ? 'border-[#1B3B2B] text-[#1B3B2B]'
                : 'border-transparent text-[#7A756C] hover:text-[#1B3B2B]'
            }`}
          >
            <Package size={14} />
            <span>Catalog Manager ({products.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#FAF7F2]">
          
          {/* TAB 1: VIDEO SETTINGS */}
          {activeTab === 'video' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#E7DFD1] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#1B3B2B]">
                      Artisan Loom & Weaving Video Settings
                    </h3>
                    <p className="text-xs text-[#7A756C]">
                      Manage the video URL shown in the Artisan Modal and ambient backgrounds. Supports YouTube embeds & direct MP4 streams.
                    </p>
                  </div>
                  {videoSaveSuccess && (
                    <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                      <Check size={14} />
                      Saved Live!
                    </span>
                  )}
                </div>

                {/* Quick Presets */}
                <div className="mb-5 p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]">
                  <span className="text-[11px] font-bold uppercase text-[#8B6B38] block mb-2">
                    Quick Reliable Presets:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleApplyPreset('youtube_weaving')}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white border border-[#E7DFD1] text-[#1B3B2B] hover:bg-[#F4EFE6] font-medium"
                    >
                      ▶ Bengal Jute Weaving (YouTube)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPreset('youtube_braiding')}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white border border-[#E7DFD1] text-[#1B3B2B] hover:bg-[#F4EFE6] font-medium"
                    >
                      ▶ Hand Braiding Technique (YouTube)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPreset('mp4_craft')}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white border border-[#E7DFD1] text-[#1B3B2B] hover:bg-[#F4EFE6] font-medium"
                    >
                      ▶ Fast CDN Basket MP4
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSaveVideoSettings} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#8B6B38] mb-1">
                      Documentary / Modal Video URL (YouTube or MP4) *
                    </label>
                    <input
                      type="text"
                      required
                      value={docVideoUrl}
                      onChange={(e) => setDocVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/embed/BHbDLSXmtBA"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1] focus:outline-none focus:border-[#D8A856]"
                    />
                    <p className="text-[11px] text-[#7A756C] mt-1">
                      Tip: You can use full YouTube URLs (e.g. https://www.youtube.com/watch?v=...) or embed URLs.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#8B6B38] mb-1">
                      Ambient Background Video Stream (Direct MP4)
                    </label>
                    <input
                      type="text"
                      value={ambientVideoUrl}
                      onChange={(e) => setAmbientVideoUrl(e.target.value)}
                      placeholder="https://...mp4"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1] focus:outline-none focus:border-[#D8A856]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#8B6B38] mb-1">
                      Video Poster Image URL (Placeholder before playback)
                    </label>
                    <input
                      type="text"
                      value={videoPosterUrl}
                      onChange={(e) => setVideoPosterUrl(e.target.value)}
                      placeholder="/assets/images/jute_floor_mat.jpg"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1] focus:outline-none focus:border-[#D8A856]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#8B6B38] mb-1">
                      Top Announcement Bar Text
                    </label>
                    <input
                      type="text"
                      value={announcementText}
                      onChange={(e) => setAnnouncementText(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1] focus:outline-none focus:border-[#D8A856]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSavingVideo}
                      className="flex items-center gap-2 bg-[#1B3B2B] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#12271D] transition-colors shadow-sm"
                    >
                      <Save size={14} />
                      <span>{isSavingVideo ? 'Saving...' : 'Save Settings to DB & Store'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCT CATALOG CRUD */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Add New Product Form */}
              <div className="bg-white p-5 rounded-2xl border border-[#E7DFD1] shadow-sm">
                <h3 className="font-serif font-bold text-base text-[#1B3B2B] mb-3">
                  Add New Jute Product to Store
                </h3>
                <form onSubmit={handleCreateProduct} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#8B6B38] mb-1">Product Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5ft Spiral Jute Rug"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#8B6B38] mb-1">Category *</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                    >
                      <option value="floor_mats">Floor Mats & Rugs</option>
                      <option value="dining">Dining Sets</option>
                      <option value="planters">Planters</option>
                      <option value="bags">Bags & Totes</option>
                      <option value="ropes">Ropes</option>
                      <option value="decor">Wall Decor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#8B6B38] mb-1">Selling Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#8B6B38] mb-1">MRP Price (₹)</label>
                    <input
                      type="number"
                      value={newMrp}
                      onChange={(e) => setNewMrp(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#8B6B38] mb-1">Dimensions</label>
                    <input
                      type="text"
                      placeholder="e.g. 5.0 Ft Dia (150 cm)"
                      value={newDimensions}
                      onChange={(e) => setNewDimensions(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#8B6B38] mb-1">Weave Type</label>
                    <input
                      type="text"
                      placeholder="e.g. 3-Ply Hand Braided"
                      value={newWeave}
                      onChange={(e) => setNewWeave(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E7DFD1]"
                    />
                  </div>

                  <div className="sm:col-span-3 flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={isAddingProduct}
                      className="flex items-center gap-1.5 bg-[#1B3B2B] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#12271D]"
                    >
                      <Plus size={14} />
                      <span>{isAddingProduct ? 'Adding...' : 'Add Product'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Product List Table */}
              <div className="bg-white rounded-2xl border border-[#E7DFD1] overflow-hidden shadow-sm">
                <div className="p-4 border-b border-[#E7DFD1] flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-[#1B3B2B]">Live Store Catalog</h4>
                  <button
                    onClick={onRefreshProducts}
                    className="flex items-center gap-1 text-xs text-[#8B6B38] hover:text-[#1B3B2B]"
                  >
                    <RefreshCw size={12} />
                    <span>Refresh</span>
                  </button>
                </div>

                <div className="divide-y divide-[#E7DFD1]">
                  {products.map((p) => (
                    <div key={p.id} className="p-4 flex items-center justify-between gap-4 hover:bg-[#FAF7F2]">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={p.image_url}
                          alt={p.title}
                          className="w-12 h-12 rounded-lg object-cover bg-[#F4EFE6]"
                        />
                        <div className="min-w-0">
                          <h5 className="font-bold text-xs text-[#1B3B2B] truncate">{p.title}</h5>
                          <span className="text-[11px] text-[#7A756C]">
                            Category: {p.category} • ₹{p.price_inr} (MRP: ₹{p.mrp_inr})
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="text-[#A29C91] hover:text-red-600 p-2"
                        title="Delete Product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

