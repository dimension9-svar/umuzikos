export const CATEGORIES = [
  { name: "All", icon: "M4 6h16M4 12h16M4 18h10" },
  { name: "Pizza", icon: "M12 2 22 22H2L12 2zM12 12.5h.01M9 15.5h.01M15 15.5h.01" },
  { name: "Burgers", icon: "M4 14c0-3 3.5-5 8-5s8 2 8 5H4zm0 3h16M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" },
  { name: "Halal", icon: "M16 8a5 5 0 1 0 0 8 4 4 0 1 1 0-8z" },
  { name: "Indian", icon: "M5 19c0-4 3-7 7-7s7 3 7 7H5zm7-7v-3m-2-3a2 2 0 1 1 4 0" },
  { name: "Braai", icon: "M5 9h14l-1 12H6L5 9zm3 0c0-3 4-3 4-6m4 6c0-2 2-2 2-4" },
  { name: "Sushi", icon: "M4 14a4 4 0 0 0 4-4V8a4 4 0 1 1 8 0v2a4 4 0 0 0 4 4M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4M4 14h16" },
  { name: "Coffee", icon: "M4 8h12a3 3 0 0 1 0 6h-1m-11 0v5a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-5M4 8v-2M8 4v2M12 4v2" },
  { name: "Desserts", icon: "M12 2v6m-7 6a7 7 0 1 1 14 0H5zm-2 4h18l-2 6H5l-2-6z" },
  { name: "Healthy", icon: "M12 3c0 7-5 9-5 13a5 5 0 0 0 10 0c0-4-5-6-5-13z" },
  { name: "Asian", icon: "M4 8h16M5 8l1 12h12l1-12M9 14l3 3 3-3" },
  { name: "Drinks", icon: "M6 4h12l-1.5 16a2 2 0 0 1-2 2H9.5a2 2 0 0 1-2-2L6 4zm0.5 6h11" },
];

export type Restaurant = {
  name: string;
  sub: string;
  rating: number;
  reviews: number;
  time: string;
  fee: string;
  promo: string | null;
  tags: string[];
  fav: boolean;
};

export const RESTAURANTS: Restaurant[] = [
  {
    name: "Babbel & Bites",
    sub: "Indian · Curry house",
    rating: 4.9,
    reviews: 1820,
    time: "20–30 min",
    fee: "R 18",
    promo: "20% off",
    tags: ["Halal", "Vegetarian options"],
    fav: true,
  },
  {
    name: "The Lake Grill",
    sub: "Braai · Steakhouse",
    rating: 4.7,
    reviews: 945,
    time: "25–35 min",
    fee: "Free",
    promo: "Free delivery",
    tags: ["Family", "Late night"],
    fav: false,
  },
  {
    name: "Saffa Sushi Co.",
    sub: "Japanese · Sushi",
    rating: 4.8,
    reviews: 612,
    time: "25–40 min",
    fee: "R 22",
    promo: null,
    tags: ["New"],
    fav: false,
  },
  {
    name: "Tannie Marie",
    sub: "Bakery · Coffee",
    rating: 4.9,
    reviews: 2340,
    time: "15–20 min",
    fee: "R 12",
    promo: "Closes soon",
    tags: ["Breakfast", "Halal"],
    fav: false,
  },
];

export const FAQ = [
  {
    q: "Where do you deliver?",
    a: "We cover Lake Umuzi Waterfront, Secunda CBD, Bracken, Goedehoop and Trichardt every day. Embalenhle Ext 13–18 is a weekends-only pilot, and Evander and Kinross are coming in Q3 2026. Enter your address at the top of the page to confirm.",
  },
  {
    q: "How long does delivery actually take?",
    a: "The average UmuziKos delivery is 27 minutes from tap to table. Each restaurant shows a live, traffic-aware time band on its card — and if we're wrong by more than 5 minutes, the delivery is free.",
  },
  {
    q: "How can I pay?",
    a: "SnapScan, Ozow, Visa, Mastercard, or cash on delivery. No EFT fees, no surprise service charges. The exact ZAR total — including delivery — is shown before you place the order.",
  },
  {
    q: "Can I list my restaurant on UmuziKos?",
    a: "Yes, and we onboard the same day. We charge a flat 8% commission — well below the big platforms — and you keep all customer data. Tap 'Partner with us' above to start, or call us during business hours.",
  },
  {
    q: "How do I become a driver?",
    a: "If you have a valid SA driving licence, a registered bike or vehicle, and a smartphone, you can apply in under 10 minutes. Drivers earn R 28+ per delivery with a 2× boost during Lake Umuzi peak hours.",
  },
  {
    q: "What about food allergies?",
    a: 'Every menu item carries allergen tags pulled directly from the restaurant. You can also pin custom notes to a driver — "no peanuts, leave at door, dog is friendly" — at checkout.',
  },
];
