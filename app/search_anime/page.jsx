'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${query}&sfw=${true}&sort=desc&orderby=score&start_date=2005-01-01`
      );
      console.log(response);
      setResults(response.data.data || []); // Adjust based on the actual structure
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (query.trim() !== "") {
      handleSubmit();
    }
  }, [query]);

  return (
    <div className="my-12">
      <div className="relative w-2/3 mx-auto flex">

        <input
          type="text"
          placeholder="Naruto Shippuden"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 w-full text-sm md:text-lg text-center text-white bg-black bg-opacity-50 rounded-full outline-none border border-white border-opacity-10"
        />
      </div>
      <div className="my-10 px-10">
        {results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {results.map((result) => (
              <Link
                href={result.mal_id.toString()}
                key={result.mal_id}
                className="relative flex flex-col justify-between items-center"
              >
                <img
                  src={result.images.webp.large_image_url}
                  alt={result.title}
                  className="aspect-portrait w-full rounded-xl object-cover"
                />
                <p className="text-center">{result.title}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
