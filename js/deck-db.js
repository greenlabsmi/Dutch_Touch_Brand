const GL_CARDS = [
    // === THE TROPHY CASE ===
    { id: 'mr-clean', name: 'Mr. Clean', image: 'assets/img/strains/mr-clean-card.jpg', reward: '$2 Off Mr. Clean', rarity: 'Sativa' },
    { id: 'lilac-diesel', name: 'Lilac Diesel', image: 'assets/img/strains/lilac-diesel-card.jpg', reward: '$2 Off Lilac Diesel', rarity: 'Sativa' },
    { id: 'forbidden-jelly', name: 'Forbidden Jelly', image: 'assets/img/strains/forbidden-jelly.png', reward: '$2 Off Forbidden Jelly', rarity: 'Hybrid' },
    { id: 'lemon-wookie', name: 'Lemon Wookie', image: 'assets/img/strains/lemon-wookie-card.jpg', reward: '$2 Off Lemon Wookie', rarity: 'Indica-Hybrid' },
    { id: 'space-hippy', name: 'Space Hippy', image: 'assets/img/strains/space-hippy.png', reward: '$2 Off Space Hippy', rarity: 'Hybrid' },

    // === THE JEDI COUNCIL ===
    { id: 'falcon-9', name: 'Falcon 9', image: 'assets/img/strains/falcon-9.jpg', reward: '$2 Off Falcon 9', rarity: 'Indica-Dominant' },
    { id: 'solo-walker', name: 'Solo Walker', image: 'assets/img/strains/solo-walker-card.jpg', reward: '$2 Off Solo Walker', rarity: 'Hybrid' },
    { id: 'death-z', name: 'Death Z', image: 'assets/img/strains/death-z-card.jpg', reward: '$2 Off Death Z', rarity: 'Indica' },
    { id: 'death-star', name: 'Death Star', image: 'assets/img/strains/death-star-card.jpg', reward: '$2 Off Death Star', rarity: 'Indica' },
    { id: 'death-by-funk', name: 'Death By Funk', image: 'assets/img/strains/death-by-funk.png', reward: '$2 Off Death By Funk', rarity: 'Indica' },

    // === SUMMER VIBE ===
    { id: 'pina-rita', name: 'Pina Rita', image: 'assets/img/strains/pina-rita.png', reward: '$2 Off Pina Rita', rarity: 'Sativa' },
    { id: 'strawberry-daiquiri', name: 'Strawberry Daiquiri', image: 'assets/img/strains/strawberry-daiquiri-bud.jpg', reward: '$2 Off Strawberry Daiquiri', rarity: 'Sativa' },
    { id: 'guicy-g', name: 'Guicy G', image: 'assets/img/strains/guicy-g-bud.jpg', reward: '$2 Off Guicy G', rarity: 'Hybrid' },
    { id: 'orange-kush-cake', name: 'Orange Kush Cake', image: 'assets/img/strains/orange-kush-cake-bud.jpg', reward: '$2 Off Orange Kush Cake', rarity: 'Sativa-Hybrid' },
    { id: 'sin-city-grapes', name: 'Sin City Grapes', image: 'assets/img/strains/sin-city-grapes-card.jpg', reward: '$2 Off Sin City Grapes', rarity: 'Indica' },
    { id: 'banana-split', name: 'Banana Split', image: 'assets/img/strains/banana-split-card.jpg', reward: '$2 Off Banana Split', rarity: 'Hybrid' },

    // === THE NIGHT SHIFT ===
    { id: 'garlic-breath', name: 'Garlic Breath', image: 'assets/img/strains/garlic-breath-bud.jpg', reward: '$2 Off Garlic Breath', rarity: 'Indica' },
    { id: 'illudium', name: 'Illudium', image: 'assets/img/strains/illudium.png', reward: '$2 Off Illudium', rarity: 'Indica' },
    { id: 'spirit-hashplant', name: 'Spirit Hashplant', image: 'assets/img/strains/spirit-hashplant-bud.jpg', reward: '$2 Off Spirit Hashplant', rarity: 'Indica' },
    { id: 'clusterfunk', name: 'Clusterfunk', image: 'assets/img/strains/clusterfunk-card.jpg', reward: '$2 Off Clusterfunk', rarity: 'Indica' },
    { id: 'hash-d', name: 'Hash D', image: 'assets/img/strains/hash-d-card.jpg', reward: '$2 Off Hash D', rarity: 'Indica' },
    { id: 'gorilla-88', name: 'Gorilla 88', image: 'assets/img/strains/gorilla-88-bud.jpg', reward: '$2 Off Gorilla 88', rarity: 'Hybrid' },

    // === THE DUTCH BAKERY ===
    { id: '13-layer-cake', name: '13 Layer Cake', image: 'assets/img/strains/13-layer-cake-card.jpg', reward: '$2 Off 13 Layer Cake', rarity: 'Sativa' },
    { id: 'pb-n-chocolate', name: 'PB n Chocolate', image: 'assets/img/strains/peanut-butter-n-chocolate-card.jpg', reward: '$2 Off PB n Chocolate', rarity: 'Hybrid' },
    { id: 'choc-marshmallows', name: 'Choc Marshmallows', image: 'assets/img/strains/chocolate-marshmallow.png', reward: '$2 Off Choc Marshmallows', rarity: 'Hybrid' },
    { id: 'bubblegum-88g13hp', name: 'Bubble Gum 88G13', image: 'assets/img/strains/bubblegum-88g13hp-card.jpg', reward: '$2 Off Bubble Gum', rarity: 'Hybrid' },
    { id: 'super-silver-hashplant', name: 'Super Silver Hashplant', image: 'assets/img/strains/super-silver-hashplant-card.jpg', reward: '$2 Off Super Silver', rarity: 'Sativa' },
    { id: 'cobra-lips', name: 'Cobra Lips', image: 'assets/img/strains/cobra-lips-card.jpg', reward: '$2 Off Cobra Lips', rarity: 'Hybrid' },

    // === THE VARIANT VAULT ===
    { id: 'hash-d-alt', name: 'Hash D (Shiny)', image: 'assets/img/strains/hash-d-alt-card.jpg', reward: 'Special Promo', rarity: 'Holographic' },
    { id: 'falcon-9-alt', name: 'Falcon 9 (Shiny)', image: 'assets/img/strains/falcon-9-alt-card.jpg', reward: 'Special Promo', rarity: 'Holographic' },
    { id: 'sin-city-grapes-alt', name: 'Sin City Grapes (Shiny)', image: 'assets/img/strains/sin-city-grapes-alt-card.jpg', reward: 'Special Promo', rarity: 'Holographic' },
    { id: 'face-off-og-alt', name: 'Face Off OG (Shiny)', image: 'assets/img/strains/sin-city-grapes-alt-card.jpg', reward: 'Special Promo', rarity: 'Holographic' },
    { id: 'banana-split-alt', name: 'Banana Split (Pink)', image: 'assets/img/strains/banana-split-alt-card.jpg', reward: 'Special Promo', rarity: 'Holographic' },

    // === STORE EXPLORER ===
    { id: 'the-bodyguard', name: 'Lobby Patrol', image: 'assets/img/strains/the-bodyguard-card.jpg', reward: 'Security Discount', rarity: 'Store Special' },
    { id: 'favorite-customer', name: 'Favorite Customer', image: 'assets/img/strains/favorite-customer.jpg', reward: 'High Five', rarity: 'Explorer Series' },
    { id: 'chalk-board', name: 'The Chalkboard', image: 'assets/img/strains/chalk-board-card.jpg', reward: 'Free Sticker', rarity: 'Explorer Series' },
    { id: 'monolith', name: 'The Monolith', image: 'assets/img/strains/monolith-card.jpg', reward: 'Free Sticker', rarity: 'Explorer Series' },
    { id: 'merch-garden', name: 'Merch Garden', image: 'assets/img/strains/merch-garden-card.jpg', reward: '10% Off Merch', rarity: 'Explorer Series' },

    // === THE LOST ONES ===
    { id: 'sticky-trap', name: 'Sticky Trap', image: 'assets/img/strains/sticky-trap-bud.jpg', reward: '$2 Off Sticky Trap', rarity: 'Hybrid' },
    { id: 'white-wampa', name: 'White Wampa', image: 'assets/img/strains/white-wampa.png', reward: '$2 Off White Wampa', rarity: 'Indica' },
    { id: 'bubblegum-pink', name: 'Bubblegum (Pink)', image: 'assets/img/strains/bubblegum-88g13hp-card.jpg', reward: 'Special Promo', rarity: 'Holographic' },
    { id: 'field-trip', name: 'The Magic Dutch Bus', image: 'assets/img/strains/field-trip-card.jpg', reward: 'Field Trip Discount', rarity: 'Special' }
];

const GL_SETS = [
    { id: 'trophy-case', name: 'The Trophy Case', tagline: 'Decorated champions and cup-winning classics.', reward: '30% Off Entire Order', cardIds: ['mr-clean', 'lilac-diesel', 'forbidden-jelly', 'lemon-wookie', 'space-hippy'] },
    { id: 'jedi', name: 'The Jedi Council', tagline: 'The Force is strong with these galactic genetics.', reward: '$20 Off Extracts', cardIds: ['falcon-9', 'solo-walker', 'death-z', 'death-star', 'death-by-funk'] },
    { id: 'fruit-basket', name: 'Summer Vibe', tagline: 'A tropical storm of juicy terpene profiles.', reward: '$25 Store Credit', cardIds: ['pina-rita', 'strawberry-daiquiri', 'guicy-g', 'orange-kush-cake', 'sin-city-grapes', 'banana-split'] },
    { id: 'night-shift', name: 'The Night Shift', tagline: 'Heavy-hitting Indicas to lock you in for the night.', reward: 'Free 200mg RSO Gummy', cardIds: ['garlic-breath', 'illudium', 'spirit-hashplant', 'clusterfunk', 'hash-d', 'gorilla-88'] },
    { id: 'bakery', name: 'The Dutch Bakery', tagline: 'Freshly baked, sweet, and sticky.', reward: 'Free 100mg Edible', cardIds: ['13-layer-cake', 'pb-n-chocolate', 'choc-marshmallows', 'bubblegum-88g13hp', 'super-silver-hashplant', 'cobra-lips'] },
    { id: 'shiny-vault', name: 'The Variant Vault', tagline: 'Ultra-rare holos and alternate artworks.', reward: '$50 Gift Card', cardIds: ['hash-d-alt', 'falcon-9-alt', 'sin-city-grapes-alt', 'face-off-og-alt', 'banana-split-alt'] },
    { id: 'explorer', name: 'Store Explorer', tagline: 'Hidden secrets scattered around Green Labs.', reward: 'Mystery Swag Bag', cardIds: ['the-bodyguard', 'favorite-customer', 'chalk-board', 'monolith', 'merch-garden'] },
    { id: 'lost-ones', name: 'The Lost Ones', tagline: 'Cards waiting for a home in a future collection.', reward: 'Bonus Perk', cardIds: ['sticky-trap', 'white-wampa', 'bubblegum-pink', 'field-trip'] }
];
