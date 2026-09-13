import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck,
  Truck,
  Smartphone
} from 'lucide-react';
import { CartItem } from '../types';
import { formatFCFA } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const freeDeliveryThreshold = 100000;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const deliveryFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : 2500;
  const total = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-2xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E2D6C5] shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#EDE3D4] bg-[#FAF8F5] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#272118] text-[#D4A037] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1C160F]">
                  Mon Panier d'Achat
                </h3>
                <span className="text-xs text-[#7A6956]">
                  {items.length} article{items.length > 1 ? 's' : ''} sélectionné{items.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <button
              id="close-cart-btn"
              onClick={onClose}
              className="p-2 text-[#6B5945] hover:text-black rounded-lg hover:bg-[#F2EAE0] transition-colors cursor-pointer"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery progress bar */}
          <div className="bg-[#FAF4EB] px-5 py-2.5 border-b border-[#EADFCF] text-xs text-[#594734]">
            {isFreeDelivery ? (
              <p className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Félicitations ! Livraison gratuite offerte à Douala & Yaoundé.</span>
              </p>
            ) : (
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span>Plus que <strong>{formatFCFA(freeDeliveryThreshold - subtotal)}</strong> pour la livraison offerte</span>
                  <span className="font-semibold">{Math.round((subtotal / freeDeliveryThreshold) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#E2D4BF] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#D4A037] rounded-full transition-all"
                    style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EFE7DC]">
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F5EDE1] text-[#A68F75] flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#2A2117] mb-1">
                  Votre panier est vide
                </h4>
                <p className="text-xs text-[#786653] max-w-xs mx-auto mb-6">
                  Parcourez nos parures royales, alliances et bijoux d'exception pour commencer votre sélection.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#1F1912] hover:bg-[#32271B] text-[#E5C170] text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Découvrir les bijoux
                </button>
              </div>
            ) : (
              items.map((cartItem, index) => (
                <div key={`${cartItem.item.id}-${index}`} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-20 h-20 object-cover rounded-xl border border-[#E4DACD] bg-[#F5EEE3] flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-bold text-[#1E1710] line-clamp-1">
                          {cartItem.item.name}
                        </h4>
                        <button
                          id={`remove-item-${index}`}
                          onClick={() => onRemoveItem(index)}
                          className="text-[#968470] hover:text-[#B3261E] p-1 transition-colors cursor-pointer"
                          title="Supprimer du panier"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="text-[11px] text-[#8C7654] block mt-0.5">
                        {cartItem.item.purity}
                      </span>

                      {cartItem.selectedSize && (
                        <span className="text-[11px] text-[#594736] font-medium block">
                          Taille : {cartItem.selectedSize}
                        </span>
                      )}

                      {cartItem.engravingText && (
                        <span className="text-[10px] text-[#966E26] italic block">
                          Gravure : "{cartItem.engravingText}"
                        </span>
                      )}
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#DCD0BE] rounded-lg bg-white">
                        <button
                          id={`qty-minus-${index}`}
                          onClick={() => onUpdateQuantity(index, cartItem.quantity - 1)}
                          className="p-1 text-[#5E4D3B] hover:text-black transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#231A11]">
                          {cartItem.quantity}
                        </span>
                        <button
                          id={`qty-plus-${index}`}
                          onClick={() => onUpdateQuantity(index, cartItem.quantity + 1)}
                          className="p-1 text-[#5E4D3B] hover:text-black transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-serif text-sm font-bold text-[#1F1811]">
                        {formatFCFA(cartItem.item.price * cartItem.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#EDE3D4] bg-[#FAF8F5] space-y-3">
              <div className="space-y-1.5 text-xs text-[#6B5945]">
                <div className="flex justify-between">
                  <span>Sous-total articles :</span>
                  <span className="font-semibold text-[#241B12]">{formatFCFA(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de livraison (Cameroun) :</span>
                  <span className={`font-semibold ${isFreeDelivery ? 'text-emerald-700' : 'text-[#241B12]'}`}>
                    {isFreeDelivery ? 'Gratuit (Douala/Ydé)' : formatFCFA(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#EBE1D1] text-sm font-bold text-[#1E1710]">
                  <span>Total à régler :</span>
                  <span className="font-serif text-lg text-[#1E1710]">{formatFCFA(total)}</span>
                </div>
              </div>

              {/* Checkout Button with Mobile Money branding */}
              <button
                id="cart-checkout-btn"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 bg-[#1C160F] hover:bg-[#2C2216] text-[#FAF4EA] hover:text-[#D4A037] font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Smartphone className="w-4 h-4 text-[#D4A037]" />
                <span>Payer par MoMo / OM ({formatFCFA(total)})</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[10px] text-center text-[#8C7A67] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Transactions cryptées et confirmées via USSD sécurisé</span>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
