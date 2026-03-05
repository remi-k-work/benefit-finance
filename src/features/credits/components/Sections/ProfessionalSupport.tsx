"use client";

// services, features, and other libraries
import { motion, stagger } from "motion/react";

// components
import SectionHeader, { SectionHeaderSkeleton } from "@/components/SectionHeader";

// types
import type LangLoader from "@/lib/LangLoader";

interface ProfessionalSupportProps {
  ll: typeof LangLoader.prototype.credits;
}

// constants
const LIST = {
  hidden: { opacity: 0, transition: { when: "afterChildren" } },
  visible: { opacity: 1, transition: { when: "beforeChildren", delayChildren: stagger(0.5) } },
} as const;
const ITEM = { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 40, damping: 20, mass: 1.2 } } } as const;

export function ProfessionalSupport({ ll }: ProfessionalSupportProps) {
  return (
    <motion.section className="clear-both" initial="hidden" whileInView="visible" variants={LIST} viewport={{ once: true }}>
      <SectionHeader title={ll["Professional support in obtaining a business loan"]} />
      <motion.p variants={ITEM}>{ll["Business growth often requires access to appropriate financing."]}</motion.p>
      <br />
      <motion.p variants={ITEM}>
        {
          ll[
            "We help entrepreneurs choose and obtain business loans tailored to their actual business needs – in an orderly, secure manner and without unnecessary formalities."
          ]
        }
      </motion.p>
      <br />
      <motion.p variants={ITEM}>
        {ll["We operate in the Podkarpackie Voivodeship and neighboring voivodeships, supporting both sole proprietorships and developing companies."]}
      </motion.p>
    </motion.section>
  );
}

export function ProfessionalSupportSkeleton() {
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
