import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/site/mobile-nav";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/final-year-projects", label: "Final Year Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="container-edge flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => {
            const isProjects = link.href === "/final-year-projects";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 text-sm font-medium transition-colors",
                  isProjects
                    ? "font-semibold text-accent hover:text-accent/80"
                    : "text-muted-foreground hover:text-accent",
                )}
              >
                {link.label}
                {isProjects && (
                  <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-accent uppercase">
                    New
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost" size="lg">
            <Link href="/contact">Contact</Link>
          </Button>
          <Button asChild variant="accent" size="lg">
            <Link href="/courses">Enroll Now</Link>
          </Button>
        </div>

        <MobileNav links={links} />
      </div>
    </header>
  );
}
