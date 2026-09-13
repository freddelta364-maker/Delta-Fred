import React, { useState } from 'react';
import { 
  Send, 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { CAMEROON_CITIES } from '../data/jewelryData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Douala');
  const [subject, setSubject] = useState('Conseil & Achat de bijou');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="contact-section" className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#E8DFC0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2E5CA] text-[#8C6418] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nos Showrooms & Service Client</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C160F] tracking-tight">
            Contactez la Maison CJA
          </h2>
          <div className="w-16 h-1 bg-[#D4A037] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-sm sm:text-base text-[#6E5D4B]">
            Une question sur un bijou, une taille de bague ou une création sur-mesure ? 
            Nos maîtres joailliers à Douala et Yaoundé sont à votre entière disposition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DCCF] shadow-sm">
            <h3 className="font-serif text-xl font-bold text-[#231A12] mb-1">
              Envoyez-nous un Message
            </h3>
            <p className="text-xs text-[#7A6956] mb-6">
              Nous répondons en moins de 30 minutes pendant les heures d'ouverture.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-emerald-950">
                  Message Transmis avec Succès !
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                  Merci cher(e) <strong>{name}</strong>. Un conseiller joaillier CJA va vous recontacter directement au 
                  <strong> +237 {phone}</strong> par WhatsApp ou appel.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-emerald-600 transition-colors"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#3B2F22] block mb-1">
                      Votre Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex : Paul-Henri Mbida"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#DCD0BE] rounded-xl text-[#261E16] focus:outline-none focus:ring-2 focus:ring-[#D4A037]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#3B2F22] block mb-1">
                      Numéro WhatsApp (+237) *
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
                        className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#DCD0BE] rounded-r-xl text-[#261E16] focus:outline-none focus:ring-2 focus:ring-[#D4A037]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#3B2F22] block mb-1">
                      Votre Ville au Cameroun
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#DCD0BE] rounded-xl text-[#261E16] focus:outline-none focus:ring-2 focus:ring-[#D4A037]"
                    >
                      {CAMEROON_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#3B2F22] block mb-1">
                      Objet de votre demande
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#DCD0BE] rounded-xl text-[#261E16] focus:outline-none focus:ring-2 focus:ring-[#D4A037]"
                    >
                      <option value="Conseil & Achat de bijou">Conseil & Achat de bijou</option>
                      <option value="Création sur-mesure (Alliance / Dot)">Création sur-mesure (Alliance / Dot)</option>
                      <option value="Aide au paiement MoMo / OM">Aide au paiement MoMo / OM</option>
                      <option value="Prise de rendez-vous en Showroom">Prise de rendez-vous en Showroom</option>
                      <option value="Suivi de livraison express">Suivi de livraison express</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#3B2F22] block mb-1">
                    Adresse Email (Optionnelle)
                  </label>
                  <input
                    type="email"
                    placeholder="votre.email@domaine.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#DCD0BE] rounded-xl text-[#261E16] focus:outline-none focus:ring-2 focus:ring-[#D4A037]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#3B2F22] block mb-1">
                    Votre Message détaillé *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Décrivez votre besoin, le bijou qui vous intéresse ou vos dimensions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#DCD0BE] rounded-xl text-[#261E16] focus:outline-none focus:ring-2 focus:ring-[#D4A037]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 bg-[#1F1912] hover:bg-[#32271C] text-[#FAF4EA] hover:text-[#D4A037] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#D4A037]" />
                    <span>Envoyer mon message</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Physical Showrooms & Direct WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp Callout */}
            <div className="bg-[#1C160F] text-[#FAF4EA] p-6 rounded-3xl border border-[#3E3122] shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-700/80 text-white flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-white">
                    Assistance WhatsApp Directe
                  </h4>
                  <span className="text-xs text-[#C9B7A0]">
                    Réponse immédiate de nos joailliers
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#C8B8A4] leading-relaxed">
                Vous préférez discuter en direct ou envoyer une photo de bijou ? 
                Cliquez pour démarrer une conversation WhatsApp instantanée avec notre chef d'atelier.
              </p>

              <a
                href="https://wa.me/237699001122?text=Bonjour%20CJA%20Bijouterie,%20je%20souhaite%20des%20informations%20sur%20vos%20bijoux"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>Discuter sur WhatsApp (+237 699 00 11 22)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Showrooms Addresses */}
            <div className="bg-white p-6 rounded-3xl border border-[#E6DCCF] shadow-sm space-y-5">
              <h4 className="font-serif text-base font-bold text-[#231A12] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4A037]" />
                <span>Nos Showrooms au Cameroun</span>
              </h4>

              {/* Douala */}
              <div className="border-l-2 border-[#D4A037] pl-3.5 space-y-1">
                <span className="text-xs font-bold text-[#1E1710] block">
                  Showroom Douala (Littoral)
                </span>
                <p className="text-xs text-[#6B5A47]">
                  Boulevard de la Liberté, Quartier Akwa (Face Hôtel Douala Bercy)
                </p>
                <p className="text-[11px] text-[#966E26] font-semibold">
                  Tél : +237 699 00 11 22 • 233 42 00 00
                </p>
              </div>

              {/* Yaoundé */}
              <div className="border-l-2 border-[#D4A037] pl-3.5 space-y-1">
                <span className="text-xs font-bold text-[#1E1710] block">
                  Showroom Yaoundé (Centre)
                </span>
                <p className="text-xs text-[#6B5A47]">
                  Avenue des Ambassades, Quartier Bastos (Près du laboratoire Bastos)
                </p>
                <p className="text-[11px] text-[#966E26] font-semibold">
                  Tél : +237 677 88 99 00 • 222 20 00 00
                </p>
              </div>

              {/* Hours */}
              <div className="pt-3 border-t border-[#EFE7DC] flex items-start gap-2 text-xs text-[#6E5C49]">
                <Clock className="w-4 h-4 text-[#8C7654] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#292016]">Horaires d'ouverture :</p>
                  <p>Du Lundi au Samedi : 09h00 - 19h30</p>
                  <p>Dimanche : Sur rendez-vous VIP uniquement</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
