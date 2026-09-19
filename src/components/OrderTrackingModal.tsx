import React, { useState, useEffect } from 'react';
import { 
  X, 
  Truck, 
  Clock, 
  Phone, 
  MessageCircle, 
  MapPin, 
  CheckCircle2, 
  Flame, 
  ChefHat, 
  PackageCheck, 
  Navigation,
  RefreshCw,
  Printer,
  ShieldCheck,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { OrderStatus, OrderTrackingInfo } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderTrackingInfo | null;
  onUpdateOrderStatus: (status: OrderStatus) => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  order,
  onUpdateOrderStatus,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  // Sync active step with order status
  useEffect(() => {
    if (!order) return;
    const statusMap: Record<OrderStatus, number> = {
      confirmed: 0,
      preparing: 1,
      on_the_way: 2,
      delivered: 3,
      cancelled: -1
    };
    setActiveStepIndex(statusMap[order.status] ?? 0);
  }, [order?.status]);

  if (!isOpen) return null;

  if (!order) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-stone-200">
          <Truck className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="font-bold text-stone-800 text-lg">No Active Order Found</h3>
          <p className="text-xs text-stone-500">
            You don't have any active food deliveries at the moment. Explore our menu card and place an order to experience real-time tracking.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-600 text-white font-semibold text-xs"
          >
            Go to Menu Card
          </button>
        </div>
      </div>
    );
  }

  const stages = [
    {
      title: 'Order Confirmed',
      urdu: 'آرڈر کنفرم ہو گیا',
      desc: 'Received by Paradise front desk & sent to kitchen.',
      icon: CheckCircle2,
      time: order.placedAt
    },
    {
      title: 'Live Kitchen Preparing',
      urdu: 'کچن میں تیار ہو رہا ہے',
      desc: 'Chefs are grilling fresh BBQ and wok-tossing your dishes.',
      icon: Flame,
      time: 'In Progress'
    },
    {
      title: 'Out for Delivery',
      urdu: 'رائیڈر روانہ ہو چکا ہے',
      desc: 'Dispatched via thermal insulated container.',
      icon: Truck,
      time: order.estimatedDeliveryTime
    },
    {
      title: 'Delivered',
      urdu: 'آرڈر پہنچ چکا ہے',
      desc: 'Handed over at your doorstep. Enjoy your meal!',
      icon: PackageCheck,
      time: 'Completed'
    }
  ];

  const handleNextStage = () => {
    const sequence: OrderStatus[] = ['confirmed', 'preparing', 'on_the_way', 'delivered'];
    const nextIdx = (activeStepIndex + 1) % sequence.length;
    onUpdateOrderStatus(sequence[nextIdx]);
  };

  const getRiderProgressPercent = () => {
    if (activeStepIndex === 0) return 10;
    if (activeStepIndex === 1) return 35;
    if (activeStepIndex === 2) return 75;
    return 100;
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 my-6 max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Truck className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-luxury font-bold text-base sm:text-lg text-white">
                  Live Order Tracker
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                  REAL-TIME GPS
                </span>
              </div>
              <p className="text-xs text-stone-300">
                Order <strong className="text-amber-300 font-mono">{order.orderId}</strong> • Placed at {order.placedAt}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Estimated Arrival Banner */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-4 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block">
                Estimated Doorstep Arrival
              </span>
              <div className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2 justify-center sm:justify-start">
                <Clock className="w-5 h-5 text-amber-600" />
                <span>{order.estimatedDeliveryTime}</span>
                <span className="text-xs font-normal text-stone-500">
                  ({activeStepIndex === 3 ? 'Delivered' : 'approx 20-30 mins'})
                </span>
              </div>
              <p className="text-xs text-stone-600">
                Delivering to: <strong className="text-stone-800">{order.area}</strong>
              </p>
            </div>

            {/* Quick Demo Simulator button */}
            <div className="text-center sm:text-right">
              <button
                onClick={handleNextStage}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-semibold shadow-xs transition-transform active:scale-95"
                title="Advance simulation stage"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Simulate Next Step ({activeStepIndex + 1}/4)</span>
              </button>
              <span className="block text-[10px] text-stone-400 mt-1">
                Click to test all delivery stages
              </span>
            </div>
          </div>

          {/* Interactive Stepper Progress */}
          <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative z-10">
              {stages.map((stage, idx) => {
                const IconComponent = stage.icon;
                const isCompleted = idx <= activeStepIndex;
                const isCurrent = idx === activeStepIndex;

                return (
                  <div 
                    key={idx}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isCurrent
                        ? 'bg-amber-50 border-amber-600 ring-2 ring-amber-600/20 shadow-xs'
                        : isCompleted
                        ? 'bg-emerald-50/60 border-emerald-400 text-stone-800'
                        : 'bg-stone-50 border-stone-200 text-stone-400'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center mb-2 ${
                      isCurrent
                        ? 'bg-amber-600 text-white animate-bounce'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-200 text-stone-400'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h5 className={`font-bold text-xs ${isCurrent ? 'text-amber-950' : 'text-stone-800'}`}>
                      {stage.title}
                    </h5>
                    <p className="font-urdu text-[11px] text-amber-800 mt-0.5">{stage.urdu}</p>
                    <span className="text-[10px] text-stone-500 block mt-1">{stage.time}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Delivery Map Visualizer (Simulated Faisalabad Route) */}
          <div className="bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 shadow-lg relative">
            
            {/* Map Canvas Visual (Vector representation of Faisalabad) */}
            <div className="h-56 sm:h-64 w-full relative bg-[#1c2128] overflow-hidden">
              
              {/* Map grid streets */}
              <svg className="w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#475569" strokeWidth="0.8"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Major roads */}
                <path d="M 10 120 Q 200 80 400 130 T 700 140" fill="none" stroke="#64748b" strokeWidth="4" />
                <path d="M 180 10 L 250 250" fill="none" stroke="#64748b" strokeWidth="3" />
                <path d="M 450 10 L 390 250" fill="none" stroke="#64748b" strokeWidth="3" />
                <circle cx="300" cy="110" r="16" fill="#1e293b" stroke="#334155" />
              </svg>

              {/* Delivery Path from Paradise Restaurant to Customer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 60 170 Q 220 110 520 80"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="4"
                  strokeDasharray="6,6"
                  className="animate-pulse"
                />
              </svg>

              {/* Origin Marker: Paradise Restaurant */}
              <div className="absolute left-6 top-[150px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs shadow-lg ring-4 ring-amber-500/30">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div className="mt-1 px-2 py-0.5 rounded-md bg-stone-950/90 text-amber-300 text-[10px] font-bold border border-amber-500/40 whitespace-nowrap shadow-md">
                  Paradise Restaurant
                </div>
                <span className="text-[9px] text-stone-400">Naqvi Rd, Faisal Gardens</span>
              </div>

              {/* Dynamic Rider Marker (Moves along path based on progress percent) */}
              <div 
                className="absolute transition-all duration-700 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20"
                style={{
                  left: `${15 + (getRiderProgressPercent() * 0.7)}%`,
                  top: `${160 - (getRiderProgressPercent() * 0.85)}px`
                }}
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg ring-4 ring-emerald-500/40 animate-pulse">
                  <Navigation className="w-5 h-5 transform rotate-45" />
                </div>
                <div className="mt-1 px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 text-[10px] font-bold border border-emerald-500/50 whitespace-nowrap shadow">
                  {order.riderName} ({getRiderProgressPercent()}%)
                </div>
              </div>

              {/* Destination Marker: Customer Address */}
              <div className="absolute right-8 top-[60px] translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg ring-4 ring-rose-500/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="mt-1 px-2 py-0.5 rounded-md bg-stone-950/90 text-rose-300 text-[10px] font-bold border border-rose-500/40 whitespace-nowrap shadow-md">
                  {order.customerName}
                </div>
                <span className="text-[9px] text-stone-400">{order.area}</span>
              </div>

              {/* Live Overlay HUD Status */}
              <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-stone-700 text-xs text-stone-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Active Route: <strong>Naqvi Rd → {order.area}</strong></span>
              </div>
            </div>

            {/* Rider Contact Card */}
            <div className="p-3.5 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center font-bold text-amber-400 shrink-0">
                  MT
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-sm text-white">{order.riderName}</h5>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-900/60 text-emerald-300 font-semibold border border-emerald-700/50">
                      Paradise Fleet
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    Vehicle: {order.riderVehicle} • Thermal Bag Sealed
                  </p>
                </div>
              </div>

              {/* Call Rider Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <a
                  href={`tel:${order.riderPhone}`}
                  className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call Rider</span>
                </a>
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.rawPhone}?text=${encodeURIComponent(`Assalam-o-Alaikum, checking status for Order ID: ${order.orderId}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Support</span>
                </a>
              </div>
            </div>

          </div>

          {/* Order Summary & Digital Receipt */}
          <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <h5 className="font-bold text-xs uppercase tracking-wider text-stone-700">
                Order Receipt & Item Details
              </h5>
              <button
                onClick={handlePrintReceipt}
                className="text-xs text-stone-600 hover:text-amber-800 flex items-center gap-1 font-semibold"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
            </div>

            <div className="divide-y divide-stone-100 text-xs">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2 flex justify-between items-center">
                  <span className="text-stone-800 font-medium">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-bold text-stone-900">
                    Rs. {item.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 pt-3 space-y-1 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-bold text-stone-900 uppercase">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Status:</span>
                <span className="font-bold text-emerald-700 capitalize">{order.paymentStatus}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-1 border-t border-stone-200">
                <span>Total Paid:</span>
                <span className="text-amber-700">Rs. {order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Paradise Temperature Controlled Guarantee</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs"
          >
            Close Tracker
          </button>
        </div>

      </div>
    </div>
  );
};
