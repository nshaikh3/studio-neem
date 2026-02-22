import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  initialClasses,
  initialCategories,
  initialMemberships,
  initialScheduleTemplate,
  initialScheduleEndDate,
  initialHolidayDates,
} from '../data/initialData';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  classes: 'studioneem_classes',
  categories: 'studioneem_categories',
  memberships: 'studioneem_memberships',
  schedule: 'studioneem_schedule',
  scheduleEndDate: 'studioneem_scheduleEndDate',
  holidayDates: 'studioneem_holidayDates',
};

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn(`Failed to load ${key} from localStorage:`, e);
  }
  return fallback;
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Failed to save ${key} to localStorage:`, e);
  }
}

export function DataProvider({ children }) {
  const [classes, setClasses] = useState(() =>
    loadFromStorage(STORAGE_KEYS.classes, initialClasses)
  );
  const [categories, setCategories] = useState(() =>
    loadFromStorage(STORAGE_KEYS.categories, initialCategories)
  );
  const [memberships, setMemberships] = useState(() =>
    loadFromStorage(STORAGE_KEYS.memberships, initialMemberships)
  );
  const [scheduleTemplate, setScheduleTemplate] = useState(() =>
    loadFromStorage(STORAGE_KEYS.schedule, initialScheduleTemplate)
  );
  const [scheduleEndDate, setScheduleEndDateState] = useState(() =>
    loadFromStorage(STORAGE_KEYS.scheduleEndDate, initialScheduleEndDate)
  );
  const [holidayDates, setHolidayDatesState] = useState(() =>
    loadFromStorage(STORAGE_KEYS.holidayDates, initialHolidayDates)
  );

  // Auto-save to localStorage when data changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.classes, classes);
  }, [classes]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.categories, categories);
  }, [categories]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.memberships, memberships);
  }, [memberships]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.schedule, scheduleTemplate);
  }, [scheduleTemplate]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.scheduleEndDate, scheduleEndDate);
  }, [scheduleEndDate]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.holidayDates, holidayDates);
  }, [holidayDates]);

  // Class CRUD operations
  const addClass = useCallback((classData) => {
    const newId = Math.max(0, ...classes.map((c) => c.id)) + 1;
    setClasses((prev) => [...prev, { ...classData, id: newId }]);
    return newId;
  }, [classes]);

  const updateClass = useCallback((id, updates) => {
    setClasses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  }, []);

  const deleteClass = useCallback((id) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
    // Also remove from schedule
    setScheduleTemplate((prev) => {
      const updated = {};
      for (const day of Object.keys(prev)) {
        updated[day] = prev[day].filter((slot) => slot.classId !== id);
      }
      return updated;
    });
  }, []);

  const toggleFeatured = useCallback((id) => {
    setClasses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, featured: !c.featured } : c))
    );
  }, []);

  // Category CRUD operations
  const addCategory = useCallback((categoryData) => {
    setCategories((prev) => [...prev, categoryData]);
  }, []);

  const updateCategory = useCallback((key, updates) => {
    setCategories((prev) =>
      prev.map((c) => (c.key === key ? { ...c, ...updates } : c))
    );
  }, []);

  const deleteCategory = useCallback((key) => {
    setCategories((prev) => prev.filter((c) => c.key !== key));
  }, []);

  // Membership CRUD operations
  const addMembership = useCallback((membershipData) => {
    const newId = Math.max(0, ...memberships.map((m) => m.id)) + 1;
    setMemberships((prev) => [...prev, { ...membershipData, id: newId }]);
    return newId;
  }, [memberships]);

  const updateMembership = useCallback((id, updates) => {
    setMemberships((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  }, []);

  const deleteMembership = useCallback((id) => {
    setMemberships((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // Schedule operations
  const addScheduleSlot = useCallback((day, slot) => {
    setScheduleTemplate((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), slot],
    }));
  }, []);

  const removeScheduleSlot = useCallback((day, index) => {
    setScheduleTemplate((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  }, []);

  const updateScheduleSlot = useCallback((day, index, updates) => {
    setScheduleTemplate((prev) => ({
      ...prev,
      [day]: prev[day].map((slot, i) =>
        i === index ? { ...slot, ...updates } : slot
      ),
    }));
  }, []);

  // Schedule end date operations
  const setScheduleEndDate = useCallback((date) => {
    setScheduleEndDateState(date || null);
  }, []);

  // Holiday dates operations
  const addHoliday = useCallback((holiday) => {
    setHolidayDatesState((prev) => {
      // Prevent duplicates
      if (prev.some((h) => h.date === holiday.date)) {
        return prev;
      }
      return [...prev, holiday].sort((a, b) => a.date.localeCompare(b.date));
    });
  }, []);

  const removeHoliday = useCallback((date) => {
    setHolidayDatesState((prev) => prev.filter((h) => h.date !== date));
  }, []);

  // Generate full schedule for a given month based on template
  const generateScheduleForMonth = useCallback(
    (year, month) => {
      const events = {};
      const daysInMonth = new Date(year, month, 0).getDate();
      const dayNames = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ];

      // Create a Set of holiday dates for fast lookup
      const holidaySet = new Set(holidayDates.map((h) => h.date));

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const dow = date.getDay();
        const dayName = dayNames[dow];
        const key = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // Skip if date is after schedule end date
        if (scheduleEndDate && key > scheduleEndDate) {
          continue;
        }

        // Skip if date is a holiday
        if (holidaySet.has(key)) {
          continue;
        }

        const daySlots = scheduleTemplate[dayName] || [];

        if (daySlots.length > 0) {
          events[key] = daySlots.map((slot, idx) => {
            const classData = classes.find((c) => c.id === slot.classId);
            if (!classData) return null;
            return {
              id: `${key}-${idx + 1}`,
              className: classData.name,
              time: slot.time,
              instructor: classData.instructor,
              level: classData.level,
              duration: classData.duration,
              category: classData.category,
            };
          }).filter(Boolean);
        }
      }

      return events;
    },
    [scheduleTemplate, classes, scheduleEndDate, holidayDates]
  );

  // Generate schedule for multiple months
  const getSchedule = useCallback(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    let schedule = {};
    for (let i = 0; i < 6; i++) {
      const m = ((month - 1 + i) % 12) + 1;
      const y = year + Math.floor((month - 1 + i) / 12);
      schedule = { ...schedule, ...generateScheduleForMonth(y, m) };
    }
    return schedule;
  }, [generateScheduleForMonth]);

  // Helper to get category colors/labels maps for compatibility
  const getCategoryColors = useCallback(() => {
    const colors = {};
    categories.forEach((c) => {
      colors[c.key] = c.color;
    });
    return colors;
  }, [categories]);

  const getCategoryLabels = useCallback(() => {
    const labels = {};
    categories.forEach((c) => {
      labels[c.key] = c.label;
    });
    return labels;
  }, [categories]);

  // Reset to initial data
  const resetAllData = useCallback(() => {
    setClasses(initialClasses);
    setCategories(initialCategories);
    setMemberships(initialMemberships);
    setScheduleTemplate(initialScheduleTemplate);
    setScheduleEndDateState(initialScheduleEndDate);
    setHolidayDatesState(initialHolidayDates);
  }, []);

  const value = {
    // Data
    classes,
    categories,
    memberships,
    scheduleTemplate,
    scheduleEndDate,
    holidayDates,

    // Class operations
    addClass,
    updateClass,
    deleteClass,
    toggleFeatured,

    // Category operations
    addCategory,
    updateCategory,
    deleteCategory,

    // Membership operations
    addMembership,
    updateMembership,
    deleteMembership,

    // Schedule operations
    addScheduleSlot,
    removeScheduleSlot,
    updateScheduleSlot,
    getSchedule,

    // Schedule settings operations
    setScheduleEndDate,
    addHoliday,
    removeHoliday,

    // Helpers
    getCategoryColors,
    getCategoryLabels,
    resetAllData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export default DataContext;
