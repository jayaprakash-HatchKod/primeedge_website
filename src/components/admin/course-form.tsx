"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import type { Course } from "@prisma/client";
import { createCourse, updateCourse, type CourseFormState } from "@/app/actions/courses";
import { AssetUploadField } from "@/components/admin/asset-upload-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const initialState: CourseFormState = {};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="accent" size="xl" disabled={pending}>
      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
      {pending ? "Saving..." : label}
    </Button>
  );
}

export function CourseForm({ course }: { course?: Course }) {
  const action = course ? updateCourse.bind(null, course.id) : createCourse;
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Course Title</Label>
          <Input id="title" name="title" required defaultValue={course?.title} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" required placeholder="full-stack-web-development" defaultValue={course?.slug} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required rows={4} defaultValue={course?.description} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="highlights">Course Highlights (one per line)</Label>
        <Textarea
          id="highlights"
          name="highlights"
          rows={4}
          defaultValue={course?.highlights.join("\n")}
          placeholder={"20+ hands-on projects\nLive doubt-clearing sessions"}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input id="duration" name="duration" required placeholder="16 Weeks" defaultValue={course?.duration} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price (INR)</Label>
          <Input id="price" name="price" type="number" min={0} required defaultValue={course?.price} />
        </div>
      </div>

      <AssetUploadField name="thumbnail" label="Thumbnail Image" defaultValue={course?.thumbnail} accept="image/*" />

      <div className="grid gap-5 sm:grid-cols-2">
        <AssetUploadField name="demoVideo1" label="Demo Video 1 (URL or upload)" defaultValue={course?.demoVideo1} accept="video/*" />
        <AssetUploadField name="demoVideo2" label="Demo Video 2 (URL or upload)" defaultValue={course?.demoVideo2} accept="video/*" />
      </div>

      <AssetUploadField name="syllabusPdf" label="Syllabus PDF" defaultValue={course?.syllabusPdf} accept="application/pdf" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="trainerName">Trainer Name</Label>
          <Input id="trainerName" name="trainerName" defaultValue={course?.trainerName ?? ""} />
        </div>
        <AssetUploadField name="trainerAvatar" label="Trainer Avatar" defaultValue={course?.trainerAvatar} accept="image/*" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="trainerBio">Trainer Bio</Label>
        <Textarea id="trainerBio" name="trainerBio" rows={3} defaultValue={course?.trainerBio ?? ""} />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        <input type="checkbox" name="isActive" defaultChecked={course?.isActive ?? true} className="size-4 rounded border-border" />
        Published (visible to students)
      </label>

      {state.error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>
      )}

      <SubmitButton label={course ? "Save Changes" : "Create Course"} />
    </form>
  );
}
