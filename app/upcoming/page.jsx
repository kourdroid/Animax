"use client";
import { 
  FaSadTear, 
  FaArrowUp, 
  FaPlay, 
  FaCalendarAlt, 
  FaBookOpen, 
  FaFilm,
  FaStar,
  FaTags,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export default function Upcoming() {
  const [animeData, setAnimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [fetchedAnimeIds, setFetchedAnimeIds] = useState(new Set());
  const [expandedCard, setExpandedCard] = useState(null);

  const getRatingContent = (rating) => {
    return rating == null ? "Not yet Rated" : rating;
  };

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

      return () => {
        observer.disconnect();
      };
    },
    [isLoading]
  );

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/seasons/upcoming?page=${page}`
      );
      const animeData = await response.json();

      if (animeData.data && Array.isArray(animeData.data)) {
        // Fetch trailer data for each anime
        const animeWithTrailers = await Promise.all(
          animeData.data.map(async (anime) => {
            try {
              const trailerResponse = await fetch(
                `https://api.jikan.moe/v4/anime/${anime.mal_id}/full`
              );
              const trailerData = await trailerResponse.json();
              return {
                ...anime,
                trailer_url: trailerData.data?.trailer?.embed_url || null,
              };
            } catch (error) {
              console.error("Error fetching trailer:", error);
              return {
                ...anime,
                trailer_url: null,
              };
            }
          })
        );

        const uniqueAnimeData = animeWithTrailers.filter(
          (item) => !fetchedAnimeIds.has(item.mal_id)
        );

        setFetchedAnimeIds(
          (prevIds) =>
            new Set([...prevIds, ...uniqueAnimeData.map((item) => item.mal_id)])
        );

        setAnimeData((prevData) => {
          const newData = [...prevData, ...uniqueAnimeData];
          const uniqueData = Array.from(
            new Set(newData.map((item) => item.mal_id))
          ).map((mal_id) => newData.find((item) => item.mal_id === mal_id));
          return uniqueData;
        });
      } else {
        console.error("Invalid API response format:", animeData);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 p-8 mb-8">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Upcoming Anime
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Discover the next big hits in anime. Stay ahead with upcoming releases and be the first to know about new series.
          </p>
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      </div>

      {/* Anime Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-8"
      >
        {animeData.map((item, index) => (
          <motion.div
            key={item.mal_id}
            variants={item}
            className={`group relative bg-gradient-to-b from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 ${
              expandedCard === item.mal_id ? 'row-span-2' : ''
            }`}
            ref={index === animeData.length - 1 ? lastAnimeElementRef : null}
          >
            <div className="flex flex-col gap-6 p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-2/5">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg group">
                    <img
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      src={item.images.webp.large_image_url}
                      alt={item.title}
                      width={300}
                      height={400}
                    />
                    {item.trailer_url && (
                      <button
                        onClick={() => setExpandedCard(expandedCard === item.mal_id ? null : item.mal_id)}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-500 text-white">
                          <FaPlay className="w-6 h-6 ml-1" />
                        </div>
                        <span className="text-white mt-2 text-sm font-medium">Watch Trailer</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-3/5 space-y-4">
                  <div className="space-y-2">
                    <div className="bg-red-600/90 text-white text-sm font-medium w-max px-2.5 py-1 rounded-md">
                      {item.type}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold line-clamp-2 group-hover:text-red-500 transition-colors">
                      {item.title}
                    </h2>
                  </div>

                  <p className="text-sm text-gray-400 line-clamp-3">
                    {item.synopsis}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="space-y-2">
                      <div className="bg-white/5 rounded-lg p-2.5">
                        <div className="flex items-center gap-2 text-gray-400">
                          <FaCalendarAlt className="text-red-500" />
                          <span>Release Date</span>
                        </div>
                        <div className="font-medium text-red-500">
                          {item.aired.from
                            ? `${item.aired.prop.from.day}/${item.aired.prop.from.month}/${item.aired.prop.from.year}`
                            : "TBA"}
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-lg p-2.5">
                        <div className="flex items-center gap-2 text-gray-400">
                          <FaBookOpen className="text-red-500" />
                          <span>Source</span>
                        </div>
                        <div className="font-medium text-red-500">
                          {item.source}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="bg-white/5 rounded-lg p-2.5">
                        <div className="flex items-center gap-2 text-gray-400">
                          <FaFilm className="text-red-500" />
                          <span>Studio</span>
                        </div>
                        <div className="font-medium text-red-500">
                          {item.studios.length > 0
                            ? item.studios.map((studio) => studio.name).join(", ")
                            : "TBA"}
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-lg p-2.5">
                        <div className="flex items-center gap-2 text-gray-400">
                          <FaStar className="text-red-500" />
                          <span>Rating</span>
                        </div>
                        <div className="font-medium text-red-500">
                          {getRatingContent(item.rating)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-2.5">
                    <div className="flex items-center gap-2 text-gray-400">
                      <FaTags className="text-red-500" />
                      <span>Genres</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.genres.map((genre) => (
                        <span
                          key={genre.mal_id}
                          className="bg-red-500/20 text-red-500 text-xs px-2 py-1 rounded-md"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trailer Section */}
              {expandedCard === item.mal_id && item.trailer_url && (
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-red-500">
                      <FaPlay className="w-4 h-4" />
                      <span className="font-medium">Trailer</span>
                    </div>
                    <button 
                      onClick={() => setExpandedCard(null)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FaChevronUp className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="w-full aspect-video rounded-lg overflow-hidden bg-black/50">
                    <iframe
                      src={item.trailer_url}
                      className="w-full h-full"
                      allowFullScreen
                      allow="autoplay; encrypted-media"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {isLoading && (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        </div>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={handleScrollToTop}
        className="fixed bottom-8 right-8 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors"
      >
        <FaArrowUp />
      </button>
    </div>
  );
}
