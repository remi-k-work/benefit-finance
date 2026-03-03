"use client";

// services, features, and other libraries
import { motion, stagger } from "motion/react";

// components
import SectionHeader, { SectionHeaderSkeleton } from "@/components/SectionHeader";

// types
import type LangLoader from "@/lib/LangLoader";

interface FamilyOwnedProps {
  ll: typeof LangLoader.prototype.aboutUs;
}

// constants
const list = {
  hidden: { opacity: 0, transition: { when: "afterChildren" } },
  visible: { opacity: 1, transition: { when: "beforeChildren", delayChildren: stagger(0.5) } },
} as const;

const item = { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 40, damping: 20, mass: 1.2 } } } as const;

export function FamilyOwned({ ll }: FamilyOwnedProps) {
  return (
    <motion.section className="clear-both" initial="hidden" whileInView="visible" variants={list} viewport={{ once: true }}>
      <SectionHeader title={ll["A family-owned company that helps finance and secure dreams"]} />
      <motion.p variants={item}>
        {ll["We are a family-owned company that has been supporting clients in financial, credit, insurance, and financing matters for 13 years."]}
      </motion.p>
      <br />
      <motion.p variants={item}>
        {ll["We are not advisors – we act as intermediaries, giving you access to a wide range of banks, insurers and financing programs in one place."]}
      </motion.p>
      <br />
      <motion.p variants={item}>{ll["Our goal is for every client to be able to make decisions consciously, calmly and without unnecessary stress."]}</motion.p>
    </motion.section>
  );
}

export function FamilyOwnedSkeleton() {
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
