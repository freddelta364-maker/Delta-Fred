import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Smartphone, 
  Clock, 
  Printer, 
  Download, 
  ArrowRight, 
  Truck, 
  AlertCircle,
  Lock,
  ChevronRight,
  User,
  MapPin
} from 'lucide-react';
import { CartItem, MobilePaymentProvider, Order, OrderCustomerInfo } from '../types';
import { formatFCFA, generateOrderReference, generateTransactionId } from '../utils/formatters';
import { CAMEROON_CITIES } from '../data/jewelryData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderCompleted: (order: Order) => void;
  initialCustomerInfo?: Partial<OrderCustomerInfo>;
}

type CheckoutStep = 'delivery_info' | 'payment_method' | 'processing_ussd' | 'order_success';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderCompleted,
  initialCustomerInfo
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const isFreeDelivery = subtotal >= 100000;
  const deliveryFee = isFreeDelivery ? 0 : 2500;
  const total = subtotal + deliveryFee;

  // Form State
  const [step, setStep] = useState<CheckoutStep>('delivery_info');
  const [fullName, setFullName] = useState(initialCustomerInfo?.fullName || '');
  const [phone, setPhone] = useState(initialCustomerInfo?.phone || '6');
  const [email, setEmail] = useState(initialCustomerInfo?.email || '');
  const [city, setCity] = useState(initialCustomerInfo?.city || 'Douala');
  const [neighborhood, setNeighborhood] = useState(initialCustomerInfo?.neighborhood || '');
  const [notes, setNotes] = useState('');
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<MobilePaymentProvider>('mtn_momo');
  const [paymentPhone, setPaymentPhone] = useState(phone || '6');
  const [formError, setFormError] = useState('');

  // USSD Interactive simulation state
  const [ussdCountdown, setUssdCountdown] = useState(12);
  const [pinCode, setPinCode] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Sync payment phone with delivery phone if empty
  useEffect(() => {
    if (phone && (!paymentPhone || paymentPhone === '6')) {
      setPaymentPhone(phone);
    }
  }, [phone]);

  // USSD Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'processing_ussd' && ussdCountdown > 0) {
      timer = setTimeout(() => {
        setUssdCountdown((prev) => prev - 1);
      }, 1000);
    } else if (step === 'processing_ussd' && ussdCountdown === 0) {
      // Auto-validate for smooth user experience
      handleConfirmPayment();
    }
    return () => clearTimeout(timer);
  }, [step, ussdCountdown]);

  const validateDeliveryInfo = () => {
    if (!fullName.trim()) {
      setFormError('Veuillez renseigner votre nom complet.');
      return false;
    }
    if (!phone || phone.length < 8) {
      setFormError('Veuillez saisir un numéro de téléphone camerounais valide (ex: 699001122).');
      return false;
    }
    if (!neighborhood.trim()) {
      setFormError('Veuillez indiquer votre quartier de livraison.');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleGoToPayment = () => {
    if (validateDeliveryInfo()) {
      setStep('payment_method');
    }
  };

  const handleStartMobilePayment = () => {
    if (!paymentPhone || paymentPhone.length < 8) {
      setFormError('Veuillez indiquer le numéro de téléphone pour le débit mobile.');
      return;
    }

    if (paymentMethod === 'cash_on_delivery') {
      handleConfirmPayment();
    } else {
      setStep('processing_ussd');
      setUssdCountdown(12);
    }
  };

  const handleConfirmPayment = () => {
    const reference = generateOrderReference();
    const transactionId = generateTransactionId(paymentMethod);

    const newOrder: Order = {
      id: 'order-' + Date.now(),
      reference,
      date: new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: [...cartItems],
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      paymentPhone,
      customer: {
        fullName,
        phone,
        email: email || `${phone.replace(/\D/g, '')}@client-cja.cm`,
        city,
        neighborhood,
        notes
      },
      status: paymentMethod === 'cash_on_delivery' ? 'confirmee' : 'confirmee',
      transactionId
    };

    setCompletedOrder(newOrder);
    onOrderCompleted(newOrder);
    setStep('order_success');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#DECFC0] overflow-hidden my-4">
        
        {/* Header with Step Indicator */}
        <div className="bg-[#1F1912] text-[#F5EDE1] p-5 sm:p-6 border-b border-[#3B2F22] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E2419] border border-[#D4A037]/50 flex items-center justify-center text-[#D4A037]">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#D4A037] block">
                Paiement Mobile Sécurisé • Cameroun
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                {step === 'delivery_info' && '1. Coordonnées de Livraison'}
                {step === 'payment_method' && '2. Choix du Paiement Mobile'}
                {step === 'processing_ussd' && '3. Validation Push USSD sur Téléphone'}
                {step === 'order_success' && 'Commande Confirmée avec Succès !'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#9E8B75] hover:text-white p-2 rounded-lg hover:bg-[#34281A] transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-[#FAF6EF] px-6 py-2 border-b border-[#E8DCcb] flex items-center justify-between text-xs text-[#7A6956]">
          <span className={step === 'delivery_info' ? 'font-bold text-[#966E26]' : ''}>
            1. Livraison
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#B8A48F]" />
          <span className={step === 'payment_method' ? 'font-bold text-[#966E26]' : ''}>
            2. MoMo / OM
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#B8A48F]" />
          <span className={step === 'processing_ussd' ? 'font-bold text-[#966E26]' : ''}>
            3. Validation
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#B8A48F]" />
          <span className={step === 'order_success' ? 'font-bold text-emerald-700' : ''}>
            4. Reçu Officiel
          </span>
        </div>

        {/* Error notification banner */}
        {formError && (
          <div className="bg-red-50 text-red-800 text-xs px-5 py-2.5 border-b border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* STEP 1: Delivery Information */}
        {step === 'delivery_info' && (
          <div className="p-6 sm:p-8 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE2D1] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#786552]">Montant de vos bijoux :</span>
                <p className="font-serif text-xl font-bold text-[#1E1710]">{formatFCFA(total)}</p>
              </div>
              <span className="text-xs font-semibold text-[#8C6D1F] bg-[#F5EAD4] px-2.5 py-1 rounded-full border border-[#E4D4B5]">
                {cartItems.length} article{cartItems.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#3B2F22] block mb-1">
                  Nom et Prénom *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Danielle Ngo Bassong"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#DCD0BE] rounded-xl text-[#261E16] focus:outline-none focus:ring-2 focus:ring-[#D4A037]/60"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#3B2F22] block mb-1">
                  Numéro de Téléphone (Cameroun) *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#DCD0BE] bg-[#F4EDE2] text-[#4A3D2E] text-xs font-bold">
                    🇨🇲 +237
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="6XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#DCD0BE] rounded-r-xl text-[#261E16] focus:outline-none focus:ring-2 focus:ring-[#D4A037]/60"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#3B2F22] block mb-1">
                  Ville de Livraison (Cameroun) *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#DCD0BE] rounded-xl text-[#261E16] focus:outline-none focus:ring-2 focus:ring-[#D4A037]/60"
                >
                  {CAMEROON_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c} {c === 'Douala' || c === 'Yaoundé' ? '— Express 24h' : '— Expédition 48h'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#3B2F22] block mb-1">
                  Quartier & Repère *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Bonapriso, Rue des Palmiers..."
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#DCD0BE] rounded-xl text-[#261E16] focus:outline-none focus:ring-2 focus:ring-[#D4A037]/60"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#3B2F22] block mb-1">
                Adresse Email (pour le certificat & reçu numérique)
              </label>
              <input
                type="email"
                placeholder="votre.email@domaine.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#DCD0BE] rounded-xl text-[#261E16] focus:outline-none focus:ring-2 focus:ring-[#D4A037]/60"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#3B2F22] block mb-1">
                Instructions particulières au livreur (Optionnel)
              </label>
              <textarea
                rows={2}
                placeholder="Ex : Appeler dès votre arrivée devant l'immeuble..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#DCD0BE] rounded-xl text-[#261E16] focus:outline-none focus:ring-2 focus:ring-[#D4A037]/60"
              />
            </div>

            <div className="pt-4 border-t border-[#EFE7DC] flex justify-end">
              <button
                id="checkout-next-to-payment-btn"
                onClick={handleGoToPayment}
                className="px-6 py-3 bg-[#1F1912] hover:bg-[#34271A] text-[#F5EDE1] hover:text-[#D4A037] font-bold text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Continuer vers le Paiement Mobile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Mobile Payment Method */}
        {step === 'payment_method' && (
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            
            <div className="text-center max-w-md mx-auto">
              <h4 className="font-serif text-lg font-bold text-[#1E1710]">
                Choisissez votre opérateur de paiement local
              </h4>
              <p className="text-xs text-[#6E5C49] mt-1">
                La transaction est débitée en direct en FCFA sans frais cachés.
              </p>
            </div>

            {/* Provider Cards */}
            <div className="space-y-3">
              
              {/* MTN Mobile Money */}
              <label 
                className={`relative flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'mtn_momo'
                    ? 'border-[#FFCC00] bg-[#FFFDEB] shadow-sm'
                    : 'border-[#E6DCCF] bg-white hover:bg-[#FAF6EE]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <input
                    type="radio"
                    name="mobile_payment"
                    value="mtn_momo"
                    checked={paymentMethod === 'mtn_momo'}
                    onChange={() => setPaymentMethod('mtn_momo')}
                    className="accent-[#FFCC00] w-4 h-4"
                  />
                  <div className="w-12 h-12 rounded-xl bg-[#FFCC00] flex items-center justify-center font-bold text-[#003366] text-xs shadow-xs">
                    MoMo
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#1F1912] block">
                      MTN Mobile Money Cameroun
                    </span>
                    <span className="text-xs text-[#6B5A47] block">
                      Validation instantanée par push USSD (*126#)
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#946A00] bg-[#FFF5C2] px-2 py-1 rounded-md">
                  Recommandé
                </span>
              </label>

              {/* Orange Money */}
              <label 
                className={`relative flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'orange_money'
                    ? 'border-[#FF6600] bg-[#FFF5EB] shadow-sm'
                    : 'border-[#E6DCCF] bg-white hover:bg-[#FAF6EE]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <input
                    type="radio"
                    name="mobile_payment"
                    value="orange_money"
                    checked={paymentMethod === 'orange_money'}
                    onChange={() => setPaymentMethod('orange_money')}
                    className="accent-[#FF6600] w-4 h-4"
                  />
                  <div className="w-12 h-12 rounded-xl bg-[#FF6600] flex items-center justify-center font-bold text-white text-xs shadow-xs">
                    OM
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#1F1912] block">
                      Orange Money Cameroun
                    </span>
                    <span className="text-xs text-[#6B5A47] block">
                      Notification immédiate sur téléphone (#150#)
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#B34700] bg-[#FFE6D4] px-2 py-1 rounded-md">
                  Rapide & Sécurisé
                </span>
              </label>

              {/* Cash on delivery */}
              <label 
                className={`relative flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'cash_on_delivery'
                    ? 'border-[#3D3024] bg-[#F7F2EA] shadow-sm'
                    : 'border-[#E6DCCF] bg-white hover:bg-[#FAF6EE]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <input
                    type="radio"
                    name="mobile_payment"
                    value="cash_on_delivery"
                    checked={paymentMethod === 'cash_on_delivery'}
                    onChange={() => setPaymentMethod('cash_on_delivery')}
                    className="accent-[#3D3024] w-4 h-4"
                  />
                  <div className="w-12 h-12 rounded-xl bg-[#2A2117] flex items-center justify-center font-bold text-[#D4A037] text-xs shadow-xs">
                    Cash
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#1F1912] block">
                      Paiement en Espèces à la Livraison
                    </span>
                    <span className="text-xs text-[#6B5A47] block">
                      Règlement direct lors de la remise en main propre (Douala & Yaoundé)
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#4D3E2F] bg-[#EAE0D3] px-2 py-1 rounded-md">
                  DLA & YDE
                </span>
              </label>

            </div>

            {/* Mobile payment phone input */}
            {paymentMethod !== 'cash_on_delivery' && (
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE2D1] space-y-2">
                <label className="text-xs font-bold text-[#3B2F22] block">
                  Numéro de compte {paymentMethod === 'mtn_momo' ? 'MTN MoMo' : 'Orange Money'} à débiter :
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#DCD0BE] bg-[#F4EDE2] text-[#4A3D2E] text-xs font-bold">
                    🇨🇲 +237
                  </span>
                  <input
                    type="tel"
                    value={paymentPhone}
                    onChange={(e) => setPaymentPhone(e.target.value)}
                    placeholder="6XXXXXXXX"
                    className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#DCD0BE] rounded-r-xl text-[#261E16] focus:outline-none focus:ring-2 focus:ring-[#D4A037]"
                  />
                </div>
                <p className="text-[11px] text-[#7A6956]">
                  Un message USSD de confirmation sera envoyé immédiatement à ce numéro.
                </p>
              </div>
            )}

            {/* Total Recap */}
            <div className="flex justify-between items-center py-3 px-4 bg-[#FAF6EE] rounded-xl border border-[#E8DDCC] text-sm">
              <span className="font-medium text-[#4A3E30]">Total à régler :</span>
              <span className="font-serif text-xl font-bold text-[#1F1811]">
                {formatFCFA(total)}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep('delivery_info')}
                className="text-xs font-semibold text-[#6E5C49] hover:text-black cursor-pointer"
              >
                ← Modifier la livraison
              </button>

              <button
                id="start-payment-trigger-btn"
                onClick={handleStartMobilePayment}
                className={`py-3.5 px-6 rounded-xl font-bold text-sm text-white shadow-md flex items-center gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'mtn_momo'
                    ? 'bg-[#E5B800] hover:bg-[#CC9900] text-[#002244]'
                    : paymentMethod === 'orange_money'
                    ? 'bg-[#FF6600] hover:bg-[#E65500] text-white'
                    : 'bg-[#1F1912] hover:bg-[#34271A] text-[#F5EDE1]'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>
                  {paymentMethod === 'cash_on_delivery'
                    ? 'Confirmer la commande (Paiement à la livraison)'
                    : `Débiter ${formatFCFA(total)} via ${paymentMethod === 'mtn_momo' ? 'MoMo' : 'OM'}`}
                </span>
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: USSD Simulation Interface */}
        {step === 'processing_ussd' && (
          <div className="p-6 sm:p-10 text-center space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Phone Screen Mockup */}
            <div className="max-w-xs mx-auto bg-[#1C1A17] text-white rounded-3xl p-5 border-4 border-[#3A332B] shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between text-[10px] text-[#A69989] border-b border-[#362E25] pb-2">
                <span>{paymentMethod === 'mtn_momo' ? 'MTN MoMo 🇨🇲' : 'Orange Money 🇨🇲'}</span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-[#D4A037]" />
                  {ussdCountdown}s
                </span>
              </div>

              {/* Prompt box */}
              <div className="bg-[#2B231A] p-4 rounded-xl border border-[#4F402F] text-left space-y-2">
                <p className="text-xs font-semibold text-[#E5C170]">
                  Demande d'autorisation de paiement :
                </p>
                <p className="text-xs text-[#D8C7B5]">
                  Marchand : <strong>CJA BIJOUTERIE CM</strong>
                </p>
                <p className="text-xs text-[#D8C7B5]">
                  Montant : <strong className="text-white">{formatFCFA(total)}</strong>
                </p>
                <p className="text-[11px] text-[#A89885]">
                  Numéro : +237 {paymentPhone}
                </p>
                <p className="text-[11px] text-amber-200/90 pt-1">
                  Entrez votre code secret ({paymentMethod === 'mtn_momo' ? '*126#' : '#150#'}) :
                </p>
              </div>

              {/* Interactive PIN Simulator */}
              <div className="space-y-2">
                <input
                  type="password"
                  maxLength={5}
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  placeholder="••••"
                  className="w-full text-center tracking-widest text-lg font-mono p-2 bg-[#12100E] border border-[#524332] rounded-lg text-[#E5C170] focus:outline-none"
                />
                <button
                  id="simulate-ussd-confirm-btn"
                  onClick={handleConfirmPayment}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Valider le paiement sur mon téléphone
                </button>
              </div>

            </div>

            <div className="max-w-md mx-auto space-y-2">
              <p className="text-xs text-[#6B5A47]">
                Une notification USSD a été envoyée sur votre téléphone portable. 
                Veuillez confirmer la transaction avec votre code secret habituel.
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-[#966E26] font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Paiement 100% sécurisé crypté de bout en bout</span>
              </div>
            </div>

          </div>
        )}

        {/* STEP 4: Order Success & Official Receipt */}
        {step === 'order_success' && completedOrder && (
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Success Banner */}
            <div className="text-center space-y-2 bg-emerald-50 border border-emerald-200 p-6 rounded-2xl">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-serif text-2xl font-bold text-emerald-950">
                Félicitations pour votre commande !
              </h4>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                Votre paiement via <strong>{completedOrder.paymentMethod === 'mtn_momo' ? 'MTN Mobile Money' : completedOrder.paymentMethod === 'orange_money' ? 'Orange Money' : 'Paiement à la livraison'}</strong> a été validé avec succès.
              </p>
            </div>

            {/* Official Printable Receipt Card */}
            <div id="cja-official-receipt" className="bg-[#FAF8F5] p-6 rounded-2xl border-2 border-[#D4A037]/50 shadow-sm space-y-4">
              
              {/* Receipt Header */}
              <div className="flex items-start justify-between border-b border-[#E8DECd] pb-4">
                <div>
                  <span className="font-serif text-xl font-bold text-[#1E1710] block">
                    CJA BIJOUTERIE CAMEROUN
                  </span>
                  <span className="text-[11px] text-[#7A6956] block">
                    Cameroun Joaillerie Artisanale • Akwa & Bastos
                  </span>
                  <span className="text-[11px] text-[#7A6956] block">
                    RC/DLA/2026/B/894 • Tél : +237 699 00 11 22
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#8C6B1C] bg-[#F5E8CE] px-2.5 py-1 rounded-md border border-[#E0CEAC] inline-block mb-1">
                    REÇU OFFICIEL
                  </span>
                  <p className="font-mono text-xs font-bold text-[#292015]">{completedOrder.reference}</p>
                  <p className="text-[10px] text-[#7A6956]">{completedOrder.date}</p>
                </div>
              </div>

              {/* Client & Delivery Info */}
              <div className="grid grid-cols-2 gap-4 text-xs py-2 border-b border-[#E8DECd]">
                <div>
                  <span className="text-[10px] font-bold text-[#8C7654] uppercase block">Client :</span>
                  <p className="font-bold text-[#231A12]">{completedOrder.customer.fullName}</p>
                  <p className="text-[#594837]">+237 {completedOrder.customer.phone}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#8C7654] uppercase block">Livraison :</span>
                  <p className="font-bold text-[#231A12]">{completedOrder.customer.city}</p>
                  <p className="text-[#594837]">{completedOrder.customer.neighborhood}</p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2 py-2 border-b border-[#E8DECd]">
                <span className="text-[10px] font-bold text-[#8C7654] uppercase block">Articles commandés :</span>
                {completedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <div>
                      <span className="font-medium text-[#231A11]">{it.item.name}</span>
                      <span className="text-[10px] text-[#8C7654] ml-1">x{it.quantity}</span>
                      {it.selectedSize && (
                        <span className="text-[10px] text-[#966E26] block">Taille : {it.selectedSize}</span>
                      )}
                    </div>
                    <span className="font-semibold text-[#231A11]">
                      {formatFCFA(it.item.price * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Totals */}
              <div className="space-y-1 text-xs pt-1">
                <div className="flex justify-between text-[#6B5A47]">
                  <span>Sous-total :</span>
                  <span>{formatFCFA(completedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#6B5A47]">
                  <span>Frais de livraison ({completedOrder.customer.city}) :</span>
                  <span>{completedOrder.deliveryFee === 0 ? 'Gratuit' : formatFCFA(completedOrder.deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1F1811] pt-2 border-t border-[#E6DCCF]">
                  <span>Montant Total Réglé :</span>
                  <span className="font-serif text-base text-[#1F1811]">{formatFCFA(completedOrder.total)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-emerald-800 pt-1">
                  <span>ID Transaction Opérateur :</span>
                  <span className="font-mono font-bold">{completedOrder.transactionId}</span>
                </div>
              </div>

            </div>

            {/* Post-order Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                id="print-receipt-btn"
                onClick={handlePrintReceipt}
                className="px-4 py-2.5 bg-white border border-[#D8CCB8] hover:bg-[#FAF6EE] text-[#3D3022] text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#8C7654]" />
                <span>Imprimer le Reçu</span>
              </button>

              <button
                id="finish-order-btn"
                onClick={onClose}
                className="px-6 py-2.5 bg-[#1F1912] hover:bg-[#32271C] text-[#E5C170] text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Continuer mes achats
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
