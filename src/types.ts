export type ProductCategory = 
  | 'tous'
  | 'bagues'
  | 'colliers'
  | 'bracelets'
  | 'boucles'
  | 'montres'
  | 'traditionnel';

export interface JewelryItem {
  id: string;
  name: string;
  category: 'bagues' | 'colliers' | 'bracelets' | 'boucles' | 'montres' | 'traditionnel';
  material: string;
  purity: string; // e.g. "Or 18 Carats (750/1000)", "Argent Massif 925"
  price: number; // in FCFA (XAF)
  originalPrice?: number;
  description: string;
  fullDescription: string;
  image: string;
  gallery?: string[];
  isFeatured?: boolean;
  featuredHighlight?: string; // Short highlight for the 3 featured cards
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  sizes?: string[];
  weightGrams?: number;
  tag?: 'Nouveauté' | 'Coup de Cœur' | 'Édition Limitée' | 'Artisanal Bamoun' | 'Meilleure Vente';
}

export interface CartItem {
  item: JewelryItem;
  quantity: number;
  selectedSize?: string;
  engravingText?: string;
}

export type MobilePaymentProvider = 'mtn_momo' | 'orange_money' | 'cash_on_delivery';

export interface OrderCustomerInfo {
  fullName: string;
  phone: string; // e.g. +237 6XXXXXXXX
  email: string;
  city: string; // Douala, Yaoundé, Bafoussam, Garoua, etc.
  neighborhood: string; // Quartier (ex: Bonapriso, Bastos, Akwa, Makepe, Omnisports)
  notes?: string;
}

export interface Order {
  id: string;
  reference: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: MobilePaymentProvider;
  paymentPhone: string;
  customer: OrderCustomerInfo;
  status: 'en_attente_paiement' | 'confirmee' | 'en_preparation' | 'en_livraison' | 'livree';
  transactionId?: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  neighborhood: string;
}
