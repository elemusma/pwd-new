"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";

export default function TestimonialCard({
  item,
  readMoreLabel,
  showLessLabel,
}: {
  item: Testimonial;
  readMoreLabel: string;
  showLessLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex h-[320px] w-[320px] shrink-0 flex-col rounded-2xl border border-card-border bg-card p-7 shadow-sm sm:w-[360px]">
      <div className="flex items-center gap-3">
        <Image
          src={item.photo}
          alt={`${item.name}'s profile photo`}
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
          unoptimized
        />
        <div>
          <p className="text-sm font-medium text-card-fg">{item.name}</p>
          <p className="text-xs text-card-fg-dim">{item.context}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, s) => (
          <Star key={s} size={14} className="fill-accent text-accent" />
        ))}
      </div>
      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1" data-lenis-prevent>
        <p className={`text-sm leading-relaxed text-card-fg-muted ${expanded ? "" : "line-clamp-4"}`}>
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-2 self-start text-xs font-medium text-accent hover:underline"
      >
        {expanded ? showLessLabel : readMoreLabel}
      </button>
    </div>
  );
}
