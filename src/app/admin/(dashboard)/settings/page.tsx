import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data/site-settings";
import { HeroVideoForm } from "@/components/admin/hero-video-form";

export const metadata: Metadata = { title: "Settings" };

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage homepage content.</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-7">
        <HeroVideoForm defaultValue={settings?.heroVideoUrl} />
      </div>
    </div>
  );
}
