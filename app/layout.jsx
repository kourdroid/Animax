import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { IoIosArrowDown, IoSearch } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import { SpeedInsights } from "@vercel/speed-insights/next";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Animax",
  description:
    "Animax is a dynamic and modern online platform dedicated to anime enthusiasts. Built with the cutting-edge Next.js framework, Animax aims to provide users with a seamless and responsive experience for tracking, discovering their favorite anime and manga titles.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black overflow-x-hidden`}>
        <nav className="container mx-auto w-full h-32 flex items-center justify-between gap-10 border-b border-white border-opacity-10 px-10">
          <div className="absolute h-96 opacity-30 z-0 inset-0">
            <div className="bg-gradient-to-t from-black absolute z-10 inset-0"></div>
            <video
              src="/background.mp4"
              className="w-full h-full object-cover"
              playsInline
              loop
              autoPlay
              muted
            ></video>
          </div>

          <Link
            href="/"
            className="z-10 text-3xl font-black bg-gradient-to-tr from-red-600 to-red-800 bg-clip-text text-transparent"
          >
            <Image 
            className="w-32 hidden md:flex"
            src='/logo.svg'
            alt="Animax Logo"
            width={80}
            height={20}
            />
            <Image 
            className="w-50 block md:hidden"
            src='/logo_sm.svg'
            alt="Animax Logo"
            width={100}
            height={50}
            />

            
          </Link>

          <ul className="flex text-xs md:text-base items-center space-x-5 md:space-x-8">
            {/* Top Anime */}
            <li className="relative group flex justify-center items-center">
              <Link
                href="/"
                className="nav-link flex items-center gap-1 py-5 hover:text-red-600 font-bold"
              >
                Anime <IoIosArrowDown />
              </Link>
              <ul className="absolute top-full left-1/2 transform -translate-x-1/2 w-max mx-auto z-50 hidden rounded-xl bg-gradient-to-tr from-[#00000010] to-[#ffffff07] bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 bg-black text-white py-5  px-5 space-y-5 group-hover:flex flex-col justify-center items-center">
                <li>
                  <Link className="hover:text-red-600" href="/">
                    Top Anime
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-red-600" href="/upcoming">
                    Upcoming Anime
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-red-600"
                    href="/recommended_anime"
                  >
                    Recommended Anime
                  </Link>
                </li>
              </ul>
            </li>

            {/* Manga */}
            <li className="relative group flex justify-center">
              <Link
                href="/top_manga"
                className="nav-link flex items-center gap-1 py-5 hover:text-red-600 font-bold"
              >
                Manga <IoIosArrowDown />
              </Link>
              <ul className="absolute top-full left-1/2 transform -translate-x-1/2 w-max mx-auto z-50 hidden rounded-xl bg-gradient-to-tr from-[#00000010] to-[#ffffff07] bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 bg-black text-white py-5  px-5 space-y-5 group-hover:flex flex-col justify-center items-center">
                <li>
                  <Link className="hover:text-red-600" href="/top_manga">
                    Top Manga
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-red-600"
                    href="/recommended_manga"
                  >
                    Recommended Manga
                  </Link>
                </li>
              </ul>
            </li>

            {/* Characters */}
            <li className="relative group flex justify-center">
              <Link
                href="/top_characters"
                className="nav-link flex items-center gap-1 py-5 hover:text-red-600 font-bold"
              >
                Characters <IoIosArrowDown />
              </Link>
              <ul className="absolute top-full left-1/2 transform -translate-x-1/2 w-max mx-auto z-50 hidden rounded-xl bg-gradient-to-tr from-[#00000010] to-[#ffffff07] bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 bg-black text-white py-5  px-5 space-y-5 group-hover:flex flex-col justify-center items-center">
                <li>
                  <Link className="hover:text-red-600" href="/top_characters">
                    Top Characters
                  </Link>
                </li>
              </ul>
            </li>
            <Link
              href="search_anime"
              className="relative group flex p-2 md:p-3 rounded-full cursor-pointer justify-center items-center bg-white hover:bg-gradient-to-tr from-red-600 to-red-800  bg-opacity-10 h-max"
            >
              <FaSearch className="text-xs md:text-xl " />
            </Link>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
