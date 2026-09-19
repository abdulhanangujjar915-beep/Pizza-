export type DishCategory = 
  | 'all'
  | 'deals'
  | 'live_bbq'
  | 'chinese_continental'
  | 'karahi_handi'
  | 'biryani_rice'
  | 'starters'
  | 'breads_sides'
  | 'desserts_beverages';

export interface MenuItem {
  id: string;
  name: string;
  urduName: string;
  category: DishCategory;
  price: number;
  description: string;
  image: string;
  isSpicy?: boolean;
  isChefSpecial?: boolean;
  isBestSeller?: boolean;
  preparationTime: string; // e.g. "20-25 mins"
  portionSize: string; // e.g. "Serves 2-3"
  calories?: string;
  tags?: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedSpice?: 'mild' | 'medium' | 'hot';
  specialInstructions?: string;
}

export type OrderStatus = 
  | 'confirmed'
  | 'preparing'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

export interface OrderTrackingInfo {
  orderId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  area: string;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending_cod' | 'verifying';
  placedAt: string;
  estimatedDeliveryTime: string;
  status: OrderStatus;
  riderName?: string;
  riderPhone?: string;
  riderVehicle?: string;
  riderCurrentLocation?: {
    lat: number;
    lng: number;
    heading: number;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

export interface TableReservation {
  id: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  seatingZone: 'grand_hall' | 'family_booth' | 'live_kitchen_view' | 'vip_executive';
  specialOccasion?: 'none' | 'birthday' | 'anniversary' | 'family_dinner' | 'business_dinner';
  specialRequests?: string;
  status: 'confirmed' | 'pending';
  bookingCode: string;
  createdAt: string;
}

export interface CustomerReview {
  id: string;
  authorName: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  dishRecommended?: string;
  diningType: 'Dine-in' | 'Home Delivery' | 'Family Event';
  verifiedCustomer: boolean;
  likes: number;
  avatarBg?: string;
}

export interface DeliveryZone {
  name: string;
  deliveryFee: number;
  estimatedMinutes: string;
  minOrder: number;
}
