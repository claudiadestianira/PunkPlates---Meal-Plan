import { Menu } from '../types';

export const SEED_MENUS: Menu[] = [
  {
    id: 'seed-ayam-lada-hitam',
    name: 'Ayam Lada Hitam 🍗🌶️',
    description: 'Savory stir-fried chicken chunks coated in a luscious, coarse black pepper and sweet soy sauce with crisp bell peppers.',
    imageUrls: ['https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Sauté sliced garlic, ginger, and onion.\n2. Add diced chicken breast, cook until color turns.\n3. Pour black pepper sauce, sweet soy sauce, and oyster sauce.\n4. Throw in green and red bell peppers, toss on high heat until crisp-tender.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Chicken Breast', quantity: 330, unit: 'g' },
      { name: 'Black Pepper (Coarse)', quantity: 2, unit: 'tsp' },
      { name: 'Sweet Soy Sauce', quantity: 1.5, unit: 'tbsp' },
      { name: 'Oyster Sauce', quantity: 1.5, unit: 'tbsp' },
      { name: 'Bell Peppers', quantity: 1, unit: 'piece' },
      { name: 'Garlic', quantity: 3, unit: 'clove' }
    ],
    createdAt: '2026-05-24T00:01:00Z'
  },
  {
    id: 'seed-pakcoy-bawang-putih',
    name: 'Pakcoy Bawang Putih 🥬🧄',
    description: 'Crisp baby bok choy blanched to perfection, topped with a gorgeous mound of crispy fried garlic and hot oil.',
    imageUrls: ['https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Blanch baby bok choy with a pinch of salt and oil for 1 minute, drain, and arrange nicely.\n2. Fry minced garlic in generous sesame oil until golden brown.\n3. Pour hot garlic oil over wok-fried soy and oyster sauce base directly onto the pakcoy.',
    category: 'Asian',
    ingredients: [
      { name: 'Baby Bok Choy (Pakcoy)', quantity: 300, unit: 'g' },
      { name: 'Garlic', quantity: 6, unit: 'clove' },
      { name: 'Oyster Sauce', quantity: 1, unit: 'tbsp' },
      { name: 'Sesame Oil', quantity: 1, unit: 'tbsp' },
      { name: 'Soy Sauce', quantity: 1, unit: 'tsp' }
    ],
    createdAt: '2026-05-24T00:02:00Z'
  },
  {
    id: 'seed-soy-chicken-garlic',
    name: 'Soy Chicken Garlic 🍗🧄',
    description: 'Juicy chicken thighs braised in aromatic dark garlic soy broth, infused with fresh ginger and shallots.',
    imageUrls: ['https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Marinate chicken with minced garlic and light soy sauce.\n2. Sear chicken skin-side down in a hot pan.\n3. Add garlic cloves, ginger, and dark soy broth.\n4. Simmer until the sauce reduces to a beautiful mahogany glaze.',
    category: 'Asian',
    ingredients: [
      { name: 'Chicken Thigh', quantity: 400, unit: 'g' },
      { name: 'Garlic', quantity: 8, unit: 'clove' },
      { name: 'Light Soy Sauce', quantity: 2, unit: 'tbsp' },
      { name: 'Dark Soy Sauce', quantity: 1, unit: 'tbsp' },
      { name: 'Ginger', quantity: 30, unit: 'g' }
    ],
    createdAt: '2026-05-24T00:03:00Z'
  },
  {
    id: 'seed-sup-bakso',
    name: 'Sup Bakso 🍲🍢',
    description: 'Warm, clear, and rich beef broth laden with savory meatballs, rice noodles, bok choy, and crispy fried shallots.',
    imageUrls: ['https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Boil beef bones with celery, onion, and cloves to make a clear soup.\n2. Drop beef meatballs in, simmer until they float to the surface.\n3. Turn off, season.\n4. Serve over rice vermicelli, pakcoy, green onion, and a hefty scattering of fried shallots.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Beef Meatballs (Bakso)', quantity: 12, unit: 'piece' },
      { name: 'Clear Beef Broth', quantity: 1, unit: 'L' },
      { name: 'Rice Vermicelli', quantity: 100, unit: 'g' },
      { name: 'Garlic', quantity: 4, unit: 'clove' },
      { name: 'Fried Shallots', quantity: 2, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T00:04:00Z'
  },
  {
    id: 'seed-ayam-kemangi',
    name: 'Ayam Kemangi 🍗🌿',
    description: 'Aromatic Indonesian stir-fried herbed chicken tossed with abundance of sweet fresh lemon basil leaves.',
    imageUrls: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Sauté blended spices (shallot, garlic, turmeric, curly chili, ginger) and lemongrass.\n2. Mix in diced chicken, toss until fully coated.\n3. Pour a splash of water, boil down until dry.\n4. Fold in heaps of fresh, sweet Kemangi (Lemon Basil) leaves just before serving.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Chicken Breast', quantity: 350, unit: 'g' },
      { name: 'Fresh Lemon Basil (Kemangi)', quantity: 2, unit: 'bunch' },
      { name: 'Shallots', quantity: 5, unit: 'piece' },
      { name: 'Curly Red Chili', quantity: 4, unit: 'piece' },
      { name: 'Lemongrass', quantity: 1, unit: 'piece' }
    ],
    createdAt: '2026-05-24T00:05:00Z'
  },
  {
    id: 'seed-enoki-tumis',
    name: 'Enoki Tumis 🍄🍲',
    description: 'Quick stir-fried high-nutrient enoki mushrooms with a beautiful mix of garlic, chili, and light soy sauce.',
    imageUrls: ['https://images.unsplash.com/photo-1519996521430-02b798c1d881?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Cut off the tough base of the enoki bundles, wash quickly and pat dry.\n2. Sauté garlic and red pepper rings under high heat.\n3. Add enoki mushrooms and toss recursively for 1-2 minutes max.\n4. Season with light soy, white pepper, and sesame oil.',
    category: 'Asian',
    ingredients: [
      { name: 'Enoki Mushrooms', quantity: 250, unit: 'g' },
      { name: 'Garlic', quantity: 3, unit: 'clove' },
      { name: 'Sesame Oil', quantity: 1, unit: 'tsp' },
      { name: 'Light Soy Sauce', quantity: 1, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T00:06:00Z'
  },
  {
    id: 'seed-ayam-bumbu-bali',
    name: 'Ayam Bumbu Bali 🍗🌶️',
    description: 'Traditional Balinese chicken simmered in an intensely sweet-spicy paste of chili, shallot, ginger, and lime leaves leaves.',
    imageUrls: ['https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Rub chicken with salt and lime juice, fry until slightly golden.\n2. Sauté Balinese spice paste with ginger, lemongrass, and kaffir lime leaves.\n3. Simmer fried chicken in spices with palm sugar and sweet soy until dry and aromatic.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Chicken Bone-in Drumettes', quantity: 500, unit: 'g' },
      { name: 'Red Chili Peppers', quantity: 6, unit: 'piece' },
      { name: 'Shallots', quantity: 6, unit: 'piece' },
      { name: 'Kaffir Lime Leaves', quantity: 4, unit: 'piece' },
      { name: 'Palm Sugar', quantity: 1, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T00:07:00Z'
  },
  {
    id: 'seed-chinese-tomato-egg',
    name: 'Chinese Tomato Egg 🍳🍅',
    description: 'Classic Chinese home-style comfort food of fluffy scrambled eggs slowly tossed with sweet, tangy plum tomato sauce.',
    imageUrls: ['https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Whisk eggs with a dash of white pepper and sesame oil; scramble softly, slide out of pan.\n2. Pan-sear tomato wedges until tender and juicy.\n3. Add sugar, ketchup, and splash of water.\n4. Fold scrambled eggs back in, garnish with lots of green scallions.',
    category: 'Asian',
    ingredients: [
      { name: 'Eggs', quantity: 4, unit: 'piece' },
      { name: 'Ripe Plum Tomatoes', quantity: 3, unit: 'piece' },
      { name: 'Scallions', quantity: 2, unit: 'bunch' },
      { name: 'Sugar', quantity: 1, unit: 'tsp' },
      { name: 'White Pepper', quantity: 0.25, unit: 'tsp' }
    ],
    createdAt: '2026-05-24T00:08:00Z'
  },
  {
    id: 'seed-ayam-bawang-putih',
    name: 'Ayam Bawang Putih 🍗🧄',
    description: 'Golden, crispy, savory fried chicken packed with flavor from skin-on roasted whole garlic bulbs and coriander.',
    imageUrls: ['https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Marinate chicken bone-in with crushed garlic, coriander powder, salt, and cornstarch for 1 hr.\n2. Heat deep oil, add chicken pieces and whole unpeeled slightly crushed garlic cloves.\n3. Fry recursively until chicken is highly crispy and garlic cloves are caramelized soft inside.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Chicken Drumsticks', quantity: 500, unit: 'g' },
      { name: 'Garlic Bulbs (Whole)', quantity: 2, unit: 'piece' },
      { name: 'Coriander Powder', quantity: 1.5, unit: 'tbsp' },
      { name: 'Cornstarch', quantity: 3, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T00:09:00Z'
  },
  {
    id: 'seed-capcay',
    name: 'Capcay 🥦🥕',
    description: 'Indonesian-Chinese stir-fried rainbow vegetables (cauliflower, carrots, mushrooms) with savory oyster-chicken garlic sauce.',
    imageUrls: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Sauté garlic and ginger slice.\n2. Sauté chicken slices and fishballs.\n3. Add hard vegetables (carrots, baby corn, cauliflower), cook with broth.\n4. Add snow peas and cabbage, season with oyster sauce, soy, salt, finish with cornstarch slurry.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Mixed Vegetables (Carrot, Cauliflower, Cabbage)', quantity: 300, unit: 'g' },
      { name: 'Chicken Breast Slices', quantity: 100, unit: 'g' },
      { name: 'Fishballs', quantity: 6, unit: 'piece' },
      { name: 'Oyster Sauce', quantity: 1.5, unit: 'tbsp' },
      { name: 'Cornstarch', quantity: 1, unit: 'tsp' }
    ],
    createdAt: '2026-05-24T00:10:00Z'
  },
  {
    id: 'seed-chicken-katsu-curry',
    name: 'Chicken Katsu Curry 🍛🍗',
    description: 'Extra crispy breaded panko chicken katsu with rich Japanese sweet honey-curry sauce over short-grain rice.',
    imageUrls: ['https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Coat chicken with flour, egg, and crunchy panko. Fry to shiny gold.\n2. Sauté sweet onion, carrot wedges, and potatoes. Simmer until fully tender.\n3. Whisk Japanese curry blocks until velvety smoothly melted.\n4. Slice chicken katsu, lay cleanly over rice, drench in curry.',
    category: 'Japanese',
    ingredients: [
      { name: 'Chicken Fillet', quantity: 300, unit: 'g' },
      { name: 'Panko Breadcrumbs', quantity: 1, unit: 'cup' },
      { name: 'Japanese Curry Roux Blocks', quantity: 100, unit: 'g' },
      { name: 'Carrot', quantity: 1, unit: 'piece' },
      { name: 'Potato', quantity: 1, unit: 'piece' }
    ],
    createdAt: '2026-05-24T00:11:00Z'
  },
  {
    id: 'seed-jamur-crispy-tiram',
    name: 'Jamur Crispy Tiram 🍄🥨',
    description: 'Cracking golden fried oyster mushrooms dusted with seasoning, crispy outside and wonderfully chewy inside.',
    imageUrls: ['https://images.unsplash.com/photo-1519996521430-02b798c1d881?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Clean oyster mushrooms, shred to bite sizes. Squeeze out excess moisture.\n2. Dip mushrooms in seasoned wet batter, then dredge generously in seasoned flour mixture.\n3. Deep fry in sizzling hot oil until ultra-crunchy and slightly puffed.',
    category: 'Asian',
    ingredients: [
      { name: 'White Oyster Mushrooms', quantity: 300, unit: 'g' },
      { name: 'All-Purpose Flour', quantity: 1.5, unit: 'cup' },
      { name: 'Garlic Powder', quantity: 1, unit: 'tsp' },
      { name: 'Baking Powder', quantity: 0.5, unit: 'tsp' }
    ],
    createdAt: '2026-05-24T00:12:00Z'
  },
  {
    id: 'seed-ayam-kalasan',
    name: 'Ayam Kalasan 🍗🥥',
    description: 'Famous Javanese sweet and savory spiced fried chicken boiled in young coconut water and finished with palm sugar gloss.',
    imageUrls: ['https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Simmer poultry bone-in with coconut water, spiced paste, star anise, sweet soy, and palm sugar until tenderized and core liquid evaporates.\n2. Swiftly flash fry in hot frying oil for just 1-2 minutes until skin is deeply bronze.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Whole Chicken Pieces', quantity: 700, unit: 'g' },
      { name: 'Pure Coconut Water', quantity: 500, unit: 'ml' },
      { name: 'Palm Sugar', quantity: 2, unit: 'tbsp' },
      { name: 'Lemongrass', quantity: 2, unit: 'piece' }
    ],
    createdAt: '2026-05-24T00:13:00Z'
  },
  {
    id: 'seed-i-fu-mie',
    name: 'I Fu Mie 🍜🍤',
    description: 'Birds-nest styled deep-fried crispy noodles smothered with a rich, steaming hot stir-fry of mixed prawns, chicken, and greens.',
    imageUrls: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Boil noodles, shape like a bird nest, deep fry until completely crispy. Lay on platter.\n2. Sauté garlic with shrimp, chicken breast slices, and various veggies (cai xin, mushroom).\n3. Pour light broth, season, and thicken beautifully with cornstarch. Pour onto noodles.',
    category: 'Asian',
    ingredients: [
      { name: 'Egg Noodles', quantity: 200, unit: 'g' },
      { name: 'Shrimp', quantity: 8, unit: 'piece' },
      { name: 'Chicken Breast', quantity: 100, unit: 'g' },
      { name: 'Cai Xin (Sweet Mustard)', quantity: 1, unit: 'bunch' },
      { name: 'Cornstarch', quantity: 1.5, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T00:14:00Z'
  },
  {
    id: 'seed-ayam-pad-kra-pao',
    name: 'Ayam Pad Kra Pao 🌶️🌿',
    description: 'Thai classic stir-fried spicy minced chicken tossed recursively with generous holy basil, hot bird eye chili, and a crispy egg.',
    imageUrls: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Pound garlic and hot bird chili in mortar and pestle.\n2. Fry paste until intensely fragrant, add minced chicken, scramble dry.\n3. Season with fish sauce, oyster sauce, sugar, dark sweet soy.\n4. Fold in heaps of holy basil leaves and serve with high-heat fried egg.',
    category: 'Asian',
    ingredients: [
      { name: 'Minced Chicken', quantity: 300, unit: 'g' },
      { name: 'Holy Basil Leaves', quantity: 1.5, unit: 'cup' },
      { name: 'Bird Eye Chili', quantity: 5, unit: 'piece' },
      { name: 'Garlic', quantity: 4, unit: 'clove' },
      { name: 'Fish Sauce', quantity: 1, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T00:15:00Z'
  },
  {
    id: 'seed-tahu-shimeji',
    name: 'Tahu Shimeji',
    description: 'Wobbly melt-in-the-mouth soft egg tofu cubes pan-fried to golden skin, simmered in premium garlic shimeji mushroom gravy.',
    imageUrls: ['https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Cut tofu to rounds, coat with cornstarch, pan fry all sides carefully, rest.\n2. Sauté garlic, ginger, green onions, and separated shimeji mushrooms.\n3. Add light stock, oyster sauce, sesame oil, and sweet sauce.\n4. Toss in the golden tofu, thicken beautifully with starch.',
    category: 'Asian',
    ingredients: [
      { name: 'Egg Tofu Tubes', quantity: 2, unit: 'piece' },
      { name: 'Shimeji Mushrooms', quantity: 150, unit: 'g' },
      { name: 'Garlic', quantity: 3, unit: 'clove' },
      { name: 'Oyster Sauce', quantity: 1, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T00:16:00Z'
  },
  {
    id: 'seed-marry-me-chicken',
    name: 'Marry Me Chicken',
    description: 'Ultra-creamy Tuscan chicken skillet spiced with sweet sundried tomatoes, fresh herbs, and premium grated Parmesan.',
    imageUrls: ['https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Sear seasoned chicken breast cutlets, remove.\n2. Sauté minced garlic in same pan. Add chicken broth, heavy cream, sundried tomato tidbits, Italian herbs, and Parmesan.\n3. Simmer until thicken, return chicken, top with fresh basil.',
    category: 'American',
    ingredients: [
      { name: 'Chicken Breast Cutlets', quantity: 450, unit: 'g' },
      { name: 'Sundried Tomatoes', quantity: 80, unit: 'g' },
      { name: 'Heavy Cream', quantity: 150, unit: 'ml' },
      { name: 'Parmesan Cheese', quantity: 50, unit: 'g' },
      { name: 'Garlic', quantity: 3, unit: 'clove' }
    ],
    createdAt: '2026-05-24T00:17:00Z'
  },
  {
    id: 'seed-tahu-goreng-mentega',
    name: 'Tahu Goreng Mentega',
    description: 'Crisp-fried firm white tofu cubes glazed in high-aroma butter, garlic, sweet soy sauce, and tangy Worcestershire sauce.',
    imageUrls: ['https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Fry or air-fry tofu cubes until slightly crispy skin.\n2. Melt generous salted butter, sauté sweet yellow onions and garlic.\n3. Add sweet soy sauce, Worcestershire, and oyster sauce.\n4. Toss tofu until coated and glossy.',
    category: 'Other',
    ingredients: [
      { name: 'Firm Tofu Block', quantity: 400, unit: 'g' },
      { name: 'Salted Butter', quantity: 3, unit: 'tbsp' },
      { name: 'Worcestershire Sauce', quantity: 1.5, unit: 'tbsp' },
      { name: 'Sweet Soy Sauce', quantity: 2, unit: 'tbsp' },
      { name: 'Onion', quantity: 0.5, unit: 'piece' }
    ],
    createdAt: '2026-05-24T00:18:00Z'
  },
  {
    id: 'seed-soy-chicken',
    name: 'Soy Chicken',
    description: 'Glazed Cantonese soy sauce chicken infused dry with Chinese yellow rock sugar, star anise, and whole warm cinnamon sticks.',
    imageUrls: ['https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=85'],
    recipeType: 'written',
    recipeText: '1. Sauté ginger slices, scapes, star anise, and cinnamon.\n2. Add soy sauce, rock sugar, and vegetable stock. Lower in whole thighs.\n3. Simmer recursively over medium-low heat for 30 minutes, basting with sauce until mahogany deep.',
    category: 'Asian',
    ingredients: [
      { name: 'Chicken Thighs (Skin-on)', quantity: 500, unit: 'g' },
      { name: 'Light Soy Sauce', quantity: 100, unit: 'ml' },
      { name: 'Chinese Rock Sugar', quantity: 40, unit: 'g' },
      { name: 'Star Anise', quantity: 2, unit: 'piece' },
      { name: 'Cinnamon Stick', quantity: 1, unit: 'piece' }
    ],
    createdAt: '2026-05-24T00:19:00Z'
  },
  {
    id: 'seed-spaghetti-mushroom-carbonara',
    name: 'Spaghetti Mushroom Carbonara 🍄',
    description: 'Elegant cream-free Roman carbonara combined with buttery wild button mushrooms, garlic, yolk, and Pecorino.',
    imageUrls: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Boil spaghetti al dente. Save cup of starchy pasta water.\n2. Sauté chopped button mushrooms with garlic in butter until sweet.\n3. Whisk egg yolk, whole egg, and grated Pecorino/Parmesan.\n4. Turn off skillet, toss hot noodles with mushrooms, pour egg mix, splash pasta water, stir intensely off heat to emulsify.',
    category: 'Italian',
    ingredients: [
      { name: 'Spaghetti Noodles', quantity: 180, unit: 'g' },
      { name: 'White Button Mushrooms', quantity: 120, unit: 'g' },
      { name: 'Egg Yolk', quantity: 2, unit: 'piece' },
      { name: 'Parmesan Cheese', quantity: 40, unit: 'g' },
      { name: 'Salted Butter', quantity: 1.5, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T00:20:00Z'
  },
  {
    id: 'seed-ayam-saus-thai',
    name: 'Ayam Saus Thai',
    description: 'Crunchy golden chicken pops bathed in sweet, hot, and sour Thai chili dressing, loaded with fresh lemongrass and lime leaves.',
    imageUrls: ['https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Fry chicken pops in breading till crispy. Drain.\n2. Whisk sweet Thai chili sauce, lime juice, bird eye chilis, sliced shallots, and fresh mint.\n3. Pour the cold Thai sweet dressing over sizzling hot poultry and toss to glisten.',
    category: 'Asian',
    ingredients: [
      { name: 'Chicken Breast Pops', quantity: 350, unit: 'g' },
      { name: 'Thai Sweet Chili Sauce', quantity: 4, unit: 'tbsp' },
      { name: 'Lime Juice', quantity: 1.5, unit: 'tbsp' },
      { name: 'Bird Eye Chili', quantity: 3, unit: 'piece' },
      { name: 'Shallots', quantity: 3, unit: 'piece' }
    ],
    createdAt: '2026-05-24T00:21:00Z'
  },
  {
    id: 'seed-telur-kukus',
    name: 'Telur Kukus',
    description: 'High-tenderness Asian savory steamed custard eggs, smooth like silk, infused with seasoned soy-oil and green onion.',
    imageUrls: ['https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Gently whisk eggs with warm dashi water or warm chicken stock (ratio 1:2) and a pinch of salt.\n2. Strain through fine mesh into ramekins.\n3. Cover with foil, steam on low-gentle boiling water for 12 mins.\n4. Finish with splash of hot sesame oil-soy sauce.',
    category: 'Asian',
    ingredients: [
      { name: 'Eggs', quantity: 2, unit: 'piece' },
      { name: 'Chicken Stock (Warm)', quantity: 200, unit: 'ml' },
      { name: 'Sesame Oil', quantity: 1, unit: 'tsp' },
      { name: 'Light Soy Sauce', quantity: 1, unit: 'tsp' }
    ],
    createdAt: '2026-05-24T00:22:00Z'
  },
  {
    id: 'seed-ayam-pok-pok',
    name: 'Ayam Pok Pok',
    description: 'Crisp tiny Taiwanese chicken nuggets spiced generously with white pepper, dynamic salt, and high-impact fried basil.',
    imageUrls: ['https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Marinate micro chicken cubes in soy, white wine, garlic, and Chinese five spice.\n2. Coat in tapioca flour starch.\n3. Deep-fry on hot oil until popping crunchy. Flash-fry fresh Thai basil for 10 seconds, mix chicken and dust with pepper-salt seasoning.',
    category: 'Asian',
    ingredients: [
      { name: 'Chicken Breast Cutlets', quantity: 300, unit: 'g' },
      { name: 'Tapioca Starch', quantity: 0.75, unit: 'cup' },
      { name: 'Chinese Five Spice', quantity: 0.5, unit: 'tsp' },
      { name: 'Thai Basil Leaves', quantity: 1, unit: 'bunch' },
      { name: 'White Pepper Powder', quantity: 1, unit: 'tsp' }
    ],
    createdAt: '2026-05-24T00:23:00Z'
  },
  {
    id: 'seed-salad-kewpie-wijen',
    name: 'Salad Kewpie Wijen',
    description: 'Mixed garden greens, crisp shredded cabbage, carrots, and sweet cherry tomatoes tossed with creamy Japanese Kewpie roasted sesame sauce.',
    imageUrls: ['https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Wash and spin shred romaine lettuce, red cabbage, and carrot ribbons.\n2. Toss them cold in a large mixing bowl.\n3. Drizzle generously with roasted sesame Kewpie salad dressing. Top with crispy croutons.',
    category: 'Salad',
    ingredients: [
      { name: 'Romaine Lettuce', quantity: 150, unit: 'g' },
      { name: 'Shredded Red Cabbage', quantity: 50, unit: 'g' },
      { name: 'Ribbon Carrot', quantity: 1, unit: 'piece' },
      { name: 'Kewpie Roasted Sesame Dressing', quantity: 4, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T00:24:00Z'
  },
  {
    id: 'seed-ayam-katsu',
    name: 'Ayam Katsu',
    description: 'Crisp golden panko-crusted chicken fillet cutlet, tenderized and lightly spiced with Indonesian-Japanese fusion aromatics.',
    imageUrls: ['https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Bat and tenderize chicken breast fillets with mallet, season with garlic and pepper.\n2. Coat with flour, fresh beaten egg wash, and then dip in crunchy Japanese panko breadcrumbs.\n3. Deep fry on medium heat to a pristine honey-gold color.',
    category: 'Japanese',
    ingredients: [
      { name: 'Chicken Breast', quantity: 300, unit: 'g' },
      { name: 'Eggs', quantity: 1, unit: 'piece' },
      { name: 'Panko Breadcrumbs', quantity: 1, unit: 'cup' },
      { name: 'All-Purpose Flour', quantity: 0.25, unit: 'cup' }
    ],
    createdAt: '2026-05-24T00:25:00Z'
  },
  {
    id: 'seed-sup',
    name: 'Sup',
    description: 'Rustic clear chicken and fresh vegetable stew packed with carrots, potatoes, cabbage, celery, and cozy garlic oils.',
    imageUrls: ['https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Sauté garlic and shallots in butter until caramelized.\n2. Add water, bring to boil.\n3. Drop chicken pieces, simmer for soft stock.\n4. Boil diced potato, carrots, and sweet cabbage leaves until tender. Season with salt, white pepper, and celery.',
    category: 'Other',
    ingredients: [
      { name: 'Chicken Bone-in Soup Pieces', quantity: 300, unit: 'g' },
      { name: 'Potato', quantity: 2, unit: 'piece' },
      { name: 'Carrot', quantity: 2, unit: 'piece' },
      { name: 'Cabbage', quantity: 100, unit: 'g' },
      { name: 'Green Onion', quantity: 1, unit: 'bunch' }
    ],
    createdAt: '2026-05-24T00:26:00Z'
  },
  {
    id: 'seed-soto-ayam',
    name: 'Soto Ayam',
    description: 'Classic Indonesian yellow aromatic chicken soup enriched with fresh turmeric, ginger, lemongrass, glass noodles, and boiled egg.',
    imageUrls: ['https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Boil chicken pieces with aromatic turmeric paste, bay leaves, kaffir lime, and lemongrass.\n2. Take chicken out, shred thin, and fry quickly till dry.\n3. Arrange bowl with glass noodles, shredded cabbage, tomato, and chicken shreds.\n4. Pour boiling aromatic broth on top. Garnish with lime slice.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Chicken Drumstick', quantity: 450, unit: 'g' },
      { name: 'Lemongrass', quantity: 2, unit: 'piece' },
      { name: 'Turmeric Paste Blend', quantity: 1.5, unit: 'tbsp' },
      { name: 'Glass Noodles (Soun)', quantity: 80, unit: 'g' },
      { name: 'Boiled Egg', quantity: 1, unit: 'piece' }
    ],
    createdAt: '2026-05-24T00:27:00Z'
  },
  {
    id: 'seed-pecel',
    name: 'Pecel',
    description: 'Blanched bean sprouts, spinach, and water spinach doused generously in signature sweet-spicy roasted Javanese peanut dressing.',
    imageUrls: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Blanch long beans, bean sprouts, water spinach, and cabbage.\n2. Melt Javanese pecel peanut paste blocks in warm water until thick and smooth.\n3. Arrange veggies on a banana leaf or plate.\n4. Drizzle peanut sauce, top with crackers (peyek).',
    category: 'Indonesian',
    ingredients: [
      { name: 'Mixed Vegetables (Spinach, Bean Sprouts)', quantity: 250, unit: 'g' },
      { name: 'Javanese Peanut Paste Block', quantity: 150, unit: 'g' },
      { name: 'Rice cracknel (Peyek)', quantity: 3, unit: 'piece' }
    ],
    createdAt: '2026-05-24T00:28:00Z'
  },
  {
    id: 'seed-ayam-goreng-mentega',
    name: 'Ayam Goreng Mentega',
    description: 'Crisp seared chicken thighs tossed recursively with high-impact sweet soy, margarine butter, and lime juices.',
    imageUrls: ['https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Deep fry chicken chunks until crunchy brown.\n2. Melt butter/margarine, sauté sliced onion and garlic.\n3. Stir in Worcestershire, sweet soy sauce, and oyster sauce.\n4. Add chicken, toss tightly, finish with squeeze of fresh lime juice.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Chicken Pieces', quantity: 450, unit: 'g' },
      { name: 'Salted Butter', quantity: 4, unit: 'tbsp' },
      { name: 'Sweet Soy Sauce', quantity: 2, unit: 'tbsp' },
      { name: 'Worcestershire Sauce', quantity: 1, unit: 'tbsp' },
      { name: 'Lime', quantity: 0.5, unit: 'piece' }
    ],
    createdAt: '2026-05-24T00:29:00Z'
  },
  {
    id: 'seed-cream-soup',
    name: 'Cream Soup',
    description: 'Silky, rich, comforting cream soup loaded sweet corn, fresh mushrooms, and roasted shredded chicken.',
    imageUrls: ['https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Sauté celery and garlic in butter. Mix flour to create a quick roux.\n2. Squeeze in warm chicken broth slowly while whisking blockages out.\n3. Add warm cream, sweet corn kernel cup, and shredded cooked chicken breast.\n4. Simmer until beautifully viscous and glossy.',
    category: 'American',
    ingredients: [
      { name: 'Shredded Cooked Chicken', quantity: 150, unit: 'g' },
      { name: 'Sweet Corn Kernels', quantity: 100, unit: 'g' },
      { name: 'Heavy Cream', quantity: 100, unit: 'ml' },
      { name: 'Chicken Broth', quantity: 400, unit: 'ml' },
      { name: 'Butter', quantity: 2, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T00:30:00Z'
  },
  {
    id: 'seed-chicken-spinach-creamy',
    name: 'Chicken Spinach Creamy',
    description: 'Juicy skillet braised chicken breasts in loaded cream spinach sauce with caramelized garlic and nutmeg.',
    imageUrls: ['https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Season and brown chicken breast fillets in skillet, set aside.\n2. Melt butter, sauté minced garlic and onion.\n3. Add fresh baby spinach, cook until wilted.\n4. Pour heavy cream, stock, grated nutmeg, and let chicken return to bubble and simmer down.',
    category: 'American',
    ingredients: [
      { name: 'Chicken Breast Cutlets', quantity: 400, unit: 'g' },
      { name: 'Baby Spinach Leaves', quantity: 150, unit: 'g' },
      { name: 'Heavy Cream', quantity: 150, unit: 'ml' },
      { name: 'Garlic', quantity: 3, unit: 'clove' },
      { name: 'Nutmeg', quantity: 0.25, unit: 'tsp' }
    ],
    createdAt: '2026-05-24T00:31:00Z'
  },
  {
    id: 'seed-nasi-sosis',
    name: 'Nasi Sosis 🌭',
    description: 'Kid-friendly, speedy stir-fried cocktail chicken sausages glazed with sweet soy ketchup sauce over steaming rice.',
    imageUrls: ['https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Cut sausages into flower/cross patterns.\n2. Air fry or pan sauté in butter till they expand.\n3. Drizzle sweet soy sauce and ketchup, mix until thoroughly glazed.\n4. Serve on hot white rice with sunny-side egg.',
    category: 'American',
    ingredients: [
      { name: 'Cocktail Sausages', quantity: 8, unit: 'piece' },
      { name: 'Sweet Soy Sauce', quantity: 1, unit: 'tbsp' },
      { name: 'Ketchup', quantity: 1, unit: 'tbsp' },
      { name: 'Butter', quantity: 1, unit: 'tbsp' },
      { name: 'White Rice', quantity: 1.5, unit: 'cup' }
    ],
    createdAt: '2026-05-24T00:32:00Z'
  },
  {
    id: 'seed-ayam-borneo',
    name: 'Ayam Borneo',
    description: 'Savory sweet grilled chicken skewers glazed in caramelized brown sugar, coriander seeds, and Kalimantan island spices.',
    imageUrls: ['https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Marinate chicken thighs with palm sugar, shallots, garlic, dried shrimp paste, and toasted coriander.\n2. Roast or grill over hot griddle or skillet.\n3. Glisten recursively with butter and remnants marinade till glossy charred.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Chicken Thighed Cubes', quantity: 450, unit: 'g' },
      { name: 'Palm Brown Sugar', quantity: 2.5, unit: 'tbsp' },
      { name: 'Coriander Seeds', quantity: 1, unit: 'tbsp' },
      { name: 'Garlic', quantity: 4, unit: 'clove' }
    ],
    createdAt: '2026-05-24T00:33:00Z'
  },
  {
    id: 'seed-ayam-sasa',
    name: 'Ayam Sasa',
    description: 'Crunchy deep-fried chicken wings dredged in rich high-aroma seasoned garlic-coconut flour.',
    imageUrls: ['https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Deeply clean chicken wings.\n2. Mix into wet seasoned flour paste with coconut milk drops.\n3. Coat thoroughly inside dry high-powder seasoning flour (Sasa preset style).\n4. Deep fry strictly on hot bubbling oil.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Chicken Wings', quantity: 500, unit: 'g' },
      { name: 'Sasa Seasoned Flour Starch', quantity: 1, unit: 'pack' },
      { name: 'Cooking Oil', quantity: 500, unit: 'ml' }
    ],
    createdAt: '2026-05-24T00:34:00Z'
  },
  {
    id: 'seed-ayam-taichan',
    name: 'Ayam Taichan',
    description: 'Highly addictive Indonesian minimalist white woodskewers grilled chicken served with explosive spicy salt bird-eye chili lime salsa.',
    imageUrls: ['https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Marinate chicken breast chunks in lime juice, salt, and garlic powder (no sweet soy or sweet sauce!).\n2. Skewer chicken and grill until just white-cooked and juicy inside.\n3. Make chili paste: boil bird eye chilis and garlic, grind nicely, season with salt, MSG, and lots of lime juice. Dip hot chicken skewers.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Chicken Breast Cutlet', quantity: 400, unit: 'g' },
      { name: 'Lime Juice', quantity: 3, unit: 'tbsp' },
      { name: 'Bird Eye Chili (Red)', quantity: 15, unit: 'piece' },
      { name: 'Garlic', quantity: 5, unit: 'clove' }
    ],
    createdAt: '2026-05-24T00:35:00Z'
  },
  {
    id: 'seed-fu-yung-hai',
    name: 'Fu Yung Hai',
    description: 'Rich, fluffy Chinese omelette stuffed with fresh prawns and cabbage, swimming in high-spark sweet and sour tomato pea sauce.',
    imageUrls: ['https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Beat eggs with flour, shredded cabbage, carrots, chopped shrimp, and spring onions.\n2. Pour into generous smoking hot oil, deep fry until puffed and golden brown.\n3. Sauce: Boil garlic, tomato paste, sugar, green peas, vinegar, and starch thickener.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Eggs', quantity: 3, unit: 'piece' },
      { name: 'Shrimp', quantity: 80, unit: 'g' },
      { name: 'Shredded Cabbage', quantity: 50, unit: 'g' },
      { name: 'Tomato Paste', quantity: 2.5, unit: 'tbsp' },
      { name: 'Green Peas', quantity: 20, unit: 'g' }
    ],
    createdAt: '2026-05-24T00:36:00Z'
  },
  {
    id: 'seed-udang-goreng-mentega',
    name: 'Udang Goreng Mentega 🦐',
    description: 'Juicy tail-on fresh prawns crisped in high heat, tossed generously inside butter, garlic, sweet dark soy sauce, and lime juice.',
    imageUrls: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Sauté butterfly cut prawns with shells in high-heat frying pan till orange.\n2. Melt generous margarine butter.\n3. Stir sweet dark soy, oyster sauce, worcestershire, garlic tidbits, onion rings.\n4. Return prawns, combine with butter glaze, finish with fresh key lime juice.',
    category: 'Asian',
    ingredients: [
      { name: 'Fresh King Prawns (Udang)', quantity: 350, unit: 'g' },
      { name: 'Salted Butter', quantity: 3, unit: 'tbsp' },
      { name: 'Sweet Soy Sauce', quantity: 2, unit: 'tbsp' },
      { name: 'Worcestershire Sauce', quantity: 1, unit: 'tbsp' },
      { name: 'Garlic', quantity: 4, unit: 'clove' }
    ],
    createdAt: '2026-05-24T00:37:00Z'
  },
  {
    id: 'seed-bakso-cabe-garam',
    name: 'Bakso Cabe Garam',
    description: 'Crispy fried meatballs tossed recursively in smoking wok with heaps of dry toasted garlic, salt, and hot sliced spring onions.',
    imageUrls: ['https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Score meatballs with crosses, dust in starch, fry crispy.\n2. Sauté huge quantities of minced garlic and red curly chilis until completely dry and golden.\n3. Add chopped green onions, tossed fried meatballs, season with salt and white pepper.',
    category: 'Asian',
    ingredients: [
      { name: 'Beef Meatballs (Bakso)', quantity: 15, unit: 'piece' },
      { name: 'Garlic', quantity: 8, unit: 'clove' },
      { name: 'Chili Padi (Red)', quantity: 6, unit: 'piece' },
      { name: 'Spring Onion', quantity: 2, unit: 'bunch' },
      { name: 'Salt', quantity: 0.5, unit: 'tsp' }
    ],
    createdAt: '2026-05-24T00:38:00Z'
  },
  {
    id: 'seed-opor-ayam',
    name: 'Opor Ayam',
    description: 'Fragrant white Javanese chicken stew simmered slowly in rich cards-spiced coriander coconut broth for festive holidays.',
    imageUrls: ['https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Sauté spice paste (shallot, garlic, candlenut, coriander, cumin, white pepper).\n2. Stir in chicken pieces, cook until skin firms.\n3. Pour light thin coconut water broth, add kaffir lime, bay leaves, lemongrass.\n4. Simmer until chicken is fall-apart soft; pour thick coconut milk creams.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Chicken Pieces', quantity: 600, unit: 'g' },
      { name: 'Thick Coconut Milk', quantity: 200, unit: 'ml' },
      { name: 'Coriander Powder', quantity: 1, unit: 'tbsp' },
      { name: 'Candlenuts (Kemiri)', quantity: 4, unit: 'piece' },
      { name: 'Lemongrass', quantity: 2, unit: 'piece' }
    ],
    createdAt: '2026-05-24T00:39:00Z'
  },
  {
    id: 'seed-gado-gado',
    name: 'Gado-gado',
    description: 'Indicates "mixture" in Javanese. A plate of blanched vegetable medley, crunchy fried tofu, tempeh, potatoes with roasted peanut sauce.',
    imageUrls: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Boil cabbage, potatoes, bean sprouts, and long beans. Assemble.\n2. Fry tofu cubes and tempeh crispy, slice them up.\n3. Prepare rich Javanese peanut sauce using ground peanuts, chilis, palm sugar, tamarind juice.\n4. Drizzle hot creamy sauce, serve with fried crackers.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Fried Tofu Block', quantity: 2, unit: 'piece' },
      { name: 'Tempeh Block', quantity: 0.5, unit: 'piece' },
      { name: 'Bean Sprouts', quantity: 100, unit: 'g' },
      { name: 'Ground Roasted Peanuts', quantity: 150, unit: 'g' },
      { name: 'Tamarind Juice', quantity: 1.5, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T00:40:00Z'
  },
  {
    id: 'seed-telur-caramel',
    name: 'Telur Caramel',
    description: 'Hard-boiled chicken eggs deep-fried until blistered golden, then caramelized in dark red sweet pepper Javanese honey glaze.',
    imageUrls: ['https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Boil and peel eggs. Deep fry in sizzling oil until blister wrinkles outer skin.\n2. Sauté garlic, onions, and sweet bell chilis.\n3. Add palm sugar syrup, soy sauce, tamarind water. Glaze caramelized.\n4. Fold in fried eggs to coat.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Eggs', quantity: 6, unit: 'piece' },
      { name: 'Palm Brown Sugar', quantity: 3, unit: 'tbsp' },
      { name: 'Garlic', quantity: 3, unit: 'clove' },
      { name: 'Sweet Soy Sauce', quantity: 1.5, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T00:41:00Z'
  },
  {
    id: 'seed-salted-egg-chicken',
    name: 'Salted Egg Chicken',
    description: 'Stunning crispy fried chicken pops coated in hot butter, creamy rich salted egg yolk, curry leaves, and bird-eye heat.',
    imageUrls: ['https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Dredge chicken breast chunks in flour + egg, deep fry crunchy.\n2. Mash boiled salted duck egg yolks in a skillet with melted butter.\n3. Bubble and create foam, add chili rings and fresh curry leaves.\n4. Dust in crispy chicken pops, toss until perfectly yellow-crumb coated.',
    category: 'Asian',
    ingredients: [
      { name: 'Chicken Breast Cutlets', quantity: 400, unit: 'g' },
      { name: 'Salted Egg Yolks (Cooked)', quantity: 4, unit: 'piece' },
      { name: 'Butter', quantity: 3, unit: 'tbsp' },
      { name: 'Fresh Curry Leaves', quantity: 2, unit: 'bunch' },
      { name: 'Bird Eye Chili', quantity: 4, unit: 'piece' }
    ],
    createdAt: '2026-05-24T00:42:00Z'
  },
  {
    id: 'seed-tempe-goreng',
    name: 'Tempe Goreng',
    description: 'Indonesian dietary staple of marinated nutty soybean tempeh slices seasoned in coriander garlic water, fried until golden.',
    imageUrls: ['https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Slice soybean tempeh nicely. Slice surface in grid patterns.\n2. Marinate 15 mins in water with ground coriander, garlic, and sea salt.\n3. Deep-fry on hot oil till pristine gold-brown on both sides.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Soybean Tempeh Block', quantity: 1, unit: 'piece' },
      { name: 'Garlic', quantity: 3, unit: 'clove' },
      { name: 'Coriander Seeds', quantity: 1.5, unit: 'tsp' }
    ],
    createdAt: '2026-05-24T00:43:00Z'
  },
  {
    id: 'seed-grill-dori-jimbaran',
    name: 'Grill Dori Jimbaran',
    description: 'Fragrant Balinese beach-style grilled dory fish fillets glazed with rich sweet-savoury lemongrass chilipaste.',
    imageUrls: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Blend shallot, garlic, chili, candlenut, coriander, and sweet Javanese paste.\n2. Sauté spice mixture with lemongrass.\n3. Slather dory fillets with marinade, grill on a smoking skillet or griddle till charry flaky.',
    category: 'Other',
    ingredients: [
      { name: 'John Dory Fish Fillets', quantity: 400, unit: 'g' },
      { name: 'Shallots', quantity: 5, unit: 'piece' },
      { name: 'Coriander Powder', quantity: 1, unit: 'tsp' },
      { name: 'Lemongrass', quantity: 1, unit: 'piece' }
    ],
    createdAt: '2026-05-24T00:44:00Z'
  },
  {
    id: 'seed-tempe-tiramisu',
    name: 'Tempe Tiramisu',
    description: 'Playful gourmet fusion sweet treat! Nutty deep fried tempeh chips dusted in aromatic cocoa powder and mascarpone dips.',
    imageUrls: ['https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Slice tempeh wafer-thin. Soak in a tiny bit of coffee-sugar water, dry.\n2. Deep fry till crackling crisp. Dry oil.\n3. Whisk liquid mascarpone with whipped sugar.\n4. Dust cocoa powder on crispy tempeh chips. Serve alongside cream.',
    category: 'Other',
    ingredients: [
      { name: 'Nutty Soybean Tempeh', quantity: 200, unit: 'g' },
      { name: 'Mascarpone Cream', quantity: 100, unit: 'g' },
      { name: 'Cocoa Powder', quantity: 1, unit: 'tbsp' },
      { name: 'Powdered Sugar', quantity: 1.5, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T00:45:00Z'
  },
  {
    id: 'seed-nasi-goreng',
    name: 'Nasi Goreng',
    description: 'Classic Indonesian house fried rice with red chili sweet soy glazing, diced chicken, shallots, and clear egg scramble.',
    imageUrls: ['https://images.unsplash.com/photo-1617470703128-26a0aa9af10f?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Stir fry garlic, minced shallot, and chili in smoking wok.\n2. Toss chicken pieces and fry until white.\n3. Add cooled cooked rice, sweet rich soy sauce, and sea salt.\n4. Push rice back, crack egg into skillet, scramble nicely, mix thoroughly.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Cold Cooked Jasmine Rice', quantity: 2, unit: 'cup' },
      { name: 'Sweet Dark Soy', quantity: 2, unit: 'tbsp' },
      { name: 'Eggs', quantity: 2, unit: 'piece' },
      { name: 'Chicken Tidbits', quantity: 100, unit: 'g' }
    ],
    createdAt: '2026-05-24T00:46:00Z'
  },
  {
    id: 'seed-nasi-gila',
    name: 'Nasi Gila',
    description: 'Indicates "Crazy Fried Rice". House-favorite street stir-fry of sliced sausages, beef meatballs, and chicken topped on hot white rice.',
    imageUrls: ['https://images.unsplash.com/photo-1617470703128-26a0aa9af10f?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Sauté sliced shallot, garlic, chili, sausage rounds, meatballs, and chicken cubes.\n2. Whisk in eggs and scramble beautifully damp inside.\n3. Add rich sweet soy sauce, tomato ketchup, oyster sauce, chili sauce, pepper.\n4. Pour this steaming, savory meat mixture over fresh jasmine rice.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Hot Jasmine Rice', quantity: 2, unit: 'cup' },
      { name: 'Frankfurter Sausages', quantity: 2, unit: 'piece' },
      { name: 'Beef Meatballs', quantity: 5, unit: 'piece' },
      { name: 'Sweet Soy Sauce', quantity: 2.5, unit: 'tbsp' },
      { name: 'Eggs', quantity: 1, unit: 'piece' }
    ],
    createdAt: '2026-05-24T00:47:00Z'
  },
  {
    id: 'seed-tahu-telur-daging',
    name: 'Tahu Telur Daging',
    description: 'Fried puffed bean tofu omelette topped with stir-fried minced sweet beef and sweet-savory crunchy peanuts.',
    imageUrls: ['https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Mix egg tofu cubes and beaten egg, fry deep to create a beautiful towering nest.\n2. Sauté sweet minced beef with garlic, soy, salt.\n3. Lay minced beef over the fried tofu omelette.\n4. Drizzle dark sweet soy peanut dressing over the pile.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Egg Tofu Tube', quantity: 1.5, unit: 'piece' },
      { name: 'Eggs', quantity: 3, unit: 'piece' },
      { name: 'Minced Beef', quantity: 100, unit: 'g' },
      { name: 'Sweet Soy Sauce', quantity: 2, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T00:48:00Z'
  },
  {
    id: 'seed-ayam-fajitas',
    name: 'Ayam Fajitas',
    description: 'Sizzling Mexican-style spiced chicken breast strips roasted recursively alongside sweet bell peppers and fresh lime salsa.',
    imageUrls: ['https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Marinade chicken breast ribbons with cumin, chili powder, oregano, lime juice, and oil.\n2. Sear chicken over extremely hot cast iron pan.\n3. Add sweet sliced onion strips and colored bell peppers.\n4. Serve inside sweet toasted flour tortillas.',
    category: 'Mexican',
    ingredients: [
      { name: 'Chicken Breast Cutlets', quantity: 400, unit: 'g' },
      { name: 'Bell Peppers (Red/Green)', quantity: 2, unit: 'piece' },
      { name: 'Fajita Cumin Spices', quantity: 1.5, unit: 'tbsp' },
      { name: 'Tortillas', quantity: 4, unit: 'piece' }
    ],
    createdAt: '2026-05-24T00:49:00Z'
  },
  {
    id: 'seed-nasi-goreng-kebuli',
    name: 'Nasi Goreng Kebuli',
    description: 'Middle-Eastern Javanese style robust fried rice loaded with ghee, warm cardamom, cinnamon, cloves, and tasty lamb cubes.',
    imageUrls: ['https://images.unsplash.com/photo-1617470703128-26a0aa9af10f?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Stir fry meat chunks in ghee.\n2. Sauté spices: nutmeg, cardamon, cloves, cinnamon, garlic, shallot.\n3. Turn up heat, add cooked rice. Stir-fry aggressively till dry.\n4. Top with juicy lamb pieces and sweet raisins.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Cold Jasmine Rice', quantity: 2, unit: 'cup' },
      { name: 'Lamb/Mutton meat', quantity: 120, unit: 'g' },
      { name: 'Ghee (Minyak Samin)', quantity: 2, unit: 'tbsp' },
      { name: 'Cloves and Cardamom', quantity: 4, unit: 'piece' }
    ],
    createdAt: '2026-05-24T00:50:00Z'
  },
  {
    id: 'seed-tom-yum',
    name: 'Tom Yum',
    description: 'Iconic spicy, hot and sour lemongrass Thai soup broth packed with fresh shrimp, wild oyster mushrooms, galangal, and lime leaves.',
    imageUrls: ['https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Boil water with lemongrass, galangal, kaffir lime leaves, and red chilipaste (Nam Prik Pao).\n2. Lower in butterflied fresh shrimp and oyster mushrooms.\n3. Finish with rich fish sauce, sugar, and generous fresh lime juice squeeze.',
    category: 'Asian',
    ingredients: [
      { name: 'King Shrimp (Shell off)', quantity: 250, unit: 'g' },
      { name: 'Oyster Mushrooms', quantity: 100, unit: 'g' },
      { name: 'Lemongrass Stalk', quantity: 2, unit: 'piece' },
      { name: 'Thai Chili Paste', quantity: 1.5, unit: 'tbsp' },
      { name: 'Lime Juice', quantity: 2, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T00:51:00Z'
  },
  {
    id: 'seed-ayam-maranggi',
    name: 'Ayam Maranggi',
    description: 'Famous West Javanese sweet grilled chicken skewers heavily marinated in brown palm sugar, coriander, and sweet soy syrup.',
    imageUrls: ['https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Grind coriander seeds, garlic, shallots, palm sugar, tamarind.\n2. Marinate chicken cubes for 2 hrs.\n3. Skewer and grill over hot charcoals.\n4. Serve alongside chopped tomato, dynamic raw chili salsa, and sweet dark soy sauce.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Chicken Thighed Cubes', quantity: 400, unit: 'g' },
      { name: 'Toasted Coriander', quantity: 1, unit: 'tbsp' },
      { name: 'Palm Sugar', quantity: 2, unit: 'tbsp' },
      { name: 'Dark Sweet Soy', quantity: 3, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T00:52:00Z'
  },
  {
    id: 'seed-ayam-tandoori-masala',
    name: 'Ayam Tandoori Masala',
    description: 'Juicy chicken cutlets marinated inside red spiced yogurt, tandoori masala, garlic, ginger, and roasted beautifully.',
    imageUrls: ['https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Bat cuts on chicken pieces.\n2. Marinate 4 hrs inside greek yogurt, lime juice, ginger-garlic paste, tandoori powder, cayenne.\n3. Roast in high heat oven at 450°F (230°C) until smoky charred and juicy.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Chicken Thigh (Bone-in)', quantity: 500, unit: 'g' },
      { name: 'Greek Plain Yogurt', quantity: 100, unit: 'g' },
      { name: 'Tandoori Masala Powder', quantity: 2, unit: 'tbsp' },
      { name: 'Garlic Ginger Paste', quantity: 1, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T00:53:00Z'
  },
  {
    id: 'seed-tomato-egg',
    name: 'Tomato Egg',
    description: 'The golden recipe of pan-scrambled home egg curds slowly simmered with fresh juicy tomato wedges and green scallions.',
    imageUrls: ['https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Scramble 3 eggs softly, leave slightly runny.\n2. Sauté chopped fresh Roma tomatoes until they release sweet juices.\n3. Add soy sauce, a tiny touch of sugar, white pepper, and green garden onion.\n4. Fold eggs back, sauté on high heat for 30 seconds.',
    category: 'Asian',
    ingredients: [
      { name: 'Eggs', quantity: 3, unit: 'piece' },
      { name: 'Roma Tomatoes', quantity: 3, unit: 'piece' },
      { name: 'Scallion Green Leaves', quantity: 1, unit: 'bunch' },
      { name: 'Sugar', quantity: 0.5, unit: 'tsp' }
    ],
    createdAt: '2026-05-24T00:54:00Z'
  },
  {
    id: 'seed-rendang-telur',
    name: 'Rendang Telur',
    description: 'Hard-boiled chicken eggs caramelized and cooked deep inside intensely spiced, dry roasted Minangkabau coconut rendang paste.',
    imageUrls: ['https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Sauté authentic Padang Rendang spice paste (shallot, garlic, galangal, chili, turmeric, ginger).\n2. Pour coconut milk, simmer down with lime leaves, turmeric leaves, and lemongrass.\n3. Add boiled peeled eggs and cook until dry, oil separates and turns dark caramelized brown.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Boiled Eggs', quantity: 6, unit: 'piece' },
      { name: 'Thick Coconut Milk', quantity: 250, unit: 'ml' },
      { name: 'Rendang spice mix', quantity: 2, unit: 'tbsp' },
      { name: 'Turmeric Leaf', quantity: 1, unit: 'piece' }
    ],
    createdAt: '2026-05-24T00:55:00Z'
  },
  {
    id: 'seed-telur-curry',
    name: 'Telur Curry',
    description: 'Fragrant golden curry eggs simmered in rich light Javanese yellow curry leaf and turmeric cream broth.',
    imageUrls: ['https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Sauté garlic, onions, sweet curry powder, and ground turmeric until highly aromatic.\n2. Pour thin stock and coconut milk cream, bring to sweet simmer.\n3. Add hard-boiled eggs (with small knife slits inside to absorb flavor).\n4. Simmer until sauce is bright yellow.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Boiled Eggs', quantity: 4, unit: 'piece' },
      { name: 'Yellow Curry Spice Powder', quantity: 1.5, unit: 'tbsp' },
      { name: 'Coconut Milk', quantity: 150, unit: 'ml' },
      { name: 'Garlic', quantity: 3, unit: 'clove' }
    ],
    createdAt: '2026-05-24T00:56:00Z'
  },
  {
    id: 'seed-jukut-goreng',
    name: 'Jukut Goreng',
    description: 'Crispiest Balinese spice-fried cabbage and greens sautéed with birds-eye chili and aromatic shrimp paste.',
    imageUrls: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Slice local sweet cabbage and kale greens.\n2. Sauté garlic, bird eye chilis, shallots with shrimp paste (terasi) in smoking skillet.\n3. Add leafy greens, sauté aggressively on ultra-high heat for 2 minutes to retain heavy crunch.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Local Sweet Cabbage', quantity: 200, unit: 'g' },
      { name: 'Garlic', quantity: 3, unit: 'clove' },
      { name: 'Shrimp Paste (Terasi)', quantity: 0.5, unit: 'tsp' },
      { name: 'Bird Eye Chili', quantity: 3, unit: 'piece' }
    ],
    createdAt: '2026-05-24T00:57:00Z'
  },
  {
    id: 'seed-enoki-crispy',
    name: 'Enoki Crispy',
    description: 'Extra golden, crackling, seasoned-coated enoki mushroom fans deep fried to light cloud-like crunchines.',
    imageUrls: ['https://images.unsplash.com/photo-1519996521430-02b798c1d881?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Separate enoki mushroom base into small fan bundles.\n2. Dip into seasoned dashi milk egg batter, then coat inside dry rice-flour starch.\n3. Deep-fry on high bubble heat till they swell and crisp up to light golden.',
    category: 'Japanese',
    ingredients: [
      { name: 'Enoki Mushroom Bundles', quantity: 200, unit: 'g' },
      { name: 'Rice Flour', quantity: 1, unit: 'cup' },
      { name: 'Garlic Powder', quantity: 1, unit: 'tsp' },
      { name: 'Egg White', quantity: 1, unit: 'piece' }
    ],
    createdAt: '2026-05-24T00:58:00Z'
  },
  {
    id: 'seed-spaghetti-mushroom-napolitana',
    name: 'Spaghetti Mushroom Napolitana',
    description: 'Satisfying al dente spaghetti tossed in robust homestyle herb-roasted tomato sauce and sweet mushrooms.',
    imageUrls: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Sauté garlic and sweet oregano in olive oil.\n2. Drop wild button mushroom wedges, brown nicely.\n3. Pour rich Marinara/Napolitana canned plum sauce. Simmer for 15 mins.\n4. Throw spaghetti directly in, garnish with fresh mountain basil.',
    category: 'Italian',
    ingredients: [
      { name: 'Spaghetti Pasta', quantity: 180, unit: 'g' },
      { name: 'Button Mushrooms', quantity: 100, unit: 'g' },
      { name: 'Canned Plum Tomato Paste', quantity: 250, unit: 'g' },
      { name: 'Olive Oil', quantity: 2, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T00:59:00Z'
  },
  {
    id: 'seed-sayur-salad-kraupe-wiener',
    name: 'Sayur Salad Kraupe Wiener',
    description: 'Crisplay organic Austrian heirloom salad mix, sliced sweet apple cubes, dressed nicely inside warm sweet bacon cider dressing.',
    imageUrls: ['https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Throw together mixed frisée greens, heirloom radishes, and apple wedges.\n2. Sauce: pan-cook bacon tidbits, whisk with sweet honey, mustard, cider vinegar, and olive oil.\n3. Toss salad immediately with elements.',
    category: 'Salad',
    ingredients: [
      { name: 'Heirloom Frisée Garden Greens', quantity: 150, unit: 'g' },
      { name: 'Sweet Apple', quantity: 0.5, unit: 'piece' },
      { name: 'Cider Vinegar', quantity: 1.5, unit: 'tbsp' },
      { name: 'Honey Mustard', quantity: 1, unit: 'tsp' }
    ],
    createdAt: '2026-05-24T01:00:00Z'
  },
  {
    id: 'seed-salad-caesar',
    name: 'Salad Caesar',
    description: 'Crisp green romaine lettuce cores in standard garlic anchovy parmigiano emulsified dressing, topped with croutons.',
    imageUrls: ['https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Emulsify garlic, egg yolk, anchovy paste, lemon juice, and slowly drizzle olive oil.\n2. Toss crisp chopped romaine hearts inside dressing.\n3. Finish with house-baked garlic olive oil crouton cubes and fresh shaved Parmesan.',
    category: 'Salad',
    ingredients: [
      { name: 'Romaine Lettuce Hearts', quantity: 200, unit: 'g' },
      { name: 'Garlic Crouton Cubes', quantity: 50, unit: 'g' },
      { name: 'Parmigiano Shaves', quantity: 30, unit: 'g' },
      { name: 'Lemon', quantity: 0.5, unit: 'piece' }
    ],
    createdAt: '2026-05-24T01:01:00Z'
  },
  {
    id: 'seed-dory-salted-egg',
    name: 'Dory Salted Egg',
    description: 'Flaky deep-fried crunchy dory fillets coated in extra luscious, foaming butter garlic salted duck yolk cream.',
    imageUrls: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Season dory fish fillets with lime and white pepper, dredge inside powder starch and fry crispy.\n2. Melt butter, foam mashed salted yolks, chilies, curry leaves.\n3. Return dory fillets and toss gently until wonderfully glazed.',
    category: 'Asian',
    ingredients: [
      { name: 'Dory Fish Fillet', quantity: 350, unit: 'g' },
      { name: 'Salted Egg Yolks', quantity: 3, unit: 'piece' },
      { name: 'Cream Butter', quantity: 2.5, unit: 'tbsp' },
      { name: 'Curry Leaves', quantity: 1, unit: 'bunch' }
    ],
    createdAt: '2026-05-24T01:02:00Z'
  },
  {
    id: 'seed-dory-asam-manis',
    name: 'Dory Asam Manis',
    description: 'Crispy fried dory doused in bright-red sweet and sour Thai-Chinese style sauce, packed pineapple chunks and bell peppers.',
    imageUrls: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Fry batter-dredged dory fish pieces till light-brown.\n2. Fry garlic, onion bulbs, bell peppers, pineapple triangles.\n3. Pour tomato paste, sweet sugar, vinegar, fish broth. Stir and let thicken.\n4. Pour sauce directly onto piping hot fish.',
    category: 'Asian',
    ingredients: [
      { name: 'Dory Fish Fillet', quantity: 300, unit: 'g' },
      { name: 'Fresh Pineapple triangles', quantity: 60, unit: 'g' },
      { name: 'Tomato Sauce Paste', quantity: 3, unit: 'tbsp' },
      { name: 'Sweet Bell Peppers', quantity: 0.5, unit: 'piece' }
    ],
    createdAt: '2026-05-24T01:03:00Z'
  },
  {
    id: 'seed-ikan-goreng-tepung',
    name: 'Ikan Goreng Tepung',
    description: 'Light, super airy breaded flour-fried white dory fish fillets, kid-friendly and best served with fresh tartar sauce.',
    imageUrls: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=85'],
    recipeType: 'written',
    recipeText: '1. Soak fish in garlic lime water.\n2. Toss in seasoned all-purpose flour bath.\n3. Coat thoroughly in wet crispy flour mixture with ice water drops.\n4. Deep fry strictly until light crisp.',
    category: 'Other',
    ingredients: [
      { name: 'Dory Fish Fillet', quantity: 300, unit: 'g' },
      { name: 'Crispy Flour Starch', quantity: 1.5, unit: 'cup' },
      { name: 'Tartar Mayo Dip', quantity: 2, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T01:04:00Z'
  },
  {
    id: 'seed-dory-lada-garam',
    name: 'Dory Lada Garam',
    description: 'Crispy dory fish chunks tossed recursively in hot wok dry with aromatic roasted garlic flakes, salt, and hot chili rings.',
    imageUrls: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Fry batter elements with fish cubes until extremely crisp.\n2. Stir fry chopped dry garlic cloves, fresh red chilies, spring scallion.\n3. Combine crispy fish cubes, dust with white salt, pepper, garlic oil.',
    category: 'Asian',
    ingredients: [
      { name: 'Dory Fish Fillet', quantity: 350, unit: 'g' },
      { name: 'Garlic Minced', quantity: 6, unit: 'clove' },
      { name: 'Curly Chili', quantity: 4, unit: 'piece' },
      { name: 'Maldon Flaky Salt', quantity: 0.5, unit: 'tsp' }
    ],
    createdAt: '2026-05-24T01:05:00Z'
  },
  {
    id: 'seed-dory-saus-teriyaki',
    name: 'Dory Saus Teriyaki',
    description: 'Tender dory fillets pan-fried sweet and glazed beautifully with rich Japanese ginger-soy Teriyaki glaze.',
    imageUrls: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Pan sear dory fillet slices carefully in tiny oil so they don\'t break.\n2. Simmer light ginger soy sauce, Japanese sweet honey/mirin, dark soy, sugar in small skillet.\n3. Pour teriyaki glaze over fish, sprinkle toasted white sesame.',
    category: 'Asian',
    ingredients: [
      { name: 'Dory Fish Fillet', quantity: 300, unit: 'g' },
      { name: 'Teriyaki Glazed Sauce', quantity: 3, unit: 'tbsp' },
      { name: 'Toasted Sesame Seeds', quantity: 1, unit: 'tsp' }
    ],
    createdAt: '2026-05-24T01:06:00Z'
  },
  {
    id: 'seed-udang-mayonese',
    name: 'Udang Mayonese',
    description: 'Incomparable crispy-battered honey prawns tossed sweet in creamy, tangy white lemon-honey mayonnaise cream.',
    imageUrls: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Dredge fresh prawns inside whipped egg white and potato starch, fry till very crisp.\n2. Mix Kewpie mayonnaise with lemon juice, condensed milk, sweet honey.\n3. Shake crispy shrimp hot in bowl with mayonnaise glaze, top with glazed walnuts.',
    category: 'Asian',
    ingredients: [
      { name: 'King Prawns', quantity: 300, unit: 'g' },
      { name: 'Mayo Sauce (Kewpie)', quantity: 3.5, unit: 'tbsp' },
      { name: 'Sweet Condensed Milk', quantity: 1, unit: 'tsp' },
      { name: 'Lemon juice', quantity: 1, unit: 'tsp' }
    ],
    createdAt: '2026-05-24T01:07:00Z'
  },
  {
    id: 'seed-udang-crispy',
    name: 'Udang Crispy',
    description: 'Light, crunchy dynamic deep fried butterflied shrimp fingers coated with extra layered crispy flour batter.',
    imageUrls: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Butterfly count prawns, press down.\n2. Soak in garlic salt water. Coat with egg wash.\n3. Dredge inside crispy dynamic flour. Fry till light golden.',
    category: 'Asian',
    ingredients: [
      { name: 'King Prawns', quantity: 300, unit: 'g' },
      { name: 'All-Purpose Flour Starch', quantity: 1, unit: 'cup' },
      { name: 'Garlic Powder', quantity: 1, unit: 'tsp' }
    ],
    createdAt: '2026-05-24T01:08:00Z'
  },
  {
    id: 'seed-udang-telor',
    name: 'Udang Telor',
    description: 'Chinese restaurant styled savory crispy prawns cooked dynamically with soft egg curds and fresh spring onions in master wok.',
    imageUrls: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Stir-fry fresh shrimp until just pink.\n2. Beat egg curds with Chinese cooking sesame oil, salt, white pepper.\n3. Pour eggs into hot skillet with shrimp, stir gently to make thick, silky scrambled sheets.\n4. Throw green spring scapes.',
    category: 'Asian',
    ingredients: [
      { name: 'Prawns (Slightly chopped)', quantity: 150, unit: 'g' },
      { name: 'Eggs', quantity: 3, unit: 'piece' },
      { name: 'Spring Greens', quantity: 1, unit: 'bunch' },
      { name: 'Sesame Oil', quantity: 1, unit: 'tsp' }
    ],
    createdAt: '2026-05-24T01:09:00Z'
  },
  {
    id: 'seed-mi-goreng-bakso',
    name: 'Mi Goreng Bakso',
    description: 'Beloved Indonesian street style stir-fried yellow egg noodles caramelized beautifully with sweet soy, garlic, and beef meatballs.',
    imageUrls: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Heat oil, sauté minced garlic, shallot, and green vegetables.\n2. Sauté sliced meatballs.\n3. Toss in boiled egg noodles.\n4. Drizzle generous sweet soy sauce, oyster sauce, salt, MSG, and stir recursively on high heat till smoky.',
    category: 'Asian',
    ingredients: [
      { name: 'Yellow Egg Noodles', quantity: 200, unit: 'g' },
      { name: 'Beef Meatballs', quantity: 6, unit: 'piece' },
      { name: 'Sweet Soy Sauce (Kecap)', quantity: 2, unit: 'tbsp' },
      { name: 'Sweet Greens/Caisim', quantity: 50, unit: 'g' }
    ],
    createdAt: '2026-05-24T01:10:00Z'
  },
  {
    id: 'seed-mi-goreng-sosis',
    name: 'Mi Goreng Sosis',
    description: 'Tasty caramelized Indonesian fried noodles with savory sliced chicken sausage chunks, egg, and fresh bok choy.',
    imageUrls: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Toss sliced sausages inside hot butter skillet.\n2. Mix ginger-garlic paste, and egg scramble.\n3. Toss boiled noodles with dark sweet soy and fresh greens until perfectly dry and glistening.',
    category: 'Asian',
    ingredients: [
      { name: 'Egg Noodles', quantity: 200, unit: 'g' },
      { name: 'Chicken Sausages', quantity: 2, unit: 'piece' },
      { name: 'Sweet Soy Sauce', quantity: 2, unit: 'tbsp' },
      { name: 'Eggs', quantity: 1, unit: 'piece' }
    ],
    createdAt: '2026-05-24T01:11:00Z'
  },
  {
    id: 'seed-spaghetti-sosis-napolitana',
    name: 'Spaghetti Sosis Napolitana',
    description: 'Kid-friendly, speedy Italian classic pasta containing pan-seared smoked sausage slices inside sweet tomato herb sauce.',
    imageUrls: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Boil spaghetti. Pan fry sliced smoked sausages until edges are crisp.\n2. Pour rich tomato sauce paste, oregano, baseline garlic.\n3. Toss spaghetti inside sauce with sausage slices and plenty of fresh grated cheddar.',
    category: 'Italian',
    ingredients: [
      { name: 'Spaghetti Pasta', quantity: 180, unit: 'g' },
      { name: 'Smoked Beef Sausages', quantity: 2, unit: 'piece' },
      { name: 'Tomato Napolitana Sauce', quantity: 200, unit: 'g' },
      { name: 'Cheddar/Parmesan', quantity: 30, unit: 'g' }
    ],
    createdAt: '2026-05-24T01:12:00Z'
  },
  {
    id: 'seed-spaghetti-sosis-carbonara',
    name: 'Spaghetti Sosis Carbonara',
    description: 'Extravagant, rich carbonara spaghetti loaded with juicy pan-fried chicken sausage coins, garlic, egg, and heavy cream gloss.',
    imageUrls: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Sauté sausage coins in butter with garlic.\n2. Mix cream, egg yolk, and grated Parmesan in bowl.\n3. Toss boiling pasta with hot sausages, remove from fire.\n4. Pour in egg cream mixture and fold recursively to create premium emulsion.',
    category: 'Italian',
    ingredients: [
      { name: 'Spaghetti Pasta', quantity: 180, unit: 'g' },
      { name: 'Chicken Sausages', quantity: 2, unit: 'piece' },
      { name: 'Heavy Cream', quantity: 120, unit: 'ml' },
      { name: 'Egg Yolk', quantity: 1, unit: 'piece' }
    ],
    createdAt: '2026-05-24T01:13:00Z'
  },
  {
    id: 'seed-sosis-caramel',
    name: 'Sosis Caramel',
    description: 'Sautéed beef sausage bites caramelized rich with caramelized brown sugar, minced garlic, and butter sauce glaze.',
    imageUrls: ['https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Fry sausage bites nicely.\n2. Melt butter, stir brown palm sugar until bubbly caramelized brown.\n3. Toss sausage bites inside glaze with thick garlic soy sauce.',
    category: 'American',
    ingredients: [
      { name: 'Beef Sausages', quantity: 4, unit: 'piece' },
      { name: 'Melted Butter', quantity: 2, unit: 'tbsp' },
      { name: 'Brown Sugar', quantity: 2, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T01:14:00Z'
  },
  {
    id: 'seed-sosis-saus-mentega',
    name: 'Sosis Saus Mentega',
    description: 'Crisp seared cocktail sausages cooked in luxurious onion and butter glaze with Worcestershire and sweet dark soy sauce.',
    imageUrls: ['https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Cut sausages and fry inside skillet.\n2. Melt rich butter, sauté onion bulbs.\n3. Toss sausages with sweet sauce and soy until fully dark glazed.',
    category: 'American',
    ingredients: [
      { name: 'Cocktail Sausages', quantity: 10, unit: 'piece' },
      { name: 'Salted Butter', quantity: 3, unit: 'tbsp' },
      { name: 'Sweet Soy Sauce', quantity: 1.5, unit: 'tbsp' }
    ],
    createdAt: '2026-05-24T01:15:00Z'
  },
  {
    id: 'seed-tahu-lada-garam',
    name: 'Tahu Lada Garam',
    description: 'Crunchy golden crispy cubes of soft silk tofu wok fried with massive garlic, curly bird-eye chili, sea salt, and dynamic pepper.',
    imageUrls: ['https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Dice tofu, coat in cornstarch, fry crispy. Drain.\n2. Sauté huge minced garlic, red chili padi rings until dry golden.\n3. Toss in crispy tofu, season with salt and white pepper.',
    category: 'Asian',
    ingredients: [
      { name: 'Soft White Tofu Block', quantity: 1, unit: 'piece' },
      { name: 'Garlic', quantity: 6, unit: 'clove' },
      { name: 'Chili Padi', quantity: 5, unit: 'piece' },
      { name: 'Salt', quantity: 0.5, unit: 'tsp' }
    ],
    createdAt: '2026-05-24T01:16:00Z'
  },
  {
    id: 'seed-tahu-crispy',
    name: 'Tahu Crispy',
    description: 'Highly popular Indonesian puffed street snack! Extra blistering crunchy hollow-style fried tofu bites dusted with spices.',
    imageUrls: ['https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Slice tofu to bite-sized cubes.\n2. Dip tofu in extra watery seasoned flour liquid with baking powder.\n3. Deep-fry on hot oil. Pour remaining flour mixture water directly into boiling oil to create massive crispy crumbs clinging to tofu.',
    category: 'Asian',
    ingredients: [
      { name: 'White Tofu Block', quantity: 1, unit: 'piece' },
      { name: 'Rice Flour Starch', quantity: 1, unit: 'cup' },
      { name: 'Baking Powder', quantity: 0.5, unit: 'tsp' }
    ],
    createdAt: '2026-05-24T01:17:00Z'
  },
  {
    id: 'seed-tahu-sutra-wilgoz',
    name: 'Tahu Sutra Wilgoz',
    description: 'Master chef William Gozali style! Velvety soft egg tofu tossed with hot sweet soy glaze, dry toasted oyster garlic, coriander.',
    imageUrls: ['https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Fry egg tofu rounds in butter skillet.\n2. Glaze with sweet soy sauce, coriander oil, light sesame oil, chili oil.\n3. Top with immense amounts of crisp golden roasted garlic flakes and green cilantro.',
    category: 'Asian',
    ingredients: [
      { name: 'Egg Tofu Tubes', quantity: 2, unit: 'piece' },
      { name: 'Crispy Garlic Flakes', quantity: 3, unit: 'tbsp' },
      { name: 'Sweet Soy Sauce', quantity: 1.5, unit: 'tbsp' },
      { name: 'Fresh Coriander (Cilantro)', quantity: 1, unit: 'bunch' }
    ],
    createdAt: '2026-05-24T01:18:00Z'
  },
  {
    id: 'seed-langko',
    name: 'Langko',
    description: 'Traditional exotic spiced Javanese beef tripe/meat tenders simmered slow inside coconut sugar and roasted grated coconut spices.',
    imageUrls: ['https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Boil meat tender with ginger-lime until tender.\n2. Sauté spice paste with toasted grated coconut (serundeng style).\n3. Braise meat until dry and spice crystals coat the meat.',
    category: 'Indonesian',
    ingredients: [
      { name: 'Beef Meat Cutcuts', quantity: 400, unit: 'g' },
      { name: 'Grated Coconut', quantity: 100, unit: 'g' },
      { name: 'Palm Brown Sugar', quantity: 2, unit: 'tbsp' },
      { name: 'Lemongrass', quantity: 1, unit: 'piece' }
    ],
    createdAt: '2026-05-24T01:19:00Z'
  },
  {
    id: 'seed-tempe-crispy-saus-putih-bawang-jeruk',
    name: 'Tempe Crispy Saus Putih Bawang Jeruk',
    description: 'Crisp wafer tempeh fingers paired with garlic white yogurt mayonnaise dipping infused with lime leaves.',
    imageUrls: ['https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80'],
    recipeType: 'written',
    recipeText: '1. Fry thinly sliced soybean tempeh in crispy seasoning.\n2. Sauce: Mix greek yogurt, Kewpie mayo, minced garlic, fine chiffonade of fresh green lime leaves, and splash of key lime juice.\n3. Serve dipping sauce immediately alongside hot tempeh fingers.',
    category: 'Asian',
    ingredients: [
      { name: 'Tempeh Block', quantity: 1, unit: 'piece' },
      { name: 'Greek Plain Yogurt', quantity: 100, unit: 'g' },
      { name: 'Kewpie Mayonnaise', quantity: 2, unit: 'tbsp' },
      { name: 'Kaffir Lime Leaves', quantity: 3, unit: 'piece' }
    ],
    createdAt: '2026-05-24T01:20:00Z'
  }
];

export const PRESET_IMAGES = [
  { name: 'Indonesian Fried Rice', url: 'https://images.unsplash.com/photo-1617470703128-26a0aa9af10f?auto=format&fit=crop&w=600&q=80' },
  { name: 'Crispy Caesar Salad', url: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80' },
  { name: 'Fresh Margherita Pizza', url: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=600&q=80' },
  { name: 'Comfort Sourdough Soup', url: 'https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80' },
  { name: 'Hearty Curry / Stew', url: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80' },
  { name: 'Fluffy Pancakes / Bakery', url: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80' },
  { name: 'Fresh Sliced Fruits', url: 'https://images.unsplash.com/photo-1519996521430-02b798c1d881?auto=format&fit=crop&w=600&q=80' },
  { name: 'Hearty Beef Pasta', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80' },
  { name: 'Vibrant Green Salad', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80' },
  { name: 'Aromatic Chicken Ramen', url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80' },
  { name: 'Warm Baked Pastries', url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80' }
];
