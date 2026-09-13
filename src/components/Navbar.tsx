import React, { useState } from 'react';
import { 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  Phone, 
  MapPin, 
  ShieldCheck,
  Heart
} from 'lucide-react';
import { ProductCategory } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenCustomerSpace: () => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateToSection: (sectionId: string) => void;
  savedOrdersCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenCustomerSpace,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onNavigateToSection,
  savedOrdersCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'tous', label: 'Toute la Collection' },
    { id: 'bagues', label: 'Bagues & Alliances' },
    { id: 'colliers', label: 'Colliers & Pendentifs' },
    { id: 'bracelets', label: 'Bracelets & Joncs' },
    { id: 'boucles', label: "Boucles d'oreilles" },
    { id: 'montres', label: 'Montres de Luxe' },
    { id: 'traditionnel', label: 'Parures Royales' },
  ];

  const handleCategoryClick = (cat: ProductCategory) => {
    onSelectCategory(cat);
    onNavigateToSection('catalogue-section');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFD0] transition-all">
      {/* Top Banner - Cameroonian context & payment trust */}
      <div className="bg-[#191612] text-[#E5D7BE] text-xs py-2 px-4 border-b border-[#30281F]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-block text-sm">🇨🇲</span>
            <span className="font-medium">Livraison Express à Douala & Yaoundé sous 24h</span>
            <span className="hidden md:inline text-[#8C7654]">•</span>
            <span className="hidden md:inline">Paiements sécurisés MTN MoMo & Orange Money</span>
          </div>
          <div className="flex items-center gap-4 text-[#C6B192]">
            <a href="tel:+237699001122" className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#D4A037]" />
              <span className="font-semibold">+237 699 00 11 22</span>
            </a>
            <span className="hidden lg:inline text-[#4A3E31]">|</span>
            <span className="hidden lg:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#D4A037]" />
              <span>Showrooms Akwa (Douala) & Bastos (Yaoundé)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo CJA */}
          <div className="flex items-center gap-3">
            <button 
              id="brand-logo-btn"
              onClick={() => {
                onSelectCategory('tous');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#272118] via-[#1A1612] to-[#0D0A08] border border-[#D4A037]/60 flex items-center justify-center shadow-md group-hover:border-[#D4A037] transition-all">
                <span className="font-serif font-bold text-[#D4A037] text-xl tracking-wider">CJA</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1E1914] flex items-center gap-1.5">
                  CJA <span className="text-xs font-sans tracking-widest font-normal uppercase text-[#966E26] bg-[#F4E6C8]/60 px-1.5 py-0.5 rounded border border-[#E0CFAB]">Bijouterie</span>
                </span>
                <span className="text-[10px] text-[#7A6A55] tracking-wider uppercase font-medium">
                  Cameroun Joaillerie Artisanale
                </span>
              </div>
            </button>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              id="nav-link-vedettes"
              onClick={() => onNavigateToSection('vedettes-section')}
              className="px-3 py-2 text-sm font-medium text-[#4A3D2E] hover:text-[#966E26] hover:bg-[#F3ECE0]/60 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4A037]" />
              <span>En Vedette</span>
            </button>
            <button
              id="nav-link-catalogue"
              onClick={() => onNavigateToSection('catalogue-section')}
              className="px-3 py-2 text-sm font-medium text-[#4A3D2E] hover:text-[#966E26] hover:bg-[#F3ECE0]/60 rounded-md transition-colors"
            >
              Catalogue
            </button>
            <button
              id="nav-link-faq"
              onClick={() => onNavigateToSection('faq-section')}
              className="px-3 py-2 text-sm font-medium text-[#4A3D2E] hover:text-[#966E26] hover:bg-[#F3ECE0]/60 rounded-md transition-colors"
            >
              FAQ & Paiement
            </button>
            <button
              id="nav-link-contact"
              onClick={() => onNavigateToSection('contact-section')}
              className="px-3 py-2 text-sm font-medium text-[#4A3D2E] hover:text-[#966E26] hover:bg-[#F3ECE0]/60 rounded-md transition-colors"
            >
              Showroom & Contact
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Toggle */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-white border border-[#D8CCB8] rounded-full px-3 py-1.5 shadow-sm w-44 sm:w-60 transition-all">
                  <Search className="w-4 h-4 text-[#8C7654] mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Rechercher bague, or..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    autoFocus
                    className="w-full text-xs sm:text-sm bg-transparent border-none outline-none text-[#2D241A] placeholder-[#9E8E7C]"
                  />
                  <button 
                    onClick={() => {
                      setShowSearchInput(false);
                      onSearchChange('');
                    }}
                    className="text-[#9E8E7C] hover:text-black ml-1 text-xs"
                    title="Fermer la recherche"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  id="nav-search-btn"
                  onClick={() => {
                    setShowSearchInput(true);
                    onNavigateToSection('catalogue-section');
                  }}
                  className="p-2.5 text-[#4A3E31] hover:text-[#966E26] hover:bg-[#F0E6D6] rounded-full transition-colors"
                  aria-label="Rechercher des bijoux"
                  title="Rechercher"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Espace Client Button */}
            <button
              id="nav-espace-client-btn"
              onClick={onOpenCustomerSpace}
              className="flex items-center gap-2 py-2 px-3 sm:px-3.5 bg-white border border-[#DECFC0] hover:border-[#B59152] hover:bg-[#FCF9F2] text-[#2C241B] rounded-full shadow-xs transition-all text-xs sm:text-sm font-medium"
              title="Espace Client CJA"
            >
              <div className="w-6 h-6 rounded-full bg-[#F4EAD7] flex items-center justify-center text-[#966E26]">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="hidden md:inline">Espace Client</span>
              {savedOrdersCount > 0 && (
                <span className="bg-[#1F1913] text-[#D4A037] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {savedOrdersCount}
                </span>
              )}
            </button>

            {/* Panier Button */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 py-2 px-3 sm:px-4 bg-[#1E1812] hover:bg-[#2C231A] text-[#F3ECE0] rounded-full shadow-md transition-all text-xs sm:text-sm font-medium border border-[#3E3426]"
              aria-label="Voir le panier"
            >
              <ShoppingBag className="w-4 h-4 text-[#E2B75A]" />
              <span className="hidden sm:inline">Panier</span>
              {cartCount > 0 && (
                <span className="bg-[#D4A037] text-[#1A150F] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="nav-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#4A3E31] hover:text-[#966E26] lg:hidden rounded-md"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Category Horizontal Quick Bar */}
        <div className="hidden lg:flex items-center justify-center gap-2 py-2.5 border-t border-[#EDE4D6] overflow-x-auto text-xs">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`category-tab-${cat.id}`}
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#261F16] text-[#E5C170] shadow-xs'
                    : 'text-[#5E4E3C] hover:text-[#1F1913] hover:bg-[#EFE6D7]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E8DFD0] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-1 pb-4 border-b border-[#E8DFD0]">
            <span className="text-[11px] font-semibold text-[#8C7654] uppercase tracking-wider mb-1">
              Catégories de Bijoux
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex items-center justify-between text-left py-2 px-3 rounded-lg text-sm font-medium ${
                  selectedCategory === cat.id
                    ? 'bg-[#272118] text-[#D4A037]'
                    : 'text-[#3B3023] hover:bg-[#F3ECE0]'
                }`}
              >
                <span>{cat.label}</span>
                {selectedCategory === cat.id && <Sparkles className="w-3.5 h-3.5 text-[#D4A037]" />}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-4">
            <button
              onClick={() => {
                onNavigateToSection('vedettes-section');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 text-sm text-[#3B3023] font-medium hover:bg-[#F3ECE0] rounded-lg"
            >
              ✨ Bijoux en Vedette
            </button>
            <button
              onClick={() => {
                onNavigateToSection('faq-section');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 text-sm text-[#3B3023] font-medium hover:bg-[#F3ECE0] rounded-lg"
            >
              ❓ FAQ & Paiements MoMo / OM
            </button>
            <button
              onClick={() => {
                onNavigateToSection('contact-section');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 text-sm text-[#3B3023] font-medium hover:bg-[#F3ECE0] rounded-lg"
            >
              📍 Showrooms Douala & Yaoundé
            </button>
            <button
              onClick={() => {
                onOpenCustomerSpace();
                setMobileMenuOpen(false);
              }}
              className="mt-2 w-full py-2.5 bg-[#272118] text-[#D4A037] text-sm font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Accéder à mon Espace Client</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
