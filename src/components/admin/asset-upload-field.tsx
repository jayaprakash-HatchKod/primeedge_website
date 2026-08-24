"use client";

import { useRef, useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { uploadCourseAsset } from "@/app/actions/courses";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function AssetUploadField({
  name,
  label,
  defaultValue,
  accept,
}: {
  name: "thumbnail" | "trainerAvatar" | "demoVideo1" | "demoVideo2" | "syllabusPdf";
  label: string;
  defaultValue?: string | null;
  accept: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.set("file", file);
    formData.set("field", name);

    const result = await uploadCourseAsset(formData);
    setUploading(false);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    setValue(result.url ?? "");
    toast.success(`${label} uploaded`);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="flex gap-2">
        <Input
          id={name}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https:// or upload a file"
        />
        <Button type="button" variant="outline" size="lg" disabled={uploading} onClick={() => fileInputRef.current?.click()}>
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <UploadCloud className="size-4" />}
        </Button>
      </div>
      <input ref={fileInputRef} type="file" accept={accept} className="hidden" onChange={handleFileChange} />
    </div>
  );
}
