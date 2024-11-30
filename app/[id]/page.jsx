import News from '@/components/pages/News'
import Link from "next/link";
import { FaStar, FaHeart, FaSadTear, FaPlay, FaInfoCircle, FaCalendar, FaClock, FaUsers, FaYoutube, FaThumbsUp } from "react-icons/fa";

async function page({ params }) {
  // fetching data of anime Info
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${params.id}/full`
    );
    const animeData = await response.json();

  // Fetching Data of Characters
    const charRes = await fetch(
      `https://api.jikan.moe/v4/anime/${params.id}/characters`
    );
    const charData = await charRes.json();

  // Fetching Recommendations
    const recoRes = await fetch(
      `https://api.jikan.moe/v4/anime/${params.id}/recommendations`
    );
    const recoData = await recoRes.json();

  return (
    <div className="container relative z-10 mx-auto my-10 px-4">
      <div className="flex rounded-lg flex-col md:flex-row justify-between items-start my-14 gap-8">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <Link
            href={animeData.data.url}
            className="relative block rounded-lg overflow-hidden group"
          >
            <img
              alt={animeData.data.title}
              src={animeData.data.images.jpg.large_image_url}
              className="w-full rounded-lg transform transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <FaInfoCircle className="text-white text-3xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" />
            </div>
          </Link>
          
          {/* Quick Stats */}
          <div className="mt-4 bg-[#ffffff08] rounded-lg p-4 space-y-3 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="opacity-70">Status</span>
              <span className={`px-2 py-1 rounded ${animeData.data.status === "Currently Airing" ? "bg-green-500" : "bg-red-500"} transition-colors duration-300`}>
                {animeData.data.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-70">Score</span>
              <div className="flex items-center gap-2">
                <FaStar className="text-amber-500" />
                <span>{animeData.data.score || "N/A"}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-70">Ranked</span>
              <span>#{animeData.data.rank || "N/A"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-70">Popularity</span>
              <span>#{animeData.data.popularity || "N/A"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-70">Members</span>
              <span>{animeData.data.members?.toLocaleString() || "N/A"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-70">Favorites</span>
              <span>{animeData.data.favorites?.toLocaleString() || "N/A"}</span>
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-4 bg-[#ffffff08] rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-lg mb-3">Statistics</h3>
            <div className="space-y-2">
              {animeData.data.statistics?.status && Object.entries(animeData.data.statistics.status).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="opacity-70 capitalize">{key.replace('_', ' ')}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-2/3 lg:w-3/4 gap-5">
          <div className="flex flex-wrap gap-2">
            <div className="bg-red-600 px-3 py-0.5 rounded-lg">{animeData.data.type}</div>
            {animeData.data.genres.map((genre) => (
              <span key={genre.mal_id} className="bg-[#ffffff17] px-3 py-0.5 rounded-lg hover:bg-[#ffffff25] transition-colors duration-300 cursor-pointer">
                {genre.name}
              </span>
            ))}
          </div>
          
          <h2 className="text-3xl font-bold">{animeData.data.title}</h2>
          {animeData.data.title_english && animeData.data.title_english !== animeData.data.title && (
            <h3 className="text-xl opacity-70">{animeData.data.title_english}</h3>
          )}
          
          <p className="opacity-70 text-sm font-light leading-relaxed">
            {animeData.data.synopsis}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <FaPlay className="text-red-600" />
              <span className="opacity-70">Episodes:</span>
              <span className="font-semibold">{animeData.data.episodes || "?"}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-red-600" />
              <span className="opacity-70">Duration:</span>
              <span className="font-semibold">{animeData.data.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendar className="text-red-600" />
              <span className="opacity-70">Aired:</span>
              <span className="font-semibold">{animeData.data.aired.string}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaInfoCircle className="text-red-600" />
              <span className="opacity-70">Source:</span>
              <span className="font-semibold">{animeData.data.source}</span>
            </div>
          </div>

          {/* Trailer Section */}
          {animeData.data.trailer?.embed_url && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <FaYoutube className="text-red-600" />
                Trailer
              </h3>
              <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
                <iframe
                  src={animeData.data.trailer.embed_url}
                  className="absolute top-0 left-0 w-full h-full"
                  allowFullScreen
                  title={`${animeData.data.title} Trailer`}
                ></iframe>
              </div>
            </div>
          )}

          {/* Characters Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Characters</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {charData.data.slice(0, 8).map((char) => (
                <div key={char.character.mal_id} className="bg-[#ffffff08] rounded-lg p-2 hover:bg-[#ffffff15] transition-all duration-300">
                  <img
                    src={char.character.images.jpg.image_url}
                    alt={char.character.name}
                    className="w-full h-40 object-cover rounded-lg mb-2"
                  />
                  <div className="text-center">
                    <p className="font-medium truncate">{char.character.name}</p>
                    <p className="text-sm opacity-70 truncate">{char.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations Section */}
          {recoData?.data && recoData.data.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">You Might Also Like</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {recoData.data.slice(0, 4).map((reco) => (
                  <Link href={`/${reco.entry.mal_id}`} key={reco.entry.mal_id}>
                    <div className="bg-[#ffffff08] rounded-lg overflow-hidden group hover:bg-[#ffffff15] transition-all duration-300">
                      <div className="relative">
                        <img
                          src={reco.entry.images.jpg.large_image_url}
                          alt={reco.entry.title}
                          className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                          <p className="text-sm font-medium truncate">{reco.entry.title}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
