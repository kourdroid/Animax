'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col minimal-scroll dark`}>
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur-md transition-all duration-300">
          <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
              <Image 
                className="w-24 md:w-32 transition-transform duration-300 hover:scale-105"
                src='/logo.svg'
                alt="Animax Logo"
                width={80}
                height={20}
                priority
              />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <Link href="/top_anime" className="hover:text-primary transition-colors font-medium">
                Top Anime
              </Link>
              <Link href="/top_manga" className="hover:text-primary transition-colors font-medium">
                Top Manga
              </Link>
              <Link href="/top_characters" className="hover:text-primary transition-colors font-medium">
                Top Characters
              </Link>
              <Link href="/upcoming" className="hover:text-primary transition-colors font-medium">
                Upcoming
              </Link>
              <Link 
                href="/search_anime" 
                className="p-3 rounded-full hover:bg-accent/80 transition-colors duration-200 text-foreground/90 hover:text-foreground bg-accent/50 backdrop-blur-sm"
                aria-label="Search"
              >
                <FaSearch className="w-5 h-5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-accent/20 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'} overflow-hidden bg-background/95 backdrop-blur-md`}>
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              <Link 
                href="/" 
                className="hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/recommended" 
                className="hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Recommended
              </Link>
              <Link 
                href="/top_anime" 
                className="hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Top Anime
              </Link>
              <Link 
                href="/top_manga" 
                className="hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Top Manga
              </Link>
              <Link 
                href="/top_characters" 
                className="hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Top Characters
              </Link>
              <Link 
                href="/upcoming" 
                className="hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Upcoming
              </Link>
              <Link 
                href="/search_anime" 
                className="inline-flex items-center space-x-2 hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaSearch className="w-5 h-5" />
                <span>Search</span>
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1 container mx-auto px-4 py-6 fade-in">
          {children}
        </main>
        
        <footer className="border-t bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 h-16 flex items-center justify-center text-sm text-muted-foreground">
            <p>&copy; 2024 Animax. All rights reserved.</p>
          </div>
        </footer>
        <SpeedInsights />
      </body>
    </html>
  );
}
