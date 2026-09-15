"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 48,
  start = "top 85%",
  onLoad = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
  // Play as soon as the page loads instead of waiting for the element to
  // scroll into view (for content that may start below the scroll trigger).
  onLoad?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: onLoad
            ? undefined
            : {
                trigger: el,
                start,
                toggleActions: "play none none reverse",
              },
        }
      );
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [delay, y, start, onLoad]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
