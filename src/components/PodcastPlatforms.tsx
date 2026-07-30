import Image from "next/image";
import { PODCAST_PLATFORMS } from "@/lib/site";

export default function PodcastPlatforms({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-start gap-3 md:items-end">
      <p className="text-xs uppercase tracking-widest text-fg-dim">{label}</p>
      <div className="flex items-center gap-3">
        {PODCAST_PLATFORMS.map((platform) => (
          <a
            key={platform.name}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform.name}
            className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl transition-transform hover:scale-105"
          >
            <Image src={platform.icon} alt={platform.name} fill sizes="40px" className="object-cover" />
          </a>
        ))}
      </div>
    </div>
  );
}
