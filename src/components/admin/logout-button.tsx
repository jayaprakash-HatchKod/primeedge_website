"use client";

import { LogOut } from "lucide-react";
import { logoutAdmin } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => logoutAdmin()}
      className="text-slate-400 hover:bg-white/5 hover:text-white"
    >
      <LogOut className="size-4" /> Sign out
    </Button>
  );
}
