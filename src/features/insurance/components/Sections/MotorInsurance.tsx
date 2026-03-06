"use client";

// services, features, and other libraries
import { motion, stagger } from "motion/react";

// components
import SectionHeader, { SectionHeaderSkeleton } from "@/components/SectionHeader";

// types
import type LangLoader from "@/lib/LangLoader";

interface MotorInsuranceProps {
  ll: typeof LangLoader.prototype.insurance;
}

// constants
const LIST = {
  hidden: { opacity: 0, transition: { when: "afterChildren" } },
  visible: { opacity: 1, transition: { when: "beforeChildren", delayChildren: stagger(0.5) } },
} as const;
const ITEM = { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 40, damping: 20, mass: 1.2 } } } as const;

export function MotorInsurance({ ll }: MotorInsuranceProps) {
  return (
    <motion.section className="clear-both" initial="hidden" whileInView="visible" variants={LIST} viewport={{ once: true }}>
      <SectionHeader title={ll["Motor insurance"]} />
      <motion.p variants={ITEM}>{ll["A vehicle is a tool for everyday functioning – both privately and professionally."]}</motion.p>
      <br />
      <motion.p variants={ITEM}>
        {
          ll[
            "Well-chosen protection limits the effects of collisions, breakdowns or random events and allows you to quickly return to your normal rhythm of life."
          ]
        }
      </motion.p>
    </motion.section>
  );
}

export function MotorInsuranceSkeleton() {
  return (
    <section className="clear-both">
      <SectionHeaderSkeleton />
      <p>&nbsp;</p>
      <br />
      <p>&nbsp;</p>
    </section>
  );
}
