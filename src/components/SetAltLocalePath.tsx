"use client";

import { useSetAltLocalePath } from "@/lib/alt-locale-context";

export default function SetAltLocalePath({ path }: { path: string | null }) {
  useSetAltLocalePath(path);
  return null;
}
