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
    <div className="container mx-auto my-10">
      <div className="relative w-max mx-auto">
        <h2 className="text-center text-2xl text-white w-max px-5 py-2 mx-auto font-bold my-10">
          Upcoming Anime
        </h2>
        <div className="absolute bottom-0 left-0 right-0 w-1/2 mx-auto h-1 bg-red-600"></div>
      </div>
      <div className="grid grid-cols-1 ">
        {animeData.map((item, index) => (
          <div
            key={item.mal_id}
            className="relative flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-white border-opacity-10"
            ref={index === animeData.length - 1 ? lastAnimeElementRef : null}
          >
            <div className="w-full md:w-1/2 mx-auto md:max-w-1/3 ">
              <img
                className="object-cover w-full aspect-square md:aspect-portrait rounded-lg"
                src={item.images.webp.large_image_url}
                alt=""
                width={300}
                height={300}
              />
            </div>

            <div></div>
            <div className="w-full flex-col space-y-2">
              <div className="bg-red-600 w-max px-2 py-0.5 rounded">
                {item.type}
              </div>
              <h2 className=" font-bold text-2xl">{item.title}</h2>
              <p className="text-sm opacity-70">{item.synopsis}</p>

              <div className="flex flex-wrap gap-2">
                {/* release date */}
                <div>
                  {item.aired.from == null ? (
                    <div className="bg-white bg-opacity-10 rounded w-max px-2 py-0.5">
                      Release Date:{" "}
                      <span className="font-semibold text-red-600">
                        There is no Release Date Yet
                      </span>
                    </div>
                  ) : (
                    <div className="bg-white bg-opacity-10 rounded w-max px-2 py-0.5">
                      Release Date:{" "}
                      <span className="font-semibold text-red-600">
                        {item.aired.prop.from.day} /{" "}
                        {item.aired.prop.from.month} /{" "}
                        {item.aired.prop.from.year}
                      </span>
                    </div>
                  )}
                </div>
                {/* end of release date */}
                {/* genres */}
                <div className="bg-white bg-opacity-10 rounded w-max px-2 py-0.5">
                  Genres:{" "}
                  <span className="font-semibold text-red-600">
                    {item.genres.map((item) => item.name).join(", ")}
                  </span>
                </div>
                {/* end of genres */}
                <div className="bg-white bg-opacity-10 rounded w-max px-2 py-0.5">
                  Source:{" "}
                  <span className="font-semibold text-red-600">
                    {item.source}
                  </span>
                </div>
                <div className="bg-white bg-opacity-10 rounded w-max px-2 py-0.5">
                  Status:{" "}
                  <span className="font-semibold text-red-600">
                    {item.status}
                  </span>
                </div>
                <div className="bg-white bg-opacity-10 rounded w-max px-2 py-0.5">
                  Studio:{" "}
                  {item.studios.length == 0 ? (
                    <span className="font-semibold text-red-600">
                      not avaiable
                    </span>
                  ) : (
                    <span className="font-semibold text-red-600">
                      {item.studios.map((item) => item.name)}
                    </span>
                  )}
                </div>

                <div className="bg-white bg-opacity-10 rounded w-max px-2 py-0.5">
                  Rating:{" "}
                  <span className="font-semibold text-red-600">
                    {getRatingContent(item.rating)}
                  </span>
                </div>

                <div className="bg-white bg-opacity-10 rounded w-max px-2 py-0.5">
                  Popularity:{" "}
                  <span className="font-semibold text-red-600">
                    {item.popularity}
                  </span>
                </div>
              </div>
              {/* trailer */}
              <div className="my-2 aspect-video w-full">
                {item.trailer.embed_url == null ? (
                  <div className="w-full aspect-video bg-white bg-opacity-10  rounded-lg flex justify-center items-center text-xl">
                    <div className="flex flex-col justify-center items-center gap-5">
                      <FaSadTear className="text-6xl " />
                      <div>there is noe trailer yet</div>
                    </div>
                  </div>
                ) : (
                  <iframe
                    className="rounded-lg w-full md:max-w-1/2 aspect-video"
                    src={`${item.trailer.embed_url}?rel=0`}
                    title="YouTube video player"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleScrollToTop}
        className="fixed z-50 bottom-4 shadow-2xl right-4 bg-red-600 hover:bg-red-700 transition-all duration-300 ease-in-out text-white px-4 py-4 rounded-full"
      >
        <FaArrowUp />
      </button>
    </div>
  );
}
