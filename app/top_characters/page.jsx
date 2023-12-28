"use client";
import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

export default function Home() {
  const [animeData, setAnimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const observer = useRef();

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
        `https://api.jikan.moe/v4/top/characters?page=${page}`
      );
      const responseData = await response.json();
      setAnimeData((prevData) => [...prevData, ...responseData.data]);
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

  return (
    <main className="container mx-auto">
      <div className="relative w-max mx-auto">
        <h2 className="text-center text-2xl text-white w-max px-5 py-2 mx-auto font-bold my-10">
          Top haracters
        </h2>
        <div className="absolute bottom-0 left-0 right-0 w-32 mx-auto h-1 bg-red-600"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 px-10">
        {animeData.map((item, index) => (
          <div
            key={item.mal_id}
            className="relative flex flex-col justify-between items-center"
            ref={index === animeData.length - 1 ? lastAnimeElementRef : null}
          >
            <Link href={`top_characters/${item.mal_id.toString()}`}>
              <img
                src={item.images.webp.image_url}
                className="rounded-xl  w-full h-80 aspect-portrait"
                alt={item.name}
              />
            </Link>
            <Link
              href={item.mal_id.toString()}
              className="text-center font-semibold tracking-wide py-2 mx-auto"
            >
              {item.name}
            </Link>
          </div>
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
      <button
        onClick={handleScrollToTop}
        className="fixed bottom-4 right-4 bg-red-600 hover:bg-red-700 transition-all duration-300 ease-in-out text-white px-4 py-4 rounded-full"
      >
        <FaArrowUp />
      </button>
    </main>
  );
}
