"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "./Header";
import MenuSheet from "./MenuSheet";
import BottomNav from "./BottomNav";
import Footer from "./Footer";

export default function AppShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Only the homepage has a full-bleed hero behind the header.
  const transparentTop = pathname === "/";

  return (
    <LanguageProvider>
      <Header onOpenMenu={() => setMenuOpen(true)} transparentTop={transparentTop} />
      <MenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>{children}</main>
      <Footer />
      <BottomNav />
    </LanguageProvider>
  );
}
