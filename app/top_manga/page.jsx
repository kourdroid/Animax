'use client'

import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

export default function page() {
  const [mangaData, setMangaData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [fetchedAnimeIds, setFetchedAnimeIds] = useState(new Set());

  const observer = useRef();

const lastMangaElementRef = useCallback(
  (node) => {
    if (isLoading || !node) return;

    const observer = new IntersectionObserver((entries) => {
      const targetEntry = entries.find(
        (entry) => entry.isIntersecting && entry.target === node
      );

      if (targetEntry) {
        setIsLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    });

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
      `https://api.jikan.moe/v4/top/manga?page=${page}`
    );
    const responseData = await response.json();

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
    setMangaData((prevData) => {
      const newData = [...prevData, ...uniqueAnimeData];
      const uniqueData = Array.from(
        new Set(newData.map((item) => item.mal_id))
      ).map((mal_id) => newData.find((item) => item.mal_id === mal_id));
      return uniqueData;
    });
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
          Top Manga
        </h2>
        <div className="absolute bottom-0 left-0 right-0 w-24 mx-auto h-1 bg-red-600"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 px-10">
        {mangaData.map((item, index) => (
          <div
            key={item.mal_id}
            className="relative flex flex-col justify-between items-center"
            ref={index === mangaData.length - 1 ? lastMangaElementRef : null}
          >
            <Link href={`top_manga/${item.mal_id.toString()}`}>
              <Image
                width={300}
                height={300}
                src={item.images.jpg.large_image_url}
                className="rounded-xl aspect-portrait w-full"
                alt={item.title}
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
        className="fixed bottom-4 right-4 bg-red-600 hover:bg-red-700 transition-all duration-300 ease-in-out text-white px-4 py-4 rounded-full"
      >
        <FaArrowUp />
      </button>
    </main>
  );
}
