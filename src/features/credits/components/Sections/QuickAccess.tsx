"use client";

// services, features, and other libraries
import { motion, stagger } from "motion/react";

// components
import SectionHeader, { SectionHeaderSkeleton } from "@/components/SectionHeader";

// types
import type LangLoader from "@/lib/LangLoader";

interface QuickAccessProps {
  ll: typeof LangLoader.prototype.credits;
}

// constants
const LIST = {
  hidden: { opacity: 0, transition: { when: "afterChildren" } },
  visible: { opacity: 1, transition: { when: "beforeChildren", delayChildren: stagger(0.5) } },
} as const;
const ITEM = { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 40, damping: 20, mass: 1.2 } } } as const;

export function QuickAccess({ ll }: QuickAccessProps) {
  return (
    <motion.section className="clear-both" initial="hidden" whileInView="visible" variants={LIST} viewport={{ once: true }}>
      <SectionHeader title={ll["Quick access to loans tailored to your needs"]} />
      <motion.p variants={ITEM}>
        {ll["As a credit intermediary, we help individual clients find the best solutions among many banks and financial institutions."]}
      </motion.p>
      <br />
      <motion.p variants={ITEM}>{ll["This allows you to save time and be sure that your commitment is tailored to your situation."]}</motion.p>
    </motion.section>
  );
}

export function QuickAccessSkeleton() {
  return (
    <section className="clear-both">
      <SectionHeaderSkeleton />
      <p>&nbsp;</p>
      <br />
      <p>&nbsp;</p>
    </section>
  );
}
