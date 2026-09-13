import React, { useState } from 'react';
import { 
  X, 
  User, 
  Package, 
  Clock, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  Sparkles, 
  Phone, 
  ShieldCheck, 
  Award,
  Calendar
} from 'lucide-react';
import { Order, UserProfile } from '../types';
import { formatFCFA } from '../utils/formatters';
import { CAMEROON_CITIES } from '../data/jewelryData';

interface CustomerSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  profile: UserProfile;
  onUpdateProfile: (newProfile: UserProfile) => void;
}

type TabType = 'orders' | 'profile' | 'services';

export const CustomerSpaceModal: React.FC<CustomerSpaceModalProps> = ({
  isOpen,
  onClose,
  orders,
  profile,
  onUpdateProfile
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<TabType>('orders');
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#DECFC0] overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#1C160F] text-[#FAF4EA] p-5 sm:p-6 border-b border-[#362B1D] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#2C2216] border border-[#D4A037]/50 flex items-center justify-center text-[#D4A037] font-serif font-bold text-lg">
              {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#D4A037] block">
                Maison CJA • Espace Privé Client
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                {profile.fullName || 'Espace Client Joaillerie'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#A18F7B] hover:text-white p-2 rounded-lg hover:bg-[#2F2417] transition-colors cursor-pointer"
            aria-label="Fermer l'espace client"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8DFC0] bg-[#FAF8F5] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3.5 px-4 flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#966E26] text-[#241C13] bg-white'
                : 'border-transparent text-[#73624F] hover:text-[#241C13]'
            }`}
          >
            <Package className="w-4 h-4 text-[#966E26]" />
            <span>Mes Commandes ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3.5 px-4 flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#966E26] text-[#241C13] bg-white'
                : 'border-transparent text-[#73624F] hover:text-[#241C13]'
            }`}
          >
            <User className="w-4 h-4 text-[#966E26]" />
            <span>Mes Coordonnées</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex-1 py-3.5 px-4 flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'border-[#966E26] text-[#241C13] bg-white'
                : 'border-transparent text-[#73624F] hover:text-[#241C13]'
            }`}
          >
            <Award className="w-4 h-4 text-[#966E26]" />
            <span>Garanties & Privilèges</span>
          </button>
        </div>

        {/* Tab 1: Orders History & Tracking */}
        {activeTab === 'orders' && (
          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5">
            {orders.length === 0 ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-[#FAF3E4] text-[#A68F74] flex items-center justify-center mx-auto mb-3">
                  <Package className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#2A2016] mb-1">
                  Aucune commande enregistrée pour le moment
                </h4>
                <p className="text-xs text-[#7A6956] max-w-sm mx-auto mb-4">
                  Vos futures commandes passées avec MTN MoMo ou Orange Money apparaîtront ici avec leur suivi en direct.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-[#1F1912] hover:bg-[#34271A] text-[#E5C170] text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Découvrir les bijoux
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div 
                  key={order.id} 
                  className="bg-[#FAF8F5] rounded-2xl border border-[#E6DCCF] p-5 shadow-xs space-y-4"
                >
                  {/* Order header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8DECd] pb-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#231A12] block">
                        Réf : {order.reference}
                      </span>
                      <span className="text-[11px] text-[#786653]">
                        Passée le {order.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Payée via {order.paymentMethod === 'mtn_momo' ? 'MTN MoMo' : order.paymentMethod === 'orange_money' ? 'Orange Money' : 'Cash'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Delivery Tracking Stepper */}
                  <div className="bg-white p-4 rounded-xl border border-[#EADBCC] space-y-2">
                    <span className="text-[11px] font-bold text-[#8C7654] uppercase tracking-wider block">
                      Suivi d'acheminement en direct :
                    </span>
                    <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold mb-1">
                          ✓
                        </div>
                        <span className="text-[10px] font-bold text-[#2E2419]">MoMo / OM Confirmé</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold mb-1">
                          ✓
                        </div>
                        <span className="text-[10px] font-bold text-[#2E2419]">Préparation Atelier</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-[#D4A037] text-white flex items-center justify-center text-xs font-bold mb-1 animate-pulse">
                          <Truck className="w-3 h-3" />
                        </div>
                        <span className="text-[10px] font-bold text-[#966E26]">En cours de coursier</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-[#E8DDD0] text-[#7A6A59] flex items-center justify-center text-xs font-bold mb-1">
                          4
                        </div>
                        <span className="text-[10px] text-[#7A6A59]">Livré avec certificat</span>
                      </div>
                    </div>
                    <div className="mt-2 text-center text-[11px] text-[#786653]">
                      📍 Destination : <strong>{order.customer.city} ({order.customer.neighborhood})</strong>
                    </div>
                  </div>

                  {/* Items summary */}
                  <div className="space-y-1.5 pt-1">
                    {order.items.map((it, i) => (
                      <div key={i} className="flex justify-between text-xs text-[#453627]">
                        <span>{it.item.name} (x{it.quantity})</span>
                        <span className="font-bold">{formatFCFA(it.item.price * it.quantity)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-xs font-bold text-[#1E1710] pt-2 border-t border-[#E8DECd]">
                      <span>Total réglé :</span>
                      <span className="font-serif text-sm">{formatFCFA(order.total)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Profile Coordinates */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto">
            {saveSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Coordonnées mises à jour avec succès !</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#3B2F22] block mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Ex : Danielle Ngo Bassong"
                  className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#DCD0BE] rounded-xl text-[#261E16] focus:outline-none focus:ring-2 focus:ring-[#D4A037]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#3B2F22] block mb-1">
                  Téléphone Mobile Money camerounais
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+237 6XXXXXXXX"
                  className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#DCD0BE] rounded-xl text-[#261E16] focus:outline-none focus:ring-2 focus:ring-[#D4A037]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#3B2F22] block mb-1">
                  Ville par défaut
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#DCD0BE] rounded-xl text-[#261E16] focus:outline-none focus:ring-2 focus:ring-[#D4A037]"
                >
                  {CAMEROON_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#3B2F22] block mb-1">
                  Quartier habituel
                </label>
                <input
                  type="text"
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                  placeholder="Ex : Bastos, Yaoundé"
                  className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#DCD0BE] rounded-xl text-[#261E16] focus:outline-none focus:ring-2 focus:ring-[#D4A037]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#3B2F22] block mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="votre.email@domaine.com"
                className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#DCD0BE] rounded-xl text-[#261E16] focus:outline-none focus:ring-2 focus:ring-[#D4A037]"
              />
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1F1912] hover:bg-[#34271A] text-[#E5C170] text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Enregistrer mes coordonnées
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Privileges & Warranties */}
        {activeTab === 'services' && (
          <div className="p-6 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE2D1] flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-[#D4A037] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#231A12]">Garantie Légale à Vie sur l'Or 18K</h4>
                <p className="text-xs text-[#6B5A47] mt-1">
                  Tous nos bijoux sont forgés conformément aux normes de titrage 750/1000 et marqués du poinçon de maître CJA.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE2D1] flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-[#D4A037] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#231A12]">Nettoyage & Polissage Gratuit à Vie</h4>
                <p className="text-xs text-[#6B5A47] mt-1">
                  Présentez votre reçu dans nos showrooms d'Akwa (Douala) ou Bastos (Yaoundé) pour redonner son éclat initial à votre bijou à tout moment.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE2D1] flex items-start gap-3">
              <Phone className="w-6 h-6 text-[#D4A037] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#231A12]">Ligne VIP & Conseil Joaillier Dédié</h4>
                <p className="text-xs text-[#6B5A47] mt-1">
                  Contactez directement nos maîtres artisans au <strong>+237 699 00 11 22</strong> pour toute commande de bague de fiançailles ou parure de dot sur-mesure.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
