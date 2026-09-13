import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  RotateCcw, 
  ShoppingBag, 
  Eye, 
  Star, 
  Sparkles, 
  SlidersHorizontal,
  Layers,
  ChevronDown
} from 'lucide-react';
import { JewelryItem, ProductCategory } from '../types';
import { formatFCFA } from '../utils/formatters';

interface ProductListProps {
  items: JewelryItem[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onAddToCart: (item: JewelryItem) => void;
  onQuickView: (item: JewelryItem) => void;
}

type PriceBracket = 'all' | 'under50k' | '50k_to_150k' | '150k_to_300k' | 'above300k';
type SortOption = 'featured' | 'price_asc' | 'price_desc' | 'rating' | 'newest';

export const ProductList: React.FC<ProductListProps> = ({
  items,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onAddToCart,
  onQuickView
}) => {
  // Price filter state
  const [maxPrice, setMaxPrice] = useState<number>(450000);
  const [priceBracket, setPriceBracket] = useState<PriceBracket>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Absolute min and max in catalogue
  const absoluteMaxPrice = 450000;
  const absoluteMinPrice = 30000;

  // Materials list
  const materials = [
    { id: 'all', label: 'Tous les métaux' },
    { id: 'or', label: 'Or 18K (750/1000)' },
    { id: 'argent', label: 'Argent Massif 925' },
    { id: 'traditionnel', label: 'Perles & Cauris royaux' }
  ];

  // Price brackets quick buttons
  const priceBrackets = [
    { id: 'all' as PriceBracket, label: 'Tous les prix' },
    { id: 'under50k' as PriceBracket, label: '< 50 000 FCFA' },
    { id: '50k_to_150k' as PriceBracket, label: '50 000 – 150 000 FCFA' },
    { id: '150k_to_300k' as PriceBracket, label: '150 000 – 300 000 FCFA' },
    { id: 'above300k' as PriceBracket, label: '> 300 000 FCFA' }
  ];

  const handlePriceBracketClick = (bracket: PriceBracket) => {
    setPriceBracket(bracket);
    if (bracket === 'all') {
      setMaxPrice(absoluteMaxPrice);
    } else if (bracket === 'under50k') {
      setMaxPrice(50000);
    } else if (bracket === '50k_to_150k') {
      setMaxPrice(150000);
    } else if (bracket === '150k_to_300k') {
      setMaxPrice(300000);
    } else if (bracket === 'above300k') {
      setMaxPrice(absoluteMaxPrice);
    }
  };

  const handleResetFilters = () => {
    onSelectCategory('tous');
    onSearchChange('');
    setMaxPrice(absoluteMaxPrice);
    setPriceBracket('all');
    setSelectedMaterial('all');
    setSortBy('featured');
  };

  // Filtered and sorted items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (selectedCategory !== 'tous' && item.category !== selectedCategory) {
        return false;
      }

      // Keyword search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesMaterial = item.material.toLowerCase().includes(query);
        const matchesPurity = item.purity.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesMaterial && !matchesPurity) {
          return false;
        }
      }

      // Price bracket filter
      if (priceBracket === 'under50k' && item.price >= 50000) return false;
      if (priceBracket === '50k_to_150k' && (item.price < 50000 || item.price > 150000)) return false;
      if (priceBracket === '150k_to_300k' && (item.price < 150000 || item.price > 300000)) return false;
      if (priceBracket === 'above300k' && item.price <= 300000) return false;

      // Price slider filter
      if (priceBracket === 'all' && item.price > maxPrice) {
        return false;
      }

      // Material filter
      if (selectedMaterial === 'or' && !item.purity.toLowerCase().includes('or 18k') && !item.material.toLowerCase().includes('or')) {
        return false;
      }
      if (selectedMaterial === 'argent' && !item.purity.toLowerCase().includes('argent') && !item.material.toLowerCase().includes('argent')) {
        return false;
      }
      if (selectedMaterial === 'traditionnel' && item.category !== 'traditionnel' && !item.material.toLowerCase().includes('perles')) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.tag === 'Nouveauté' ? 1 : 0) - (a.tag === 'Nouveauté' ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [items, selectedCategory, searchQuery, priceBracket, maxPrice, selectedMaterial, sortBy]);

  const activeFiltersCount = 
    (selectedCategory !== 'tous' ? 1 : 0) +
    (priceBracket !== 'all' || maxPrice < absoluteMaxPrice ? 1 : 0) +
    (selectedMaterial !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <section id="catalogue-section" className="py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#E6DDCE] gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#966E26] mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Collection Joaillerie Cameroun</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C160F]">
              Catalogue & Tous les Articles
            </h2>
            <p className="text-sm text-[#736250] mt-1">
              {filteredItems.length} article{filteredItems.length > 1 ? 's' : ''} disponible{filteredItems.length > 1 ? 's' : ''} en stock avec livraison express locale.
            </p>
          </div>

          {/* Quick Search & Sort Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#8C7654] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="catalogue-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Rechercher par nom, or, argent..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-[#DCD0BE] rounded-xl text-[#261E16] placeholder-[#A69785] focus:outline-none focus:ring-2 focus:ring-[#D4A037]/50"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8C7654] hover:text-black"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-white border border-[#DCD0BE] rounded-xl px-3 py-1.5 shadow-2xs">
              <span className="text-xs text-[#7B6854] font-medium hidden sm:inline">Trier :</span>
              <select
                id="sort-selector"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Trier les bijoux"
                className="text-xs sm:text-sm font-semibold text-[#292017] bg-transparent border-none outline-none cursor-pointer"
              >
                <option value="featured">Populaires & Vedettes</option>
                <option value="price_asc">Prix : croissant</option>
                <option value="price_desc">Prix : décroissant</option>
                <option value="rating">Mieux notés</option>
                <option value="newest">Nouveautés d'abord</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              id="mobile-filters-toggle-btn"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden flex items-center gap-2 px-3 py-2 bg-white border border-[#DCD0BE] rounded-xl text-xs font-semibold text-[#2E2419]"
            >
              <Filter className="w-3.5 h-3.5 text-[#966E26]" />
              <span>Filtres ({activeFiltersCount})</span>
            </button>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar (Desktop & Mobile Drawer) */}
          <aside className={`lg:block ${showMobileFilters ? 'block' : 'hidden'} lg:col-span-1 space-y-6`}>
            <div className="bg-white rounded-2xl p-5 border border-[#E6DCCF] shadow-xs">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#EFE7DC] mb-5">
                <div className="flex items-center gap-2 text-[#241C14] font-bold text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-[#966E26]" />
                  <span>Filtres de Sélection</span>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    id="reset-filters-btn"
                    onClick={handleResetFilters}
                    className="text-xs text-[#966E26] hover:text-[#684C16] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Réinitialiser ({activeFiltersCount})</span>
                  </button>
                )}
              </div>

              {/* 1. Filter by Price (Requested core feature) */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <label htmlFor="price-range-slider" className="text-xs font-bold uppercase tracking-wider text-[#7A6956]">
                    Filtre par Prix
                  </label>
                  <span className="text-xs font-bold text-[#966E26] bg-[#FAF3E4] px-2 py-0.5 rounded border border-[#EADBBD]">
                    Max: {formatFCFA(maxPrice)}
                  </span>
                </div>

                {/* Range Slider */}
                <div className="space-y-2">
                  <input
                    id="price-range-slider"
                    type="range"
                    min={absoluteMinPrice}
                    max={absoluteMaxPrice}
                    step={10000}
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(Number(e.target.value));
                      setPriceBracket('all');
                    }}
                    className="w-full h-2 bg-[#EADDC9] rounded-lg appearance-none cursor-pointer accent-[#D4A037]"
                  />
                  <div className="flex justify-between text-[10px] text-[#8C7654] font-medium">
                    <span>{formatFCFA(absoluteMinPrice)}</span>
                    <span>{formatFCFA(absoluteMaxPrice)}</span>
                  </div>
                </div>

                {/* Quick Price Brackets */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] text-[#6E5C48] font-medium block">Tranches de prix recommandées :</span>
                  <div className="flex flex-col gap-1.5">
                    {priceBrackets.map((b) => (
                      <button
                        key={b.id}
                        id={`price-bracket-${b.id}`}
                        onClick={() => handlePriceBracketClick(b.id)}
                        className={`text-left text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                          priceBracket === b.id
                            ? 'bg-[#1F1912] text-[#E5C170] shadow-xs'
                            : 'text-[#4A3C2D] hover:bg-[#F3EDE2]'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. Filter by Category */}
              <div className="pt-5 border-t border-[#EFE7DC] space-y-3 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A6956] block">
                  Catégories de Bijoux
                </span>
                <div className="space-y-1">
                  {[
                    { id: 'tous' as ProductCategory, label: 'Tous les bijoux' },
                    { id: 'bagues' as ProductCategory, label: 'Bagues & Alliances' },
                    { id: 'colliers' as ProductCategory, label: 'Colliers & Pendentifs' },
                    { id: 'bracelets' as ProductCategory, label: 'Bracelets & Joncs' },
                    { id: 'boucles' as ProductCategory, label: "Boucles d'oreilles" },
                    { id: 'montres' as ProductCategory, label: 'Montres & Horlogerie' },
                    { id: 'traditionnel' as ProductCategory, label: 'Parures Traditionnelles' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => onSelectCategory(cat.id)}
                      className={`w-full flex items-center justify-between text-left text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-[#272017] text-[#D4A037]'
                          : 'text-[#4D3F30] hover:bg-[#F3EDE2]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className="text-[10px] text-[#8C7654]">
                        {cat.id === 'tous' 
                          ? items.length 
                          : items.filter(i => i.category === cat.id).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Filter by Precious Metal */}
              <div className="pt-5 border-t border-[#EFE7DC] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A6956] block">
                  Métaux & Confection
                </span>
                <div className="space-y-1">
                  {materials.map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat.id)}
                      className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                        selectedMaterial === mat.id
                          ? 'bg-[#272017] text-[#D4A037]'
                          : 'text-[#4D3F30] hover:bg-[#F3EDE2]'
                      }`}
                    >
                      {mat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Contact Helper */}
              <div className="mt-6 pt-5 border-t border-[#EFE7DC] bg-[#FAF5EC] p-3 rounded-xl text-center border border-[#EDE1CF]">
                <p className="text-[11px] font-bold text-[#453728]">Besoin d'un bijou sur mesure ?</p>
                <p className="text-[10px] text-[#786652] mt-0.5">Nos orfèvres créent votre modèle à Douala & Yaoundé.</p>
                <a
                  href="#contact-section"
                  className="mt-2 inline-block text-[11px] font-bold text-[#966E26] hover:underline"
                >
                  Contacter l'atelier CJA →
                </a>
              </div>

            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-3">
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#E6DDCE] shadow-xs">
                <div className="w-16 h-16 rounded-full bg-[#FAF3E6] text-[#D4A037] flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#231A12] mb-2">
                  Aucun bijou ne correspond à vos critères
                </h3>
                <p className="text-xs sm:text-sm text-[#736351] max-w-md mx-auto mb-6">
                  Essayez d'ajuster votre budget de prix ou de retirer certains filtres de catégorie.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-[#1F1912] hover:bg-[#32271C] text-[#E5C170] text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Voir tous les bijoux disponibles
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => {
                  const hasDiscount = item.originalPrice && item.originalPrice > item.price;
                  return (
                    <div
                      key={item.id}
                      id={`product-card-${item.id}`}
                      className="group bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5"
                    >
                      {/* Image Frame */}
                      <div className="relative w-full h-60 overflow-hidden bg-[#F4EFE6]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />

                        {/* Top Left Tag */}
                        {item.tag && (
                          <span className="absolute top-3 left-3 bg-[#1C160F] text-[#E5C170] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#D4A037]/40 shadow-xs">
                            {item.tag}
                          </span>
                        )}

                        {/* Stock status */}
                        <span className="absolute top-3 right-3 bg-white/95 text-[#2E2419] text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs border border-[#E2D8CA] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>{item.stockCount} dispo</span>
                        </span>

                        {/* Quick View Button */}
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            id={`quick-preview-${item.id}`}
                            onClick={() => onQuickView(item)}
                            className="px-3.5 py-1.5 bg-white text-[#1C160F] font-semibold text-xs rounded-full shadow-md hover:bg-[#FAF6EE] transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#D4A037]" />
                            <span>Aperçu rapide</span>
                          </button>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Purity & Category */}
                          <div className="flex items-center justify-between text-[11px] text-[#7A6A56] mb-1.5">
                            <span className="font-semibold text-[#966E26]">
                              {item.purity}
                            </span>
                            <div className="flex items-center gap-0.5 text-[#C48C21]">
                              <Star className="w-3 h-3 fill-current" />
                              <span className="font-bold text-[#3B2F22]">{item.rating}</span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="font-serif text-base font-bold text-[#1E1812] group-hover:text-[#966E26] transition-colors line-clamp-2 min-h-[44px]">
                            {item.name}
                          </h3>

                          {/* Short Description */}
                          <p className="text-xs text-[#6B5A47] line-clamp-2 mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Price & Action */}
                        <div className="pt-3 mt-3 border-t border-[#EFE7DC]">
                          <div className="flex items-baseline justify-between mb-2.5">
                            <div>
                              <span className="font-serif text-lg font-bold text-[#1C160F]">
                                {formatFCFA(item.price)}
                              </span>
                              {hasDiscount && (
                                <span className="ml-1.5 text-[11px] text-[#9E8E7C] line-through">
                                  {formatFCFA(item.originalPrice!)}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                              MoMo / OM
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => onQuickView(item)}
                              className="py-2 px-2 bg-[#F3EDE3] hover:bg-[#E7DED0] text-[#3B3023] text-xs font-semibold rounded-xl transition-colors text-center cursor-pointer"
                            >
                              Détails
                            </button>
                            <button
                              id={`add-btn-${item.id}`}
                              onClick={() => onAddToCart(item)}
                              className="py-2 px-2 bg-[#1C160F] hover:bg-[#34281A] text-[#FAF6F0] hover:text-[#D4A037] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <ShoppingBag className="w-3 h-3 text-[#D4A037]" />
                              <span>Ajouter</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>

        </div>

      </div>
    </section>
  );
};
