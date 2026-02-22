import Hero from '../components/shared/Hero';
import SectionHeading from '../components/shared/SectionHeading';
import PricingCard from '../components/shared/PricingCard';
import { useData } from '../context/DataContext';
import styles from './SignUpPage.module.css';

const steps = [
  {
    number: '1',
    title: 'Choose Your Plan',
    description: 'Select the membership tier that fits your lifestyle and practice goals.',
  },
  {
    number: '2',
    title: 'Create Your Account',
    description: 'Sign up online with your email. It takes less than two minutes.',
  },
  {
    number: '3',
    title: 'Book Your First Class',
    description: 'Browse the calendar, pick a class, and show up ready to flow.',
  },
];

export default function SignUpPage() {
  const { memberships } = useData();

  return (
    <>
      <Hero
        title="Join Studio Neem"
        subtitle="Choose a membership that fits your journey. Every plan includes access to our beautiful studio and welcoming community."
        gradient="tan"
      />

      <section className={styles.pricing}>
        <div className="container">
          <SectionHeading
            title="Membership Options"
            subtitle="Flexible plans designed to support your practice, wherever you are on your journey."
          />
          <div className={styles.pricingGrid}>
            {memberships.map((tier, i) => (
              <PricingCard key={tier.id} tier={tier} featured={i === 1} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.howTo}>
        <div className="container">
          <SectionHeading
            title="How to Get Started"
            subtitle="Three simple steps to begin your practice at Studio Neem."
          />
          <div className={styles.stepsGrid}>
            {steps.map(step => (
              <div key={step.number} className={styles.step}>
                <div className={styles.stepNumber}>{step.number}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            ))}
          </div>
          <p className={styles.note}>
            Registration opens March 2026. Sign up for our newsletter to be the first to know.
          </p>
        </div>
      </section>
    </>
  );
}
