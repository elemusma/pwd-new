"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { CLIENT_LOGOS } from "@/lib/clientLogos";

export default function LogoCarousel() {
  return (
    <Marquee speed={40} pauseOnHover gradient={false} autoFill>
      {CLIENT_LOGOS.map((logo) => (
        <Image
          key={logo.name}
          src={logo.src}
          alt={logo.name}
          width={logo.width}
          height={logo.height}
          loading="eager"
          className="mx-[7.5px] h-14 w-auto object-contain sm:h-16"
        />
      ))}
    </Marquee>
  );
}
