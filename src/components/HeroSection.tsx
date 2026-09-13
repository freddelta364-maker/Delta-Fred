import React from 'react';
import { Sparkles, ShieldCheck, Truck, Smartphone, ArrowRight, Award } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onFeaturedClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onFeaturedClick
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1C1712] via-[#241D17] to-[#16120E] text-[#F5EDE1] py-14 sm:py-20 lg:py-24 border-b border-[#3A2F22]">
      {/* Decorative Golden Ambient Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4A037]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#B5812B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-[#32271C] border border-[#D4A037]/40 text-[#E5C170] text-xs font-semibold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C170]" />
              <span>Haute Joaillerie & Orfèvrerie d'Exception au Cameroun</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              L’Éclat Précieux de Nos Terres, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7E1B5] via-[#D4A037] to-[#E8B854]">
                Façonné Pour l’Éternité.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#C8B8A2] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Découvrez la collection <strong>CJA</strong> : parures royales de chefferies, alliances en or 18k, 
              argent massif 925 et créations modernes. Commandez en ligne en toute quiétude avec 
              <strong> MTN Mobile Money</strong> et <strong>Orange Money</strong>, avec livraison express à 
              <strong> Douala, Yaoundé</strong> et partout au Cameroun.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-catalogue-btn"
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D4A037] via-[#DFB864] to-[#B88127] text-[#19140D] font-bold text-sm sm:text-base hover:brightness-110 shadow-lg shadow-[#D4A037]/20 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Explorer le Catalogue</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-vedettes-btn"
                onClick={onFeaturedClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#2A221A] hover:bg-[#382E23] text-[#EFE4D2] font-semibold text-sm sm:text-base border border-[#524130] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D4A037]" />
                <span>Nos 3 Bijoux en Vedette</span>
              </button>
            </div>

            {/* Local Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#34291E]">
              <div className="flex items-center gap-2.5 text-left">
                <div className="p-2 rounded-lg bg-[#2E2419] border border-[#4D3C2A] text-[#D4A037]">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#E8DDD0]">Paiement MoMo & OM</p>
                  <p className="text-[11px] text-[#A6947D]">Push instantané *126# / #150#</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-left">
                <div className="p-2 rounded-lg bg-[#2E2419] border border-[#4D3C2A] text-[#D4A037]">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#E8DDD0]">Livraison 24h</p>
                  <p className="text-[11px] text-[#A6947D]">Douala & Yaoundé</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-left">
                <div className="p-2 rounded-lg bg-[#2E2419] border border-[#4D3C2A] text-[#D4A037]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#E8DDD0]">Or 18K Certifié</p>
                  <p className="text-[11px] text-[#A6947D]">Poinçon d'État & Certificat</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-left">
                <div className="p-2 rounded-lg bg-[#2E2419] border border-[#4D3C2A] text-[#D4A037]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#E8DDD0]">Garantie & Écrin</p>
                  <p className="text-[11px] text-[#A6947D]">Offerts à chaque commande</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4A037]/30 shadow-2xl shadow-black/60 bg-[#16120E] group">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80"
                alt="Bijoux d'exception CJA Cameroun"
                className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700 brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120E0A] via-transparent to-transparent opacity-90" />
              
              {/* Floating Pill on image */}
              <div className="absolute top-4 left-4 bg-[#1F1811]/90 backdrop-blur-md border border-[#D4A037]/50 rounded-full py-1.5 px-3.5 flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[11px] font-semibold text-[#EAD8B8] tracking-wide">
                  Atelier CJA Ouvert • Douala & Yaoundé
                </span>
              </div>

              {/* Floating Bottom Card Banner */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#1E1711]/95 backdrop-blur-md border border-[#52412E] p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#D4A037] uppercase font-bold tracking-wider">
                      Collection Maîtres Orfèvres 2026
                    </span>
                    <h3 className="font-serif text-base font-bold text-white">
                      Parure Royale Bamiléké & Sawa
                    </h3>
                    <p className="text-xs text-[#C2B29E]">Or Jaune 18K et Cauris d'Apparat</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#A18F7B] line-through block">320 000 F</span>
                    <span className="text-sm font-bold text-[#E5C170] block">285 000 FCFA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
