import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import BlobCursor from "./components/blob_cursor";
import Chatbot from "./components/Chatbot";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BR's Diner | Good times start here",
  description: "Experience the finest restobar vibes at BR's Diner. Gourmet comfort food, signature cocktails, and unforgettable nights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-dark text-text-main font-sans selection:bg-brand-primary selection:text-bg-dark">
        <BlobCursor
          blobType="circle"
          fillColor="#C5A059"
          trailCount={5}
          sizes={[40, 50, 50, 50, 50]}
          innerSizes={[30, 20, 20, 20, 20]}
          innerColor="#c5b419ff"
          opacities={[0.8, 0.75, 0.75, 0.75, 0.75]}
          shadowColor="#C5A059"
          shadowBlur={20}
          shadowOffsetX={0}
          shadowOffsetY={0}
          filterStdDeviation={30}
          useFilter={true}
          fastDuration={0.1}
          slowDuration={0.45}
          zIndex={100}
        />


        <nav className="glass-nav fixed top-0 w-full z-[100] border-b border-brand-primary/10 flex justify-center">
          <div className="w-full max-w-6xl px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold gold-gradient tracking-tight">BR's Diner</span>
            </div>



            <div className="hidden md:flex items-center gap-8 uppercase text-xs tracking-[0.2em] font-medium text-text-muted">
              <a href="#hero" className="hover:text-brand-primary transition-colors">Home</a>
              <a href="#about" className="hover:text-brand-primary transition-colors">Experience</a>
              <a href="#menu" className="hover:text-brand-primary transition-colors">Menu</a>
              <a href="#gallery" className="hover:text-brand-primary transition-colors">Gallery</a>
              <a href="#contact" className="hover:text-brand-primary transition-colors border border-brand-primary/30 px-4 py-2 rounded-full hover:bg-brand-primary/10">Reservation</a>
            </div>

            <button className="md:hidden text-brand-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
            </button>
          </div>
        </nav>


        <main className="flex-1 flex flex-col">
          {children}
        </main>

        <Chatbot />

        <footer className="bg-black py-12 border-t border-white/5 flex justify-center">
          <div className="w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-end gap-12">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-serif gold-gradient mb-2">BR's Diner</h3>
              <p className="text-sm text-text-muted">Good times start here.</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 text-text-muted text-[10px] uppercase tracking-[0.2em] items-center md:items-end">
              <span>© 2026 BR's Diner</span>
              <div className="flex gap-6">
                <a href="#" className="hover:text-brand-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-brand-primary transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}


