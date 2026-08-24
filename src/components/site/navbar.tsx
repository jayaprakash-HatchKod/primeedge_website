import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/site/mobile-nav";

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
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
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
