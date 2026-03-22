export interface Dish {
  id: string;
  name: string;
  description: string;
  price: string;
  rating: string;
  reviews: string;
  image: string;
  category: string;
  prepTime: string;
  servingSize: string;
  ingredients: string[];
  nutrition: { label: string; value: string; color: string }[];
  special?: string;
}

const defaultNutrition = [
  { label: "CALORIES", value: "450", color: "text-orange-500" },
  { label: "PROTEIN", value: "20g", color: "text-emerald-500" },
  { label: "CARBS", value: "60g", color: "text-sky-500" },
  { label: "FAT", value: "15g", color: "text-rose-500" },
];

export const dishes: Dish[] = [
  {
    id: "smokey-jollof",
    name: "Smokey Jollof Rice",
    description: "Authentic firewood-smoked Jollof rice served with grilled chicken and plantain. A classic West African staple known for its deep orange hue and rich, smoky aroma.",
    price: "7500",
    rating: "4.9",
    reviews: "142",
    image: "/images/jollof-rice.jpg",
    category: "Main Course",
    prepTime: "25-30 mins",
    servingSize: "Single Portion",
    ingredients: ["Long-grain Parboiled Rice", "Scotch Bonnet", "Tomato Paste", "Red Bell Peppers", "Smoked Paprika", "Palm Oil"],
    nutrition: [
      { label: "CALORIES", value: "650", color: "text-orange-500" },
      { label: "PROTEIN", value: "28g", color: "text-emerald-500" },
      { label: "CARBS", value: "85g", color: "text-sky-500" },
      { label: "FAT", value: "18g", color: "text-rose-500" },
    ],
    special: "CHEF'S SPECIAL"
  },
  {
    id: "peppered-snail",
    name: "Peppered Snail",
    description: "Jumbo forest snails sautéed in a spicy habanero and onion reduction. A gourmet spicy appetizer perfect for sharing.",
    price: "8500",
    rating: "4.8",
    reviews: "89",
    image: "/images/peppered-snail.jpeg",
    category: "Traditional",
    prepTime: "15-20 mins",
    servingSize: "Small Plate",
    ingredients: ["Forest Snails", "Habanero Peppers", "Red Onions", "Vegetable Oil", "Spices"],
    nutrition: [
      { label: "CALORIES", value: "320", color: "text-orange-500" },
      { label: "PROTEIN", value: "45g", color: "text-emerald-500" },
      { label: "CARBS", value: "12g", color: "text-sky-500" },
      { label: "FAT", value: "8g", color: "text-rose-500" },
    ]
  },
  {
    id: "egusi-soup",
    name: "Egusi Soup & Pounded Yam",
    description: "Melon seed soup with assorted meats and pan-fried spinach, served with smooth pounded yam. Rich, nutty, and deeply satisfying.",
    price: "9000",
    rating: "5.0",
    reviews: "215",
    image: "/images/egusi-pounded-yam.jpg",
    category: "Traditional",
    prepTime: "30-35 mins",
    servingSize: "Main Serving",
    ingredients: ["Melon Seeds (Egusi)", "Spinach", "Assorted Meats", "Palm Oil", "Stockfish", "Yam"],
    nutrition: [
      { label: "CALORIES", value: "850", color: "text-orange-500" },
      { label: "PROTEIN", value: "55g", color: "text-emerald-500" },
      { label: "CARBS", value: "110g", color: "text-sky-500" },
      { label: "FAT", value: "35g", color: "text-rose-500" },
    ]
  },
  {
    id: "suya",
    name: "Gourmet Beef Suya",
    description: "Spicy grilled beef skewers seasoned with traditional Yaji spice and served with onions.",
    price: "5500",
    rating: "4.9",
    reviews: "312",
    image: "/images/suya.jpg",
    category: "Traditional",
    prepTime: "15-20 mins",
    servingSize: "Platter",
    ingredients: ["Beef", "Yaji Spice", "Onions", "Cabbage"],
    nutrition: defaultNutrition,
  },
  {
    id: "abacha",
    name: "African Salad (Abacha)",
    description: "Traditional cassava salad with ugba, garden eggs, and fried fish.",
    price: "6500",
    rating: "4.7",
    reviews: "67",
    image: "/images/abacha.jpeg",
    category: "Traditional",
    prepTime: "20-25 mins",
    servingSize: "Single Portion",
    ingredients: ["Cassava", "Ugba", "Garden Eggs", "Fried Fish"],
    nutrition: defaultNutrition,
  },
  {
    id: "fried-rice",
    name: "Special Fried Rice",
    description: "Basmati rice stir-fried with seasonal vegetables and liver chunks.",
    price: "7000",
    rating: "4.6",
    reviews: "112",
    image: "/images/fried-rice.jpeg",
    category: "Main Course",
    prepTime: "25-30 mins",
    servingSize: "Single Portion",
    ingredients: ["Basmati Rice", "Vegetables", "Liver", "Chicken"],
    nutrition: defaultNutrition,
  },
  {
    id: "spaghetti-chicken",
    name: "Spaghetti with Chicken",
    description: "Italian spaghetti tossed in a rich Nigerian pepper sauce with grilled chicken.",
    price: "8000",
    rating: "4.8",
    reviews: "95",
    image: "/images/spaghetti-chicken.jpeg",
    category: "Main Course",
    prepTime: "20-25 mins",
    servingSize: "Single Portion",
    ingredients: ["Spaghetti", "Pepper Sauce", "Chicken"],
    nutrition: defaultNutrition,
  },
  {
    id: "amala-ewedu",
    name: "Amala and Ewedu",
    description: "Smooth yam flour pudding served with jute leaf soup and gbegiri.",
    price: "5500",
    rating: "4.9",
    reviews: "184",
    image: "/images/amala-ewedu.jpg",
    category: "Traditional",
    prepTime: "15-20 mins",
    servingSize: "Main Serving",
    ingredients: ["Yam Flour", "Jute Leaves", "Gbegiri"],
    nutrition: defaultNutrition,
  },
  {
    id: "banga-soup",
    name: "Banga Soup and Starch",
    description: "Delta-style palm nut soup enriched with local spices and fresh seafood.",
    price: "9500",
    rating: "4.8",
    reviews: "43",
    image: "/images/banga-soup-starch.jpeg",
    category: "Traditional",
    prepTime: "35-40 mins",
    servingSize: "Main Serving",
    ingredients: ["Palm Nut", "Seafood", "Starch"],
    nutrition: defaultNutrition,
  },
  {
    id: "efo-riro",
    name: "Efo Riro and Fufu",
    description: "Rich vegetable soup cooked with locust beans and assorted protein.",
    price: "8500",
    rating: "4.7",
    reviews: "128",
    image: "/images/eforiro.jpg",
    category: "Traditional",
    prepTime: "25-30 mins",
    servingSize: "Main Serving",
    ingredients: ["Spinach", "Locust Beans", "Fufu"],
    nutrition: defaultNutrition,
  },
  {
    id: "grilled-fish",
    name: "Gourmet Grilled Fish",
    description: "Slow-roasted croaker fish marinated in our signature spicy herb blend.",
    price: "15000",
    rating: "4.9",
    reviews: "56",
    image: "/images/grilled-fish.jpg",
    category: "Seafood",
    prepTime: "45-50 mins",
    servingSize: "Large Platter",
    ingredients: ["Croaker Fish", "Herb Blend", "Spices"],
    nutrition: defaultNutrition,
  },
  {
    id: "vegetable-soup",
    name: "Edikang Ikong",
    description: "Nutrient-dense vegetable soup with waterleaf and fluted pumpkin leaves.",
    price: "10000",
    rating: "4.9",
    reviews: "88",
    image: "/images/vegetable-soup.jpeg",
    category: "Traditional",
    prepTime: "30-35 mins",
    servingSize: "Main Serving",
    ingredients: ["Waterleaf", "Pumpkin Leaves", "Meat"],
    nutrition: defaultNutrition,
  },
  {
    id: "beans-plantain",
    name: "Beans and Plantain",
    description: "Slow-cooked honey beans paired with sweet fried plantain slices.",
    price: "5000",
    rating: "4.5",
    reviews: "54",
    image: "/images/beans-plantain.jpeg",
    category: "Traditional",
    prepTime: "20-25 mins",
    servingSize: "Single Portion",
    ingredients: ["Honey Beans", "Plantain"],
    nutrition: defaultNutrition,
  }
];

export const users = [
  {
    id: "1",
    name: "Adesua Etomi",
    email: "adesua@example.com",
    password: "password123",
    initials: "AE"
  }
];

export const orders: any[] = [];
