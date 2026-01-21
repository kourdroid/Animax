"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaTheaterMasks } from "react-icons/fa";
import { motion } from "framer-motion";

export default function TopCharacters() {
  const [charactersData, setCharactersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("favorites");

  const filters = [
    { id: "all", label: "All" },
    { id: "anime", label: "Anime" },
    { id: "manga", label: "Manga" },
  ];

  const tabs = [
    { id: "favorites", label: "Most Popular", icon: FaHeart },
    { id: "appearing", label: "Most Appearances", icon: FaTheaterMasks },
  ];

  const fetchData = useCallback(async (pageNum) => {
    setIsLoading(true);
    try {
      let url = `https://api.jikan.moe/v4/top/characters?page=${pageNum}`;
      
      if (selectedFilter !== "all") {
        url += `&type=${selectedFilter}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.data) {
        setCharactersData(prev => pageNum === 1 ? data.data : [...prev, ...data.data]);
      }
    } catch (error) {
      console.error("Error fetching characters data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedFilter]);

  useEffect(() => {
    setPage(1);
    setCharactersData([]);
    fetchData(1);
  }, [fetchData, activeTab]);

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
    <div className="min-h-screen p-6 space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 p-8 mb-8">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Top Anime Characters
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Meet the most beloved characters from your favorite anime and manga series.
          </p>
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              selectedFilter === filter.id
                ? "bg-accent text-white shadow-lg shadow-accent/30"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Characters Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {charactersData.map((character, index) => (
          <motion.div
            key={character.mal_id}
            variants={item}
            className="group relative bg-gradient-to-b from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={character.images.jpg.image_url}
                alt={character.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              
              {/* Rank Badge */}
              <div className="absolute top-2 left-2 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm z-10">
                #{index + 1}
              </div>

              {/* Quick Stats Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <FaHeart className="text-red-400 w-5 h-5" />
                    <span className="text-lg font-semibold">{character.favorites.toLocaleString()}</span>
                  </div>
                  {/* Anime count removed to avoid N+1 requests */}
                </div>
              </div>
            </div>

            <Link href={`/character/${character.mal_id}`}>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {character.name}
                </h3>

                {character.nicknames && character.nicknames.length > 0 && (
                  <p className="text-sm text-gray-400 mb-4 line-clamp-1">
                    aka {character.nicknames.join(", ")}
                  </p>
                )}

                {character.about && (
                  <p className="text-sm text-gray-400 line-clamp-3 mb-4">
                    {character.about}
                  </p>
                )}

                {/*
                  Anime/Manga counts removed.
                  These required 25+ extra API calls per page load (N+1 problem).
                  Removing them significantly improves load time and reduces API rate limiting.
                */}
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Load More Button */}
      {!isLoading && charactersData.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              setPage(prev => prev + 1);
              fetchData(page + 1);
            }}
            className="px-6 py-3 bg-primary/80 hover:bg-primary text-white rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 backdrop-blur-sm"
          >
            Load More
          </button>
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
}
