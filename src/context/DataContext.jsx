import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  initialClasses,
  initialCategories,
  initialMemberships,
  initialSchedule,
  initialRegistrations,
} from '../data/initialData';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  classes: 'studioneem_classes',
  categories: 'studioneem_categories',
  memberships: 'studioneem_memberships',
  schedule: 'studioneem_schedule',
  registrations: 'studioneem_registrations',
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
  const [schedule, setSchedule] = useState(() =>
    loadFromStorage(STORAGE_KEYS.schedule, initialSchedule)
  );
  const [registrations, setRegistrations] = useState(() =>
    loadFromStorage(STORAGE_KEYS.registrations, initialRegistrations)
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
    saveToStorage(STORAGE_KEYS.schedule, schedule);
  }, [schedule]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.registrations, registrations);
  }, [registrations]);

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
    setSchedule((prev) => {
      const updated = {};
      for (const dateKey of Object.keys(prev)) {
        const filtered = prev[dateKey].filter((slot) => slot.classId !== id);
        if (filtered.length > 0) {
          updated[dateKey] = filtered;
        }
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

  // Schedule operations - date-based
  const addClassToDate = useCallback((dateKey, slot) => {
    setSchedule((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), slot],
    }));
  }, []);

  const removeClassFromDate = useCallback((dateKey, index) => {
    setSchedule((prev) => {
      const daySlots = prev[dateKey] || [];
      const filtered = daySlots.filter((_, i) => i !== index);
      if (filtered.length === 0) {
        const { [dateKey]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [dateKey]: filtered,
      };
    });
  }, []);

  const copyWeekToNext = useCallback((weekStartDate) => {
    // weekStartDate is a Date object representing the Sunday of the week to copy
    const startDate = new Date(weekStartDate);
    startDate.setHours(0, 0, 0, 0);

    // Get the 7 days of this week
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      weekDates.push(d);
    }

    // Get corresponding dates in next week
    const nextWeekDates = weekDates.map((d) => {
      const next = new Date(d);
      next.setDate(d.getDate() + 7);
      return next;
    });

    setSchedule((prev) => {
      const updated = { ...prev };

      for (let i = 0; i < 7; i++) {
        const sourceKey = formatDateKey(weekDates[i]);
        const targetKey = formatDateKey(nextWeekDates[i]);

        if (prev[sourceKey] && prev[sourceKey].length > 0) {
          // Copy slots from source to target
          updated[targetKey] = [...prev[sourceKey]];
        }
      }

      return updated;
    });
  }, []);

  // Helper to format date as YYYY-MM-DD
  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Registration operations
  const addRegistration = useCallback((data) => {
    const newId = Math.max(0, ...registrations.map((r) => r.id)) + 1;
    const registration = {
      ...data,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    setRegistrations((prev) => [...prev, registration]);
    return newId;
  }, [registrations]);

  const getRegistrationsForClass = useCallback((classId, date, time) => {
    return registrations.filter(
      (r) => r.classId === classId && r.scheduleDate === date && r.scheduleTime === time
    );
  }, [registrations]);

  const deleteRegistration = useCallback((id) => {
    setRegistrations((prev) => prev.filter((r) => r.id !== id));
  }, []);

  // Get schedule with class details populated
  const getSchedule = useCallback(() => {
    const result = {};

    for (const dateKey of Object.keys(schedule)) {
      const daySlots = schedule[dateKey];
      if (daySlots && daySlots.length > 0) {
        result[dateKey] = daySlots.map((slot, idx) => {
          const classData = classes.find((c) => c.id === slot.classId);
          if (!classData) return null;
          return {
            id: `${dateKey}-${idx + 1}`,
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

    return result;
  }, [schedule, classes]);

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
    setSchedule(initialSchedule);
    setRegistrations(initialRegistrations);
  }, []);

  const value = {
    // Data
    classes,
    categories,
    memberships,
    schedule,
    registrations,

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
    addClassToDate,
    removeClassFromDate,
    copyWeekToNext,
    getSchedule,

    // Registration operations
    addRegistration,
    getRegistrationsForClass,
    deleteRegistration,

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
