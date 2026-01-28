import { memo, forwardRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaStar, FaPlay, FaCalendar } from "react-icons/fa";
import { motion } from "framer-motion";

const AnimeCard = forwardRef(({ anime, isActiveTrailer, onToggleTrailer, variants }, ref) => {
  return (
    <motion.div
      variants={variants}
      ref={ref}
      className="bg-gradient-to-b from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
    >
      <div className="relative">
        <div className="relative aspect-video overflow-hidden">
          {isActiveTrailer && anime.trailer_url ? (
            <iframe
              src={anime.trailer_url}
              className="w-full h-full"
              allowFullScreen
              title={`${anime.title} Trailer`}
            />
          ) : (
            <Image
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>

          {anime.trailer_url && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onToggleTrailer(anime.mal_id);
              }}
              className="absolute inset-0 flex items-center justify-center"
              aria-label={isActiveTrailer ? "Close trailer" : "Play trailer"}
            >
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <FaPlay className={`${isActiveTrailer ? 'hidden' : ''} text-white text-xl`} />
              </div>
            </button>
          )}
        </div>

        <Link href={`/${anime.mal_id}`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <FaStar className="text-yellow-400 w-5 h-5" />
                <span className="text-lg font-semibold">{anime.score || 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCalendar className="text-gray-400 w-4 h-4" />
                <span className="text-sm text-gray-400">{new Date(anime.aired.from).getFullYear()}</span>
              </div>
            </div>

            <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">
              {anime.title}
            </h3>

            <div className="flex flex-wrap gap-2 mb-4">
              {anime.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre.mal_id}
                  className="text-xs px-3 py-1 bg-gray-800 text-gray-300 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-400 line-clamp-3">
              {anime.synopsis}
            </p>

            <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
              <span>Episodes: {anime.episodes || 'Ongoing'}</span>
              <span className={`px-2 py-1 rounded-full ${
                anime.status === "Currently Airing"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}>
                {anime.status}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
});

AnimeCard.displayName = "AnimeCard";

export default memo(AnimeCard);
