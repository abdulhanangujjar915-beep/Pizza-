import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  Heart,
  Utensils,
  Copy,
  Check
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { TableReservation } from '../types';

interface TableBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveReservation: (reservation: TableReservation) => void;
}

export const TableBookingModal: React.FC<TableBookingModalProps> = ({
  isOpen,
  onClose,
  onSaveReservation,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('08:00 PM (Dinner)');
  const [guestsCount, setGuestsCount] = useState(4);
  const [seatingZone, setSeatingZone] = useState<'grand_hall' | 'family_booth' | 'live_kitchen_view' | 'vip_executive'>('grand_hall');
  const [specialOccasion, setSpecialOccasion] = useState<'none' | 'birthday' | 'anniversary' | 'family_dinner' | 'business_dinner'>('family_dinner');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<TableReservation | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const timeSlots = [
    '01:00 PM (Lunch)',
    '02:30 PM (Lunch)',
    '04:30 PM (High Tea)',
    '07:00 PM (Dinner)',
    '08:00 PM (Dinner)',
    '09:00 PM (Dinner)',
    '10:30 PM (Late Dinner)',
    '12:00 AM (Midnight Feast)'
  ];

  const zones = [
    {
      id: 'grand_hall',
      title: 'Grand Wave-Lit Dining Hall',
      urdu: 'گرینڈ فیملی ہال',
      desc: 'Iconic wave ceiling lighting & olive velvet chairs.',
      badge: 'Most Popular'
    },
    {
      id: 'family_booth',
      title: 'Family Private Booth',
      urdu: 'پرائیویٹ کیبن',
      desc: 'Plush orange leather tufted booths for complete privacy.',
      badge: 'Family Favorite'
    },
    {
      id: 'live_kitchen_view',
      title: 'Live Kitchen Open Deck',
      urdu: 'لائیو کچن ڈیک',
      desc: 'Front row to open charcoal grills and wok flames.',
      badge: 'Culinary Theater'
    },
    {
      id: 'vip_executive',
      title: 'VIP Executive Glass Hall',
      urdu: 'وی آئی پی ہال',
      desc: 'Elevated panoramic views for special occasions & corporate meetings.',
      badge: 'Exclusive'
    }
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) {
      alert('Please enter your name and phone number for table reservation.');
      return;
    }

    const bookingCode = `PR-BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReservation: TableReservation = {
      id: `res-${Date.now()}`,
      guestName,
      guestPhone,
      date,
      timeSlot,
      guestsCount,
      seatingZone,
      specialOccasion,
      specialRequests,
      status: 'confirmed',
      bookingCode,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConfirmedBooking(newReservation);
    onSaveReservation(newReservation);
    setStep('success');
  };

  const handleCopyCode = () => {
    if (confirmedBooking) {
      navigator.clipboard.writeText(confirmedBooking.bookingCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const generateWhatsAppMessage = () => {
    if (!confirmedBooking) return '';
    const text = `Assalam-o-Alaikum Paradise Restaurant! I have booked a table:
*Booking Code:* ${confirmedBooking.bookingCode}
*Guest:* ${confirmedBooking.guestName}
*Phone:* ${confirmedBooking.guestPhone}
*Guests:* ${confirmedBooking.guestsCount} Persons
*Date:* ${confirmedBooking.date}
*Time:* ${confirmedBooking.timeSlot}
*Zone:* ${confirmedBooking.seatingZone.replace('_', ' ').toUpperCase()}
*Occasion:* ${confirmedBooking.specialOccasion}
${confirmedBooking.specialRequests ? `*Special Request:* ${confirmedBooking.specialRequests}` : ''}

Please confirm our table arrangement. Thank you!`;
    return encodeURIComponent(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 my-8">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-luxury font-bold text-lg text-white">Online Table Reservation</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-semibold">
                  آن لائن بکنگ
                </span>
              </div>
              <p className="text-xs text-stone-300">
                Paradise Restaurant, Naqvi Rd near Faisal Gardens, Faisalabad
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step: Form */}
        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            
            {/* Guest Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Chaudhry Bilal"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 text-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="e.g. 0321-1234567"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 text-stone-900"
                />
              </div>
            </div>

            {/* Date & Guests Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Reservation Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-amber-600 text-stone-900 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Number of Guests
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-amber-600 text-stone-900 bg-white"
                  >
                    {[2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30].map((num) => (
                      <option key={num} value={num}>
                        {num} Guests {num > 10 ? '(Party Arrangement)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Time Slot Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Select Preferred Time Slot
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTimeSlot(slot)}
                    className={`px-2.5 py-2 text-xs font-medium rounded-xl border text-center transition-all ${
                      timeSlot === slot
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Seating Zone Selection (Matching actual photos) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Choose Dining Zone
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {zones.map((zone) => (
                  <div
                    key={zone.id}
                    onClick={() => setSeatingZone(zone.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      seatingZone === zone.id
                        ? 'border-amber-600 bg-amber-50/70 shadow-xs'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-xs text-stone-900">{zone.title}</h4>
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                        {zone.badge}
                      </span>
                    </div>
                    <p className="font-urdu text-xs text-amber-800 mb-1">{zone.urdu}</p>
                    <p className="text-[11px] text-stone-500 leading-snug">{zone.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Occasion & Requests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Occasion Type
                </label>
                <select
                  value={specialOccasion}
                  onChange={(e) => setSpecialOccasion(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-amber-600 text-stone-900 bg-white"
                >
                  <option value="family_dinner">Family Dinner</option>
                  <option value="birthday">Birthday Celebration</option>
                  <option value="anniversary">Anniversary Celebration</option>
                  <option value="business_dinner">Corporate / Business Dinner</option>
                  <option value="none">Casual Dining</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Special Notes (Optional)
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Need baby high-chair, quiet booth..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-amber-600 text-stone-900"
                />
              </div>
            </div>

            {/* Guarantee Note */}
            <div className="p-3 bg-stone-100 rounded-xl text-xs text-stone-600 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Zero Booking Fee:</strong> No advance payment required for tables under 15 guests. Free valet parking and elevator access available.
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Confirm Online Reservation</span>
              </button>
            </div>

          </form>
        ) : (
          /* Step: Success Confirmation Card */
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h4 className="font-serif-luxury text-2xl font-bold text-stone-900">
                Reservation Confirmed!
              </h4>
              <p className="font-urdu text-amber-800 text-base font-semibold">
                آپ کی بکنگ کامیابی سے درج ہو چکی ہے
              </p>
              <p className="text-xs text-stone-500">
                A table has been reserved for you at Paradise Restaurant, Naqvi Rd, Faisal Gardens.
              </p>
            </div>

            {/* Confirmation Token Box */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <span className="text-xs text-stone-500 font-semibold uppercase">Booking Code</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-amber-700">
                    {confirmedBooking?.bookingCode}
                  </span>
                  <button 
                    onClick={handleCopyCode}
                    className="p-1 rounded text-stone-400 hover:text-stone-700"
                    title="Copy code"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px]">Guest Name</span>
                  <span className="font-bold text-stone-800">{confirmedBooking?.guestName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Phone</span>
                  <span className="font-bold text-stone-800">{confirmedBooking?.guestPhone}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Date & Time</span>
                  <span className="font-bold text-stone-800">{confirmedBooking?.date} • {confirmedBooking?.timeSlot}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Party Size</span>
                  <span className="font-bold text-stone-800">{confirmedBooking?.guestsCount} Guests</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.rawPhone}?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send to WhatsApp Manager</span>
              </a>

              <button
                onClick={onClose}
                className="py-3 px-5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm"
              >
                Done
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
