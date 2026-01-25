import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Jo's Daily Digests",
    template: "%s | Jo's Daily Digests",
  },
  description: "Daily curated summaries of AI, Crypto, and World news from top YouTube channels.",
  keywords: ["AI", "Crypto", "News", "Daily Digest", "Technology", "Artificial Intelligence", "Bitcoin", "Ethereum"],
  authors: [{ name: "Jo Vinkenroye" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Jo's Daily Digests",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-black text-white">
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
          <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="/" className="text-xl font-bold">
              📰 Jo&apos;s Daily Digests
            </a>
            <div className="flex items-center gap-6">
              <a href="/" className="text-sm text-neutral-400 hover:text-white transition-colors">
                Home
              </a>
              <a href="/tags" className="text-sm text-neutral-400 hover:text-white transition-colors">
                Tags
              </a>
            </div>
          </nav>
        </header>
        <main className="pt-16">
          {children}
        </main>
        <footer className="border-t border-white/10 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-neutral-500 text-sm">
            <p>Daily digests curated by AI from top YouTube channels</p>
            <p className="mt-2">© {new Date().getFullYear()} Jo Vinkenroye</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
