export const PRODUCTS = [
  {
    id: 'carry-bags',
    name: 'Carry Bags (D-Cut / W-Cut)',
    category: 'Retail & Daily Utility',
    description: 'High tensile strength biodegradable carry bags with ergonomic handles for grocers, retail stores, and takeouts.',
    defaultWidth: 12, // inches
    defaultLength: 16, // inches
    defaultGusset: 3, // inches
    defaultMicron: 50,
    minMicron: 40,
    maxMicron: 100,
    baseRatePerKg: 240, // INR per kg of compostable polymer
    handleTypes: ['D-Cut Handle', 'W-Cut / Vest Style', 'Punch Hole', 'Loop Handle'],
    applications: ['Retail Outlets', 'Vegetable Vendors', 'Boutiques', 'Food Takeaway'],
    features: ['100% Compostable (IS/ISO 17088)', 'Moisture Resistant', 'Custom Print Ready']
  },
  {
    id: 'kirana-covers',
    name: 'Kirana Folding Covers',
    category: 'General Grocery',
    description: 'Foldable, side-sealed compostable covers specifically optimized for Kirana provision shops and grain packaging.',
    defaultWidth: 10,
    defaultLength: 14,
    defaultGusset: 2,
    defaultMicron: 50,
    minMicron: 40,
    maxMicron: 80,
    baseRatePerKg: 235,
    handleTypes: ['Flat Open Mouth', 'Side Folding Gusset'],
    applications: ['Kirana Stores', 'Dry Fruit Packing', 'Pulse & Grain Dispensing'],
    features: ['High Puncture Resistance', 'Food Grade Certified', 'Easy Dispenser Pack']
  },
  {
    id: 'supermarket-covers',
    name: 'Supermarket Packing Covers',
    category: 'Commercial Retail',
    description: 'Heavy-duty compostable shopping covers designed to handle diverse grocery loads without tearing.',
    defaultWidth: 16,
    defaultLength: 20,
    defaultGusset: 4,
    defaultMicron: 60,
    minMicron: 50,
    maxMicron: 120,
    baseRatePerKg: 245,
    handleTypes: ['W-Cut Carrier', 'Reinforced D-Cut', 'Bottom Seal Gusset'],
    applications: ['Supermarket Chains', 'Departmental Stores', 'Hypermarkets'],
    features: ['High Weight Bearing (up to 12kg)', 'Anti-Static Coating', 'Smooth Flexo Print']
  },
  {
    id: 'dairy-milk-covers',
    name: 'Dairy Forms Milk Packing Covers',
    category: 'Dairy & Liquid Packaging',
    description: 'Specialized barrier films with exceptional seal integrity for milk, curd, and dairy product packaging.',
    defaultWidth: 6,
    defaultLength: 9,
    defaultGusset: 0,
    defaultMicron: 55,
    minMicron: 50,
    maxMicron: 75,
    baseRatePerKg: 260,
    handleTypes: ['Pouch Roll Stock', '3-Side Seal Pouch', 'Center Seal Pouch'],
    applications: ['Dairy Farms', 'Milk Processing Centers', 'Curd & Paneer Packets'],
    features: ['Liquid Leakage Proof', 'Low-Temperature Sealing', 'Cold Storage Tolerant']
  },
  {
    id: 'garbage-covers',
    name: 'Garbage Covers & Bio-Hazard Rolls',
    category: 'Waste Management',
    description: 'Certified compostable trash bags that degrade naturally along with organic kitchen and municipal waste.',
    defaultWidth: 19,
    defaultLength: 21,
    defaultGusset: 0,
    defaultMicron: 45,
    minMicron: 40,
    maxMicron: 90,
    baseRatePerKg: 220,
    handleTypes: ['Roll with Perforation', 'Drawstring', 'Star Seal Bottom'],
    applications: ['Hotels & Restaurants', 'Hospitals', 'Residential Societies', 'Offices'],
    features: ['Zero Odor Leakage', 'Composts with Food Waste', 'Colour Coded (Green/Black)']
  },
  {
    id: 'nursery-covers',
    name: 'Nursery Planting Covers',
    category: 'Agriculture & Horticulture',
    description: 'Direct-to-ground biodegradable sapling bags. No need to remove the bag when planting—it dissolves into soil nutrients.',
    defaultWidth: 5,
    defaultLength: 8,
    defaultGusset: 2,
    defaultMicron: 50,
    minMicron: 40,
    maxMicron: 70,
    baseRatePerKg: 230,
    handleTypes: ['Perforated Drainage Bottom', 'Open Top Gusset'],
    applications: ['Plant Nurseries', 'Forestry Departments', 'Urban Gardening', 'Farm Saplings'],
    features: ['Direct Soil Planting', 'Root Aeration Pores', 'Enriches Soil on Breakdown']
  },
  {
    id: 'shopping-mall-covers',
    name: 'Shopping Mall Covers',
    category: 'Apparel & Lifestyle',
    description: 'Aesthetic, matte-finish luxury compostable carry bags with premium brand printing for malls and apparel showrooms.',
    defaultWidth: 14,
    defaultLength: 18,
    defaultGusset: 4,
    defaultMicron: 75,
    minMicron: 60,
    maxMicron: 120,
    baseRatePerKg: 255,
    handleTypes: ['Soft Loop Handle', 'Rigid Clip Handle', 'Reinforced Patch Handle'],
    applications: ['Clothing Showrooms', 'Footwear Brands', 'Electronics Retail', 'Gift Stores'],
    features: ['Velvety Matte Finish', 'HD 4-Color Printing', 'Premium Visual Appeal']
  }
];

export const COMPANY_INFO = {
  name: 'Redeem Industry',
  tagline: 'Eco-conscious Manufacturing for a Greener Tomorrow',
  slogan: 'Biodegradable excellence for a cleaner, healthier world.',
  experience: '02 Years of Success',
  location: 'Telangana, India',
  email: 'contact@redeemindustry.com',
  phone: '+91 98480 12345',
  website: 'www.redeemindustry.com',
  cipetCert: 'CIPET: Central Institute of Petrochemicals Engineering & Technology Certified',
  pcbApproval: 'TSPCB: Telangana State Pollution Control Board Approved',
  standards: ['IS/ISO 17088:2021', 'EN 13432', 'ASTM D6400', 'CPCB/TSPCB Compliant']
};
