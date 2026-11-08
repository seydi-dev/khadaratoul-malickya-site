"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { LanguageProvider } from "@/context/LanguageContext";
import { AudioProvider } from "@/context/AudioContext";
import Header from "./Header";
import MenuSheet from "./MenuSheet";
import BottomNav from "./BottomNav";
import Footer from "./Footer";
import AudioPlayer from "./AudioPlayer";

export default function AppShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Only the homepage has a full-bleed hero behind the header.
  const transparentTop = pathname === "/";

  return (
    <LanguageProvider>
      <AudioProvider>
        <Header onOpenMenu={() => setMenuOpen(true)} transparentTop={transparentTop} />
        <MenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} />
        <main>{children}</main>
        <Footer />
        <AudioPlayer />
        <BottomNav />
      </AudioProvider>
    </LanguageProvider>
  );
}
