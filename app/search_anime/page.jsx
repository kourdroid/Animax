"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FaSearch, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleSubmit = async () => {
      if (debouncedQuery.trim() === "") {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime?q=${debouncedQuery}&sfw=${true}&sort=desc&order_by=score&start_date=2005-01-01`
        );
        setResults(response.data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    handleSubmit();
  }, [debouncedQuery]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen pt-12 pb-20 z-50 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-amber-500 text-transparent bg-clip-text">
            Search Anime
          </h1>
          <p className="text-white/70 mb-8 text-lg">
            Find your favorite anime series, movies, and OVAs
          </p>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-amber-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for anime..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-14 px-6 pr-12 text-white bg-black/50 rounded-full outline-none border border-white/10 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
              />
              <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 group-hover:text-red-500 transition-colors duration-300" />
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center my-20 gap-4"
            >
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white/50 animate-pulse">Searching for anime...</p>
            </motion.div>
          ) : results.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              {results.map((result) => (
                <motion.div
                  key={result.mal_id}
                  variants={item}
                  className="group"
                >
                  <Link
                    href={result.mal_id.toString()}
                    className="block transform transition-transform duration-300 hover:scale-105"
                  >
                    <div className="relative overflow-hidden rounded-xl aspect-[3/4] mb-3 shadow-lg shadow-black/20">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 p-6 flex flex-col justify-between backdrop-blur-sm">
                        <div>
                          <h3 className="text-lg font-bold mb-2 text-white">{result.title}</h3>
                          <p className="text-sm text-white/80 line-clamp-3">
                            {result.synopsis}
                          </p>
                        </div>
                        {result.score && (
                          <div className="flex items-center gap-2 text-amber-400">
                            <FaStar className="animate-pulse" />
                            <span className="font-semibold">{result.score}</span>
                          </div>
                        )}
                      </div>
                      <img
                        src={result.images.webp.large_image_url}
                        alt={result.title}
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-white/90 line-clamp-1 group-hover:text-red-500 transition-colors duration-300">
                      {result.title}
                    </h3>
                    <p className="text-xs text-white/50">
                      {result.type} {result.episodes && `• ${result.episodes} episodes`}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : query.trim() !== "" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center my-20 space-y-4"
            >
              <p className="text-xl text-white/70">No results found for "<span className="text-red-500">{query}</span>"</p>
              <p className="text-white/50">Try searching with different keywords</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Search;
