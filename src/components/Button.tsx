import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  icon = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
  icon?: boolean;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-bg hover:bg-accent-soft"
      : "border border-border text-fg hover:border-fg-muted";

  return (
    <Magnetic className="inline-block">
      <Link href={href} className={`${base} ${styles} ${className}`}>
        {children}
        {icon && <ArrowUpRight size={16} />}
      </Link>
    </Magnetic>
  );
}
