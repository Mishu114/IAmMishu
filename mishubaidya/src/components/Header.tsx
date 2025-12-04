import React from "react";
import { getSettings } from "@/lib/data";
import NavBar from "@/components/NavBar";

export default async function Header() {
  const settings = getSettings();
  return (
    <header className="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4">
      <NavBar settings={settings} />
    </header>
  );
}
