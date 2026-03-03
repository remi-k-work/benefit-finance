"use client";

// services, features, and other libraries
import { motion, stagger } from "motion/react";

// components
import SectionHeader, { SectionHeaderSkeleton } from "@/components/SectionHeader";

// types
import type LangLoader from "@/lib/LangLoader";

interface WhyIsItWorthProps {
  ll: typeof LangLoader.prototype.subsidies;
}

// constants
const LIST = {
  hidden: { opacity: 0, transition: { when: "afterChildren" } },
  visible: { opacity: 1, transition: { when: "beforeChildren", delayChildren: stagger(0.5) } },
} as const;
const ITEM = { hidden: { opacity: 0, x: +100 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 40, damping: 20, mass: 1.2 } } } as const;

export function WhyIsItWorth({ ll }: WhyIsItWorthProps) {
  return (
    <motion.section className="float-end" initial="hidden" whileInView="visible" variants={LIST} viewport={{ once: true }}>
      <SectionHeader title={ll["Why is it worth considering subsidies?"]} />
      <motion.p variants={ITEM}>{ll["Public funds often remain unused, even though they are available to entrepreneurs and investors."]}</motion.p>
      <br />
      <motion.p variants={ITEM}>{ll["Subsidies is not an “additional bonus”, but an element of conscious development planning."]}</motion.p>
    </motion.section>
  );
}

export function WhyIsItWorthSkeleton() {
  return (
    <section className="float-end">
      <SectionHeaderSkeleton />
      <p>&nbsp;</p>
      <br />
      <p>&nbsp;</p>
    </section>
  );
}
