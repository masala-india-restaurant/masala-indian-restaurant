"use client";

import { useEffect } from "react";

const FLAG = "__lowhp_brand_logged__";

export default function ConsoleBrand() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as typeof window & { [FLAG]?: boolean };
    if (w[FLAG]) return;
    w[FLAG] = true;

    const ascii = [
      "  _                  _              ",
      " | | _____      __ | |__  _ __     ",
      " | |/ _ \\ \\ /\\ / / | '_ \\| '_ \\    ",
      " | | (_) \\ V  V /  | | | | |_) |   ",
      " |_|\\___/ \\_/\\_/   |_| |_| .__/    ",
      "                         |_|        ",
    ].join("\n");

    console.log(
      `%c${ascii}`,
      "color:#c9973c;font-family:ui-monospace,Menlo,monospace;font-size:12px;line-height:1.15;text-shadow:0 0 6px rgba(201,151,60,0.25);",
    );
    console.log(
      "%c crafted with %c♥%c in india  %c→ https://lowhp.studio ",
      "color:#e7be62;font-family:ui-monospace,Menlo,monospace;font-size:12px;",
      "color:#d97706;font-size:13px;",
      "color:#e7be62;font-family:ui-monospace,Menlo,monospace;font-size:12px;",
      "color:#7df9c5;font-family:ui-monospace,Menlo,monospace;font-size:12px;font-weight:600;text-decoration:underline;",
    );
  }, []);

  return null;
}
