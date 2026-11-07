import React, { useEffect } from 'react';
import { X, Sparkles, CheckCircle, ExternalLink } from 'lucide-react';

interface VideoDocModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  posterUrl?: string;
}

export const VideoDocModal: React.FC<VideoDocModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  posterUrl,
}) => {
  // ESC key handler to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Detect YouTube embed / URL format
  const isYouTube =
    videoUrl.includes('youtube.com') ||
    videoUrl.includes('youtu.be') ||
    videoUrl.includes('youtube-nocookie.com');

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('/embed/')) return url;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0` : url;
  };

  const finalEmbedUrl = isYouTube ? getYouTubeEmbedUrl(videoUrl) : videoUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#E7DFD1] z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7DFD1] bg-white">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🎬</span>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1B3B2B] leading-none">
                Bengal Loom & Braided Jute Mat Crafting
              </h3>
              <p className="text-[11px] text-[#7A756C] mt-0.5">
                Master artisans spinning and hand-braiding golden jute fibers in Bengal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F4EFE6] hover:bg-[#EAE2D5] text-[#1B3B2B] flex items-center justify-center transition-colors"
            aria-label="Close Modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Video Player Stage */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          {isYouTube ? (
            <iframe
              src={finalEmbedUrl}
              title="Bengal Artisan Weaving Process"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <video
              src={finalEmbedUrl}
              poster={posterUrl || '/assets/images/jute_floor_mat.jpg'}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            >
              Your browser does not support HTML5 video playback.
            </video>
          )}
        </div>

        {/* Storytelling Footer */}
        <div className="p-6 bg-[#FAF7F2] overflow-y-auto">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8B6B38] mb-1">
            <Sparkles size={14} className="text-[#D8A856]" />
            <span>How a 4ft Mandala Braided Rug Takes Shape:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
            <div className="bg-white p-3.5 rounded-xl border border-[#E7DFD1] shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle size={14} className="text-[#1B3B2B]" />
                <h4 className="text-xs font-bold text-[#1B3B2B]">1. Fiber Grading</h4>
              </div>
              <p className="text-[11px] text-[#55524B]">
                Raw golden tossa jute is combed and selected for fiber tensile strength and natural sheen.
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[#E7DFD1] shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle size={14} className="text-[#1B3B2B]" />
                <h4 className="text-xs font-bold text-[#1B3B2B]">2. Spiral Hand-Braiding</h4>
              </div>
              <p className="text-[11px] text-[#55524B]">
                Three-ply braids are hand-stitched into concentric mandala circles by generational artisans.
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[#E7DFD1] shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle size={14} className="text-[#1B3B2B]" />
                <h4 className="text-xs font-bold text-[#1B3B2B]">3. Finishing & Trimming</h4>
              </div>
              <p className="text-[11px] text-[#55524B]">
                Lace edges and knots are hand-singed and steam-ironed for barefoot-soft floor readiness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

