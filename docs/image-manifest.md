# UmuziKos — Image Generation Manifest

Every placeholder in the prototype, mapped to a generation prompt and target file.
Use Midjourney / DALL-E 3 / Stable Diffusion / Imagen / Flux — whichever fits the budget.

**Brand constraints (apply to every image):**
- Palette: white + black + UmuziKos orange `#F97316`
- Mood: warm, honest, local, modern South African — *not* glossy stock-photo style
- Setting: Secunda, Mpumalanga; Lake Umuzi Waterfront; highveld vibe
- People (where shown): mix of SA demographics, real-looking, no airbrushed faces
- Avoid: generic Western restaurant photos, neon, "Asian fusion" clichés, glow effects

**File path convention:** `public/img/{slot}.jpg` (use webp where possible). Reference from React as `/img/{slot}.webp`.

---

## 1. Restaurant hero photos (7 images · 16:9, 1920×1080)

Each kitchen's signature scene — used at the top of S-020 (Restaurant Detail).

| File | Restaurant | Prompt |
|---|---|---|
| `r-boesies-hero.webp` | Boesies | Interior of a Secunda steakhouse, golden hour light through windows, chunky wooden tables, open flame visible at the pass, a plated 250g rump steak with beer-batter chips and peppercorn jus in the foreground, slightly out-of-focus diners in the background. Photorealistic food-magazine style, 35mm lens, warm tones. |
| `r-bosveld-lapa-hero.webp` | Bosveld Lapa | Authentic South African braai — open-flame grill loaded with lamb chops, boerewors, and sosaties. Smoke rising. Cast-iron potjie on coals to the side. A reed thatched lapa overhead. Late afternoon highveld light. Halaal-certified kitchen, no alcohol visible. Photorealistic. |
| `r-dros-hero.webp` | DROS | Classic SA family pub-and-grill interior: dark wood booths, brass details, a sizzling rump steak with chips arriving at a table. Family of four mid-meal, warm and unstaged. Soft tungsten lighting. Photorealistic, candid family-restaurant feel. |
| `r-eish-hero.webp` | Eish!! South African Kitchen | Township-inspired street kitchen, vibrant: a full-house kota being assembled — quarter loaf, polony, Russian, chips, atchar, fried egg on top — at a busy pass. Hands of the chef visible. Halaal-certified. Bright daylight, real grease and steam. Documentary photography style. |
| `r-ocean-basket-hero.webp` | Ocean Basket | Mediterranean-style seafood spread on a wooden table: grilled calamari, hake and chips, a sushi platter, lemon wedges, tartare sauce. Bright, fresh, coastal. Even though we're in Mpumalanga, the photo evokes the sea. Top-down 45° angle. Photorealistic. |
| `r-moo-moo-hero.webp` | Moo Moo Steakhouse & Wine Bar | Fine-dining steakhouse atmosphere: dramatically lit 300g fillet with bone marrow, jus, asparagus, dauphinoise. A glass of red wine in the background. Dark moody table, candlelight, marble plate. Cinematic shallow depth of field. Photorealistic. |
| `r-lake-umuzi-brewing-hero.webp` | Lake Umuzi Brewing Co. | Craft brewery taproom: a tasting flight of four beers in branded glasses, a smashburger with chips, soft pretzel with cheese sauce. Industrial wood-and-steel interior, fairy lights, brewing tanks visible in background. Live music vibe (guitar leaning against a wall). Photorealistic. |

---

## 2. Restaurant menu items (35 images · 1:1 square, 800×800)

Top-down or 45° hero shots of each dish. Used in S-020 menu list thumbnails and S-021 item detail.

### Boesies (5 items)
| File | Item | Prompt |
|---|---|---|
| `r-boesies-rump.webp` | 250g rump steak & chips | Top-down: 250g rump steak on a dark wooden board, beer-batter chips piled to the side, small jug of peppercorn jus, sprig of rosemary, scattered sea salt. Dramatic side lighting. |
| `r-boesies-mixed-grill.webp` | Mixed grill platter | Generous mixed-grill platter: rump, boerewors coil, lamb chop, chicken thigh, with chips, pap-and-relish, monkey-gland sauce. Cast-iron platter on rustic wood. |
| `r-boesies-burger.webp` | Boesies burger | Hand-held shot of a 200g chuck-and-brisket burger, smoked cheddar, bacon jam, brioche bun. Side of skin-on fries. Slight steam. |
| `r-boesies-livers.webp` | Chicken livers peri-peri | Cast-iron skillet of brandy-cream peri-peri chicken livers, sliced onion, toasted bread on the side, sprinkle of fresh parsley. Steam rising. |
| `r-boesies-malva.webp` | Malva pudding | Square slice of warm malva pudding in a small ceramic dish, vanilla custard pouring over the top mid-air, dusting of icing sugar. Cosy. |

### Bosveld Lapa (5 items)
| File | Item | Prompt |
|---|---|---|
| `r-bosveld-chops.webp` | Karoo lamb chops | Three thick Karoo lamb chops just off the braai, char marks visible, on a wooden board with putu pap and chakalaka on the side. Smoky. |
| `r-bosveld-wors.webp` | Boerewors & pap | Coil of boerewors next to a generous portion of putu pap, drenched in tomato-onion sous (sheba). Enamel plate, rustic. |
| `r-bosveld-sosatie.webp` | Sosatie skewers | Four beef-and-apricot sosaties on wooden skewers, glistening from the marinade, side salad of tomato and onion. |
| `r-bosveld-broodjie.webp` | Braaibroodjie | Toasted braaibroodjie cut diagonally, melted cheese stringing out, tomato/onion/chutney visible. Char marks from the grid. |
| `r-bosveld-koeksister.webp` | Koeksister | Two plaited koeksisters dripping in syrup on a small plate, lit from the side, syrup pooling. |

### DROS (5 items)
| File | Item | Prompt |
|---|---|---|
| `r-dros-rump.webp` | DROS rump (300g) | 300g rump on a black plate, peppercorn sauce, mountain of crinkle-cut chips, small salad. Classic SA steakhouse plating. |
| `r-dros-eisbein.webp` | Eisbein & sauerkraut | Roasted pork knuckle, crispy skin, with sauerkraut, mustard pot, rye bread. Hearty German-SA plating. |
| `r-dros-calamari.webp` | Calamari basket | Crispy calamari rings in a paper-lined wire basket, lemon wedges, tartare in a ramekin, fries underneath. |
| `r-dros-ribs.webp` | Ribs & wings combo | Sticky BBQ pork ribs and a row of chicken wings on a wooden board with slaw and chips. |
| `r-dros-brownie.webp` | Brownie & ice cream | Warm chocolate brownie with a scoop of vanilla ice cream, fudge sauce pour mid-shot. Casual dessert plating. |

### Eish!! South African Kitchen (5 items)
| File | Item | Prompt |
|---|---|---|
| `r-eish-kota.webp` | Full house kota | Authentic full-house kota: quarter loaf of bread hollowed out, packed with polony, Russian, cheese, fried egg, chips, drizzle of atchar. Hand reaching in. Bright daylight. |
| `r-eish-bunny.webp` | Lamb bunny chow | Quarter loaf hollowed out, filled with slow-cooked Durban lamb curry, side sambals (carrot, onion), bread cube on top. Vivid, steaming. |
| `r-eish-vetkoek.webp` | Vetkoek & savoury mince | Two house vetkoek split open and filled with beef mince, atchar on the side. Casual plating on a paper-lined tray. |
| `r-eish-wrap.webp` | Spicy atchar wrap | Toasted roti wrap filled with chicken livers, mango atchar, fresh red chilli. Half-wrapped in paper, hand-held. |
| `r-eish-amasi.webp` | Amasi & koeksister | A small bowl of cultured milk (amasi) beside a single syrup-soaked koeksister on a wooden board. Simple, traditional. |

### Ocean Basket (5 items)
| File | Item | Prompt |
|---|---|---|
| `r-ocean-calamari.webp` | Calamari & chips | Grilled calamari rings on a white plate with lemon, tartare in a small cup, side of chips, parsley garnish. Coastal feel. |
| `r-ocean-salmon-nigiri.webp` | Salmon nigiri (6 pieces) | Six pieces of salmon nigiri on a slate, fresh wasabi, pickled ginger, chopsticks. Clean, minimal sushi presentation. |
| `r-ocean-hake.webp` | Hake & chips | Crispy beer-battered hake fillet with chips, mushy peas, tartare in a ramekin, lemon wedge. Bright daylight. |
| `r-ocean-sushi-platter.webp` | Sushi platter for one | Twelve pieces of mixed sushi (nigiri, maki, salmon roses) on a slate or wooden board, wasabi and ginger. Top-down. |
| `r-ocean-greek.webp` | Greek salad | A generous Greek salad: feta, kalamata olives, cucumber, tomato, red onion, oregano, olive oil drizzle. Mediterranean colours. |

### Moo Moo Steakhouse & Wine Bar (5 items)
| File | Item | Prompt |
|---|---|---|
| `r-moo-fillet.webp` | 300g fillet, bone marrow | A 300g fillet medium-rare, sliced to show the centre, with a piece of roasted bone marrow on top, bordelaise pooling, asparagus and dauphinoise on the side. Marble plate, candlelight, fine-dining cinematic. |
| `r-moo-wellington.webp` | Beef Wellington | Slice of beef Wellington showing the pink centre, mushroom duxelles, golden puff pastry. Pool of red wine jus. Fine-dining plating. |
| `r-moo-salmon.webp` | Pan-seared salmon | Crispy-skin Norwegian salmon fillet on baby spinach, lemon-caper butter glaze, microgreen garnish. Bright, clean fine-dining. |
| `r-moo-cote.webp` | Côte de boeuf | A 1kg dry-aged ribeye on the bone, sliced and arranged on a wooden board, with sides ramekins and salt cellars. Sharing-style presentation. Cinematic. |
| `r-moo-brulee.webp` | Crème brûlée | A small ramekin of crème brûlée, torched sugar crust cracked open with a spoon revealing custard. Sprig of mint, side berries. |

### Lake Umuzi Brewing Co. (5 items)
| File | Item | Prompt |
|---|---|---|
| `r-lake-fishchips.webp` | Beer-battered fish & chips | Generous beer-battered hake with thick-cut chips, mushy peas, tartare, lemon. Served on newspaper-style paper inside a wire basket. Pub feel. |
| `r-lake-smashburger.webp` | Smashburger | Double-stack smashburger: thin patties with melty American cheese, pickles, special sauce, brioche bun. Side of fries. Hand-held casual shot. |
| `r-lake-wings.webp` | Brewery wings (8 pc) | Eight wings tossed in honey-mustard sauce, on parchment, with celery sticks and blue cheese dip. |
| `r-lake-pretzel.webp` | Pretzel & cheese sauce | Soft pretzel on a wooden board with a small bowl of ale-cheddar sauce and a smear of mustard. Casual brewery plating. |
| `r-lake-flight.webp` | Beer tasting flight | Four 150ml beer glasses in a wooden tasting paddle, each a different style (pale, IPA, stout, lager). Brewery-branded coasters. |

---

## 3. Brand & marketing photos (7 images)

| File | Where used | Aspect · Size | Prompt |
|---|---|---|---|
| `app-hero-food.webp` | Hero of marketing variants | 5:6 · 1000×1200 | Flat-lay shot of mixed waterfront food: a kota in the foreground, sushi platter top-right, boerewors roll, samoosa platter. UmuziKos branded napkin visible. Hands reaching in. Warm wood table. Top-down 90°. |
| `app-phone-screenshot.webp` | Phone bezel screen | 9:19 · 720×1520 | Screenshot of the customer app home screen (S-010) running on an iPhone — pull the actual rendered Next.js page once images are in place. (Generate this *last*, after dish photos exist.) |
| `secunda-coverage-map.webp` | Coverage section + S-053 helper | 5:4 · 1200×960 | Stylised illustrated map of Secunda, Mpumalanga: Lake Umuzi Waterfront marked with a pin, 8 km radius shown as a translucent orange circle, suburbs labelled (Bracken, Goedehoop, Trichardt, Embalenhle), highways traced. Editorial map style — not Google Maps screenshot. UmuziKos brand colours. |
| `driver-sipho.webp` | S-040 driver card (avatar fallback) | 1:1 · 400×400 | Friendly young South African motorbike rider, mid-20s, wearing a UmuziKos branded jacket (orange/black), helmet on his arm, leaning against a Honda CB125F. Neutral background. Photorealistic, candid headshot — not corporate stock. |
| `driver-thandi.webp` | Alternate driver | 1:1 · 400×400 | Friendly South African motorbike rider, female, late 20s, UmuziKos jacket, helmet held in one hand, Honda CB125F just visible. Authentic candid portrait. |
| `lake-umuzi-waterfront.webp` | Onboarding welcome step 1 | 5:6 · 1000×1200 | Wide shot of the Lake Umuzi Waterfront complex at golden hour: restaurants lit up, the lake reflective, palm trees, modern South African leisure architecture. Aspirational but real. |
| `motorbike-action.webp` | Onboarding welcome step 2 | 5:6 · 1000×1200 | Motion-blur action shot of a Honda CB125F with UmuziKos branding riding along a Secunda street at dusk, food delivery box on the back. Cinematic. |

---

## 4. Optional / nice-to-have (~8 images)

| File | Where | Prompt |
|---|---|---|
| `promo-firstorder.webp` | S-013 promotion card backgrounds | Atmospheric food shot themed around "first order" — a kota in soft light, branded UmuziKos napkin tucked under. Used as decorative background. |
| `promo-r0delivery.webp` | S-013 | Motorbike rider mid-action, blurred motion, UmuziKos orange dominant. |
| `promo-wors50.webp` | S-013 | Bosveld Lapa boerewors close-up, sizzling, fire just visible. |
| `promo-moowine.webp` | S-013 | Wine glass tilted next to a slice of Moo Moo's beef Wellington. |
| `avatar-director.webp` | Default user avatar | 1:1 · 400×400 | Generic friendly professional headshot, SA demographic, neutral background. Used as placeholder for "Director Demo" user. |
| `splash-logo.svg` | S-001 splash brand mark | SVG · 240×60 | UmuziKos wordmark only (no photo). Stays as text rendering; could be exported from Figma. |
| `category-tile-*.webp` | Home category grid (10 tiles) | 1:1 · 200×200 | Stylised icon-illustration backgrounds per cuisine (Grill, Braai, Steakhouse, Burgers, Seafood, Sushi, Street food, Halaal, Craft beer). Flat illustration style. Optional — current SVG line icons work fine. |
| `review-headshots-*.webp` | S-022 reviewer avatars (×5) | 1:1 · 100×100 | Generic friendly SA headshots for reviewers — Thandi M., Pieter v.d.B., Aisha K., Lerato S., Johan P. |

---

## 5. How to wire images into the prototype

Once you have files in `public/img/*.webp`, swap the `<ImgSlot label="..." />` calls for proper `<img>` or Next.js `<Image>` tags. The shape/aspect ratio of every slot is already locked in CSS — drop-in replacement.

For `RestaurantTile`'s `.media` element:
```tsx
// before
<ImgSlot label={r.name} radius={0} />
// after
<Image src={`/img/r-${r.slug}-hero.webp`} alt={r.name} fill style={{ objectFit: "cover" }} />
```

For menu items in `RestaurantScreen`:
```tsx
<Image src={`/img/r-${r.slug}-${slugifyItem(m.name)}.webp`} alt={m.name} fill style={{ objectFit: "cover" }} />
```

Add this helper to `data.ts` for systematic file naming:
```ts
export const imgPath = (kind: "hero" | "item", slug: string, itemSlug?: string) =>
  kind === "hero" ? `/img/r-${slug}-hero.webp` : `/img/r-${slug}-${itemSlug}.webp`;
```

---

## 6. Total count

- Restaurant heroes: **7**
- Menu items: **35**
- Brand/marketing: **7**
- Optional/nice-to-have: **~8** (extras + reviewer avatars)

**Bottom line: ~49 images for full visual coverage; 42 for the core experience.**

Recommend generating **menu items + heroes first** (42 images, immediate visual impact in S-020/S-021). Coverage map + driver portraits + welcome carousel art are next. App-screenshot composite happens last, once the dish photos are in.
