"use client";

// next
import Image from "next/image";

// services, features, and other libraries
import { motion } from "motion/react";

// assets
import hero from "@/features/aboutUs/assets/hero.png";

// constants
const MotionImage = motion.create(Image);

export default function Hero() {
  return (
    <MotionImage
      src={hero}
      alt="Benefit Finance"
      loading="eager"
      className="mx-auto mb-9 w-full max-w-300"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 3 }}
      viewport={{ once: true }}
    />
  );
}

export function HeroSkeleton() {
  return <Image src={hero} alt="Benefit Finance" loading="eager" className="mx-auto mb-9 w-full max-w-300 opacity-0" />;
}
