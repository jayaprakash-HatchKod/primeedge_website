"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { UploadCloud, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  updateSiteSettings,
  uploadHeroVideo,
  type SiteSettingFormState,
} from "@/app/actions/site-settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const initialState: SiteSettingFormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="accent" size="xl" disabled={pending}>
      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

export function HeroVideoForm({ defaultValue }: { defaultValue?: string | null }) {
  const [state, formAction] = useActionState(updateSiteSettings, initialState);
  const [value, setValue] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.success) toast.success("Hero video updated");
  }, [state]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.set("file", file);

    const result = await uploadHeroVideo(formData);
    setUploading(false);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    setValue(result.url ?? "");
    toast.success("Video uploaded");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="heroVideoUrl">Homepage Hero Video</Label>
        <div className="flex gap-2">
          <Input
            id="heroVideoUrl"
            name="heroVideoUrl"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https:// (YouTube embed link or upload a file)"
          />
          <Button
            type="button"
            variant="outline"
            size="lg"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <UploadCloud className="size-4" />}
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <p className="text-xs text-muted-foreground">
          Shown on the right side of the homepage hero. Paste a YouTube embed URL, or upload a video
          file directly. Leave blank to hide that space.
        </p>
      </div>

      {state.error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  );
}
