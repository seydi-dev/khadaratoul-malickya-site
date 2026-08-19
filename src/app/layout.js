import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata = {
  title: "Khadaratoul Malickya — Trois-Rivières",
  description:
    "Communauté musulmane Tidjaniyya de Trois-Rivières, Québec. Foi, entraide et fraternité. Séances Khadara et Wasifa, Gamou et célébrations.",
  openGraph: {
    title: "Khadaratoul Malickya — Trois-Rivières",
    description:
      "Communauté musulmane Tidjaniyya de Trois-Rivières, Québec. Foi, entraide et fraternité.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0A241B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
