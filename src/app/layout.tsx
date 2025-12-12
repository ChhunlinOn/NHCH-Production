import type { Metadata } from "next";
import "./globals.css";
import NavigationMenu from "@/app/component/Menu";
import Footer from "@/app/component/Footer";

export const metadata: Metadata = {
  title: "New Hope Children's Homes",
  description: "Welcome to New Hope Children's Homes",
  keywords: "New Hope Children's Homes, NHCH, Cambodia, orphanage, children's homes, charity, nonprofit, donations, sponsor a child, volunteer, humanitarian aid, Phnom Penh, Cambodia children, foster care, child sponsorship",
  openGraph: {
    type: "website",
    url: "https://nhchkh.org/",
    title: "New Hope Children's Homes",
    description: "New Hope Children's Homes (NHCH) is a registered non-governmental organization in Cambodia, dedicated to serving orphaned, abandoned, and impoverished children with compassion, dignity, and hope.",
    images: [
      {
        url: "https://res.cloudinary.com/deszfzhei/image/upload/v1765558091/z0sjhj2wpnzrlttpsctu.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Hope Children's Homes",
    description: "New Hope Children's Homes (NHCH) is a registered non-governmental organization in Cambodia, dedicated to serving orphaned, abandoned, and impoverished children with compassion, dignity, and hope.",
    images: ["https://res.cloudinary.com/deszfzhei/image/upload/v1765558091/z0sjhj2wpnzrlttpsctu.png"],
  },
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
