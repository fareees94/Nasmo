"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
  once?: boolean;
}

export default function AnimatedSection({
  children,
  direction = "up",
  delay = 0,
  className = "",
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  const offsets = {
    up: { opacity: 0, y: 32 },
    left: { opacity: 0, x: -40 },
    right: { opacity: 0, x: 40 },
  };

  return (
    <motion.div
      ref={ref}
      initial={offsets[direction]}
      animate={visible ? { opacity: 1, x: 0, y: 0 } : offsets[direction]}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
