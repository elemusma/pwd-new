"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function HeroIntro({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(".hero-item");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.1, ease: "power3.out", delay: 0.15 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
