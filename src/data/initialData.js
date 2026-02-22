// Initial data used as fallback when localStorage is empty

export const initialClasses = [
  {
    id: 1,
    name: 'Sunrise Flow',
    level: 'All Levels',
    duration: '60 min',
    category: 'flow',
    instructor: 'Priya Sharma',
    description: 'Start your morning with a gentle, energizing flow. Sun salutations and standing poses build warmth while mindful breathwork centers your mind for the day ahead.',
    featured: true,
  },
  {
    id: 2,
    name: 'Power Vinyasa',
    level: 'Intermediate',
    duration: '75 min',
    category: 'strength',
    instructor: 'Aisha Johnson',
    description: 'An athletic, fast-paced practice linking breath to movement. Expect challenging sequences, arm balances, and inversions that build strength and stamina.',
    featured: false,
  },
  {
    id: 3,
    name: 'Restorative Yoga',
    level: 'Beginner',
    duration: '60 min',
    category: 'restorative',
    instructor: 'Elena Vasquez',
    description: 'Deeply relaxing, prop-supported poses held for extended periods. This practice activates the parasympathetic nervous system, promoting healing and stress relief.',
    featured: true,
  },
  {
    id: 4,
    name: 'Prenatal Yoga',
    level: 'All Levels',
    duration: '60 min',
    category: 'restorative',
    instructor: 'Priya Sharma',
    description: 'A safe, nurturing practice designed for expecting mothers at every stage. Modified poses support your changing body while building strength for birth.',
    featured: false,
  },
  {
    id: 5,
    name: 'Yin Yoga',
    level: 'Beginner',
    duration: '75 min',
    category: 'restorative',
    instructor: 'Elena Vasquez',
    description: 'Long-held passive stretches targeting deep connective tissue and fascia. Each pose is held for 3-5 minutes, creating space for profound release and flexibility.',
    featured: false,
  },
  {
    id: 6,
    name: 'Ashtanga Fundamentals',
    level: 'Intermediate',
    duration: '90 min',
    category: 'strength',
    instructor: 'Aisha Johnson',
    description: 'An introduction to the traditional Ashtanga primary series. Learn the foundational postures, breathing technique, and flowing transitions of this dynamic practice.',
    featured: false,
  },
  {
    id: 7,
    name: 'Yoga Sculpt',
    level: 'Advanced',
    duration: '60 min',
    category: 'strength',
    instructor: 'Mei Lin Chen',
    description: 'Yoga meets strength training. Flowing yoga sequences are combined with light weights and cardio bursts for a full-body workout that tones and energizes.',
    featured: false,
  },
  {
    id: 8,
    name: 'Meditation & Breathwork',
    level: 'All Levels',
    duration: '45 min',
    category: 'meditation',
    instructor: 'Mei Lin Chen',
    description: 'Guided pranayama techniques and seated meditation cultivate inner calm and mental clarity. No yoga experience required — just an open mind.',
    featured: true,
  },
];

export const initialCategories = [
  { key: 'flow', label: 'Flow', color: '#7E7F41' },
  { key: 'strength', label: 'Strength', color: '#9F4A2D' },
  { key: 'restorative', label: 'Restorative', color: '#E1A9A0' },
  { key: 'meditation', label: 'Meditation', color: '#D5B794' },
];

export const initialMemberships = [
  {
    id: 1,
    name: 'Drop-In',
    price: '$25',
    period: 'class',
    features: [
      'Single class access',
      'No commitment required',
      'Book any available class',
      'Mat rental available ($5)',
    ],
    cta: 'Book a Class',
  },
  {
    id: 2,
    name: 'Monthly Unlimited',
    price: '$140',
    period: 'month',
    features: [
      'Unlimited classes',
      'Cancel anytime',
      'Complimentary mat rental',
      'Priority booking (24h early)',
      'Tea lounge access',
    ],
    cta: 'Start Monthly',
  },
  {
    id: 3,
    name: 'Annual Membership',
    price: '$120',
    period: 'month',
    features: [
      'Everything in Monthly',
      'Best value (billed annually)',
      '2 guest passes per month',
      '10% studio shop discount',
      'Exclusive member events',
    ],
    cta: 'Go Annual',
  },
];

// Schedule end date - null for no end (continues indefinitely)
export const initialScheduleEndDate = null;

// Holiday dates when studio is closed
export const initialHolidayDates = [];

// Weekly schedule template - day of week mapped to class slots
export const initialScheduleTemplate = {
  sunday: [
    { classId: 8, time: '9:00 AM' },
  ],
  monday: [
    { classId: 1, time: '7:00 AM' },
    { classId: 2, time: '10:00 AM' },
    { classId: 3, time: '5:30 PM' },
  ],
  tuesday: [
    { classId: 5, time: '7:00 AM' },
    { classId: 6, time: '10:00 AM' },
    { classId: 7, time: '4:00 PM' },
    { classId: 8, time: '6:30 PM' },
  ],
  wednesday: [
    { classId: 1, time: '7:00 AM' },
    { classId: 2, time: '10:00 AM' },
    { classId: 3, time: '5:30 PM' },
  ],
  thursday: [
    { classId: 5, time: '7:00 AM' },
    { classId: 6, time: '10:00 AM' },
    { classId: 7, time: '4:00 PM' },
    { classId: 8, time: '6:30 PM' },
  ],
  friday: [
    { classId: 1, time: '7:00 AM' },
    { classId: 2, time: '10:00 AM' },
    { classId: 3, time: '5:30 PM' },
  ],
  saturday: [
    { classId: 1, time: '8:00 AM' },
    { classId: 4, time: '10:30 AM' },
    { classId: 7, time: '1:00 PM' },
  ],
};
