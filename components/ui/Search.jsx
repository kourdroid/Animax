"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${query}`
      );
      setResults(response.data.data || []);
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
    <div>
      <div>
        {results.length > 0 && (
          <div className="mt-4">
            <h2 className="text-white text-lg font-semibold">
              Search Results:
            </h2>
            <ul className="text-white">
              {results.map((result) => (
                <li key={result.id}>
                  <p className="text-white">{result.title}</p>
                  <img
                    src={result.image_url}
                    alt={result.title}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {/* Add more details if needed */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
