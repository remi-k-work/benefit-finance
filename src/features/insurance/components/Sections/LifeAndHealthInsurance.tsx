"use client";

// services, features, and other libraries
import { motion, stagger } from "motion/react";

// components
import SectionHeader, { SectionHeaderSkeleton } from "@/components/SectionHeader";

// types
import type LangLoader from "@/lib/LangLoader";

interface LifeAndHealthInsuranceProps {
  ll: typeof LangLoader.prototype.insurance;
}

// constants
const LIST = {
  hidden: { opacity: 0, transition: { when: "afterChildren" } },
  visible: { opacity: 1, transition: { when: "beforeChildren", delayChildren: stagger(0.5) } },
} as const;
const ITEM = { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 40, damping: 20, mass: 1.2 } } } as const;

export function LifeAndHealthInsurance({ ll }: LifeAndHealthInsuranceProps) {
  return (
    <motion.section className="clear-both" initial="hidden" whileInView="visible" variants={LIST} viewport={{ once: true }}>
      <SectionHeader title={ll["Life and health insurance"]} />
      <motion.p variants={ITEM}>{ll["Protecting life and health means, above all, protecting your loved ones."]}</motion.p>
      <br />
      <motion.p variants={ITEM}>
        {ll["In the event of illness or accident, the right insurance can mean access to treatment, rehabilitation and financial stability while you recover."]}
      </motion.p>
    </motion.section>
  );
}

export function LifeAndHealthInsuranceSkeleton() {
  return (
    <section className="clear-both">
      <SectionHeaderSkeleton />
      <p>&nbsp;</p>
      <br />
      <p>&nbsp;</p>
    </section>
  );
}
