export const WATERFRONT = {
  lat: -26.5481,
  lng: 29.1819,
  radiusKm: 8,
};

export const CATEGORIES = [
  { name: "All", icon: "M4 6h16M4 12h16M4 18h10" },
  { name: "Grill", icon: "M5 9h14l-1 12H6L5 9zm3 0c0-3 4-3 4-6m4 6c0-2 2-2 2-4" },
  { name: "Braai", icon: "M4 14h16l-2 7H6L4 14zm4-4c0-2 4-2 4-5m4 5c0-1.5 2-1.5 2-3.5" },
  { name: "Steakhouse", icon: "M5 7h14l-2 14H7L5 7zm3 6h8m-8 4h8" },
  { name: "Burgers", icon: "M4 14c0-3 3.5-5 8-5s8 2 8 5H4zm0 3h16M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" },
  { name: "Seafood", icon: "M3 12c4-6 10-6 14 0 3-4 4 0 4 0s-1 4-4 0c-4 6-10 6-14 0zm14 0h.01" },
  { name: "Sushi", icon: "M4 14a4 4 0 0 0 4-4V8a4 4 0 1 1 8 0v2a4 4 0 0 0 4 4M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4M4 14h16" },
  { name: "Street food", icon: "M6 4h12l-1.5 16a2 2 0 0 1-2 2H9.5a2 2 0 0 1-2-2L6 4zm.5 6h11" },
  { name: "Halaal", icon: "M16 8a5 5 0 1 0 0 8 4 4 0 1 1 0-8z" },
  { name: "Craft beer", icon: "M6 4h10v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4zm10 4h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M9 8v10M13 8v10" },
];

export type MenuItem = { name: string; price: number; desc: string };

export type Restaurant = {
  slug: string;
  name: string;
  sub: string;
  cuisines: string[];
  rating: number;
  reviews: number;
  prepTime: string;
  baseDeliveryFee: number;
  promo: string | null;
  tags: string[];
  hours: string;
  about: string;
  menu: MenuItem[];
};

export const RESTAURANTS: Restaurant[] = [
  {
    slug: "boesies",
    name: "Boesies",
    sub: "South African · Grill",
    cuisines: ["Grill", "Burgers"],
    rating: 4.6,
    reviews: 342,
    prepTime: "20–30 min",
    baseDeliveryFee: 1500,
    promo: "20% off",
    tags: ["Family-friendly", "Late night"],
    hours: "11:00–22:00 daily",
    about: "Honest grill cuisine on the waterfront. House-aged beef, Karoo lamb, free-range chicken. Open till late, every night.",
    menu: [
      { name: "250g rump steak & chips", price: 16500, desc: "House-aged, garlic butter, beer-batter chips, peppercorn jus" },
      { name: "Mixed grill platter", price: 24500, desc: "Rump, wors, lamb chop, chicken thigh, sides" },
      { name: "Boesies burger", price: 10500, desc: "200g chuck-and-brisket patty, smoked cheddar, bacon jam, brioche" },
      { name: "Chicken livers peri-peri", price: 7800, desc: "Pan-fried with onion, brandy-cream peri-peri, toasted bread" },
      { name: "Malva pudding", price: 5800, desc: "House recipe, warm vanilla custard" },
    ],
  },
  {
    slug: "bosveld-lapa",
    name: "Bosveld Lapa",
    sub: "Traditional · Braai",
    cuisines: ["Braai", "Halaal"],
    rating: 4.7,
    reviews: 281,
    prepTime: "25–40 min",
    baseDeliveryFee: 1500,
    promo: "20% off first order",
    tags: ["Halaal", "Boerekos"],
    hours: "12:00–22:00 Tue–Sun",
    about: "Open-flame braai the way your oupa made it. Halaal-certified kitchen, wood-fired everything, sides that speak Afrikaans.",
    menu: [
      { name: "Karoo lamb chops (3 pc)", price: 19500, desc: "Salt-and-pepper, served with putu pap and chakalaka" },
      { name: "Boerewors & pap", price: 12500, desc: "Karoo wors, mielie pap, tomato-onion sous" },
      { name: "Sosatie skewers (×4)", price: 13800, desc: "Beef and apricot, marinated 24h, side salad" },
      { name: "Braaibroodjie", price: 4800, desc: "Cheese, tomato, onion, chutney, grilled over coals" },
      { name: "Koeksister (×2)", price: 3200, desc: "Plaited and syrup-soaked, served warm" },
    ],
  },
  {
    slug: "dros",
    name: "DROS",
    sub: "Family · Pub & Grill",
    cuisines: ["Grill", "Steakhouse", "Burgers"],
    rating: 4.5,
    reviews: 894,
    prepTime: "20–30 min",
    baseDeliveryFee: 1500,
    promo: "Free delivery",
    tags: ["Family", "Burgers"],
    hours: "11:00–22:30 daily",
    about: "The classic SA family pub-and-grill. Steaks, ribs, schnitzels, big plates, kids' menu. Reliable, fast, large portions.",
    menu: [
      { name: "Famous DROS rump (300g)", price: 21500, desc: "Aged 21 days, mushroom or pepper sauce, chips, side salad" },
      { name: "Eisbein & sauerkraut", price: 17800, desc: "Slow-roasted pork knuckle, mustard, kraut, rye" },
      { name: "Calamari basket", price: 12800, desc: "Lightly battered, tartare, lemon, fries" },
      { name: "Ribs & wings combo", price: 19800, desc: "Half rack pork ribs, six BBQ wings, slaw, chips" },
      { name: "Brownie & ice cream", price: 6800, desc: "Warm chocolate brownie, vanilla ice cream, fudge sauce" },
    ],
  },
  {
    slug: "eish",
    name: "Eish!! South African Kitchen",
    sub: "South African · Street food",
    cuisines: ["Street food", "Halaal"],
    rating: 4.8,
    reviews: 521,
    prepTime: "15–25 min",
    baseDeliveryFee: 1500,
    promo: "Closes 21:00",
    tags: ["Spicy", "Halaal"],
    hours: "10:00–21:00 daily",
    about: "Township street food, waterfront prices. Kotas, bunny chows, vetkoek, sosaties — all made to order, halaal-certified.",
    menu: [
      { name: "Full house kota", price: 8800, desc: "Quarter loaf, polony, Russian, cheese, egg, chips, atchar" },
      { name: "Lamb bunny chow", price: 9500, desc: "Quarter loaf, slow-cooked Durban lamb curry, sambals" },
      { name: "Vetkoek & savoury mince", price: 6500, desc: "Two house vetkoek, beef mince, atchar on the side" },
      { name: "Spicy atchar wrap", price: 5800, desc: "Toasted roti, chicken livers, mango atchar, fresh chilli" },
      { name: "Amasi & koeksister", price: 4200, desc: "Cultured milk, syrup-soaked plait" },
    ],
  },
  {
    slug: "ocean-basket",
    name: "Ocean Basket",
    sub: "Seafood · Sushi",
    cuisines: ["Seafood", "Sushi"],
    rating: 4.6,
    reviews: 1240,
    prepTime: "25–35 min",
    baseDeliveryFee: 1500,
    promo: null,
    tags: ["Seafood", "Sushi"],
    hours: "11:30–22:00 daily",
    about: "The sea, three hours inland. Sustainable seafood, hand-rolled sushi, the same menu that's run for thirty years for a reason.",
    menu: [
      { name: "Calamari & chips", price: 14500, desc: "Grilled or fried, lemon, tartare" },
      { name: "Salmon nigiri (×6)", price: 16800, desc: "Norwegian salmon, hand-pressed shari, pickled ginger" },
      { name: "Hake & chips", price: 13800, desc: "Beer-battered or grilled, mushy peas, tartare" },
      { name: "Sushi platter for one", price: 19500, desc: "12 pieces: nigiri, maki, salmon roses" },
      { name: "Greek salad", price: 7800, desc: "Feta, olives, cucumber, tomato, oregano, olive oil" },
    ],
  },
  {
    slug: "moo-moo",
    name: "Moo Moo Steakhouse & Wine Bar",
    sub: "Steakhouse · Fine dining",
    cuisines: ["Steakhouse", "Grill"],
    rating: 4.9,
    reviews: 783,
    prepTime: "30–45 min",
    baseDeliveryFee: 1500,
    promo: null,
    tags: ["Steakhouse", "Wine bar"],
    hours: "17:00–22:30 Tue–Sun",
    about: "Tasting-menu steakhouse on the lake. Free-range, dry-aged, charcoal-fired. Wine list curated monthly, dessert by request.",
    menu: [
      { name: "300g fillet, bone marrow", price: 29500, desc: "Dry-aged 28 days, bordelaise, dauphinoise, asparagus" },
      { name: "Beef Wellington", price: 34500, desc: "Centre-cut fillet, mushroom duxelles, puff pastry, jus" },
      { name: "Pan-seared salmon", price: 26800, desc: "Norwegian salmon, lemon-caper butter, baby spinach" },
      { name: "Côte de boeuf (sharing)", price: 68500, desc: "1kg dry-aged ribeye on the bone, sides, sauces. 2–3 people." },
      { name: "Crème brûlée", price: 8500, desc: "Vanilla bean, torched at the pass" },
    ],
  },
  {
    slug: "lake-umuzi-brewing",
    name: "Lake Umuzi Brewing Company",
    sub: "Craft beer · Pub food",
    cuisines: ["Craft beer", "Burgers", "Grill"],
    rating: 4.7,
    reviews: 562,
    prepTime: "25–35 min",
    baseDeliveryFee: 1500,
    promo: "Live music tonight",
    tags: ["Craft beer", "Pub food"],
    hours: "15:00–23:00 Wed–Sun",
    about: "Brewed on-site, six taps deep. Pub plates engineered to drink — wings, burgers, fish, pretzels. Live music Friday & Saturday.",
    menu: [
      { name: "Beer-battered fish & chips", price: 14800, desc: "House lager batter, mushy peas, tartare, lemon" },
      { name: "Smashburger", price: 12500, desc: "Double 90g patties, American cheese, pickles, special sauce" },
      { name: "Brewery wings (8 pc)", price: 9800, desc: "Honey-mustard, sticky BBQ, or Nashville hot" },
      { name: "Pretzel & cheese sauce", price: 6800, desc: "House-made pretzel, ale-cheddar sauce, mustard" },
      { name: "Tasting flight (×4 beers)", price: 9500, desc: "Choose any four from current tap list — 150ml each" },
    ],
  },
];

export const COVERAGE_ZONES = [
  { name: "Lake Umuzi Waterfront", status: "origin", note: "The kitchen complex (0 km)" },
  { name: "Secunda CBD & Bracken", status: "live", note: "Within zone (~2–4 km)" },
  { name: "Goedehoop & Trichardt", status: "live", note: "Within zone (~3–6 km)" },
  { name: "Embalenhle (closer extensions)", status: "live", note: "Within zone (~6–8 km)" },
  { name: "Evander, Kinross, outer Embalenhle", status: "out", note: "Outside the 8 km radius" },
] as const;

export const FAQ = [
  {
    q: "Which restaurants can I order from?",
    a: "All seven kitchens at the Lake Umuzi Waterfront: Boesies, Bosveld Lapa, DROS, Eish!! South African Kitchen, Ocean Basket, Moo Moo Steakhouse & Wine Bar, and Lake Umuzi Brewing Company. UmuziKos is not a marketplace — it's the waterfront's own delivery service.",
  },
  {
    q: "How far do you deliver?",
    a: "Anywhere within 8 km of the Lake Umuzi Waterfront — that's Secunda CBD, Bracken, Goedehoop, Trichardt, and the closer Embalenhle extensions. Outside the radius (Evander, Kinross, outer Embalenhle), we can't currently deliver. Enter your address in the hero to check.",
  },
  {
    q: "How long does delivery actually take?",
    a: "Average 25 minutes from order to door. Each restaurant shows a live, traffic-aware prep band on its card. If the actual delivery is more than 5 minutes off our estimate, delivery is free.",
  },
  {
    q: "How can I pay?",
    a: "Card (Visa or Mastercard via Paystack), SnapScan, Instant EFT through Ozow, or cash on delivery to the rider. The full ZAR total including delivery, service fee and any tip is shown before you place the order.",
  },
  {
    q: "What does delivery cost?",
    a: "Flat R 15 for the first 3 km, then R 5 per additional kilometre up to the 8 km zone limit. A small service fee (5%, capped between R 5 and R 25) applies.",
  },
  {
    q: "What about food allergies or special instructions?",
    a: 'Every menu item carries allergen and dietary tags pulled directly from the kitchen. You can also pin custom notes to a rider — "no peanuts, leave at gate, dog is friendly" — at checkout.',
  },
];
