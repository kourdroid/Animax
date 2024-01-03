'use client'
import { FaArrowUp, FaStar } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [animeData, setAnimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [fetchedAnimeIds, setFetchedAnimeIds] = useState(new Set());



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
      `https://api.jikan.moe/v4/top/anime?page=${page}`
    );
    const responseData = await response.json();

    // Check if responseData.data exists and is an array
    if (responseData.data && Array.isArray(responseData.data)) {
      // Extract unique anime entries based on their IDs
      const uniqueAnimeData = responseData.data.filter(
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
      // Handle the case where responseData.data is not as expected
      console.error("Invalid API response format:", responseData);
    }
  } finally {
    setIsLoading(false);
  }
};



  useEffect(() => {
    fetchData();
  }, [page,fetchData]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="container mx-auto">
      <div className="relative w-max mx-auto">
        <h2 className="text-center text-2xl text-white w-max px-5 py-2 mx-auto font-bold my-10">
          Popular Anime
        </h2>
        <div className="absolute bottom-0 left-0 right-0 w-32 mx-auto h-1 bg-red-600"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {animeData.map((item, index) => (
          <div
            key={item.mal_id}
            className="relative flex flex-col justify-between items-center"
            ref={index === animeData.length - 1 ? lastAnimeElementRef : null}
          >
            <Link
              className="relative overflow-hidden w-full rounded-lg aspect-portrait"
              href={item.mal_id.toString()}
            >
              <div className="absolute inset-0  transition-all duration-300 ease-out hover:block z-0 bg-black flex flex-col justify-between text-center  items-center py-10 px-5 md:py-3 gap-5">
                <h3 className="text-xl font-bold text-center py-5 max-h-12 line-clamp-1">{item.title}</h3>
                <p className="text-sm overflow-hidden max-h-full line-clamp-3 md:line-clamp-6">
                  {item.synopsis}
                </p>
                <div className="flex items-center gap-2 text-xl font-bold">
                  <FaStar className="text-amber-500 drop-shadow-[0px_2px_8px_#ffbb00]" />
                  {item.score}
                </div>
                <div>
                  <p className="text-center font-bold text-red-600 py-5">{item.studios[0].name}</p>
                </div>
              </div>
              <Image
                src={item.images.jpg.large_image_url}
                className="absolute inset-0 opacity-100 hover:opacity-5 rounded-lg aspect-portrait h-full w-full hover:scale-125 hover:rotate-6 z-10 transition-all duration-300 ease-in-out "
                alt={item.title}
                layout="fill"
                objectFit="cover"
              />
            </Link>

            <Link
              href={item.mal_id.toString()}
              className="text-center font-semibold tracking-wide py-2 mx-auto"
            >
              {item.title}
            </Link>
          </div>
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
      <button
        onClick={handleScrollToTop}
        className="fixed z-50 bottom-4 shadow-2xl right-4 bg-red-600 hover:bg-red-700 transition-all duration-300 ease-in-out text-white px-4 py-4 rounded-full"
      >
        <FaArrowUp />
      </button>
    </main>
  );
}
