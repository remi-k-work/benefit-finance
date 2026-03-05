"use client";

// services, features, and other libraries
import { motion, stagger } from "motion/react";

// components
import SectionHeader, { SectionHeaderSkeleton } from "@/components/SectionHeader";

// types
import type LangLoader from "@/lib/LangLoader";

interface WhyInsuranceProps {
  ll: typeof LangLoader.prototype.insurance;
}

// constants
const LIST = {
  hidden: { opacity: 0, transition: { when: "afterChildren" } },
  visible: { opacity: 1, transition: { when: "beforeChildren", delayChildren: stagger(0.5) } },
} as const;
const ITEM = { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 40, damping: 20, mass: 1.2 } } } as const;

export function WhyInsurance({ ll }: WhyInsuranceProps) {
  return (
    <motion.section className="clear-both" initial="hidden" whileInView="visible" variants={LIST} viewport={{ once: true }}>
      <SectionHeader title={ll["Why does insurance really matter?"]} />
      <motion.p variants={ITEM}>{ll["In our private lives and in business, we make many decisions with the future in mind."]}</motion.p>
      <br />
      <motion.p variants={ITEM}>
        {
          ll[
            "Insurance is one of the few tools that allow us to limit the effects of events beyond our control – illness, accident, property damage or business interruption."
          ]
        }
      </motion.p>
      <br />
      <motion.p variants={ITEM}>
        {ll["A well-chosen policy does not eliminate risk, but it allows you to maintain financial stability when you need it most."]}
      </motion.p>
      <br />
      <motion.p variants={ITEM}>{ll["Insurance is not a cost – it is a form of liability."]}</motion.p>
    </motion.section>
  );
}

export function WhyInsuranceSkeleton() {
  return (
    <section className="clear-both">
      <SectionHeaderSkeleton />
      <p>&nbsp;</p>
      <br />
      <p>&nbsp;</p>
      <br />
      <p>&nbsp;</p>
      <br />
      <p>&nbsp;</p>
    </section>
  );
}
