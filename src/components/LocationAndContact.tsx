import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  Navigation, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Truck,
  Car
} from 'lucide-react';
import { RESTAURANT_INFO, DELIVERY_ZONES } from '../data/restaurantData';

export const LocationAndContact: React.FC = () => {
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);

  const handleCopyPlusCode = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.plusCode);
    setCopiedPlusCode(true);
    setTimeout(() => setCopiedPlusCode(false), 2000);
  };

  return (
    <section id="location" className="py-16 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-semibold border border-rose-200">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            <span>Faisalabad Prime Location</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
            Visit Us or Order Fast Delivery
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Conveniently situated on Naqvi Road near Faisal Gardens with easy parking, modern elevator, and express delivery fleet across all sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact & Information Cards */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Address Card */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-amber-100 text-amber-900 shrink-0">
                  <MapPin className="w-6 h-6 text-amber-800" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                    Restaurant Address
                  </span>
                  <h3 className="font-bold text-base text-stone-900 leading-snug">
                    {RESTAURANT_INFO.address}
                  </h3>
                  <p className="font-urdu text-amber-800 text-sm">
                    نقوی روڈ، نزد فیصل گارڈنز، فیصل گارڈنز، فیصل آباد
                  </p>
                </div>
              </div>

              {/* Plus Code Badge */}
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block">Google Plus Code</span>
                  <strong className="font-mono text-stone-800">{RESTAURANT_INFO.plusCode}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyPlusCode}
                    className="p-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 font-medium flex items-center gap-1 text-[11px]"
                    title="Copy Plus Code"
                  >
                    {copiedPlusCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPlusCode ? 'Copied' : 'Copy'}</span>
                  </button>
                  <a
                    href={RESTAURANT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-stone-900 text-white hover:bg-stone-800 flex items-center gap-1 text-[11px] font-semibold"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Phone & WhatsApp Hotline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-amber-500 hover:shadow-md transition-all group flex items-center gap-3.5"
              >
                <div className="p-3 rounded-xl bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                    Direct Phone Hotline
                  </span>
                  <div className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-amber-800 transition-colors">
                    {RESTAURANT_INFO.phone}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium">Click to Call Now</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.rawPhone}?text=${encodeURIComponent('Assalam-o-Alaikum Paradise Restaurant, I would like to place an order or book a table.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all group flex items-center gap-3.5"
              >
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                    WhatsApp Orders
                  </span>
                  <div className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-emerald-700 transition-colors">
                    {RESTAURANT_INFO.phone}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium">Instant Chat & Menu</span>
                </div>
              </a>
            </div>

            {/* Timings & Amenities */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                <div className="flex items-center gap-2 text-stone-700 font-semibold">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>Dine-In Opening Hours:</span>
                </div>
                <strong className="text-stone-900">{RESTAURANT_INFO.openingHours}</strong>
              </div>

              <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                <div className="flex items-center gap-2 text-stone-700 font-semibold">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  <span>Food Delivery Hours:</span>
                </div>
                <strong className="text-stone-900">{RESTAURANT_INFO.deliveryHours}</strong>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-700 font-semibold">
                  <Car className="w-4 h-4 text-blue-700" />
                  <span>Parking & Facilities:</span>
                </div>
                <span className="text-stone-600">Free Valet, Glass Elevator, Wheelchair Access</span>
              </div>
            </div>

          </div>

          {/* Right: Interactive Styled Map & Coverage Zones */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Map Visualizer */}
            <div className="bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-xl relative">
              <div className="h-72 w-full relative bg-[#1a202c] overflow-hidden">
                
                {/* Styled Map Background */}
                <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="locgrid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#4a5568" strokeWidth="0.6"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#locgrid)" />
                  {/* Faisalabad arterial roads */}
                  <path d="M 0 140 Q 250 120 600 150" stroke="#718096" strokeWidth="4" fill="none" />
                  <path d="M 280 0 L 310 300" stroke="#718096" strokeWidth="3" fill="none" />
                  <path d="M 120 0 L 150 300" stroke="#718096" strokeWidth="2" fill="none" />
                  <path d="M 460 0 L 430 300" stroke="#718096" strokeWidth="2" fill="none" />
                  {/* Delivery Radius Circle */}
                  <circle cx="280" cy="140" r="110" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />
                </svg>

                {/* Paradise Restaurant Pin */}
                <div className="absolute left-[280px] top-[140px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative">
                    <span className="absolute -inset-1 rounded-full bg-amber-400 opacity-75 animate-ping"></span>
                    <div className="w-11 h-11 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-sm shadow-xl ring-4 ring-amber-500/40 relative z-10">
                      <MapPin className="w-6 h-6 fill-stone-950" />
                    </div>
                  </div>
                  <div className="mt-2 px-3 py-1 rounded-lg bg-stone-950/95 text-amber-300 text-xs font-bold border border-amber-500/50 shadow-xl whitespace-nowrap">
                    Paradise Restaurant
                  </div>
                  <span className="text-[10px] text-stone-300 font-medium">Naqvi Rd, Faisal Gardens</span>
                </div>

                {/* Surrounding Landmark Labels */}
                <div className="absolute left-8 top-8 px-2 py-1 rounded bg-stone-900/80 text-stone-300 text-[10px] border border-stone-700">
                  Faisal Gardens Main Gate
                </div>
                <div className="absolute right-8 top-12 px-2 py-1 rounded bg-stone-900/80 text-stone-300 text-[10px] border border-stone-700">
                  Canal Road Expressway
                </div>
                <div className="absolute left-12 bottom-8 px-2 py-1 rounded bg-stone-900/80 text-stone-300 text-[10px] border border-stone-700">
                  Peoples Colony
                </div>
                <div className="absolute right-12 bottom-10 px-2 py-1 rounded bg-stone-900/80 text-stone-300 text-[10px] border border-stone-700">
                  Kohinoor City
                </div>

                {/* Bottom Card Navigation Action */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-stone-900/90 backdrop-blur-md p-2.5 rounded-xl border border-stone-700 text-xs text-white">
                  <span>Fast Delivery Radius: <strong>8 km Coverage</strong></span>
                  <a
                    href={RESTAURANT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold"
                  >
                    <span>Get Directions</span>
                    <Navigation className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>

            {/* Delivery Coverage List */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-700" />
                Delivery Zones Covered in Faisalabad:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                {DELIVERY_ZONES.map((zone, i) => (
                  <div key={i} className="p-2 rounded-lg bg-stone-50 border border-stone-100 text-stone-700">
                    <strong className="block text-stone-900 truncate">{zone.name.split('&')[0]}</strong>
                    <span className="text-stone-500">{zone.estimatedMinutes}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
