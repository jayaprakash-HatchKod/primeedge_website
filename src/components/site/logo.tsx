import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center", className)}
      aria-label="The PrimeEdge Technologies, go to homepage"
    >
      <span
        className={cn(
          "overflow-hidden rounded-lg ring-1",
          dark ? "ring-white/10" : "ring-border",
        )}
      >
        <Image
          src="/logo.jpeg"
          alt="The PrimeEdge Technologies"
          width={542}
          height={272}
          className="h-9 w-auto"
          priority
        />
      </span>
    </Link>
  );
}
