"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import Reveal from "@/components/Reveal";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolioProjects";

// The preview window height must match the "20rem" used in the translateY
// calc below (h-80 == 20rem) so the hover-scroll lands exactly on the
// bottom of each screenshot instead of over- or under-shooting it.
const PREVIEW_HEIGHT_CLASS = "h-80";

export default function PortfolioGrid({
  viewWebsiteLabel,
  comingSoonLabel,
}: {
  viewWebsiteLabel: string;
  comingSoonLabel: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const modalImgRef = useRef<HTMLImageElement>(null);
  const activeProject = openIndex !== null ? PORTFOLIO_PROJECTS[openIndex] : null;

  const openProject = (i: number) => {
    setImageLoaded(false);
    setOpenIndex(i);
  };

  useEffect(() => {
    if (!activeProject) return;
    document.body.style.overflow = "hidden";
    // Covers the case where the image is already browser-cached: the native
    // "load" event can fire before this effect (and Image's onLoad handler)
    // even attaches, which would otherwise leave the spinner stuck forever.
    if (modalImgRef.current?.complete) setImageLoaded(true);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProject]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {PORTFOLIO_PROJECTS.map((project, i) => (
          <Reveal key={project.name} delay={(i % 6) * 0.06}>
            <button
              type="button"
              onClick={() => openProject(i)}
              aria-label={`View full screenshot of ${project.name}`}
              className={`group relative ${PREVIEW_HEIGHT_CLASS} block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-card-border bg-card-soft`}
            >
              <Image
                src={project.thumbnail}
                alt={project.name}
                width={project.thumbnailWidth}
                height={project.thumbnailHeight}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="absolute inset-x-0 top-0 h-auto w-full transition-transform ease-linear group-hover:[transform:translateY(calc(-100%+20rem))]"
                style={{ transitionDuration: `${project.durationSeconds}s` }}
              />
            </button>
            <div className="mt-4 flex items-center justify-between gap-4">
              <h3 className="font-display text-lg text-fg">{project.name}</h3>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-fg-muted"
                >
                  {viewWebsiteLabel}
                  <ArrowUpRight size={14} />
                </a>
              ) : (
                <span className="inline-flex shrink-0 items-center rounded-full border border-border-soft px-4 py-2 text-sm text-fg-dim">
                  {comingSoonLabel}
                </span>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {activeProject &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-8"
            onClick={() => setOpenIndex(null)}
          >
            <div
              className="relative flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b border-card-border px-5 py-4">
                <h3 className="font-display text-lg text-card-fg">{activeProject.name}</h3>
                <div className="flex items-center gap-3">
                  {activeProject.url && (
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden shrink-0 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-card-fg transition-colors hover:border-fg-muted sm:inline-flex"
                    >
                      {viewWebsiteLabel}
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setOpenIndex(null)}
                    aria-label="Close"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-card-border text-card-fg-muted transition-colors hover:text-card-fg"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="lightbox-scroll relative overflow-y-auto">
                {!imageLoaded && (
                  <div className="flex h-96 items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-accent" />
                  </div>
                )}
                <Image
                  ref={modalImgRef}
                  src={activeProject.fullImage}
                  alt={activeProject.name}
                  width={activeProject.fullWidth}
                  height={activeProject.fullHeight}
                  unoptimized
                  loading="eager"
                  onLoad={() => setImageLoaded(true)}
                  className={`h-auto w-full transition-opacity duration-500 ${
                    imageLoaded ? "opacity-100" : "absolute inset-0 opacity-0"
                  }`}
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
