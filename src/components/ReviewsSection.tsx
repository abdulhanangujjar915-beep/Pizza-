import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  ThumbsUp, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  Filter, 
  Plus, 
  X,
  Award,
  Heart
} from 'lucide-react';
import { INITIAL_REVIEWS, RESTAURANT_INFO } from '../data/restaurantData';
import { CustomerReview } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem('paradise_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_REVIEWS;
      }
    }
    return INITIAL_REVIEWS;
  });

  const [activeFilter, setActiveFilter] = useState<'All' | 'Dine-in' | 'Home Delivery' | 'Family Event'>('All');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  // Form states for new review
  const [authorName, setAuthorName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [diningType, setDiningType] = useState<'Dine-in' | 'Home Delivery' | 'Family Event'>('Dine-in');
  const [comment, setComment] = useState('');
  const [dishRecommended, setDishRecommended] = useState('');

  const filteredReviews = reviews.filter(rev => {
    if (activeFilter === 'All') return true;
    return rev.diningType === activeFilter;
  });

  const handleToggleLike = (id: string) => {
    setLikedReviews(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) {
      alert('Please fill in your name and review comments.');
      return;
    }

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      authorName,
      location: location || 'Faisalabad',
      rating,
      date: 'Just now',
      diningType,
      verifiedCustomer: true,
      comment,
      dishRecommended: dishRecommended || 'Special Live Kitchen BBQ',
      likes: 1,
      avatarBg: 'bg-amber-600'
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    localStorage.setItem('paradise_reviews', JSON.stringify(updated));

    // Reset form
    setAuthorName('');
    setLocation('');
    setComment('');
    setDishRecommended('');
    setIsWriteModalOpen(false);
  };

  return (
    <section id="reviews" className="py-16 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Verified Customer Trust & Feedback</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
            Loved by 1,480+ Food Enthusiasts Across Faisalabad
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Authentic experiences from families, corporate diners, and delivery lovers who cherish our culinary taste and hospitalities.
          </p>
        </div>

        {/* Aggregate Trust Metrics Card */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 mb-10 shadow-xl border border-stone-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Big Rating Summary */}
            <div className="md:col-span-4 text-center md:text-left md:border-r border-stone-800 md:pr-6">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-5xl sm:text-6xl font-black text-amber-400 font-serif-luxury">
                  4.9
                </span>
                <div>
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-stone-300 font-semibold block mt-1">
                    Based on 1,480+ Reviews
                  </span>
                </div>
              </div>
              <p className="text-xs text-stone-400 mt-2">
                Top-rated for authentic Live Kitchen BBQ and speedy delivery to Faisal Gardens, Canal Rd & Kohinoor.
              </p>
            </div>

            {/* Pillar Breakdown */}
            <div className="md:col-span-5 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700/60">
                <span className="text-stone-400 block text-[11px]">Taste & Food Quality</span>
                <span className="text-amber-300 font-bold text-sm">4.9 / 5.0</span>
                <div className="w-full bg-stone-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-amber-400 h-full w-[98%]"></div>
                </div>
              </div>

              <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700/60">
                <span className="text-stone-400 block text-[11px]">Ambiance & Seating</span>
                <span className="text-amber-300 font-bold text-sm">5.0 / 5.0</span>
                <div className="w-full bg-stone-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-amber-400 h-full w-[100%]"></div>
                </div>
              </div>

              <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700/60">
                <span className="text-stone-400 block text-[11px]">Delivery Speed & Packing</span>
                <span className="text-amber-300 font-bold text-sm">4.8 / 5.0</span>
                <div className="w-full bg-stone-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-amber-400 h-full w-[96%]"></div>
                </div>
              </div>

              <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700/60">
                <span className="text-stone-400 block text-[11px]">Hospitality & Staff</span>
                <span className="text-amber-300 font-bold text-sm">4.9 / 5.0</span>
                <div className="w-full bg-stone-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-amber-400 h-full w-[98%]"></div>
                </div>
              </div>
            </div>

            {/* Write Review CTA */}
            <div className="md:col-span-3 text-center md:text-right">
              <button
                onClick={() => setIsWriteModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Write Your Review</span>
              </button>
              <p className="text-[11px] text-stone-400 mt-2">
                Share your dining or delivery experience
              </p>
            </div>

          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold">
            {(['All', 'Dine-in', 'Home Delivery', 'Family Event'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  activeFilter === cat
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs text-stone-500">
            Showing {filteredReviews.length} verified review{filteredReviews.length > 1 ? 's' : ''}
          </span>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => {
            const isLiked = likedReviews[rev.id];
            const currentLikes = rev.likes + (isLiked ? 1 : 0);

            return (
              <div 
                key={rev.id}
                className="bg-stone-50 rounded-2xl p-5 border border-stone-200 flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  {/* Author Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-full ${rev.avatarBg || 'bg-amber-700'} text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs`}>
                        {rev.authorName.slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-stone-900 leading-tight">
                          {rev.authorName}
                        </h4>
                        <span className="text-[11px] text-stone-500 block">
                          {rev.location}
                        </span>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Customer
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 font-medium">
                      {rev.diningType}
                    </span>
                    <span className="text-stone-400">{rev.date}</span>
                  </div>

                  {/* Comment text */}
                  <p className="text-xs text-stone-700 leading-relaxed italic">
                    "{rev.comment}"
                  </p>

                  {/* Recommended Dish */}
                  {rev.dishRecommended && (
                    <div className="pt-1">
                      <span className="text-[11px] text-stone-500">Favorite Dish: </span>
                      <strong className="text-xs text-amber-800">{rev.dishRecommended}</strong>
                    </div>
                  )}
                </div>

                {/* Helpful Like Button */}
                <div className="pt-3 border-t border-stone-200 mt-4 flex items-center justify-between text-xs text-stone-500">
                  <span className="text-[11px]">Was this review helpful?</span>
                  <button
                    onClick={() => handleToggleLike(rev.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      isLiked
                        ? 'bg-amber-100 text-amber-900'
                        : 'hover:bg-stone-200 text-stone-600'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-amber-600 text-amber-600' : ''}`} />
                    <span>{currentLikes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
            <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Share Your Review</h3>
                <p className="text-xs text-stone-300">Help Faisalabad food lovers know about your experience</p>
              </div>
              <button 
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="p-6 space-y-4">
              
              {/* Rating Star Selector */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Your Overall Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star 
                        className={`w-7 h-7 ${star <= rating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}`} 
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-700 ml-2">
                    {rating === 5 ? 'Exceptional (5/5)' : rating === 4 ? 'Very Good (4/5)' : 'Good (3/5)'}
                  </span>
                </div>
              </div>

              {/* Name & Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase block">Name *</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Hammad Ali"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 text-stone-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase block">Location / Area</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Faisal Gardens / Kohinoor"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 text-stone-900"
                  />
                </div>
              </div>

              {/* Experience Type */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase block">Experience Type</label>
                <select
                  value={diningType}
                  onChange={(e) => setDiningType(e.target.value as any)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 text-stone-900"
                >
                  <option value="Dine-in">Dine-in (Restaurant)</option>
                  <option value="Home Delivery">Home Delivery (Online Order)</option>
                  <option value="Family Event">Family Event / Party</option>
                </select>
              </div>

              {/* Dish Recommended */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase block">Favorite Dish</label>
                <input
                  type="text"
                  value={dishRecommended}
                  onChange={(e) => setDishRecommended(e.target.value)}
                  placeholder="e.g. Balochi Sajji, Chicken Chow Mein, Desi Karahi..."
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 text-stone-900"
                />
              </div>

              {/* Comment */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase block">Your Review *</label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details about the taste, ambiance, live kitchen, or delivery speed..."
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 text-stone-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs"
                >
                  Post Review
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </section>
  );
};
