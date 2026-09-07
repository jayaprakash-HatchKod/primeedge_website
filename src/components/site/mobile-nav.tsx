"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function MobileNav({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          }
        />
        <SheetContent side="right" className="w-72">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-4 flex flex-col gap-1 px-4" aria-label="Mobile">
            {links.map((link) => {
              const isProjects = link.href === "/final-year-projects";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-accent/10 hover:text-accent",
                    isProjects ? "text-accent" : "text-foreground",
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
            <Button asChild variant="accent" size="xl" className="mt-4 w-full">
              <Link href="/courses" onClick={() => setOpen(false)}>
                Enroll Now
              </Link>
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
