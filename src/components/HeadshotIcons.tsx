import Image from "next/image";

export default function HeadshotIcons() {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <Image
        src="/assets/Design-Development-Tools.png"
        alt="Tools used by Precise Wolf Digital: design, development, and SEO"
        className="h-auto w-full headshot-ring"
        width={500}
        height={500}
      />
      <div
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        className="absolute h-1/2 w-1/2"
      >
        <Image
          src="/headshot/Ted-Martinez-Precise-Wolf-Digital-Icon.png"
          alt="Ted Martinez, founder of Precise Wolf Digital"
          fill
          sizes="192px"
          className="rounded-full object-cover"
        />
      </div>
    </div>
  );
}
