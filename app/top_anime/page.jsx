"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { FaStar, FaPlay, FaTrophy, FaHeart, FaEye, FaCalendar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function TopAnime() {
  const [animeData, setAnimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [activeTrailer, setActiveTrailer] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("score");

  const filters = [
    { id: "all", label: "All" },
    { id: "airing", label: "Airing" },
    { id: "upcoming", label: "Upcoming" },
    { id: "movie", label: "Movies" },
    { id: "ova", label: "OVAs" },
  ];

  const tabs = [
    { id: "score", label: "Top Rated", icon: FaStar },
    { id: "popularity", label: "Most Popular", icon: FaHeart },
    { id: "favorite", label: "Most Favorited", icon: FaTrophy },
  ];

  const fetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      let url = `https://api.jikan.moe/v4/top/anime?page=${page}`;
      
      if (selectedFilter !== "all") {
        url += `&type=${selectedFilter}`;
      }
      
      switch (activeTab) {
        case "popularity":
          url += "&filter=bypopularity";
          break;
        case "favorite":
          url += "&filter=favorite";
          break;
        default:
          url += "&filter=bypopularity";
      }

      const response = await fetch(url);
      const data = await response.json();

      // Fetch trailer data for each anime
      const animeWithTrailers = await Promise.all(
        data.data.map(async (anime) => {
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

      setAnimeData(page === 1 ? animeWithTrailers : [...animeData, ...animeWithTrailers]);
    } catch (error) {
      console.error("Error fetching anime data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setAnimeData([]);
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
            Top Anime Series
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Discover the highest-rated and most popular anime series of all time. From classic masterpieces to modern hits.
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

      {/* Anime Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {animeData.map((anime, index) => (
          <motion.div
            key={anime.mal_id}
            variants={item}
            className="group relative bg-gradient-to-b from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
          >
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
                  onClick={() => setActiveTrailer(activeTrailer === anime.mal_id ? null : anime.mal_id)}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <FaPlay className={`${activeTrailer === anime.mal_id ? 'hidden' : ''} text-white text-xl`} />
                  </div>
                </button>
              )}

              {/* Rank Badge */}
              <div className="absolute top-2 left-2 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                #{index + 1}
              </div>
            </div>

            <Link href={`/${anime.mal_id}`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <FaStar className="text-yellow-400 w-5 h-5" />
                    <span className="text-lg font-semibold">{anime.score || 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaEye className="text-gray-400 w-4 h-4" />
                    <span className="text-sm text-gray-400">{anime.members.toLocaleString()}</span>
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

                <div className="flex justify-between items-center text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <FaCalendar className="w-4 h-4" />
                    <span>{new Date(anime.aired.from).getFullYear()}</span>
                  </div>
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
          </motion.div>
        ))}
      </motion.div>

      {/* Load More Button */}
      {!isLoading && animeData.length > 0 && (
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
