"use client";
import { FaSadTear, FaArrowUp } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";

export default function Upcoming() {
  const [animeData, setAnimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [fetchedAnimeIds, setFetchedAnimeIds] = useState(new Set());

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
          root: null, // Use the viewport as the root
          rootMargin: "0px", // No margin
          threshold: 0.5, // Trigger when 50% of the element is visible
        }
      );

      observer.observe(node);

      // Cleanup the observer when the component unmounts
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

      // Check if animeData.data exists and is an array
      if (animeData.data && Array.isArray(animeData.data)) {
        // Extract unique anime entries based on their IDs
        const uniqueAnimeData = animeData.data.filter(
          (item) => !fetchedAnimeIds.has(item.mal_id)
        );

        // Update the set of fetched anime IDs
        setFetchedAnimeIds(
          (prevIds) =>
            new Set([...prevIds, ...uniqueAnimeData.map((item) => item.mal_id)])
        );

        // Remove duplicates from the animeData state
        setAnimeData((prevData) => {
          const newData = [...prevData, ...uniqueAnimeData];
          const uniqueData = Array.from(
            new Set(newData.map((item) => item.mal_id))
          ).map((mal_id) => newData.find((item) => item.mal_id === mal_id));
          return uniqueData;
        });
      } else {
        // Handle the case where animeData.data is not as expected
        console.error("Invalid API response format:", animeData);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, fetchData]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="relative w-max mx-auto mb-12">
        <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
          Upcoming Anime
        </h2>
        <div className="absolute bottom-0 left-0 right-0 w-1/2 mx-auto h-1 bg-gradient-to-r from-red-500 to-red-700"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {animeData.map((item, index) => (
          <div
            key={item.mal_id}
            className="group relative bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10"
            ref={index === animeData.length - 1 ? lastAnimeElementRef : null}
          >
            <div className="flex flex-col md:flex-row gap-6 p-6">
              <div className="w-full md:w-2/5">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <img
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    src={item.images.webp.large_image_url}
                    alt={item.title}
                    width={300}
                    height={400}
                  />
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
                      <span className="text-gray-400">Release Date</span>
                      <div className="font-medium text-red-500">
                        {item.aired.from ? (
                          `${item.aired.prop.from.day}/${item.aired.prop.from.month}/${item.aired.prop.from.year}`
                        ) : (
                          "TBA"
                        )}
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-2.5">
                      <span className="text-gray-400">Source</span>
                      <div className="font-medium text-red-500">
                        {item.source}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="bg-white/5 rounded-lg p-2.5">
                      <span className="text-gray-400">Studio</span>
                      <div className="font-medium text-red-500">
                        {item.studios.length > 0
                          ? item.studios.map((studio) => studio.name).join(", ")
                          : "TBA"}
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-2.5">
                      <span className="text-gray-400">Rating</span>
                      <div className="font-medium text-red-500">
                        {getRatingContent(item.rating)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-2.5">
                  <span className="text-gray-400">Genres</span>
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
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        </div>
      )}

      <button
        onClick={handleScrollToTop}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-red-500 to-red-700 text-white p-3 rounded-full shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:-translate-y-1"
      >
        <FaArrowUp className="text-lg" />
      </button>
    </div>
  );
}
