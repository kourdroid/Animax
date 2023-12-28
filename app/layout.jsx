import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import background from "@/public/background.webp";
import Image from "next/image";
import Search from "@/components/ui/Search";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black overflow-x-hidden`}>
        <div className="w-full h-80 flex flex-col items-center justify-center gap-10 border border-white border-opacity-10 bg-anime">
          <div className="absolute h-80 opacity-20 z-0 inset-0">
            <video
            
              src="/background.mp4"
              className="w-full h-full object-cover"
              playsinline
              loop
              autoplay="autoplay"
              muted
            ></video>
          </div>
          <Link href="/" className="z-10 text-3xl font-black text-red-600">
            Animax
          </Link>
          <Search />
          <nav className="z-10 flex w-full mx-auto ">
            <ul className="text-sm mx-auto w-4/5 md:text-base text-white px-5 flex flex-wrap justify-center gap-3 md:w-2/3 ">
              <li className="bg-black bg-opacity-50 px-5 hover:bg-opacity-15 flex justify-center items-center text-center py-3 rounded-full">
                <Link href="/upcoming">Upcoming Anime</Link>
              </li>
              <li className="bg-black bg-opacity-50 px-5 hover:bg-opacity-40 flex justify-center items-center text-center py-3 rounded-full">
                <Link href="/top_characters">Top Characters</Link>
              </li>
              <li className="bg-black bg-opacity-50 px-5 hover:bg-opacity-40 flex justify-center items-center text-center py-3 rounded-full">
                <Link href="/top_manga">Top Manga</Link>
              </li>
            </ul>
          </nav>
        </div>
        {children}
      </body>
    </html>
  );
}
