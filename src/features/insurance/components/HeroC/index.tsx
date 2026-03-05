"use client";

// next
import Image from "next/image";

// services, features, and other libraries
import { motion } from "motion/react";

// assets
import hero from "@/features/insurance/assets/heroC.webp";

// constants
const MotionImage = motion.create(Image);

export default function HeroC() {
  return (
    <MotionImage
      src={hero}
      alt="Life and Health Insurance"
      loading="eager"
      className="mx-auto mb-9 w-full max-w-300"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 3 }}
      viewport={{ once: true }}
    />
  );
}

export function HeroCSkeleton() {
  return <Image src={hero} alt="Life and Health Insurance" loading="eager" className="mx-auto mb-9 w-full max-w-300 opacity-0" />;
}
