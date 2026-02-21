import { useState } from 'react';
import Hero from '../components/shared/Hero';
import SectionHeading from '../components/shared/SectionHeading';
import ClassCard from '../components/shared/ClassCard';
import { classes } from '../data/classes';
import styles from './ClassesPage.module.css';

export default function ClassesPage() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? classes
    : classes.filter(c => c.level === filter);

  return (
    <>
      <Hero
        title="Our Classes"
        subtitle="Discover a practice that nourishes your body, calms your mind, and feeds your spirit."
        gradient="rose"
      />

      <section className={styles.classes}>
        <div className="container">
          <SectionHeading
            title="Find Your Practice"
            subtitle="Filter by experience level to find the perfect class for you."
          />

          <div className={styles.filterBar}>
            {['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(level => (
              <button
                key={level}
                className={`${styles.filterPill} ${filter === level ? styles.active : ''}`}
                onClick={() => setFilter(level)}
              >
                {level}
              </button>
            ))}
          </div>

          <div className={styles.classGrid}>
            {filtered.map(cls => (
              <ClassCard key={cls.id} classData={cls} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className={styles.noResults}>No classes found for this filter.</p>
          )}
        </div>
      </section>
    </>
  );
}
