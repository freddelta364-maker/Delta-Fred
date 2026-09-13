import React from 'react';
import { Sparkles, ShoppingBag, Eye, Star, ShieldCheck, Heart } from 'lucide-react';
import { JewelryItem } from '../types';
import { formatFCFA } from '../utils/formatters';

interface FeaturedSectionProps {
  featuredItems: JewelryItem[];
  onAddToCart: (item: JewelryItem) => void;
  onQuickView: (item: JewelryItem) => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  featuredItems,
  onAddToCart,
  onQuickView
}) => {
  return (
    <section id="vedettes-section" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2E5CA] text-[#8C6418] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sélection Exclusive 2026</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C160F] tracking-tight">
            Nos Bijoux en Vedette
          </h2>
          <div className="w-16 h-1 bg-[#D4A037] mx-auto mt-4 mb-4 rounded-full" />
          <p className="text-sm sm:text-base text-[#6E5D4B] leading-relaxed">
            Trois créations d'exception plébiscitées par nos clients au Cameroun. 
            Forgées avec des métaux précieux titrés et certifiés, symboles d'élégance et de prestige.
          </p>
        </div>

        {/* The 3 Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.slice(0, 3).map((item, index) => {
            const hasDiscount = item.originalPrice && item.originalPrice > item.price;
            const discountPercent = hasDiscount 
              ? Math.round(((item.originalPrice! - item.price) / item.originalPrice!) * 100)
              : null;

            return (
              <div
                key={item.id}
                id={`featured-card-${index + 1}`}
                className="group relative bg-white rounded-2xl border border-[#E6DCce] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                {/* Badge Tag */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                  <span className="bg-[#1F1912] text-[#E5C170] text-[11px] font-bold px-3 py-1 rounded-full shadow-md border border-[#D4A037]/40 uppercase tracking-wider">
                    {item.tag || 'En Vedette'}
                  </span>
                  {discountPercent && (
                    <span className="bg-[#B3261E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs w-fit">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                {/* Stock indicator badge */}
                <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-xs text-[#2A231A] text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-xs border border-[#E4DACD] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>En stock ({item.stockCount} dispo)</span>
                </div>

                {/* Product Image Container */}
                <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-[#F3EDE3]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Quick view button overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      id={`quick-view-btn-${item.id}`}
                      onClick={() => onQuickView(item)}
                      className="px-4 py-2 bg-white text-[#1C160F] font-semibold text-xs rounded-full shadow-md hover:bg-[#FAF6EE] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#D4A037]" />
                      <span>Aperçu rapide</span>
                    </button>
                  </div>
                </div>

                {/* Product Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Metal purity & rating */}
                    <div className="flex items-center justify-between text-xs text-[#7B6A56] mb-2">
                      <span className="font-semibold text-[#966E26] bg-[#F7EFE1] px-2 py-0.5 rounded border border-[#EDE2CE]">
                        {item.purity}
                      </span>
                      <div className="flex items-center gap-1 text-[#C48C21]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold text-[#3B2F22]">{item.rating}</span>
                        <span className="text-[#968673]">({item.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C160F] group-hover:text-[#966E26] transition-colors line-clamp-2 min-h-[56px]">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs sm:text-sm text-[#6B5A47] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {item.featuredHighlight && (
                      <p className="mt-3 text-[11px] font-medium text-[#966E26] bg-[#FCF8EE] p-2 rounded-lg border border-[#F2E5C8] flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 flex-shrink-0" />
                        <span>{item.featuredHighlight}</span>
                      </p>
                    )}
                  </div>

                  {/* Price and Add to cart */}
                  <div className="pt-5 mt-4 border-t border-[#EDE5D8]">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-[11px] text-[#8A7965] block">Prix au Cameroun :</span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-xl sm:text-2xl font-bold text-[#1F1811]">
                            {formatFCFA(item.price)}
                          </span>
                          {hasDiscount && (
                            <span className="text-xs text-[#9E8E7C] line-through">
                              {formatFCFA(item.originalPrice!)}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                        MoMo / OM
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        id={`details-btn-${item.id}`}
                        onClick={() => onQuickView(item)}
                        className="py-2.5 px-3 bg-[#F4EDE2] hover:bg-[#EAE1D3] text-[#4A3D2E] text-xs font-semibold rounded-xl transition-colors text-center cursor-pointer"
                      >
                        Fiche Complète
                      </button>

                      <button
                        id={`add-cart-btn-${item.id}`}
                        onClick={() => onAddToCart(item)}
                        className="py-2.5 px-3 bg-[#1C160F] hover:bg-[#34291B] text-[#F3ECE0] hover:text-[#D4A037] text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#D4A037]" />
                        <span>Ajouter</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
