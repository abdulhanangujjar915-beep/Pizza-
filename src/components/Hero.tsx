import React, { useState } from 'react';
import { 
  Sparkles, 
  Truck, 
  Calendar, 
  Phone, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Flame, 
  ChefHat,
  ArrowRight,
  MessageCircle,
  Clock
} from 'lucide-react';
import { RESTAURANT_INFO, DELIVERY_ZONES } from '../data/restaurantData';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onScrollToMenu }) => {
  const [selectedZoneIndex, setSelectedZoneIndex] = useState(0);
  const selectedZone = DELIVERY_ZONES[selectedZoneIndex];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white">
      {/* Decorative backdrop glow */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 rounded-full bg-amber-600/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Trust Badges, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Tag & Location */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Faisalabad's Premier Fine Dining & Live Kitchen</span>
              <span className="text-amber-500/50">•</span>
              <span className="font-urdu text-amber-200">فیصل آباد</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                PARADISE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
                  RESTAURANT
                </span>
              </h1>
              <p className="font-urdu text-xl sm:text-2xl text-amber-200/90 font-medium tracking-wide">
                پیراڈائز ریسٹورنٹ — لاجواب ذائقہ اور دلکش خاندانی ماحول
              </p>
            </div>

            {/* Sub-description with exact address */}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Experience grand culinary excellence on Naqvi Road, near Faisal Gardens, Faisalabad. 
              Featuring our celebrated <strong className="text-amber-300 font-semibold">Open Live Kitchen</strong>, 
              authentic Desi Karahi, live charcoal BBQ, sizzling Chinese & Continental platters, 
              paired with prompt hot delivery straight to your doorstep.
            </p>

            {/* Fast Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onScrollToMenu}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Truck className="w-5 h-5 text-stone-900" />
                <span>Order Food Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 font-semibold text-sm sm:text-base transition-all"
              >
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>Book Table Online</span>
              </button>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.rawPhone}?text=${encodeURIComponent('Assalam-o-Alaikum Paradise Restaurant, I want to place an order or book a table.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-800/60 hover:bg-emerald-700/80 text-emerald-200 border border-emerald-600/40 font-medium text-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">WhatsApp:</span>
                <span>{RESTAURANT_INFO.phone}</span>
              </a>
            </div>

            {/* Key Trust Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-800/80 text-xs">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">4.9 / 5.0</div>
                  <div className="text-stone-400 text-[11px]">1,480+ Happy Diners</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400">
                  <Flame className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Live Kitchen</div>
                  <div className="text-stone-400 text-[11px]">Charcoal & Wok Fresh</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400">
                  <Truck className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Live GPS Tracking</div>
                  <div className="text-stone-400 text-[11px]">Real-Time Rider Map</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">100% Halal</div>
                  <div className="text-stone-400 text-[11px]">Pure Ingredients</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Faisalabad Delivery Zone Checker & Visual Card */}
          <div className="lg:col-span-5">
            <div className="bg-stone-800/90 rounded-2xl border border-stone-700/80 p-5 sm:p-6 shadow-2xl backdrop-blur-md space-y-5">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-stone-700 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Local Food Delivery Checker</h3>
                    <p className="text-[11px] text-stone-400">Faisalabad Coverage Zones</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  FAST & FRESH
                </span>
              </div>

              {/* Area Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300 flex items-center justify-between">
                  <span>Select Your Area in Faisalabad:</span>
                  <span className="text-amber-400 text-[11px]">Dispatch from Naqvi Rd</span>
                </label>
                <select
                  value={selectedZoneIndex}
                  onChange={(e) => setSelectedZoneIndex(Number(e.target.value))}
                  className="w-full bg-stone-900 border border-stone-700 text-stone-200 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {DELIVERY_ZONES.map((zone, idx) => (
                    <option key={idx} value={idx}>
                      {zone.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Delivery Estimation Result Box */}
              <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-700/60 grid grid-cols-3 gap-2 text-center">
                <div className="border-r border-stone-800 pr-1">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Est. Time</span>
                  <span className="font-bold text-amber-300 text-xs sm:text-sm">{selectedZone.estimatedMinutes}</span>
                </div>
                <div className="border-r border-stone-800 px-1">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Delivery Fee</span>
                  <span className="font-bold text-emerald-400 text-xs sm:text-sm">
                    {selectedZone.deliveryFee === 0 ? 'FREE' : `Rs. ${selectedZone.deliveryFee}`}
                  </span>
                </div>
                <div className="pl-1">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Min Order</span>
                  <span className="font-bold text-stone-200 text-xs sm:text-sm">Rs. {selectedZone.minOrder}</span>
                </div>
              </div>

              {/* Live Kitchen & Real Ambiance Preview Note */}
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200/90 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-amber-300">
                  <ChefHat className="w-4 h-4 text-amber-400" />
                  <span>Real-time Live Order Tracking Included</span>
                </div>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  Every order includes dynamic real-time tracking from our live kitchen to your doorstep with rider contact and GPS progress map.
                </p>
              </div>

              {/* Location Badge */}
              <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span className="truncate max-w-[220px]">F56F+5R Faisalabad, Pakistan</span>
                </div>
                <a 
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline text-[11px]"
                >
                  View on Map →
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
