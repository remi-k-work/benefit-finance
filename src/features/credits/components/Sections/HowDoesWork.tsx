"use client";

// services, features, and other libraries
import { motion, stagger } from "motion/react";

// components
import SectionHeader, { SectionHeaderSkeleton } from "@/components/SectionHeader";

// types
import type LangLoader from "@/lib/LangLoader";

interface HowDoesWorkProps {
  ll: typeof LangLoader.prototype.credits;
}

// constants
const LIST = {
  hidden: { opacity: 0, transition: { when: "afterChildren" } },
  visible: { opacity: 1, transition: { when: "beforeChildren", delayChildren: stagger(0.5) } },
} as const;
const ITEM = { hidden: { opacity: 0, x: +100 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 40, damping: 20, mass: 1.2 } } } as const;

export function HowDoesWork({ ll }: HowDoesWorkProps) {
  return (
    <motion.section className="float-end" initial="hidden" whileInView="visible" variants={LIST} viewport={{ once: true }}>
      <SectionHeader title={ll["How does the process work?"]} />
      <motion.p className="flex items-center gap-6" variants={ITEM}>
        <span className="bg-primary animate-bullet-blink inline-block size-6 shrink-0" />
        {ll["Contact and initial needs analysis."]}
      </motion.p>
      <br />
      <motion.p className="flex items-center gap-6" variants={ITEM}>
        <span className="bg-primary animate-bullet-blink inline-block size-6 shrink-0 delay-3000" />
        {ll["Choosing the right loan for you."]}
      </motion.p>
      <br />
      <motion.p className="flex items-center gap-6" variants={ITEM}>
        <span className="bg-primary animate-bullet-blink inline-block size-6 shrink-0 delay-6000" />
        {ll["Assistance in preparing the application and documents."]}
      </motion.p>
      <br />
      <motion.p className="flex items-center gap-6" variants={ITEM}>
        <span className="bg-primary animate-bullet-blink inline-block size-6 shrink-0 delay-9000" />
        {ll["Submission of the application to the bank and support in finalization."]}
      </motion.p>
      <br />
      <motion.p className="flex items-center gap-6" variants={ITEM}>
        <span className="bg-primary animate-bullet-blink inline-block size-6 shrink-0 delay-12000" />
        {ll["Support after loan disbursement."]}
      </motion.p>
    </motion.section>
  );
}

export function HowDoesWorkSkeleton() {
  return (
    <section className="float-end">
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
