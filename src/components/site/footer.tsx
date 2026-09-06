import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/site/logo";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/courses", label: "Courses" },
      { href: "/final-year-projects", label: "Final Year Projects" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/contact", label: "Refund Policy" },
      { href: "/contact", label: "Terms of Service" },
      { href: "/contact", label: "Privacy Policy" },
    ],
  },
];

export function Footer() {
  const email = process.env.NEXT_PUBLIC_INSTITUTE_EMAIL ?? "support@primeedge.in";
  const phone = process.env.NEXT_PUBLIC_INSTITUTE_PHONE ?? "+91 90000 00000";

  return (
    <footer className="border-t border-border bg-primary text-slate-300">
      <div className="container-edge grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div className="max-w-xs">
          <Logo dark />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Build Skills. Build Careers. Industry-led software training with live mentorship and
            real career outcomes.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-white">{col.title}</h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-sm font-semibold text-white">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-slate-500" aria-hidden />
              <a href={`mailto:${email}`} className="hover:text-white">
                {email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-slate-500" aria-hidden />
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-white">
                {phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-slate-500" aria-hidden />
              <span>Hyderabad, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-edge flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} PrimeEdge Software Institute. All rights reserved.</p>
          <Link href="/admin/login" className="hover:text-slate-300">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
