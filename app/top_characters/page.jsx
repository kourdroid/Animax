"use client";
import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [animeData, setAnimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [fetchedAnimeIds, setFetchedAnimeIds] = useState(new Set());




const fetchData = useCallback(async () => {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/top/characters?page=${page}`
    );
    const responseData = await response.json();

    const uniqueAnimeData = responseData.data.filter(
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
  } finally {
    setIsLoading(false);
  }
}, [page, fetchedAnimeIds]);

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
            <Link
              className="relative overflow-hidden w-full rounded-lg aspect-portrait"
              href={`top_characters/${item.mal_id.toString()}`}
            >
              <div className="absolute inset-0  transition-all duration-300 ease-out hover:block z-0 bg-black flex flex-col justify-start items-center px-5 py-8 gap-3">
                <h3 className="text-xl font-bold text-center">{item.name}</h3>
                <h4 className="text-xl font-bold text-center">
                  {item.name_kanji}
                </h4>
                <p className="text-sm overflow-hidden max-h-full line-clamp-3 md:line-clamp-4">
                  {item.about}
                </p>
              </div>
              <Image
              width={300}
              height={300}
                src={item.images.jpg.image_url}
                alt={item.title}
                className="absolute inset-0 opacity-100 hover:opacity-20 rounded-lg aspect-portrait h-full w-full hover:scale-125 hover:rotate-6 z-10 transition-all duration-300 ease-in-out"
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
