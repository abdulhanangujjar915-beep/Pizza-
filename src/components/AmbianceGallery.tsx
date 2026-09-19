import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Eye, 
  Users, 
  ShieldCheck, 
  Camera,
  Calendar,
  ChefHat
} from 'lucide-react';
import { AMBIANCE_HIGHLIGHTS } from '../data/restaurantData';

interface AmbianceGalleryProps {
  onOpenBooking: () => void;
}

export const AmbianceGallery: React.FC<AmbianceGalleryProps> = ({ onOpenBooking }) => {
  const galleryItems = [
    {
      title: "Live Open Kitchen & Grill",
      urdu: "اوپن لائیو کچن",
      subtitle: "Outdoor theater with uniformed master chefs",
      desc: "Watch fresh BBQ coals spark, flames rise in high-heat Chinese woks, and hot tandoori breads puff up right before your eyes.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      badge: "Pure Transparency"
    },
    {
      title: "Grand Wave-Lit Dining Hall",
      urdu: "گرینڈ فیملی ڈائننگ ہال",
      subtitle: "Aesthetic undulating light ceiling & olive velvet chairs",
      desc: "Architecturally curated for an unforgettable dining ambiance with generous table spacing and warm, glare-free ambient lighting.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      badge: "Signature Interior"
    },
    {
      title: "Plush Private Family Booths",
      urdu: "پرائیویٹ فیملی کیبنز",
      subtitle: "Tufted orange leather booth alcoves",
      desc: "Exclusive, cozy seating thoughtfully designed for family comfort, privacy, corporate dinners, and special celebration banquets.",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
      badge: "Family Privacy"
    },
    {
      title: "Illuminated Facade & Glass Elevator",
      urdu: "ماڈرن گلاس ایلیویٹر اور عمارت",
      subtitle: "Night-lit stone architecture on Naqvi Road",
      desc: "Featuring dramatic exterior glass observation lift, tree illuminations, and glowing Urdu neon sign 'پیراڈائز' greeting every guest.",
      image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
      badge: "Faisalabad Landmark"
    }
  ];

  return (
    <section id="ambiance" className="py-16 bg-stone-900 text-white relative overflow-hidden">
      {/* Subtle ambient lighting effects */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>Atmosphere & Culinary Theater</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            Where Modern Architecture Meets Open Live Cooking
          </h2>
          <p className="text-sm sm:text-base text-stone-300">
            Step into our luminous dining halls or pull up a seat near the Live Kitchen counter. Crafted specifically for family gatherings and celebrations in Faisalabad.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {galleryItems.map((item, index) => (
            <div 
              key={index}
              className="group relative rounded-3xl overflow-hidden bg-stone-800 border border-stone-700/80 shadow-xl transition-all duration-300 hover:border-amber-500/50 flex flex-col justify-end min-h-[360px] sm:min-h-[400px]"
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent"></div>

              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center gap-1.5 shadow">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {item.badge}
                </span>
              </div>

              {/* Card Bottom Details */}
              <div className="relative p-6 sm:p-7 space-y-2 text-white">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <span className="font-urdu text-amber-300 text-base font-semibold shrink-0">
                    {item.urdu}
                  </span>
                </div>
                <p className="text-xs text-amber-200/90 font-medium">
                  {item.subtitle}
                </p>
                <p className="text-xs text-stone-300 leading-relaxed pt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Live Kitchen Guarantee Banner */}
        <div className="bg-gradient-to-r from-amber-600/20 via-stone-800 to-emerald-950/40 p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 shadow-lg">
              <ChefHat className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
                <span>Planning a Family Dinner or Birthday?</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  Zero Advance Fee
                </span>
              </h4>
              <p className="text-xs text-stone-300 max-w-xl">
                Reserve your preferred table zone today. Enjoy valet parking, child high-chair assistance, and complimentary birthday table arrangements.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve Table Online</span>
          </button>
        </div>

      </div>
    </section>
  );
};
