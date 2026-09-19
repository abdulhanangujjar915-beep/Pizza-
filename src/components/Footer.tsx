import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  ShieldCheck, 
  Heart, 
  Truck,
  Calendar,
  Sparkles
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenTracking: () => void;
  onScrollToMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenTracking,
  onScrollToMenu,
}) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand & Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-lg">
                <span className="font-serif-luxury font-bold text-2xl text-stone-950">P</span>
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-white tracking-wider">
                  PARADISE RESTAURANT
                </h3>
                <p className="font-urdu text-amber-400 text-sm font-semibold">
                  پیراڈائز ریسٹورنٹ فیصل آباد
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-md">
              Faisalabad's celebrated destination for open live kitchen dining, authentic Desi Karahi, succulent charcoal BBQ, and artisanal Chinese & Continental platters. Fast and temperature-insulated delivery straight to your home.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-300 text-xs font-semibold border border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                100% Halal Verified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 text-amber-300 text-xs font-semibold border border-amber-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Live Cooking Transparency
              </span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={onScrollToMenu} className="hover:text-amber-400 transition-colors">
                  Menu Card & Prices
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-amber-400 transition-colors">
                  Online Table Booking
                </button>
              </li>
              <li>
                <button onClick={onOpenTracking} className="hover:text-amber-400 transition-colors">
                  Real-time Delivery Tracker
                </button>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">
                  Customer Trust & Reviews
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">
                  Location & Timing
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Delivery Areas */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Delivery Coverage
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>• Faisal Gardens (Free Delivery)</li>
              <li>• Naqvi Road & Canal Road</li>
              <li>• Peoples Colony 1 & 2</li>
              <li>• Kohinoor City & Jaranwala Rd</li>
              <li>• D-Ground & Batala Colony</li>
              <li>• Madina Town & Susan Rd</li>
            </ul>
          </div>

          {/* Col 5: Direct Hotline & Address */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Get in Touch
            </h4>
            <div className="space-y-2.5 text-xs">
              <a 
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>{RESTAURANT_INFO.phone}</span>
              </a>

              <a 
                href={`https://wa.me/${RESTAURANT_INFO.rawPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>WhatsApp Instant Order</span>
              </a>

              <div className="flex items-start gap-2 text-stone-400 pt-1">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2 text-stone-400">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>12:00 PM – 01:30 AM Daily</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Paradise Restaurant Faisalabad. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-stone-400">
              Plus Code: {RESTAURANT_INFO.plusCode}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
