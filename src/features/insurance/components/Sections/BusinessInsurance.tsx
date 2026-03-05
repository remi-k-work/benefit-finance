"use client";

// services, features, and other libraries
import { motion, stagger } from "motion/react";

// components
import SectionHeader, { SectionHeaderSkeleton } from "@/components/SectionHeader";

// types
import type LangLoader from "@/lib/LangLoader";

interface BusinessInsuranceProps {
  ll: typeof LangLoader.prototype.insurance;
}

// constants
const LIST = {
  hidden: { opacity: 0, transition: { when: "afterChildren" } },
  visible: { opacity: 1, transition: { when: "beforeChildren", delayChildren: stagger(0.5) } },
} as const;
const ITEM = { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 40, damping: 20, mass: 1.2 } } } as const;

export function BusinessInsurance({ ll }: BusinessInsuranceProps) {
  return (
    <motion.section className="clear-both" initial="hidden" whileInView="visible" variants={LIST} viewport={{ once: true }}>
      <SectionHeader title={ll["Business insurance"]} />
      <motion.p variants={ITEM}>{ll["For an entrepreneur, the lack of protection means that the risk rests entirely with the company."]}</motion.p>
      <br />
      <motion.p variants={ITEM}>
        {ll["Insurance helps protect assets, liability to contractors, and business continuity – even in unforeseen circumstances."]}
      </motion.p>
    </motion.section>
  );
}

export function BusinessInsuranceSkeleton() {
  return (
    <section className="clear-both">
      <SectionHeaderSkeleton />
      <p>&nbsp;</p>
      <br />
      <p>&nbsp;</p>
    </section>
  );
}
