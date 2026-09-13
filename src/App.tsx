import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedSection } from './components/FeaturedSection';
import { ProductList } from './components/ProductList';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CustomerSpaceModal } from './components/CustomerSpaceModal';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

import { JEWELRY_ITEMS } from './data/jewelryData';
import { CartItem, JewelryItem, Order, ProductCategory, UserProfile } from './types';
import { Check, ShoppingBag } from 'lucide-react';
import { formatFCFA } from './utils/formatters';

export default function App() {
  // Navigation & Filter state
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('tous');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isCustomerSpaceOpen, setIsCustomerSpaceOpen] = useState<boolean>(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<JewelryItem | null>(null);

  // Cart state with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cja_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders state with localStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('cja_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default initial demonstration order for Cameroonian customer space
    return [
      {
        id: 'order-demo-1',
        reference: 'CJA-CM-2026-9812',
        date: 'Hier à 14:30',
        items: [
          {
            item: JEWELRY_ITEMS[4], // Pendentif Carte du Cameroun
            quantity: 1,
            selectedSize: 'Chaîne 45cm incluse',
            engravingText: 'Kamer 237'
          }
        ],
        subtotal: 85000,
        deliveryFee: 2500,
        total: 87500,
        paymentMethod: 'mtn_momo',
        paymentPhone: '677112233',
        customer: {
          fullName: 'Chantal Ebanda',
          phone: '677112233',
          email: 'chantal.ebanda@gmail.com',
          city: 'Douala',
          neighborhood: 'Bonapriso, Rue Tokoto',
          notes: 'Livrer avant 17h'
        },
        status: 'en_livraison',
        transactionId: 'MTN-CM-TX894102'
      }
    ];
  });

  // User profile with localStorage
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('cja_profile');
      return saved ? JSON.parse(saved) : {
        fullName: 'Danielle Ngo Bassong',
        email: 'danielle.ngo@gmail.com',
        phone: '699001122',
        city: 'Douala',
        neighborhood: 'Bonapriso'
      };
    } catch {
      return {
        fullName: 'Danielle Ngo Bassong',
        email: 'danielle.ngo@gmail.com',
        phone: '699001122',
        city: 'Douala',
        neighborhood: 'Bonapriso'
      };
    }
  });

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('cja_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('cja_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('cja_profile', JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart handlers
  const handleAddToCart = (item: JewelryItem, selectedSize?: string, engravingText?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.item.id === item.id && ci.selectedSize === selectedSize && ci.engravingText === engravingText
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { item, quantity: 1, selectedSize, engravingText }];
    });
    showToast(`"${item.name}" a été ajouté à votre panier`);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOrderCompleted = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    showToast(`Commande ${newOrder.reference} validée avec succès via ${newOrder.paymentMethod === 'mtn_momo' ? 'MTN MoMo' : newOrder.paymentMethod === 'orange_money' ? 'Orange Money' : 'Cash'} !`);
  };

  const handleNavigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3 Featured items for the special section
  const featuredItems = JEWELRY_ITEMS.filter((i) => i.isFeatured);

  // Total cart items count
  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col text-[#1E1914]">
      
      {/* 1. Navigation bar with Logo CJA, Categories, Cart & Espace Client */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCustomerSpace={() => setIsCustomerSpaceOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateToSection={handleNavigateToSection}
        savedOrdersCount={orders.length}
      />

      {/* Toast alert popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C160F] text-[#F5EDE1] border border-[#D4A037]/60 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 max-w-sm">
          <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Content Areas */}
      <main className="flex-1">
        
        {/* 2. Hero Section: Introduction to CJA Jewelry House */}
        <HeroSection
          onExploreClick={() => handleNavigateToSection('catalogue-section')}
          onFeaturedClick={() => handleNavigateToSection('vedettes-section')}
        />

        {/* 3. Section avec 3 cartes présentant nos bijoux en vedette (description + prix) */}
        <FeaturedSection
          featuredItems={featuredItems}
          onAddToCart={(item) => handleAddToCart(item)}
          onQuickView={(item) => setSelectedProductForDetail(item)}
        />

        {/* 4. Detailed catalogue with price filters and search */}
        <ProductList
          items={JEWELRY_ITEMS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddToCart={(item) => handleAddToCart(item)}
          onQuickView={(item) => setSelectedProductForDetail(item)}
        />

        {/* 5. FAQ Section (MTN MoMo, Orange Money, Cameroon Delivery, Guarantees) */}
        <FAQSection />

        {/* 6. Contact Form & Showrooms Douala & Yaoundé */}
        <ContactSection />

      </main>

      {/* 7. Footer with Social Media Links & Brand Heritage */}
      <Footer
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Modal: Product Detailed Preview */}
      <ProductDetailModal
        item={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Drawer: Shopping Cart */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Modal: Integrated Mobile Money Checkout (MTN MoMo / Orange Money / Cash) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderCompleted={handleOrderCompleted}
        initialCustomerInfo={{
          fullName: profile.fullName,
          phone: profile.phone,
          email: profile.email,
          city: profile.city,
          neighborhood: profile.neighborhood
        }}
      />

      {/* Modal: Espace Client (Orders history & Live tracking) */}
      <CustomerSpaceModal
        isOpen={isCustomerSpaceOpen}
        onClose={() => setIsCustomerSpaceOpen(false)}
        orders={orders}
        profile={profile}
        onUpdateProfile={(newProf) => {
          setProfile(newProf);
          showToast('Vos coordonnées ont été enregistrées');
        }}
      />

    </div>
  );
}
