import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  CheckCircle2,
  Truck,
  Sparkles,
  MapPin,
  Tag
} from 'lucide-react';
import { CartItem, OrderTrackingInfo } from '../types';
import { DELIVERY_ZONES, RESTAURANT_INFO } from '../data/restaurantData';

interface CartAndCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onOrderPlaced: (order: OrderTrackingInfo) => void;
}

export const CartAndCheckoutModal: React.FC<CartAndCheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onOrderPlaced,
}) => {
  const [view, setView] = useState<'cart' | 'checkout'>('cart');
  const [selectedZoneIndex, setSelectedZoneIndex] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);
  const [promoError, setPromoError] = useState('');
  
  // Payment Gateway states
  const [paymentMethod, setPaymentMethod] = useState<'jazzcash' | 'easypaisa' | 'sadapay' | 'card' | 'cod'>('jazzcash');
  const [walletPhone, setWalletPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (!isOpen) return null;

  const currentZone = DELIVERY_ZONES[selectedZoneIndex];
  const itemsTotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const deliveryFee = currentZone.deliveryFee;
  const discountAmount = discountApplied > 0 ? Math.round((itemsTotal * discountApplied) / 100) : 0;
  const grandTotal = Math.max(0, itemsTotal + deliveryFee - discountAmount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'PARADISE10') {
      setDiscountApplied(10);
      setPromoError('');
    } else if (promoCode.trim().toUpperCase() === 'WELCOME') {
      setDiscountApplied(15);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon. Try "PARADISE10" or "WELCOME"');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      alert('Please fill in your name, contact phone, and delivery address.');
      return;
    }

    setIsProcessingPayment(true);

    // Simulate real-time secure gateway processing (1.5 seconds)
    setTimeout(() => {
      const orderId = `PR-${Math.floor(100000 + Math.random() * 900000)}`;
      const now = new Date();
      const placedAt = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      // Calculate ETA
      const etaMinutes = currentZone.estimatedMinutes.split('-')[1]?.replace('mins', '').trim() || '35';
      const etaDate = new Date(now.getTime() + parseInt(etaMinutes, 10) * 60000);
      const estimatedDeliveryTime = etaDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newOrder: OrderTrackingInfo = {
        orderId,
        customerName,
        customerPhone,
        deliveryAddress: `${deliveryAddress} (${deliveryNotes || 'Standard delivery'})`,
        area: currentZone.name,
        totalAmount: grandTotal,
        paymentMethod: paymentMethod.toUpperCase(),
        paymentStatus: paymentMethod === 'cod' ? 'pending_cod' : 'paid',
        placedAt,
        estimatedDeliveryTime,
        status: 'confirmed',
        riderName: 'Muhammad Tariq',
        riderPhone: '+92 300 7864321',
        riderVehicle: 'Honda 125 (FS-9842)',
        riderCurrentLocation: {
          lat: RESTAURANT_INFO.coordinates.lat,
          lng: RESTAURANT_INFO.coordinates.lng,
          heading: 45
        },
        items: cart.map(c => ({
          name: `${c.item.name} (${c.selectedSpice || 'medium'} spice)`,
          quantity: c.quantity,
          price: c.item.price * c.quantity
        }))
      };

      setIsProcessingPayment(false);
      onOrderPlaced(newOrder);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 my-4 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                {view === 'cart' ? 'Your Delivery Bag' : 'Integrated Secure Checkout'}
              </h3>
              <p className="text-[11px] text-stone-300">
                {view === 'cart' 
                  ? `${cart.length} unique dish(es) selected` 
                  : 'Encrypted 256-bit Payment Gateway'}
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {cart.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
              <h4 className="font-bold text-stone-700 text-base">Your Bag is Empty</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our live kitchen menu card and add your favorite dishes to place a delivery order.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white font-semibold text-xs mt-2"
              >
                Browse Menu
              </button>
            </div>
          ) : view === 'cart' ? (
            /* VIEW 1: CART ITEMS */
            <div className="space-y-4">
              {/* Items List */}
              <div className="divide-y divide-stone-100 space-y-3">
                {cart.map((cartItem, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 flex items-start justify-between gap-3">
                    <img 
                      src={cartItem.item.image} 
                      alt={cartItem.item.name} 
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover bg-stone-100 shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                        {cartItem.item.name}
                      </h4>
                      <p className="font-urdu text-amber-800 text-[11px]">
                        {cartItem.item.urduName}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                        <span className="capitalize">Spice: {cartItem.selectedSpice}</span>
                        <span>•</span>
                        <span>Rs. {cartItem.item.price} each</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="font-bold text-xs sm:text-sm text-stone-900">
                        Rs. {(cartItem.item.price * cartItem.quantity).toLocaleString()}
                      </span>
                      <div className="flex items-center gap-1.5 border border-stone-200 rounded-lg p-0.5 bg-stone-50">
                        <button
                          onClick={() => {
                            if (cartItem.quantity > 1) {
                              onUpdateQuantity(idx, cartItem.quantity - 1);
                            } else {
                              onRemoveItem(idx);
                            }
                          }}
                          className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-stone-200"
                        >
                          {cartItem.quantity === 1 ? <Trash2 className="w-3 h-3 text-rose-500" /> : <Minus className="w-3 h-3" />}
                        </button>
                        <span className="text-xs font-bold px-1.5 min-w-[16px] text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, cartItem.quantity + 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-stone-200"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Area Selection */}
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    Delivery Zone (Faisalabad):
                  </span>
                  <span className="text-emerald-700 font-semibold text-[11px]">
                    {currentZone.deliveryFee === 0 ? 'FREE DELIVERY' : `+ Rs. ${currentZone.deliveryFee}`}
                  </span>
                </div>
                <select
                  value={selectedZoneIndex}
                  onChange={(e) => setSelectedZoneIndex(Number(e.target.value))}
                  className="w-full text-xs p-2 rounded-lg bg-white border border-stone-300 text-stone-800 focus:outline-none focus:border-amber-600"
                >
                  {DELIVERY_ZONES.map((zone, idx) => (
                    <option key={idx} value={idx}>
                      {zone.name} ({zone.estimatedMinutes})
                    </option>
                  ))}
                </select>
              </div>

              {/* Promo code field */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Discount coupon (use PARADISE10)"
                  className="flex-1 text-xs px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-600 uppercase"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3.5 py-2 rounded-xl bg-stone-900 text-white font-semibold text-xs hover:bg-stone-800"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-[11px] text-rose-500">{promoError}</p>}
              {discountApplied > 0 && (
                <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {discountApplied}% discount applied!
                </p>
              )}

              {/* Price Breakdown */}
              <div className="border-t border-stone-100 pt-3 space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Dishes Subtotal:</span>
                  <span className="font-semibold text-stone-800">Rs. {itemsTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery Fee:</span>
                  <span className="font-semibold text-stone-800">
                    {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount Voucher:</span>
                    <span>- Rs. {discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-stone-900 border-t border-stone-200 pt-2">
                  <span>Grand Total:</span>
                  <span className="text-amber-700">Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            /* VIEW 2: CHECKOUT & INTEGRATED SECURE PAYMENT GATEWAY */
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              
              {/* Customer Contact Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  1. Delivery Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Recipient Name *"
                    className="text-xs p-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Phone (e.g. 0329-8124444) *"
                    className="text-xs p-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Street / House / Plaza / Flat Number *"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:border-amber-600"
                />
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="Landmark or Rider instructions (e.g. Near Faisal Gardens Gate 2)"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Secure Payment Gateway Selector */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    2. Integrated Payment Gateway
                  </h4>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    256-Bit SSL Encrypted
                  </span>
                </div>

                {/* Gateway Methods Radio Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all flex flex-col justify-between h-16 ${
                      paymentMethod === 'jazzcash'
                        ? 'border-red-600 bg-red-50 text-red-950 shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <span className="font-bold flex items-center justify-between">
                      JazzCash
                      <Smartphone className="w-3.5 h-3.5 text-red-600" />
                    </span>
                    <span className="text-[10px] text-stone-500 font-normal">Instant Mobile Wallet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all flex flex-col justify-between h-16 ${
                      paymentMethod === 'easypaisa'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <span className="font-bold flex items-center justify-between">
                      EasyPaisa
                      <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                    <span className="text-[10px] text-stone-500 font-normal">Wallet & QR Code</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('sadapay')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all flex flex-col justify-between h-16 ${
                      paymentMethod === 'sadapay'
                        ? 'border-teal-600 bg-teal-50 text-teal-950 shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <span className="font-bold flex items-center justify-between">
                      SadaPay / Naya
                      <CreditCard className="w-3.5 h-3.5 text-teal-600" />
                    </span>
                    <span className="text-[10px] text-stone-500 font-normal">Fast Digital Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all flex flex-col justify-between h-16 ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50 text-blue-950 shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <span className="font-bold flex items-center justify-between">
                      Visa / Master
                      <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                    </span>
                    <span className="text-[10px] text-stone-500 font-normal">Debit / Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all flex flex-col justify-between h-16 col-span-2 sm:col-span-1 ${
                      paymentMethod === 'cod'
                        ? 'border-amber-600 bg-amber-50 text-amber-950 shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <span className="font-bold flex items-center justify-between">
                      Cash on Delivery
                      <Banknote className="w-3.5 h-3.5 text-amber-600" />
                    </span>
                    <span className="text-[10px] text-stone-500 font-normal">Pay Rider in Cash</span>
                  </button>
                </div>

                {/* Sub-form depending on Payment method */}
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
                  {paymentMethod === 'jazzcash' && (
                    <div className="space-y-2">
                      <p className="text-[11px] text-stone-600">
                        Enter your <strong>JazzCash Mobile Account Number</strong>. You will receive an MPIN push notification to authorize Rs. {grandTotal.toLocaleString()}.
                      </p>
                      <input
                        type="tel"
                        required
                        value={walletPhone || customerPhone}
                        onChange={(e) => setWalletPhone(e.target.value)}
                        placeholder="03001234567"
                        className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white text-stone-900"
                      />
                    </div>
                  )}

                  {paymentMethod === 'easypaisa' && (
                    <div className="space-y-2">
                      <p className="text-[11px] text-stone-600">
                        Enter your <strong>EasyPaisa Account Number</strong>. Approve the payment prompt on your EasyPaisa app for Rs. {grandTotal.toLocaleString()}.
                      </p>
                      <input
                        type="tel"
                        required
                        value={walletPhone || customerPhone}
                        onChange={(e) => setWalletPhone(e.target.value)}
                        placeholder="03451234567"
                        className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white text-stone-900"
                      />
                    </div>
                  )}

                  {paymentMethod === 'sadapay' && (
                    <div className="space-y-2">
                      <p className="text-[11px] text-stone-600">
                        Enter your <strong>SadaPay Handle or Registered Phone</strong> to generate a direct payment request.
                      </p>
                      <input
                        type="text"
                        required
                        placeholder="@username or 03xxxxxxxxx"
                        className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white text-stone-900"
                      />
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                        maxLength={19}
                        className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white text-stone-900"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="text-xs p-2 rounded-lg border border-stone-300 bg-white text-stone-900"
                        />
                        <input
                          type="password"
                          required
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="CVV"
                          maxLength={4}
                          className="text-xs p-2 rounded-lg border border-stone-300 bg-white text-stone-900"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="text-stone-600 text-[11px]">
                      Please keep exact cash ready for the Paradise delivery rider. You can inspect the seal upon delivery before payment.
                    </div>
                  )}
                </div>

              </div>

            </form>
          )}

        </div>

        {/* Footer Actions */}
        {cart.length > 0 && (
          <div className="p-4 bg-stone-50 border-t border-stone-200 shrink-0 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Total Amount</span>
              <span className="font-bold text-base sm:text-lg text-stone-900">
                Rs. {grandTotal.toLocaleString()}
              </span>
            </div>

            {view === 'cart' ? (
              <button
                type="button"
                onClick={() => setView('checkout')}
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setView('cart')}
                  className="px-4 py-3 rounded-xl bg-stone-200 text-stone-700 font-semibold text-xs hover:bg-stone-300"
                >
                  Back
                </button>
                <button
                  form="checkout-form"
                  type="submit"
                  disabled={isProcessingPayment}
                  className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Authorize & Place Order</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
