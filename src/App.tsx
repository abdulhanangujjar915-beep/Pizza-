import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { AmbianceGallery } from './components/AmbianceGallery';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationAndContact } from './components/LocationAndContact';
import { Footer } from './components/Footer';
import { TableBookingModal } from './components/TableBookingModal';
import { CartAndCheckoutModal } from './components/CartAndCheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { CartItem, MenuItem, OrderStatus, OrderTrackingInfo, TableReservation } from './types';
import { RESTAURANT_INFO } from './data/restaurantData';
import { MessageCircle, Truck, ShoppingBag, X } from 'lucide-react';

export default function App() {
  // Cart state with persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('paradise_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  // Active Order state with persistence
  const [activeOrder, setActiveOrder] = useState<OrderTrackingInfo | null>(() => {
    const saved = localStorage.getItem('paradise_active_order');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });

  // Modal visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('paradise_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync active order to localStorage
  useEffect(() => {
    if (activeOrder) {
      localStorage.setItem('paradise_active_order', JSON.stringify(activeOrder));
    } else {
      localStorage.removeItem('paradise_active_order');
    }
  }, [activeOrder]);

  const handleAddToCart = (item: MenuItem, spice: 'mild' | 'medium' | 'hot' = 'medium', notes?: string) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (ci) => ci.item.id === item.id && ci.selectedSpice === spice
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, { item, quantity: 1, selectedSpice: spice, specialInstructions: notes }];
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    setCart((prev) => {
      const updated = [...prev];
      if (newQty <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index].quantity = newQty;
      }
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOrderPlaced = (order: OrderTrackingInfo) => {
    setActiveOrder(order);
    setCart([]); // Clear cart upon successful order
    setIsTrackingOpen(true); // Open live tracker immediately!
  };

  const handleSaveReservation = (res: TableReservation) => {
    const existing = JSON.parse(localStorage.getItem('paradise_reservations') || '[]');
    localStorage.setItem('paradise_reservations', JSON.stringify([res, ...existing]));
  };

  const handleUpdateOrderStatus = (newStatus: OrderStatus) => {
    if (activeOrder) {
      setActiveOrder({
        ...activeOrder,
        status: newStatus,
      });
    }
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 flex flex-col selection:bg-amber-500 selection:text-white">
      {/* Top Header Navbar */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        activeOrder={activeOrder}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        <Hero
          onOpenBooking={() => setIsBookingOpen(true)}
          onScrollToMenu={scrollToMenu}
        />

        <MenuSection
          onAddToCart={handleAddToCart}
        />

        <AmbianceGallery
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        <ReviewsSection />

        <LocationAndContact />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onScrollToMenu={scrollToMenu}
      />

      {/* Modals */}
      <TableBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSaveReservation={handleSaveReservation}
      />

      <CartAndCheckoutModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOrderPlaced={handleOrderPlaced}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        order={activeOrder}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* Persistent Floating Bottom Action Elements */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5">
        {/* Floating Active Order Pill */}
        {activeOrder && !isTrackingOpen && (
          <button
            onClick={() => setIsTrackingOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-stone-900 text-white shadow-xl border border-emerald-500/50 hover:bg-stone-800 transition-all animate-bounce text-xs font-semibold"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Order #{activeOrder.orderId} Active</span>
            <span className="text-[10px] text-amber-300 font-mono">Track →</span>
          </button>
        )}

        {/* Floating WhatsApp Hotline Button */}
        <a
          href={`https://wa.me/${RESTAURANT_INFO.rawPhone}?text=${encodeURIComponent('Assalam-o-Alaikum Paradise Restaurant, I have an inquiry.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl transition-all font-semibold text-xs group"
          title="Direct WhatsApp Support"
        >
          <MessageCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">WhatsApp Order</span>
        </a>
      </div>

    </div>
  );
}
