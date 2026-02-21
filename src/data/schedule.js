// Helper to generate a date string key
const d = (year, month, day) => {
  const m = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${m}-${dd}`;
};

// Generate recurring schedule for a given month
function generateMonth(year, month) {
  const events = {};
  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const dow = date.getDay();
    const key = d(year, month, day);
    const dayEvents = [];

    // Sunday — rest day, only meditation
    if (dow === 0) {
      dayEvents.push({
        id: `${key}-1`,
        className: 'Meditation & Breathwork',
        time: '9:00 AM',
        instructor: 'Mei Lin Chen',
        level: 'All Levels',
        duration: '45 min',
        category: 'meditation',
      });
    }

    // Monday, Wednesday, Friday
    if (dow === 1 || dow === 3 || dow === 5) {
      dayEvents.push(
        {
          id: `${key}-1`,
          className: 'Sunrise Flow',
          time: '7:00 AM',
          instructor: 'Priya Sharma',
          level: 'All Levels',
          duration: '60 min',
          category: 'flow',
        },
        {
          id: `${key}-2`,
          className: 'Power Vinyasa',
          time: '10:00 AM',
          instructor: 'Aisha Johnson',
          level: 'Intermediate',
          duration: '75 min',
          category: 'strength',
        },
        {
          id: `${key}-3`,
          className: 'Restorative Yoga',
          time: '5:30 PM',
          instructor: 'Elena Vasquez',
          level: 'Beginner',
          duration: '60 min',
          category: 'restorative',
        },
      );
    }

    // Tuesday, Thursday
    if (dow === 2 || dow === 4) {
      dayEvents.push(
        {
          id: `${key}-1`,
          className: 'Yin Yoga',
          time: '7:00 AM',
          instructor: 'Elena Vasquez',
          level: 'Beginner',
          duration: '75 min',
          category: 'restorative',
        },
        {
          id: `${key}-2`,
          className: 'Ashtanga Fundamentals',
          time: '10:00 AM',
          instructor: 'Aisha Johnson',
          level: 'Intermediate',
          duration: '90 min',
          category: 'strength',
        },
        {
          id: `${key}-3`,
          className: 'Yoga Sculpt',
          time: '4:00 PM',
          instructor: 'Mei Lin Chen',
          level: 'Advanced',
          duration: '60 min',
          category: 'strength',
        },
        {
          id: `${key}-4`,
          className: 'Meditation & Breathwork',
          time: '6:30 PM',
          instructor: 'Mei Lin Chen',
          level: 'All Levels',
          duration: '45 min',
          category: 'meditation',
        },
      );
    }

    // Saturday — special classes
    if (dow === 6) {
      dayEvents.push(
        {
          id: `${key}-1`,
          className: 'Sunrise Flow',
          time: '8:00 AM',
          instructor: 'Priya Sharma',
          level: 'All Levels',
          duration: '60 min',
          category: 'flow',
        },
        {
          id: `${key}-2`,
          className: 'Prenatal Yoga',
          time: '10:30 AM',
          instructor: 'Priya Sharma',
          level: 'All Levels',
          duration: '60 min',
          category: 'restorative',
        },
        {
          id: `${key}-3`,
          className: 'Yoga Sculpt',
          time: '1:00 PM',
          instructor: 'Mei Lin Chen',
          level: 'Advanced',
          duration: '60 min',
          category: 'strength',
        },
      );
    }

    if (dayEvents.length > 0) {
      events[key] = dayEvents;
    }
  }

  return events;
}

// Pre-generate several months of schedule data
export const schedule = {
  ...generateMonth(2026, 2),
  ...generateMonth(2026, 3),
  ...generateMonth(2026, 4),
  ...generateMonth(2026, 5),
  ...generateMonth(2026, 6),
};
