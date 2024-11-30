"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart, FaTrophy, FaUserAlt, FaTheaterMasks, FaFilm, FaTv } from "react-icons/fa";
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

  const fetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      let url = `https://api.jikan.moe/v4/top/characters?page=${page}`;
      
      if (selectedFilter !== "all") {
        url += `&type=${selectedFilter}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      // Fetch additional details for each character
      const charactersWithDetails = await Promise.all(
        data.data.map(async (character) => {
          try {
            const detailsResponse = await fetch(
              `https://api.jikan.moe/v4/characters/${character.mal_id}/full`
            );
            const detailsData = await detailsResponse.json();
            return {
              ...character,
              details: detailsData.data
            };
          } catch (error) {
            console.error("Error fetching character details:", error);
            return character;
          }
        })
      );

      setCharactersData(page === 1 ? charactersWithDetails : [...charactersData, ...charactersWithDetails]);
    } catch (error) {
      console.error("Error fetching characters data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setCharactersData([]);
    fetchData(1);
  }, [selectedFilter, activeTab]);

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
              <img
                src={character.images.jpg.image_url}
                alt={character.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              
              {/* Rank Badge */}
              <div className="absolute top-2 left-2 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                #{index + 1}
              </div>

              {/* Quick Stats Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <FaHeart className="text-red-400 w-5 h-5" />
                    <span className="text-lg font-semibold">{character.favorites.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaTheaterMasks className="text-blue-400 w-4 h-4" />
                    <span className="text-sm">{character.details?.anime?.length || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            <Link href={`/character/${character.mal_id}`}>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {character.name}
                </h3>

                {character.details?.nicknames && character.details.nicknames.length > 0 && (
                  <p className="text-sm text-gray-400 mb-4 line-clamp-1">
                    aka {character.details.nicknames.join(", ")}
                  </p>
                )}

                {character.details?.about && (
                  <p className="text-sm text-gray-400 line-clamp-3 mb-4">
                    {character.details.about}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {character.details?.anime && character.details.anime.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <FaTv className="w-4 h-4" />
                      <span>{character.details.anime.length} Anime</span>
                    </div>
                  )}
                  
                  {character.details?.manga && character.details.manga.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <FaFilm className="w-4 h-4" />
                      <span>{character.details.manga.length} Manga</span>
                    </div>
                  )}
                </div>
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
