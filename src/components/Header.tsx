import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ShoppingBag, 
  Calendar, 
  Truck, 
  Star, 
  Menu as MenuIcon, 
  X,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { CartItem, OrderTrackingInfo } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenBooking: () => void;
  onOpenTracking: () => void;
  activeOrder: OrderTrackingInfo | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cart,
  onOpenCart,
  onOpenBooking,
  onOpenTracking,
  activeOrder,
  activeTab,
  setActiveTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { id: 'menu', label: 'Menu Card', urdu: 'مینو کارڈ' },
    { id: 'ambiance', label: 'Ambiance & Live Kitchen', urdu: 'ماحول' },
    { id: 'reviews', label: 'Reviews & Trust', urdu: 'کسٹمر ریویوز' },
    { id: 'location', label: 'Location & Timing', urdu: 'لوکیشن' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs transition-all">
      {/* Top Announcement & Hot-contact Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Kitchen Open
            </span>
            <span className="text-stone-500">•</span>
            <span className="inline-flex items-center gap-1 text-stone-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              12:00 PM – 01:30 AM Daily
            </span>
            <span className="text-stone-500 hidden md:inline">•</span>
            <span className="hidden md:inline-flex items-center gap-1 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              Naqvi Rd, near Faisal Gardens, Faisalabad
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <a 
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold tracking-wide transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
            <span className="text-stone-600">|</span>
            <a 
              href={`https://wa.me/${RESTAURANT_INFO.rawPhone}?text=${encodeURIComponent('Hello Paradise Restaurant, I want to inquire about menu and delivery.')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Order</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Urdu Signage */}
          <div 
            onClick={() => handleNavClick('menu')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-stone-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="font-serif-luxury font-bold text-xl tracking-wider text-amber-200">P</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-luxury text-lg sm:text-xl font-bold tracking-tight text-stone-900 leading-tight">
                  PARADISE
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold border border-amber-200/80">
                  RESTAURANT
                </span>
              </div>
              <p className="text-xs text-stone-600 flex items-center gap-1.5">
                <span className="font-urdu text-amber-800 font-semibold text-sm">پیراڈائز ریسٹورنٹ</span>
                <span className="text-stone-300">•</span>
                <span className="text-[11px] text-stone-500 font-medium">Faisal Gardens, Faisalabad</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors relative py-1 hover:text-amber-800 ${
                  activeTab === item.id ? 'text-amber-900 font-semibold' : 'text-stone-600'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700 rounded-full"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Order Tracker Trigger */}
            <button
              onClick={onOpenTracking}
              className={`relative inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-all ${
                activeOrder 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 animate-pulse shadow-xs' 
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
              title="Track your food delivery"
            >
              <Truck className={`w-4 h-4 ${activeOrder ? 'text-emerald-600' : 'text-stone-600'}`} />
              <span className="hidden sm:inline">
                {activeOrder ? 'Track Order (Active)' : 'Track Order'}
              </span>
              {activeOrder && (
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              )}
            </button>

            {/* Table Booking Button */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 transition-colors shadow-xs"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Book Table</span>
              <span className="md:hidden">Book</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-transform active:scale-95"
              aria-label="View delivery bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              {totalCartCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] font-bold rounded-full bg-stone-900 text-amber-300">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-stone-200 pb-2 space-y-2 animate-in fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-900 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="font-urdu text-xs text-stone-400">{item.urdu}</span>
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="w-full py-2 px-3 text-center text-xs font-semibold rounded-lg bg-stone-100 text-stone-900 flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-amber-700" />
                Call Directly: {RESTAURANT_INFO.phone}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
