const GL_CARDS = [
    // === THE JEDI COUNCIL ===
    { id: 'lemon-wookie', name: 'Lemon Wookie', image: 'assets/img/strains/lemon-wookie-card.jpg', reward: '$1 Off 1/8th', rarity: 'Indica-Hybrid' },
    { id: 'falcon-9', name: 'Falcon 9', image: 'assets/img/strains/falcon-9.jpg', reward: '$1 Off 1/8th', rarity: 'Indica-Dominant' },
    { id: 'solo-walker', name: 'Solo Walker', image: 'assets/img/strains/solo-walker-card.jpg', reward: '$1 Off 1/8th', rarity: 'Hybrid' },
    { id: 'death-z', name: 'Death Z', image: 'assets/img/strains/death-z-card.jpg', reward: '$1 Off 1/8th', rarity: 'Indica' },
    { id: 'death-star', name: 'Death Star', image: 'assets/img/strains/death-star-card.jpg', reward: '$1 Off 1/8th', rarity: 'Indica' },

    // === THE NIGHT SHIFT (Indicas) ===
    { id: 'clusterfunk', name: 'Clusterfunk', image: 'assets/img/strains/clusterfunk-card.jpg', reward: '$1 Off 1/8th', rarity: 'Indica' },
    { id: 'hash-d', name: 'Hash D', image: 'assets/img/strains/hash-d-card.jpg', reward: '$1 Off 1/8th', rarity: 'Indica' },
    { id: 'garlic-breath', name: 'Garlic Breath', image: 'assets/img/strains/garlic-breath-bud.jpg', reward: '$1 Off 1/8th', rarity: 'Indica' },
    { id: 'illudium', name: 'Illudium', image: 'assets/img/strains/illudium.png', reward: '$1 Off 1/8th', rarity: 'Indica' },
    { id: 'gorilla-88', name: 'Gorilla 88', image: 'assets/img/strains/gorilla-88-bud.jpg', reward: '$1 Off 1/8th', rarity: 'Hybrid' },

    // === THE FRUIT BASKET ===
    { id: 'sin-city-grapes', name: 'Sin City Grapes', image: 'assets/img/strains/sin-city-grapes-card.jpg', reward: '$1 Off 1/8th', rarity: 'Indica' },
    { id: 'banana-split', name: 'Banana Split', image: 'assets/img/strains/banana-split-card.jpg', reward: '$1 Off 1/8th', rarity: 'Hybrid' },
    { id: 'pina-rita', name: 'Pina Rita', image: 'assets/img/strains/pina-rita.png', reward: '$1 Off 1/8th', rarity: 'Sativa' },
    { id: 'strawberry-daiquiri', name: 'Strawberry Daiquiri', image: 'assets/img/strains/strawberry-daiquiri-bud.jpg', reward: '$1 Off 1/8th', rarity: 'Sativa' },
    { id: 'guicy-g', name: 'Guicy G', image: 'assets/img/strains/guicy-g-bud.jpg', reward: '$1 Off 1/8th', rarity: 'Hybrid' },

    // === THE DUTCH BAKERY ===
    { id: '13-layer-cake', name: '13 Layer Cake', image: 'assets/img/strains/13-layer-cake-card.jpg', reward: '$1 Off 1/8th', rarity: 'Sativa' },
    { id: 'pb-n-chocolate', name: 'PB n Chocolate', image: 'assets/img/strains/peanut-butter-n-chocolate-card.jpg', reward: '$1 Off 1/8th', rarity: 'Hybrid' },
    { id: 'choc-marshmallows', name: 'Choc Marshmallows', image: 'assets/img/strains/chocolate-marshmallow.png', reward: '$1 Off 1/8th', rarity: 'Hybrid' },
    { id: 'orange-kush-cake', name: 'Orange Kush Cake', image: 'assets/img/strains/orange-kush-cake-bud.jpg', reward: '$1 Off 1/8th', rarity: 'Sativa-Hybrid' },
    { id: 'bubblegum-88g13hp', name: 'Bubble Gum 88G13', image: 'assets/img/strains/bubblegum-88g13hp-card.jpg', reward: '$1 Off 1/8th', rarity: 'Hybrid' },

    // === THE TROPHY CASE (Award Winners) ===
    { id: 'super-silver-hashplant', name: 'Super Silver Hashplant', image: 'assets/img/strains/super-silver-hashplant-card.jpg', reward: '$1 Off 1/8th', rarity: 'Sativa' },
    { id: 'mr-clean', name: 'Mr. Clean', image: 'assets/img/strains/mr-clean-card.jpg', reward: '$1 Off 1/8th', rarity: 'Sativa' },
    { id: 'lilac-diesel', name: 'Lilac Diesel', image: 'assets/img/strains/lilac-diesel-card.jpg', reward: '$1 Off 1/8th', rarity: 'Sativa' },
    { id: 'cobra-lips', name: 'Cobra Lips', image: 'assets/img/strains/cobra-lips-card.jpg', reward: '$1 Off 1/8th', rarity: 'Hybrid' },
    { id: 'field-trip', name: 'The Magic Dutch Bus', image: 'assets/img/strains/field-trip-card.jpg', reward: '$1 Off 1/8th', rarity: 'Hybrid' },

    // === THE VARIANT VAULT (Variants) ===
    { id: 'hash-d-alt', name: 'Hash D (Shiny Variant)', image: 'assets/img/strains/hash-d-alt-card.jpg', reward: 'Special Promo', rarity: 'Holographic' },
    { id: 'bubblegum-pink', name: 'Bubblegum (Pink Variant)', image: 'assets/img/strains/bubblegum-88g13hp-card.jpg', reward: 'Special Promo', rarity: 'Holographic' },
    { id: 'banana-split-alt', name: 'Banana Split (Pink Variant)', image: 'assets/img/strains/banana-split-alt-card.jpg', reward: 'Special Promo', rarity: 'Holographic' },
    { id: 'falcon-9-alt', name: 'Falcon 9 (Shiny Variant)', image: 'assets/img/strains/falcon-9-alt-card.jpg', reward: 'Special Promo', rarity: 'Holographic' },
    { id: 'sin-city-grapes-alt', name: 'Sin City Grapes (Variant)', image: 'assets/img/strains/sin-city-grapes-alt-card.jpg', reward: 'Special Promo', rarity: 'Holographic' },
    { id: 'face-off-og-alt', name: 'Face Off OG (Variant)', image: 'assets/img/greenlabs-logo.png', rarity: 'Holographic' },
    
    // === STORE EXPLORER ===
    { id: 'the-bodyguard', name: 'The Bodyguards', image: 'assets/img/strains/the-bodyguard-card.jpg', reward: 'Security Discount', rarity: 'Store Special' },
    { id: 'chalk-board', name: 'The Chalkboard', image: 'assets/img/strains/chalk-board-card.jpg', reward: 'Free Sticker', rarity: 'Explorer Series' },
    { id: 'monolith', name: 'The Monolith', image: 'assets/img/strains/monolith-card.jpg', reward: 'Free Sticker', rarity: 'Explorer Series' },
    { id: 'merch-garden', name: 'Merch Stand', image: 'assets/img/strains/merch-garden-card.jpg', reward: '10% Off Merch', rarity: 'Explorer Series' },
    { id: 'favorite-customer', name: 'Favorite Customer', image: 'assets/img/greenlabs-logo.png', reward: 'High Five', rarity: 'Explorer Series' }
];

const GL_SETS = [
    { id: 'jedi', name: 'The Jedi Council', tagline: 'The Force is strong with these galactic genetics.', reward: '20% Off Set', cardIds: ['lemon-wookie', 'falcon-9', 'solo-walker', 'death-z', 'death-star'] },
    { id: 'night-shift', name: 'The Night Shift', tagline: 'Heavy-hitting Indicas to lock you in for the night.', reward: 'Free Sleep Edible', cardIds: ['clusterfunk', 'hash-d', 'garlic-breath', 'illudium', 'gorilla-88'] },
    { id: 'fruit-basket', name: 'The Fruit Basket', tagline: 'A tropical storm of juicy terpene profiles.', reward: '10% Off Fruity Extracts', cardIds: ['sin-city-grapes', 'banana-split', 'pina-rita', 'strawberry-daiquiri', 'guicy-g'] },
    { id: 'bakery', name: 'The Dutch Bakery', tagline: 'Freshly baked, sweet, and sticky.', reward: 'Free 100mg Edible', cardIds: ['13-layer-cake', 'pb-n-chocolate', 'choc-marshmallows', 'bubblegum-88g13hp', 'orange-kush-cake', 'garlic-breath'] },
    { id: 'trophy-case', name: 'The Trophy Case', tagline: 'Decorated champions and cup-winning classics.', reward: 'Free Pre-roll', cardIds: ['super-silver-hashplant', 'mr-clean', 'lilac-diesel', 'cobra-lips', 'field-trip'] },
    { id: 'shiny-vault', name: 'The Variant Vault', tagline: 'Ultra-rare holos and alternate artworks.', reward: '$10 Store Credit', cardIds: ['hash-d-alt', 'banana-split-alt', 'falcon-9-alt', 'sin-city-grapes-alt', 'face-off-og-alt'] },
    { id: 'keep-it-pink', name: 'KEEP IT PINK', tagline: 'Pink genetics for the refined palette.', reward: 'Special Pink Pre-roll', cardIds: ['bubblegum-pink', 'banana-split-alt', '13-layer-cake'] },
    { id: 'explorer', name: 'Store Explorer', tagline: 'Hidden secrets scattered around Green Labs.', reward: 'Mystery Bag', cardIds: ['the-bodyguard', 'chalk-board', 'monolith', 'merch-garden', 'favorite-customer'] }
];
