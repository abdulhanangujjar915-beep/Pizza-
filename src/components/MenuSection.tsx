import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Flame, 
  Sparkles, 
  Clock, 
  Users, 
  Plus, 
  Check, 
  Filter,
  SlidersHorizontal,
  Info,
  ChevronRight,
  Heart
} from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { DishCategory, MenuItem } from '../types';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, spice?: 'mild' | 'medium' | 'hot', notes?: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<DishCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'bestseller' | 'chef' | 'spicy'>('all');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [selectedSpice, setSelectedSpice] = useState<'mild' | 'medium' | 'hot'>('medium');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const categories: { id: DishCategory; label: string; urdu: string }[] = [
    { id: 'all', label: 'Full Menu Card', urdu: 'مکمل مینو' },
    { id: 'deals', label: 'Family Deals & Platters', urdu: 'فیملی ڈیلز' },
    { id: 'live_bbq', label: 'Live Kitchen BBQ', urdu: 'باربی کیو' },
    { id: 'chinese_continental', label: 'Chinese & Continental', urdu: 'چائنیز' },
    { id: 'karahi_handi', label: 'Desi Karahi & Handi', urdu: 'کڑاہی و ہانڈی' },
    { id: 'biryani_rice', label: 'Biryani & Mandi Rice', urdu: 'بریانی و چاول' },
    { id: 'starters', label: 'Soups & Appetizers', urdu: 'سوپ و اسٹارٹرز' },
    { id: 'breads_sides', label: 'Tandoor Breads & Raita', urdu: 'نان و سلاد' },
    { id: 'desserts_beverages', label: 'Desserts & Mocktails', urdu: 'مشروبات و میٹھا' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

      // Search filter
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.urduName.includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

      // Badge filter
      let matchesBadge = true;
      if (selectedFilter === 'bestseller') matchesBadge = !!item.isBestSeller;
      if (selectedFilter === 'chef') matchesBadge = !!item.isChefSpecial;
      if (selectedFilter === 'spicy') matchesBadge = !!item.isSpicy;

      return matchesCategory && matchesSearch && matchesBadge;
    });
  }, [activeCategory, searchQuery, selectedFilter]);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item, 'medium', '');
    setRecentlyAddedId(item.id);
    setTimeout(() => setRecentlyAddedId(null), 1500);
  };

  const handleOpenCustomize = (item: MenuItem) => {
    setCustomizingItem(item);
    setSelectedSpice(item.isSpicy ? 'hot' : 'medium');
    setSpecialInstructions('');
  };

  const handleConfirmCustomize = () => {
    if (customizingItem) {
      onAddToCart(customizingItem, selectedSpice, specialInstructions);
      setRecentlyAddedId(customizingItem.id);
      setCustomizingItem(null);
      setTimeout(() => setRecentlyAddedId(null), 1500);
    }
  };

  return (
    <section id="menu" className="py-16 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Signature Paradise Menu Card</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
            Freshly Prepared from Our Live Kitchen
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            From sizzling Chinese woks & Continental steaks to wood-fired Balochi Sajji and pure Desi butter Karahi. Order now for swift delivery in Faisalabad.
          </p>
        </div>

        {/* Search & Badges Toolbar */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-stone-200 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g., Chow Mein, Sajji, Karahi, Biryani, Steak)..."
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 rounded-xl text-sm border border-stone-200 focus:outline-none focus:border-amber-600 focus:bg-white transition-all text-stone-900 placeholder:text-stone-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs font-medium">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  selectedFilter === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                All Flavors
              </button>

              <button
                onClick={() => setSelectedFilter('bestseller')}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  selectedFilter === 'bestseller'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Best Sellers
              </button>

              <button
                onClick={() => setSelectedFilter('chef')}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  selectedFilter === 'chef'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200/60'
                }`}
              >
                Chef's Specials
              </button>

              <button
                onClick={() => setSelectedFilter('spicy')}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  selectedFilter === 'spicy'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-900 hover:bg-rose-100 border border-rose-200/60'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                Spicy
              </button>
            </div>

          </div>

          {/* Category Tabs (Scrollable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-stone-100">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'bg-stone-100/90 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`font-urdu text-[11px] opacity-75 ${activeCategory === cat.id ? 'text-amber-100' : 'text-stone-500'}`}>
                  ({cat.urdu})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 max-w-md mx-auto space-y-3">
            <Info className="w-10 h-10 text-stone-400 mx-auto" />
            <h3 className="font-bold text-stone-800">No dishes match your criteria</h3>
            <p className="text-xs text-stone-500">
              Try changing the search term or switching to another category.
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); setSelectedFilter('all'); }}
              className="text-xs font-semibold text-amber-700 hover:underline pt-2"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenCustomize(item)}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Dish Image with Badges */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-80"></div>

                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.isBestSeller && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500 text-stone-950 text-[10px] font-bold shadow-xs flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Best Seller
                        </span>
                      )}
                      {item.isChefSpecial && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-bold shadow-xs">
                          Chef's Special
                        </span>
                      )}
                      {item.isSpicy && (
                        <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-bold shadow-xs flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          Spicy
                        </span>
                      )}
                    </div>

                    {/* Preparation Time & Servings (Overlay bottom) */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/90">
                      <span className="inline-flex items-center gap-1 bg-stone-900/70 backdrop-blur-xs px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3 text-amber-300" />
                        {item.preparationTime}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-stone-900/70 backdrop-blur-xs px-2 py-0.5 rounded-md">
                        <Users className="w-3 h-3 text-emerald-300" />
                        {item.portionSize}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-stone-900 text-base leading-tight group-hover:text-amber-700 transition-colors">
                          {item.name}
                        </h3>
                        <p className="font-urdu text-amber-800 text-sm font-medium mt-0.5">
                          {item.urduName}
                        </p>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        <span className="font-bold text-base sm:text-lg text-stone-900">
                          Rs. {item.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 sm:p-5 pt-0 flex items-center justify-between gap-2 border-t border-stone-100 mt-2">
                  <button
                    onClick={() => handleOpenCustomize(item)}
                    className="text-xs text-stone-600 hover:text-amber-800 font-medium flex items-center gap-1"
                  >
                    <span>Customize</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => handleQuickAdd(item, e)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      recentlyAddedId === item.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-600 hover:bg-amber-700 text-white active:scale-95'
                    }`}
                  >
                    {recentlyAddedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Order</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Dish Customization Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
            {/* Modal Image & Header */}
            <div className="relative h-44 w-full bg-stone-900">
              <img
                src={customizingItem.image}
                alt={customizingItem.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent"></div>
              <button
                onClick={() => setCustomizingItem(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60"
              >
                ✕
              </button>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="font-bold text-lg leading-tight">{customizingItem.name}</h3>
                <p className="font-urdu text-amber-300 text-sm">{customizingItem.urduName}</p>
                <p className="text-xs text-amber-200 font-semibold mt-0.5">Rs. {customizingItem.price.toLocaleString()}</p>
              </div>
            </div>

            {/* Customization Options */}
            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
              
              {/* Spice Level */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  Select Spice Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['mild', 'medium', 'hot'] as const).map((spice) => (
                    <button
                      key={spice}
                      onClick={() => setSelectedSpice(spice)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold capitalize flex flex-col items-center justify-center gap-1 transition-all ${
                        selectedSpice === spice
                          ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs'
                          : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <span>{spice}</span>
                      <span className="text-[10px] text-stone-400">
                        {spice === 'mild' ? 'Kid Friendly' : spice === 'medium' ? 'Traditional' : 'Extra Fiery'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  Special Kitchen Note (Optional)
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Less oil, extra disposable cutlery, pack green chutney separately..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Portion and Prep details */}
              <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 flex justify-between">
                <span>Serving: <strong className="text-stone-800">{customizingItem.portionSize}</strong></span>
                <span>Fresh Cook Time: <strong className="text-stone-800">{customizingItem.preparationTime}</strong></span>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-stone-500 uppercase block">Total Price</span>
                <span className="font-bold text-stone-900 text-base">Rs. {customizingItem.price.toLocaleString()}</span>
              </div>
              <button
                onClick={handleConfirmCustomize}
                className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                Add to Delivery Bag
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
