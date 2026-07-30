"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export default function Faq({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border-soft border-t border-b border-border-soft">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg text-fg sm:text-xl">{item.question}</span>
              <Plus
                size={20}
                className={`shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
              />
            </button>
            <div
              className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="pb-6">
                  {item.answer.split("\n\n").map((paragraph, p) => (
                    <p key={p} className="max-w-2xl text-fg-muted last:mb-0 mb-3">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
