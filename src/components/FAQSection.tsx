import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, Smartphone, ShieldCheck, Truck } from 'lucide-react';
import { FAQ_ITEMS } from '../data/jewelryData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-16 sm:py-20 bg-white border-t border-[#E8DFC0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF2E1] text-[#966E26] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Questions Fréquentes • Cameroun</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C160F] tracking-tight">
            Foire Aux Questions (FAQ)
          </h2>
          <div className="w-16 h-1 bg-[#D4A037] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-xs sm:text-sm text-[#6E5D4B]">
            Tout ce que vous devez savoir sur nos bijoux précieux, nos paiements sécurisés MTN MoMo & Orange Money, 
            et la livraison à travers les 10 régions du Cameroun.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                id={`faq-item-${index}`}
                className="rounded-2xl border border-[#E8DFD0] overflow-hidden transition-all bg-[#FAF8F5]"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#241B12] hover:text-[#966E26] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#F2E5CE] text-[#966E26] text-xs flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8C7654] transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-[#966E26]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C4B39] leading-relaxed border-t border-[#EFE5D7] bg-white animate-in fade-in duration-150">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help Banner at bottom of FAQ */}
        <div className="mt-10 p-5 rounded-2xl bg-[#FAF5EB] border border-[#E8DDCB] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#272118] text-[#D4A037] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#231A11]">Vous avez une autre question spécifique ?</h4>
              <p className="text-xs text-[#7A6956]">Notre service client est disponible 7j/7 sur WhatsApp.</p>
            </div>
          </div>

          <a
            href="https://wa.me/237699001122"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-[#1F1912] hover:bg-[#32271C] text-[#E5C170] text-xs font-bold rounded-xl shadow-xs transition-colors flex-shrink-0"
          >
            Poser ma question sur WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
