"use client";

// services, features, and other libraries
import { motion, stagger } from "motion/react";

// components
import SectionHeader, { SectionHeaderSkeleton } from "@/components/SectionHeader";

// types
import type LangLoader from "@/lib/LangLoader";

interface WhoWeAreProps {
  ll: typeof LangLoader.prototype.aboutUs;
}

// constants
const LIST = {
  hidden: { opacity: 0, transition: { when: "afterChildren" } },
  visible: { opacity: 1, transition: { when: "beforeChildren", delayChildren: stagger(0.5) } },
} as const;
const ITEM = { hidden: { opacity: 0, x: +100 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 40, damping: 20, mass: 1.2 } } } as const;

export function WhoWeAre({ ll }: WhoWeAreProps) {
  return (
    <motion.section className="float-end" initial="hidden" whileInView="visible" variants={LIST} viewport={{ once: true }}>
      <SectionHeader title={ll["Who we are"]} />
      <motion.p variants={ITEM}>{ll["As a family business, we combine experience, peace of mind and an individual approach."]}</motion.p>
      <br />
      <motion.p variants={ITEM}>
        {
          ll[
            "We support both individual clients and businesses by offering a full overview of available solutions, without the need to search for the best offers yourself."
          ]
        }
      </motion.p>
    </motion.section>
  );
}

export function WhoWeAreSkeleton() {
  return (
    <section className="float-end">
      <SectionHeaderSkeleton />
      <p>&nbsp;</p>
      <br />
      <p>&nbsp;</p>
    </section>
  );
}
