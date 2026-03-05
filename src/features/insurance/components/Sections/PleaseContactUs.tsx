"use client";

// services, features, and other libraries
import { motion, stagger } from "motion/react";

// components
import SectionHeader, { SectionHeaderSkeleton } from "@/components/SectionHeader";

// types
import type LangLoader from "@/lib/LangLoader";

interface PleaseContactUsProps {
  ll: typeof LangLoader.prototype.insurance;
}

// constants
const LIST = {
  hidden: { opacity: 0, transition: { when: "afterChildren" } },
  visible: { opacity: 1, transition: { when: "beforeChildren", delayChildren: stagger(0.5) } },
} as const;
const ITEM = { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 40, damping: 20, mass: 1.2 } } } as const;

export function PleaseContactUs({ ll }: PleaseContactUsProps) {
  return (
    <motion.section className="clear-both" initial="hidden" whileInView="visible" variants={LIST} viewport={{ once: true }}>
      <SectionHeader title={ll["Contact us"]} />
      <motion.p variants={ITEM}>
        {ll["If you want to protect yourself, your family or your business in a thoughtful and long-term way, please contact us."]}
      </motion.p>
      <br />
      <motion.p variants={ITEM}>{ll["The first conversation is free and non-binding."]}</motion.p>
      <br />
      <motion.p variants={ITEM}>{ll["Schedule a consultation."]}</motion.p>
    </motion.section>
  );
}

export function PleaseContactUsSkeleton() {
  return (
    <section className="clear-both">
      <SectionHeaderSkeleton />
      <p>&nbsp;</p>
      <br />
      <p>&nbsp;</p>
      <br />
      <p>&nbsp;</p>
    </section>
  );
}
