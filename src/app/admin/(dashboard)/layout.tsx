import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/site/logo";
import { AdminSidebar } from "@/components/admin/sidebar";
import { LogoutButton } from "@/components/admin/logout-button";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="hidden w-64 shrink-0 flex-col bg-primary px-4 py-6 lg:flex">
        <div className="px-2">
          <Logo dark />
        </div>
        <div className="mt-8 flex-1">
          <AdminSidebar />
        </div>
        <div className="space-y-3 border-t border-white/10 pt-4">
          <p className="truncate px-3 text-xs text-slate-500">{user?.email}</p>
          <LogoutButton />
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4 lg:hidden">
          <Logo />
          <LogoutButton />
        </header>
        <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10">{children}</main>
        <footer className="px-8 py-4 text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            ← Back to site
          </Link>
        </footer>
      </div>
    </div>
  );
}
