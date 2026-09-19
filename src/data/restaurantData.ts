import { MenuItem, CustomerReview, DeliveryZone } from '../types';

export const RESTAURANT_INFO = {
  name: "Paradise Restaurant",
  urduName: "پیراڈائز ریسٹورنٹ",
  tagline: "Fine Dining, Live Kitchen & Fast Local Delivery",
  urduTagline: "لاجواب ذائقہ، دلکش ماحول اور فوری ڈلیوری",
  phone: "+92 329 8124444",
  rawPhone: "923298124444",
  address: "Naqvi Rd, near Faisal Gardens, Faisal Gardens, Faisalabad, Pakistan",
  plusCode: "F56F+5R Faisalabad, Pakistan",
  googleMapsUrl: "https://maps.google.com/?q=F56F%2B5R+Faisalabad,+Pakistan",
  openingHours: "12:00 PM - 01:30 AM (Daily)",
  deliveryHours: "12:30 PM - 01:00 AM",
  rating: 4.9,
  totalReviewsCount: 1482,
  coordinates: {
    lat: 31.4312,
    lng: 73.1185,
  }
};

export const DELIVERY_ZONES: DeliveryZone[] = [
  { name: "Faisal Gardens & Naqvi Rd (Immediate Area)", deliveryFee: 0, estimatedMinutes: "20-30 mins", minOrder: 500 },
  { name: "Canal Road & Eden Garden", deliveryFee: 70, estimatedMinutes: "25-35 mins", minOrder: 800 },
  { name: "Peoples Colony 1 & 2", deliveryFee: 100, estimatedMinutes: "30-40 mins", minOrder: 1000 },
  { name: "Kohinoor City & Jaranwala Road", deliveryFee: 120, estimatedMinutes: "30-45 mins", minOrder: 1000 },
  { name: "D-Ground & Batala Colony", deliveryFee: 140, estimatedMinutes: "35-50 mins", minOrder: 1200 },
  { name: "Madina Town & Susan Road", deliveryFee: 150, estimatedMinutes: "35-50 mins", minOrder: 1200 },
  { name: "Civil Lines & Jail Road", deliveryFee: 180, estimatedMinutes: "40-55 mins", minOrder: 1500 },
];

export const MENU_ITEMS: MenuItem[] = [
  // --- CHINESE & CONTINENTAL (Featured in restaurant photo) ---
  {
    id: "ch-01",
    name: "Special Chicken Chow Mein",
    urduName: "اسپیشل چکن چاؤمین",
    category: "chinese_continental",
    price: 980,
    description: "Wok-tossed handmade noodles with tender julienne chicken, crispy seasonal greens, spring onion, and chef's signature savoury soy glaze.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=700&q=80",
    isBestSeller: true,
    preparationTime: "15-20 mins",
    portionSize: "Serves 2",
    tags: ["Authentic Wok", "Kid Friendly"]
  },
  {
    id: "ch-02",
    name: "Egg Fried Rice with Chicken Manchurian",
    urduName: "ایگ فرائیڈ رائس بمع چکن منچورین",
    category: "chinese_continental",
    price: 1350,
    description: "Fragrant basmati egg fried rice served alongside classic succulent chicken cubes in tangy garlic-tomato manchurian gravy.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80",
    isChefSpecial: true,
    isBestSeller: true,
    preparationTime: "20 mins",
    portionSize: "Serves 2-3",
    tags: ["Signature Combo", "Popular"]
  },
  {
    id: "ch-03",
    name: "Crispy Sesame Chilli Chicken",
    urduName: "کرسپی تل چلی چکن",
    category: "chinese_continental",
    price: 1150,
    description: "Crispy battered strips tossed with roasted white sesame seeds, green chilies, and sweet-spicy reduction.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=700&q=80",
    isSpicy: true,
    preparationTime: "20 mins",
    portionSize: "Serves 2",
    tags: ["Crispy", "Spicy"]
  },
  {
    id: "ch-04",
    name: "Paradise Sizzling Chicken Steak",
    urduName: "پیراڈائز سزلنگ چکن اسٹیک",
    category: "chinese_continental",
    price: 1590,
    description: "Char-grilled double chicken breast fillets served on a smoking cast-iron platter with creamy black pepper mushroom sauce, sautéed vegetables, and french fries.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
    isChefSpecial: true,
    preparationTime: "25 mins",
    portionSize: "Serves 1-2",
    tags: ["Continental", "Sizzling"]
  },

  // --- LIVE BBQ (Prepared at the Live Kitchen) ---
  {
    id: "bbq-01",
    name: "Paradise Special Balochi Sajji (Full)",
    urduName: "پیراڈائز اسپیشل بلوچی سجی",
    category: "live_bbq",
    price: 1850,
    description: "Slow wood-roasted tender whole chicken marinated in regional spices, crisp golden skin, served over spiced mandi kabsa rice with roasted almonds and special dip.",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=700&q=80",
    isChefSpecial: true,
    isBestSeller: true,
    preparationTime: "30 mins",
    portionSize: "Serves 3-4",
    tags: ["Live Kitchen", "Wood Roasted"]
  },
  {
    id: "bbq-02",
    name: "Mutton Kasturi Chops (Half Dozen)",
    urduName: "مٹن کستوری چانپ",
    category: "live_bbq",
    price: 2450,
    description: "Fresh prime cut lamb chops marinated in aged papaya, fenugreek, curd, and garam masala, grilled to melting perfection over live charcoal.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
    isChefSpecial: true,
    preparationTime: "30 mins",
    portionSize: "Serves 2",
    tags: ["Mutton", "Live Charcoal"]
  },
  {
    id: "bbq-03",
    name: "Chicken Malai Reshmi Boti",
    urduName: "چکن ملائی ریشمی بوٹی",
    category: "live_bbq",
    price: 1100,
    description: "Melt-in-mouth chicken cubes steeped in heavy cream, green cardamom, mild white pepper, and melted butter.",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=700&q=80",
    isBestSeller: true,
    preparationTime: "20 mins",
    portionSize: "Serves 2 (8 Skewered Cubes)",
    tags: ["Kids Favorite", "Mild"]
  },
  {
    id: "bbq-04",
    name: "Royal Beef Seekh Kabab",
    urduName: "رائل بیف سیخ کباب",
    category: "live_bbq",
    price: 950,
    description: "Hand-minced beef spiced with roasted coriander, pomegranate seeds, and fresh mint, skewered and flamed over red-hot coals (4 pieces).",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80",
    isSpicy: true,
    preparationTime: "20 mins",
    portionSize: "4 Large Skewers",
    tags: ["Smoky", "Traditional"]
  },

  // --- KARAHI & HANDI ---
  {
    id: "kh-01",
    name: "Paradise Special Desi Murgh Karahi (1 KG)",
    urduName: "دیسی مرغ کڑاہی (ایک کلو)",
    category: "karahi_handi",
    price: 2600,
    description: "Authentic free-range Desi chicken braised in pure butter, fresh tomatoes, julienne ginger, crushed black pepper, and green chilies in iron wok.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80",
    isChefSpecial: true,
    isBestSeller: true,
    preparationTime: "35 mins",
    portionSize: "Serves 3-4",
    tags: ["Desi Ghee", "Pure Iron Wok"]
  },
  {
    id: "kh-02",
    name: "Chicken Makhni Handi (Boneless)",
    urduName: "چکن مکھنی ہانڈی بون لیس",
    category: "karahi_handi",
    price: 1650,
    description: "Velvety smooth boneless chicken simmered in clay handi with rich cashew nut paste, dairy butter, and fenugreek leaves.",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=700&q=80",
    isBestSeller: true,
    preparationTime: "25 mins",
    portionSize: "Serves 2-3",
    tags: ["Clay Handi", "Creamy"]
  },
  {
    id: "kh-03",
    name: "Shinwari Mutton Karahi (Half KG)",
    urduName: "شنواری مٹن کڑاہی",
    category: "karahi_handi",
    price: 2200,
    description: "Pure Shinwari style: Fresh mutton cooked in its natural fat with mountain salt, fresh tomatoes, and green chilies without artificial spices.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80",
    preparationTime: "30 mins",
    portionSize: "Serves 2",
    tags: ["Shinwari", "Authentic"]
  },

  // --- DEALS & PLATTERS ---
  {
    id: "deal-01",
    name: "Paradise Grand Family Feast (Platter)",
    urduName: "پیراڈائز گرینڈ فیملی فیسٹ",
    category: "deals",
    price: 4950,
    description: "1 Full Sajji with Kabsa Rice + 1/2 KG Chicken Makhni Handi + 4 Beef Seekh Kababs + 4 Roghni Naan + Fresh Mint Raita + 1.5L Drink.",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=700&q=80",
    isChefSpecial: true,
    isBestSeller: true,
    preparationTime: "35 mins",
    portionSize: "Serves 5-6 People",
    tags: ["Mega Value", "Family Favorite"]
  },
  {
    id: "deal-02",
    name: "Chinese Duo Platter",
    urduName: "چائنیز ڈو پلیٹر",
    category: "deals",
    price: 2100,
    description: "Large Special Chicken Chow Mein + Chicken Manchurian with Egg Fried Rice + 2 Spring Rolls + 2 Soft Drinks.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80",
    isBestSeller: true,
    preparationTime: "25 mins",
    portionSize: "Serves 2-3",
    tags: ["Duo Deal", "Quick Save"]
  },
  {
    id: "deal-03",
    name: "Live BBQ Lover's Box",
    urduName: "لائیو باربی کیو بکس",
    category: "deals",
    price: 2850,
    description: "4 Chicken Malai Boti + 4 Beef Kabab + 2 Fish Tikka Skewers + 4 Garlic Naan + Special Imlee Chutney & Salad.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80",
    isChefSpecial: true,
    preparationTime: "30 mins",
    portionSize: "Serves 3-4",
    tags: ["BBQ Special"]
  },

  // --- BIRYANI & RICE ---
  {
    id: "rice-01",
    name: "Shahi Mutton Dum Biryani",
    urduName: "شاہی مٹن دم بریانی",
    category: "biryani_rice",
    price: 1350,
    description: "Aged long-grain sella rice layered with tender mutton marinated in saffron, caramelized onions, kewra, and roasted mint.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80",
    isBestSeller: true,
    preparationTime: "20 mins",
    portionSize: "Serves 1-2",
    tags: ["Dum Cooked", "Fragrant"]
  },
  {
    id: "rice-02",
    name: "Special Chicken Dum Biryani",
    urduName: "اسپیشل چکن دم بریانی",
    category: "biryani_rice",
    price: 850,
    description: "Traditional Karachi-style chicken biryani cooked with baby potatoes, aromatic cloves, and plum spice.",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=700&q=80",
    preparationTime: "15 mins",
    portionSize: "Serves 1-2",
    tags: ["Hot & Fresh"]
  },

  // --- STARTERS & SOUPS ---
  {
    id: "st-01",
    name: "Crispy Stuffed Chicken Strips",
    urduName: "کرسپی اسٹفڈ چکن اسٹرپس",
    category: "starters",
    price: 790,
    description: "Golden crumb-coated chicken breast strips stuffed with mozzarella and jalapeños, served with garlic mayo dip.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=700&q=80",
    isBestSeller: true,
    preparationTime: "15 mins",
    portionSize: "5 Pieces",
    tags: ["Cheesy", "Kids Choice"]
  },
  {
    id: "st-02",
    name: "Hot & Sour Soup (Family Bowl)",
    urduName: "ہاٹ اینڈ سور سوپ",
    category: "starters",
    price: 950,
    description: "Signature thick Chinese broth packed with shredded chicken, black mushrooms, tofu ribbons, egg drop, and fiery chili vinegar.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=700&q=80",
    preparationTime: "15 mins",
    portionSize: "Serves 4 Bowls",
    tags: ["Comfort Food", "Warming"]
  },

  // --- BREADS & SIDES ---
  {
    id: "br-01",
    name: "Cheese Garlic Roghni Naan",
    urduName: "چیز گارلک روغنی نان",
    category: "breads_sides",
    price: 220,
    description: "Tandoori flatbread stuffed with cheddar and mozzarella, brushed with garlic butter and sesame seeds.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
    preparationTime: "10 mins",
    portionSize: "1 Piece",
    tags: ["Tandoor Fresh"]
  },
  {
    id: "br-02",
    name: "Special Zeera Raita & Kachumber Salad",
    urduName: "زیرہ رائتہ اور کچھومر سلاد",
    category: "breads_sides",
    price: 180,
    description: "Chilled whipped dahi tempered with roasted cumin, accompanied by crisp diced cucumber, tomato, and onion salad.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80",
    preparationTime: "5 mins",
    portionSize: "1 Bowl",
    tags: ["Fresh"]
  },

  // --- DESSERTS & BEVERAGES ---
  {
    id: "ds-01",
    name: "Paradise Special Mint Margarita",
    urduName: "اسپیشل منٹ مارگریٹا",
    category: "desserts_beverages",
    price: 380,
    description: "Zesty chilled drink crushed with fresh garden mint leaves, lime juice, black salt, and sparkling soda.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80",
    isBestSeller: true,
    preparationTime: "5 mins",
    portionSize: "Large Glass",
    tags: ["Refreshing"]
  },
  {
    id: "ds-02",
    name: "Shahi Kulhad Matka Kheer",
    urduName: "شاہی کلہڑ مٹکا کھیر",
    category: "desserts_beverages",
    price: 350,
    description: "Slow-cooked rice pudding in traditional terracotta clay cups, enriched with saffron, crushed pistachios, and silver leaf.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80",
    isChefSpecial: true,
    preparationTime: "Ready",
    portionSize: "1 Matka Bowl",
    tags: ["Royal Sweet"]
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: "rev-01",
    authorName: "Chaudhry Bilal Warraich",
    location: "Faisal Gardens, Faisalabad",
    rating: 5,
    date: "2 days ago",
    diningType: "Dine-in",
    verifiedCustomer: true,
    comment: "Faisalabad mein itna shandar dining hall aur itni zabardast service pehle nahi dekhi! Wave-light ceiling aur live kitchen ka scene kamaal hai. Sajji aur Chicken Chow Mein 10/10 hain. Family ke saath bohot acha waqt guzra.",
    dishRecommended: "Balochi Sajji & Chicken Chow Mein",
    likes: 42,
    avatarBg: "bg-emerald-600"
  },
  {
    id: "rev-02",
    authorName: "Dr. Ayesha Tariq",
    location: "Kohinoor City, Faisalabad",
    rating: 5,
    date: "1 week ago",
    diningType: "Home Delivery",
    verifiedCustomer: true,
    comment: "Ordered delivery for 8 people at Kohinoor. The live tracking was super accurate, rider reached in 32 minutes and the food was steaming hot! JazzCash payment was seamless. Will definitely order again.",
    dishRecommended: "Paradise Grand Family Feast",
    likes: 29,
    avatarBg: "bg-amber-600"
  },
  {
    id: "rev-03",
    authorName: "Mian Hamza Gujjar",
    location: "Peoples Colony 1, Faisalabad",
    rating: 5,
    date: "2 weeks ago",
    diningType: "Family Event",
    verifiedCustomer: true,
    comment: "Booked the VIP family booth for my parents' 30th anniversary. Staff arranged beautiful flower decor without extra hassle. Food quality: Desi Murgh Karahi was pure butter perfection. Highly recommended!",
    dishRecommended: "Desi Murgh Karahi & Malai Boti",
    likes: 35,
    avatarBg: "bg-blue-600"
  },
  {
    id: "rev-04",
    authorName: "Usman Rafique",
    location: "Canal Road, Faisalabad",
    rating: 5,
    date: "3 weeks ago",
    diningType: "Dine-in",
    verifiedCustomer: true,
    comment: "The outdoor live kitchen is pure theater! Watching the chefs grill mutton chops and tossing sizzling chow mein in iron woks made our dinner memorable. Cleanliness is top tier.",
    dishRecommended: "Mutton Kasturi Chops",
    likes: 19,
    avatarBg: "bg-rose-600"
  },
  {
    id: "rev-05",
    authorName: "Zainab Fatima",
    location: "Madina Town, Faisalabad",
    rating: 4,
    date: "1 month ago",
    diningType: "Home Delivery",
    verifiedCustomer: true,
    comment: "Delivery packing was air-tight and spill-proof. The Mint Margarita was still chilled when it arrived. Authentic taste and very polite rider.",
    dishRecommended: "Chicken Manchurian & Mint Margarita",
    likes: 14,
    avatarBg: "bg-purple-600"
  }
];

export const AMBIANCE_HIGHLIGHTS = [
  {
    title: "Grand Wave-Lit Dining Hall",
    urduTitle: "گرینڈ فیملی ہال",
    description: "Spacious architectural ceiling with wave illumination, olive green velvet dining chairs, and warm luxury booth seating for families.",
    tag: "Interior Luxury"
  },
  {
    title: "Outdoor Live Kitchen & Grill",
    urduTitle: "اوپن لائیو کچن",
    description: "Open flame cooking station where master chefs prepare charcoal BBQ, sizzling Chinese woks, and hot tandoori breads right in front of your eyes.",
    tag: "Live Experience"
  },
  {
    title: "Glass Elevator & Modern Facade",
    urduTitle: "ماڈرن گلاس ایلیویٹر اور فساڈ",
    description: "Iconic illuminated stone exterior with Urdu neon signage 'پیراڈائز', towering glass observation elevator, and landscaped garden ambiance.",
    tag: "Landmark Architecture"
  },
  {
    title: "Private Family Booths",
    urduTitle: "پرائیویٹ فیملی کیبنز",
    description: "Discreet and comfortable plush leather dining alcoves designed for family privacy, celebrations, and corporate dinners.",
    tag: "Privacy & Comfort"
  }
];
