"use client";

// services, features, and other libraries
import { motion, stagger } from "motion/react";

// components
import SectionHeader, { SectionHeaderSkeleton } from "@/components/SectionHeader";

// types
import type LangLoader from "@/lib/LangLoader";

interface WhoAreTheyForProps {
  ll: typeof LangLoader.prototype.subsidies;
}

// constants
const LIST = {
  hidden: { opacity: 0, transition: { when: "afterChildren" } },
  visible: { opacity: 1, transition: { when: "beforeChildren", delayChildren: stagger(0.5) } },
} as const;
const ITEM = { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 40, damping: 20, mass: 1.2 } } } as const;

export function WhoAreTheyFor({ ll }: WhoAreTheyForProps) {
  return (
    <motion.section className="clear-both" initial="hidden" whileInView="visible" variants={LIST} viewport={{ once: true }}>
      <SectionHeader title={ll["Who is eligible for funding? We support, among others"]} />
      <motion.p className="flex items-center gap-6" variants={ITEM}>
        <span className="bg-primary animate-bullet-blink inline-block size-6 shrink-0" />
        {ll["Entrepreneurs planning development or investments."]}
      </motion.p>
      <br />
      <motion.p className="flex items-center gap-6" variants={ITEM}>
        <span className="bg-primary animate-bullet-blink inline-block size-6 shrink-0 delay-3000" />
        {ll["Companies modernizing their operations."]}
      </motion.p>
      <br />
      <motion.p className="flex items-center gap-6" variants={ITEM}>
        <span className="bg-primary animate-bullet-blink inline-block size-6 shrink-0 delay-6000" />
        {ll["People starting investment projects."]}
      </motion.p>
      <br />
      <motion.p className="flex items-center gap-6" variants={ITEM}>
        <span className="bg-primary animate-bullet-blink inline-block size-6 shrink-0 delay-9000" />
        {ll["Entities interested in external financing."]}
      </motion.p>
      <br />
      <motion.p className="flex items-center gap-6" variants={ITEM}>
        <span className="bg-primary animate-bullet-blink inline-block size-6 shrink-0 delay-12000" />
        {ll["We analyze each case individually, without ready-made patterns."]}
      </motion.p>
    </motion.section>
  );
}

export function WhoAreTheyForSkeleton() {
  return (
    <section className="clear-both">
      <SectionHeaderSkeleton />
      <p className="flex items-center gap-6">
        <span className="bg-primary inline-block size-6 shrink-0" />
        &nbsp;
      </p>
      <br />
      <p className="flex items-center gap-6">
        <span className="bg-primary inline-block size-6 shrink-0" />
        &nbsp;
      </p>
      <br />
      <p className="flex items-center gap-6">
        <span className="bg-primary inline-block size-6 shrink-0" />
        &nbsp;
      </p>
      <br />
      <p className="flex items-center gap-6">
        <span className="bg-primary inline-block size-6 shrink-0" />
        &nbsp;
      </p>
      <br />
      <p className="flex items-center gap-6">
        <span className="bg-primary inline-block size-6 shrink-0" />
        &nbsp;
      </p>
    </section>
  );
}
