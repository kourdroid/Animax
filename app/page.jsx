"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaStar, FaArrowUp, FaPlay, FaCalendar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  const [animeData, setAnimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [fetchedAnimeIds, setFetchedAnimeIds] = useState(new Set());
  const [activeTrailer, setActiveTrailer] = useState(null);

  const lastAnimeElementRef = useCallback(
    (node) => {
      if (isLoading || !node) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const targetEntry = entries.find(
            (entry) => entry.isIntersecting && entry.target === node
          );

          if (targetEntry) {
            setIsLoading(true);
            setPage((prevPage) => prevPage + 1);
          }
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.5,
        }
      );

      observer.observe(node);
      return () => observer.disconnect();
    },
    [isLoading]
  );

  const fetchData = async (page = 1) => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/top/anime?page=${page}`
      );
      const responseData = await response.json();

      if (responseData?.data) {
        const uniqueAnimeData = responseData.data.filter(
          (item) => !fetchedAnimeIds.has(item.mal_id)
        );

        // Fetch trailer data for each anime
        const animeWithTrailers = await Promise.all(
          uniqueAnimeData.map(async (anime) => {
            try {
              const trailerResponse = await fetch(
                `https://api.jikan.moe/v4/anime/${anime.mal_id}/full`
              );
              const trailerData = await trailerResponse.json();
              return {
                ...anime,
                trailer_url: trailerData.data?.trailer?.embed_url || null
              };
            } catch (error) {
              console.error("Error fetching trailer:", error);
              return {
                ...anime,
                trailer_url: null
              };
            }
          })
        );

        setFetchedAnimeIds(
          (prevIds) =>
            new Set([...prevIds, ...animeWithTrailers.map((item) => item.mal_id)])
        );

        setAnimeData((prevData) => {
          const newData = [...prevData, ...animeWithTrailers];
          const uniqueData = Array.from(
            new Set(newData.map((item) => item.mal_id))
          ).map((mal_id) => newData.find((item) => item.mal_id === mal_id));
          return uniqueData;
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <>
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden mx-4 my-6">
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <video
            src="/background.mp4"
            className="w-full h-full object-cover scale-105"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-300 leading-tight"
          >
            Discover Your Next Anime Adventure
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Explore top-rated anime series and find your next favorite story
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative max-w-xl mx-auto"
          >
            <Link href="/search_anime">
              <div className="group cursor-pointer backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-5 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10">
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-xl font-medium">Search Anime</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6"
      >
        {animeData.map((anime, index) => (
          <motion.div
            key={anime.mal_id}
            variants={item}
            ref={index === animeData.length - 1 ? lastAnimeElementRef : null}
            className="bg-gradient-to-b from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
          >
            <div className="relative">
              <div className="relative aspect-video overflow-hidden">
                {activeTrailer === anime.mal_id && anime.trailer_url ? (
                  <iframe
                    src={anime.trailer_url}
                    className="w-full h-full"
                    allowFullScreen
                    title={`${anime.title} Trailer`}
                  />
                ) : (
                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                
                {anime.trailer_url && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTrailer(activeTrailer === anime.mal_id ? null : anime.mal_id);
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <FaPlay className={`${activeTrailer === anime.mal_id ? 'hidden' : ''} text-white text-xl`} />
                    </div>
                  </button>
                )}
              </div>

              <Link href={`/${anime.mal_id}`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <FaStar className="text-yellow-400 w-5 h-5" />
                      <span className="text-lg font-semibold">{anime.score || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaCalendar className="text-gray-400 w-4 h-4" />
                      <span className="text-sm text-gray-400">{new Date(anime.aired.from).getFullYear()}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {anime.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {anime.genres.slice(0, 3).map((genre) => (
                      <span
                        key={genre.mal_id}
                        className="text-xs px-3 py-1 bg-gray-800 text-gray-300 rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-gray-400 line-clamp-3">
                    {anime.synopsis}
                  </p>

                  <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
                    <span>Episodes: {anime.episodes || 'Ongoing'}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      anime.status === "Currently Airing"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {anime.status}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {isLoading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      <button
        onClick={handleScrollToTop}
        className="fixed bottom-8 right-8 bg-primary/80 hover:bg-primary p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
      >
        <FaArrowUp className="w-6 h-6" />
      </button>
    </>
  );
}
