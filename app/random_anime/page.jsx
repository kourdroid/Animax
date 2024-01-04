'use client'

import News from "@/components/pages/News";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaStar, FaHeart, FaSadTear } from "react-icons/fa";



async function refreshAnime() {
  const res = await fetch("https://api.jikan.moe/v4/random/anime");
  const ranAnimeData = await res.json();

  // Update the state with the new anime data
  setRanAnimeData(ranAnimeData);
}

function page() {
    const [ranAnimeData, setRanAnimeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchAnime() {
        const res = await fetch("https://api.jikan.moe/v4/random/anime");
        const ranAnimeData = await res.json();
        setLoading(false);
        setRanAnimeData(ranAnimeData);
      }

      fetchAnime();
    }, [ranAnimeData]);

    return (
      <div>
        {loading ? (
          <div> Loading...</div>
        ) : (
          <div className="container relative z-10 mx-auto my-10">
            <button onClick={refreshAnime} className="btn btn-primary">
              Refresh
            </button>
            <div className="flex  rounded-lg flex-col md:flex-row justify-between items-center  my-14 gap-8">
              <Link
                href={ranAnimeData.data.url}
                className="relative w-1/2 max-w-96 rounded-lg"
              >
                <Image
                  alt={ranAnimeData.data.title}
                  width={150}
                  height={300}
                  src={ranAnimeData.data.images.jpg.large_image_url}
                  className="w-full rounded-lg"
                />
              </Link>

              <div className="flex flex-col w-2/3 gap-5">
                <div className="bg-red-600 px-3 py-0.5 rounded-lg w-max">
                  {ranAnimeData.data.type}
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold">
                    {ranAnimeData.data.title}
                  </h2>
                  <div className="flex justify-between items-center gap-2">
                    {ranAnimeData.data.score}
                    <FaStar className="text-amber-500 text-xl" />
                  </div>
                </div>
                <div className="opacity-70 text-sm font-light">
                  {ranAnimeData.data.synopsis}
                </div>
                <div>
                  source:{" "}
                  <span className="font-bold text-red-600">
                    {ranAnimeData.data.source}
                  </span>
                </div>
                <div>
                  Episodes:{" "}
                  <span className="font-bold text-red-600">
                    {ranAnimeData.data.episodes}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    year:{" "}
                    <span className="font-bold text-red-600">
                      {ranAnimeData.data.year}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    {ranAnimeData.data.favorites}
                    <FaHeart className="text-red-600 text-xl" />
                  </div>
                </div>
              </div>
            </div>
            {/* Trailer Section */}

            <div className="relative w-max mx-auto">
              <h2 className="text-center text-2xl  text-white w-max px-5 py-2 mx-auto font-bold  my-10">
                Trailer
              </h2>
              <div className="absolute bottom-0 left-0 right-0 w-1/2 mx-auto h-1 bg-red-600"></div>
            </div>
            {/* trailer */}
            <div className="w-full flex justify-center items-center mx-auto rounded-lg">
              {ranAnimeData.data.trailer.embed_url == null ? (
                <div className="w-full aspect-video bg-gradient-to-tr from-[#ffffff17] to-[#ffffff08]  rounded-lg flex justify-center items-center text-xl">
                  <div className="flex flex-col justify-center items-center gap-5">
                    <FaSadTear className="text-6xl " />
                    <div className="text-3xl font-bold">
                      There is no Trailer
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video w-full">
                  <iframe
                    width="560"
                    height="315"
                    src={`${ranAnimeData.data.trailer.embed_url}?rel=0`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; "
                    allowfullscreen
                    className="w-full h-full aspect-video rounded-lg"
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        )}
        ;
      </div>
    );
}

export default page;
