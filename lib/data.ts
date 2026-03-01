import type { Report, User, Challenge, Reward } from './types';

export const users: User[] = [
  { id: 'user-1', name: 'Alex Doe', email: 'inspector@greencity.com', password: 'password', avatarUrl: 'https://picsum.photos/seed/user-1/100/100', points: 1250, rank: 1, type: 'Inspector' },
  { id: 'user-2', name: 'Jane Smith', email: 'jane.smith@example.com', password: 'password', avatarUrl: 'https://picsum.photos/seed/user-2/100/100', points: 1100, rank: 2, type: 'Citizen' },
  { id: 'user-3', name: 'Samuel Green', email: 'samuel.green@example.com', password: 'password', avatarUrl: 'https://picsum.photos/seed/user-3/100/100', points: 980, rank: 3, type: 'Student' },
  { id: 'user-4', name: 'Priya Patel', email: 'priya.patel@example.com', password: 'password', avatarUrl: 'https://picsum.photos/seed/user-4/100/100', points: 850, rank: 4, type: 'Citizen' },
  { id: 'user-5', name: 'Chen Wei', email: 'chen.wei@example.com', password: 'password', avatarUrl: 'https://picsum.photos/seed/user-5/100/100', points: 720, rank: 5, type: 'Student' },
];

export const reports: Report[] = [
  {
    id: 'REP-001',
    description: 'Large pile of construction debris dumped on the roadside near the park entrance.',
    location: '123 Park Ave, Green City',
    timestamp: '2024-07-22T08:15:00Z',
    imageUrl: 'https://picsum.photos/seed/report-1/800/600',
    imageHint: 'trash street',
    status: 'Pending',
    user: { name: 'Alex Doe', avatarUrl: 'https://picsum.photos/seed/user-1/100/100' },
    violationType: 'illegal dumping',
    authenticity: { isAuthentic: true, authenticityReasons: [] }
  },
  {
    id: 'REP-002',
    description: 'Public dustbin is overflowing, and garbage is scattered all around it.',
    location: 'Market Street, Green City',
    timestamp: '2024-07-21T14:30:00Z',
    imageUrl: 'https://picsum.photos/seed/report-2/800/600',
    imageHint: 'trash can',
    status: 'Approved',
    user: { name: 'Jane Smith', avatarUrl: 'https://picsum.photos/seed/user-2/100/100' },
    violationType: 'unsegregated waste',
    authenticity: { isAuthentic: true, authenticityReasons: [] }
  },
  {
    id: 'REP-003',
    description: 'Graffiti on the community hall wall.',
    location: '456 Community Dr, Green City',
    timestamp: '2024-07-21T19:00:00Z',
    imageUrl: 'https://picsum.photos/seed/report-3/800/600',
    imageHint: 'graffiti wall',
    status: 'Approved',
    user: { name: 'Samuel Green', avatarUrl: 'https://picsum.photos/seed/user-3/100/100' },
    violationType: 'graffiti',
    authenticity: { isAuthentic: true, authenticityReasons: [] }
  },
  {
    id: 'REP-004',
    description: 'Household waste not segregated into wet and dry bins.',
    location: '789 Residential Ln, Green City',
    timestamp: '2024-07-20T09:00:00Z',
    imageUrl: 'https://picsum.photos/seed/report-4/800/600',
    imageHint: 'garbage pile',
    status: 'Rejected',
    user: { name: 'Priya Patel', avatarUrl: 'https://picsum.photos/seed/user-4/100/100' },
    violationType: 'unsegregated waste',
    authenticity: { isAuthentic: false, authenticityReasons: ['Image is blurry'] }
  },
  {
    id: 'REP-005',
    description: 'Someone urinating in public near the bus stop.',
    location: 'Central Bus Terminal, Green City',
    timestamp: '2024-07-19T18:45:00Z',
    imageUrl: 'https://picsum.photos/seed/report-5/800/600',
    imageHint: 'street alley',
    status: 'Pending',
    user: { name: 'Chen Wei', avatarUrl: 'https://picsum.photos/seed/user-5/100/100' },
    violationType: 'public urination',
    authenticity: { isAuthentic: true, authenticityReasons: [] }
  }
];

export const challenges: Challenge[] = [
  {
    id: 'CHL-001',
    title: 'Plastic-Free Week',
    description: 'Collect and submit pictures of 5kg of plastic waste from your neighborhood.',
    points: 200,
    imageUrl: 'https://picsum.photos/seed/challenge-1/600/400',
    imageHint: 'plastic bottles',
    status: 'Active',
    actionType: 'report'
  },
  {
    id: 'CHL-002',
    title: 'Community Clean-Up Drive',
    description: 'Participate in the weekend community clean-up event and share a group photo.',
    points: 150,
    imageUrl: 'https://picsum.photos/seed/challenge-2/600/400',
    imageHint: 'community cleaning',
    status: 'Active',
    actionType: 'info'
  },
  {
    id: 'CHL-005',
    title: 'Graffiti Busters',
    description: 'Find and report new graffiti in your area to help us keep our city walls clean.',
    points: 80,
    imageUrl: 'https://picsum.photos/seed/challenge-5/600/400',
    imageHint: 'graffiti art',
    status: 'Active',
    actionType: 'report'
  },
  {
    id: 'CHL-006',
    title: 'Compost Champion',
    description: 'Start your own compost bin at home and share your setup with the community.',
    points: 180,
    imageUrl: 'https://picsum.photos/seed/challenge-6/600/400',
    imageHint: 'compost bin',
    status: 'Active',
    actionType: 'info'
  },
  {
    id: 'CHL-003',
    title: 'Segregation Star',
    description: 'Show us your perfectly segregated wet and dry waste bins for a week.',
    points: 100,
    imageUrl: 'https://picsum.photos/seed/challenge-3/600/400',
    imageHint: 'recycling bins',
    status: 'Expired',
    actionType: 'report'
  },
  {
    id: 'CHL-004',
    title: 'Green Commuter',
    description: 'Use public transport or cycle to work for 5 consecutive days.',
    points: 120,
    imageUrl: 'https://picsum.photos/seed/challenge-4/600/400',
    imageHint: 'bicycle person',
    status: 'Completed',
    actionType: 'info'
  }
];

export const rewards: Reward[] = [
  {
    id: 'REW-001',
    name: 'Coffee Shop Coupon',
    description: 'Get 20% off at "The Daily Grind" coffee shop.',
    pointsRequired: 500,
    type: 'Coupon'
  },
  {
    id: 'REW-002',
    name: 'Eco-friendly Water Bottle',
    description: 'Redeem a stylish, reusable water bottle.',
    pointsRequired: 1000,
    type: 'Digital Good'
  },
  {
    id: 'REW-003',
    name: 'Movie Ticket',
    description: 'One free movie ticket at Green City Multiplex.',
    pointsRequired: 750,
    type: 'Coupon'
  },
   {
    id: 'REW-004',
    name: 'Exclusive App Badge',
    description: 'A special "City Hero" badge for your profile.',
    pointsRequired: 250,
    type: 'Digital Good'
  }
];

export const currentUser: User = users[0];

export const energyData = {
  stats: {
    wasteConverted: 1250, // tonnes
    energyGenerated: 85, // MWh
    compostProduced: 400, // tonnes
    revenueGenerated: {
        total: 15, // Lakhs INR
        bioCNG: 9,
        compost: 4,
        carbonCredits: 2,
    },
    co2Reduced: 120, // tons
    dieselReplaced: 50000, // litres
  },
  plantStatus: {
    status: 'Running' as 'Running' | 'Under Maintenance' | 'Offline',
    lastService: '2024-07-15',
    currentOutput: '3.5 MWh/day',
  },
  energyBySource: [
    { name: "Temple Flowers", value: 45, fill: "var(--color-chart-1)" },
    { name: "Market Waste", value: 35, fill: "var(--color-chart-2)" },
    { name: "Hotel Waste", value: 20, fill: "var(--color-chart-4)" },
  ],
  productionOverTime: [
    { month: "Jan", energy: 10 },
    { month: "Feb", energy: 12 },
    { month: "Mar", energy: 15 },
    { month: "Apr", energy: 14 },
    { month: "May", energy: 18 },
    { month: "Jun", energy: 21 },
  ],
};
