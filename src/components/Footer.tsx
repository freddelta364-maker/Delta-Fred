import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Smartphone, 
  Heart,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateToSection
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSuccess(true);
  };

  const socialLinks = [
    {
      name: 'WhatsApp Business',
      handle: '+237 699 00 11 22',
      href: 'https://wa.me/237699001122?text=Bonjour%20CJA%20Bijouterie',
      color: 'hover:text-emerald-400',
      badge: 'Assistance 24/7'
    },
    {
      name: 'Instagram',
      handle: '@cja_bijouterie_cm',
      href: 'https://instagram.com',
      color: 'hover:text-pink-400',
      badge: '48k Abonnés'
    },
    {
      name: 'Facebook',
      handle: 'CJA Joaillerie Cameroun',
      href: 'https://facebook.com',
      color: 'hover:text-blue-400',
      badge: 'Page Officielle'
    },
    {
      name: 'TikTok',
      handle: '@cja_bijoux_cameroun',
      href: 'https://tiktok.com',
      color: 'hover:text-[#D4A037]',
      badge: 'Vidéos & Ateliers'
    }
  ];

  return (
    <footer className="bg-[#14100C] text-[#D8C7B4] border-t border-[#2D2319] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Social Media Engagement Section */}
        <div className="bg-[#1F1812] border border-[#3E3122] rounded-3xl p-6 sm:p-8 mb-14 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-5 space-y-2 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4A037] flex items-center justify-center lg:justify-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Rejoignez la Communauté CJA</span>
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Suivez Nos Créations sur les Réseaux
              </h3>
              <p className="text-xs text-[#B5A490] leading-relaxed">
                Découvrez en avant-première les vidéos de fabrication en atelier, nos défilés de parures royales à Douala et Yaoundé, et les offres exclusives abonnés.
              </p>
            </div>

            {/* Social Cards Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {socialLinks.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`bg-[#281F16] hover:bg-[#34291D] border border-[#483827] rounded-2xl p-3.5 flex flex-col justify-between transition-all group cursor-pointer ${soc.color}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#E5C170] bg-[#3B2D1E] px-2 py-0.5 rounded-full">
                      {soc.badge}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#8C7654] group-hover:text-white transition-colors" />
                  </div>
                  <div className="mt-4">
                    <p className="font-bold text-xs text-white">{soc.name}</p>
                    <p className="text-[10px] text-[#A69581] truncate">{soc.handle}</p>
                  </div>
                </a>
              ))}
            </div>

          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-[#2B2117]">
          
          {/* Brand Presentation */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#272017] border border-[#D4A037] flex items-center justify-center font-serif font-bold text-[#D4A037] text-lg">
                CJA
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white block">CJA BIJOUTERIE</span>
                <span className="text-[10px] text-[#A69581] uppercase tracking-wider block">
                  Cameroun Joaillerie Artisanale
                </span>
              </div>
            </div>

            <p className="text-xs text-[#B8A692] leading-relaxed">
              Maison de haute joaillerie camerounaise dédiée à la valorisation de nos métaux précieux, 
              or 18 carats et argent massif 925. Créations d'alliances de mariage, parures de chefferies et bijoux contemporains.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[10px] font-bold text-[#D4A037] bg-[#2E2419] px-2.5 py-1 rounded-md border border-[#483724]">
                🇨🇲 Fait au Cameroun
              </span>
              <span className="text-[10px] font-bold text-[#D4A037] bg-[#2E2419] px-2.5 py-1 rounded-md border border-[#483724]">
                Poinçon d'État Garanti
              </span>
              <span className="text-[10px] font-bold text-[#D4A037] bg-[#2E2419] px-2.5 py-1 rounded-md border border-[#483724]">
                MTN MoMo & OM
              </span>
            </div>
          </div>

          {/* Quick Links & Categories */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Nos Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#B5A38E]">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('bagues');
                    onNavigateToSection('catalogue-section');
                  }}
                  className="hover:text-[#D4A037] transition-colors"
                >
                  Bagues & Alliances
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('colliers');
                    onNavigateToSection('catalogue-section');
                  }}
                  className="hover:text-[#D4A037] transition-colors"
                >
                  Colliers & Plastrons
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('bracelets');
                    onNavigateToSection('catalogue-section');
                  }}
                  className="hover:text-[#D4A037] transition-colors"
                >
                  Bracelets & Joncs
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('boucles');
                    onNavigateToSection('catalogue-section');
                  }}
                  className="hover:text-[#D4A037] transition-colors"
                >
                  Boucles d'oreilles
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('traditionnel');
                    onNavigateToSection('catalogue-section');
                  }}
                  className="hover:text-[#D4A037] transition-colors"
                >
                  Parures Royales & Cauris
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('montres');
                    onNavigateToSection('catalogue-section');
                  }}
                  className="hover:text-[#D4A037] transition-colors"
                >
                  Montres de Luxe
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Cameroon Delivery */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Service Client & Showrooms
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B5A38E]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4A037] flex-shrink-0 mt-0.5" />
                <span>Akwa, Douala & Bastos, Yaoundé</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4A037] flex-shrink-0" />
                <span>+237 699 00 11 22 / 677 88 99 00</span>
              </li>
              <li className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#D4A037] flex-shrink-0" />
                <span>Paiements MTN MoMo & Orange Money</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4A037] flex-shrink-0" />
                <span>Certificat d'authenticité inclus</span>
              </li>
            </ul>
          </div>

          {/* VIP Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Club Privilège CJA
            </h4>
            <p className="text-xs text-[#B5A38E] leading-relaxed">
              Recevez les invitations privées à nos expositions à Douala et Yaoundé ainsi que des remises exclusives.
            </p>

            {newsletterSuccess ? (
              <div className="p-3 bg-[#241E16] border border-emerald-600/50 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Bienvenue au Club Privilège CJA !</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Votre adresse email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full text-xs p-2.5 bg-[#231A12] border border-[#3E3122] rounded-xl text-white placeholder-[#857666] focus:outline-none focus:ring-1 focus:ring-[#D4A037]"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#D4A037] hover:bg-[#E5B854] text-[#14100C] text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  S'inscrire au Club Privilège
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7966]">
          <p>© 2026 CJA Bijouterie Cameroun (Cameroun Joaillerie Artisanale). Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigateToSection('faq-section')}
              className="hover:text-white transition-colors"
            >
              Conditions de Vente & Retours
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigateToSection('contact-section')}
              className="hover:text-white transition-colors"
            >
              Mentions Légales
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
