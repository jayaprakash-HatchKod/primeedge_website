"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Users, CreditCard, FolderKanban, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/project-leads", label: "Project Leads", icon: UserPlus },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1" aria-label="Admin">
      {links.map((link) => {
        const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white",
            )}
          >
            <link.icon className="size-4.5" aria-hidden />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
