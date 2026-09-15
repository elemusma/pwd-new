import { Link } from "@/i18n/navigation";
import Magnetic from "@/components/Magnetic";

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center rounded-full px-6 py-3.5 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-bg hover:bg-accent-soft"
      : "border border-border text-fg hover:border-fg-muted";

  return (
    <Magnetic className="inline-block">
      <Link href={href} className={`${base} ${styles} ${className}`}>
        {children}
      </Link>
    </Magnetic>
  );
}
