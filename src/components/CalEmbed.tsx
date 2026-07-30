"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { SITE } from "@/lib/site";

const NAMESPACE = "30min";

export default function CalEmbed() {
  useEffect(() => {
    (async function run() {
      const cal = await getCalApi({ namespace: NAMESPACE });
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#10a9e5" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <Cal
      namespace={NAMESPACE}
      calLink={SITE.calLink}
      style={{ width: "100%", height: "780px", overflow: "auto" }}
      config={{ layout: "month_view", theme: "dark" }}
    />
  );
}
