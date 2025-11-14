import type { Metadata } from "next";
import "./globals.css";
import NavigationMenu from "@/app/component/Menu";
import Footer from "@/app/component/Footer";

export const metadata: Metadata = {
  title: "New Hope Children's Homes",
  description: "Welcome to New Hope Children's Homes",
  icons: {
    icon: "/nhch.png",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION_CODE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {process.env.GOOGLE_SITE_VERIFICATION_CODE && (
          <meta
            name="google-site-verification"
            content={process.env.GOOGLE_SITE_VERIFICATION_CODE}
          />
        )}
      </head>
      <body className="antialiased">
        <header className="sticky top-0 z-50 bg-white shadow-md">
          <NavigationMenu />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
