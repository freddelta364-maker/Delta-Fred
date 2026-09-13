import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Award, 
  Check, 
  Smartphone,
  Info
} from 'lucide-react';
import { JewelryItem } from '../types';
import { formatFCFA } from '../utils/formatters';

interface ProductDetailModalProps {
  item: JewelryItem | null;
  onClose: () => void;
  onAddToCart: (item: JewelryItem, selectedSize?: string, engravingText?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  onClose,
  onAddToCart
}) => {
  if (!item) return null;

  const [selectedSize, setSelectedSize] = useState<string>(
    item.sizes && item.sizes.length > 0 ? item.sizes[0] : ''
  );
  const [engravingText, setEngravingText] = useState<string>('');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(item, selectedSize, engravingText);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  const hasDiscount = item.originalPrice && item.originalPrice > item.price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E4D7C5] overflow-hidden my-8">
        
        {/* Close button */}
        <button
          id="close-detail-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 text-[#3C3023] hover:text-black hover:bg-white shadow-md flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Fermer la vue détaillée"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image & Badges */}
          <div className="relative bg-[#F3EDE2] p-6 flex flex-col items-center justify-center min-h-[350px]">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-md bg-white border border-[#E2D6C5]">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              {item.tag && (
                <span className="absolute top-3 left-3 bg-[#1F1912] text-[#E5C170] text-xs font-bold px-3 py-1 rounded-full border border-[#D4A037]/50 shadow-xs">
                  {item.tag}
                </span>
              )}
            </div>

            {/* Cameroon authenticity note */}
            <div className="mt-4 w-full max-w-sm bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-[#DECFC0] flex items-center gap-2.5 text-xs text-[#524130]">
              <ShieldCheck className="w-5 h-5 text-[#D4A037] flex-shrink-0" />
              <span>
                <strong>Certificat CJA inclus :</strong> Poinçon de maître orfèvre et garantie de titrage légale en République du Cameroun.
              </span>
            </div>
          </div>

          {/* Right Column: Information & Options */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#7B6854] mb-2">
                <span className="font-bold text-[#966E26] uppercase tracking-wider">
                  {item.purity}
                </span>
                <div className="flex items-center gap-1 text-[#C48C21]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-[#292017]">{item.rating}</span>
                  <span className="text-[#8F7D6B]">({item.reviewsCount} avis vérifiés)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1811] leading-snug">
                {item.name}
              </h2>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3 my-4 p-3.5 bg-[#FAF6EE] rounded-2xl border border-[#ECE0CC]">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1F1811]">
                  {formatFCFA(item.price)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-[#9E8E7C] line-through">
                    {formatFCFA(item.originalPrice!)}
                  </span>
                )}
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full ml-auto">
                  En stock ({item.stockCount} unités)
                </span>
              </div>

              {/* Full Description */}
              <div className="space-y-2 mb-6">
                <p className="text-xs sm:text-sm text-[#5C4A38] leading-relaxed">
                  {item.fullDescription || item.description}
                </p>
                {item.weightGrams && (
                  <p className="text-xs text-[#786552] flex items-center gap-1 font-medium">
                    <Award className="w-3.5 h-3.5 text-[#D4A037]" />
                    <span>Poids précieux estimé : <strong>{item.weightGrams}g</strong></span>
                  </p>
                )}
              </div>

              {/* Sizes Selection if applicable */}
              {item.sizes && item.sizes.length > 0 && (
                <div className="mb-4">
                  <label htmlFor="select-size-option" className="text-xs font-bold uppercase tracking-wider text-[#6B5743] block mb-2">
                    Taille / Longueur :
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {item.sizes.map((s) => (
                      <button
                        key={s}
                        id={`size-btn-${s.replace(/\s+/g, '-')}`}
                        onClick={() => setSelectedSize(s)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                          selectedSize === s
                            ? 'bg-[#241C14] text-[#E5C170] border-[#241C14] shadow-xs'
                            : 'bg-white text-[#4A3C2D] border-[#DCD0C0] hover:border-[#966E26]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Engraving Option (Free gift from CJA) */}
              <div className="mb-6 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EDE2D1]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#453627] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A037]" />
                  <span>Gravure laser personnalisée (Offerte)</span>
                </div>
                <input
                  type="text"
                  placeholder="Ex : Prénom, date de mariage, initiales..."
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  maxLength={30}
                  className="w-full text-xs p-2 bg-white border border-[#DCD0C0] rounded-lg text-[#261E16] placeholder-[#A69785] focus:outline-none focus:ring-1 focus:ring-[#D4A037]"
                />
                <span className="text-[10px] text-[#8C7654] block mt-1">
                  Gravé gratuitement dans nos ateliers de Douala ou Yaoundé avant expédition.
                </span>
              </div>

              {/* Trust highlights */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#594736] mb-6">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#D4A037]" />
                  <span>Paiement MoMo & OM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#D4A037]" />
                  <span>Livraison 24h DLA & YDE</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#EDE4D6]">
              <button
                id="modal-add-to-cart-btn"
                onClick={handleAdd}
                disabled={addedSuccess}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                  addedSuccess
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#1C160F] hover:bg-[#2F2418] text-[#F5EDE1] hover:text-[#D4A037]'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Ajouté au panier avec succès !</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#D4A037]" />
                    <span>Ajouter au panier ({formatFCFA(item.price)})</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
