import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/clientLogos";

export default function ClientLogos({ heading }: { heading: string }) {
  const loop = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <div>
      <p className="mb-4 text-center text-sm text-fg-dim">{heading}</p>
      <div className="marquee-pause-on-hover overflow-hidden py-8">
        <div className="flex w-max animate-marquee-slow items-center gap-[15px] will-change-transform">
          {loop.map((logo, i) => (
            <Image
              key={i}
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              loading="eager"
              className="logo-carousel h-10 w-auto shrink-0 object-contain sm:h-12"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
