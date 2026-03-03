"use client";

// services, features, and other libraries
import { motion, stagger } from "motion/react";

// components
import SectionHeader, { SectionHeaderSkeleton } from "@/components/SectionHeader";

// types
import type LangLoader from "@/lib/LangLoader";

interface HowWeWorkProps {
  ll: typeof LangLoader.prototype.aboutUs;
}

// constants
const LIST = {
  hidden: { opacity: 0, transition: { when: "afterChildren" } },
  visible: { opacity: 1, transition: { when: "beforeChildren", delayChildren: stagger(0.5) } },
} as const;
const ITEM = { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 40, damping: 20, mass: 1.2 } } } as const;

export function HowWeWork({ ll }: HowWeWorkProps) {
  return (
    <motion.section className="clear-both" initial="hidden" whileInView="visible" variants={LIST} viewport={{ once: true }}>
      <SectionHeader title={ll["How we work"]} />
      <motion.p className="flex items-center gap-6" variants={ITEM}>
        <span className="bg-primary animate-bullet-blink inline-block size-6 shrink-0" />
        {ll["We help you find the best credit, insurance, and financing solutions."]}
      </motion.p>
      <br />
      <motion.p className="flex items-center gap-6" variants={ITEM}>
        <span className="bg-primary animate-bullet-blink inline-block size-6 shrink-0 delay-3000" />
        {ll["We conduct the process in a transparent and orderly manner."]}
      </motion.p>
      <br />
      <motion.p className="flex items-center gap-6" variants={ITEM}>
        <span className="bg-primary animate-bullet-blink inline-block size-6 shrink-0 delay-6000" />
        {ll["We act as an intermediary, not an advisor, offering full access to offers."]}
      </motion.p>
      <br />
      <motion.p className="flex items-center gap-6" variants={ITEM}>
        <span className="bg-primary animate-bullet-blink inline-block size-6 shrink-0 delay-9000" />
        {ll["We support the client at every stage, without exerting pressure."]}
      </motion.p>
      <br />
      <motion.p className="flex items-center gap-6" variants={ITEM}>
        <span className="bg-primary animate-bullet-blink inline-block size-6 shrink-0 delay-12000" />
        {ll["Our priority is customer comfort and decision security, not the sale of specific products."]}
      </motion.p>
    </motion.section>
  );
}

export function HowWeWorkSkeleton() {
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
