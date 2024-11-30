import Link from "next/link";
import { FaStar } from "react-icons/fa";

async function page({ params }) {
  const response = await fetch(
    `https://api.jikan.moe/v4/manga/${params.mangaid}/full`
  );
  const mangaData = await response.json();

  return (
    <div className="container mx-auto my-10">
      <div className="flex  rounded-lg flex-col md:flex-row justify-between items-center  my-14 gap-8">
        <Link
          href={mangaData.data.url}
          className="relative w-1/2 max-w-96 rounded-lg"
        >
          <img
            alt={mangaData.data.title}
            width={150}
            height={300}
            src={mangaData.data.images.jpg.large_image_url}
            className="w-full aspect-portrait rounded-xl"
          />
        </Link>

        <div className="flex flex-col w-2/3 gap-5">
          <div className="bg-red-600 px-3 py-0.5 rounded-lg w-max">
            {mangaData.data.type}
          </div>
          <div className="text-4xl font-bold">
            <h2>{mangaData.data.title}</h2>
            <h2>{mangaData.data.title_japanese}</h2>
          </div>
          <div className="flex gap-2 opacity-70">
            {mangaData.data.authors.map((author) => (
              <h3 key={author.mal_id}>{author.name + ","}</h3>
            ))}
          </div>
          <div className="opacity-70 text-sm font-light">
            {mangaData.data.synopsis}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex text-xl font-bold justify-between items-center gap-2">
              <FaStar className="text-yellow-500 text-2xl" />
              {mangaData.data.score}
            </div>
            <div className="flex gap-2 text-sm">
              <div className="bg-red-600 px-3 py-0.5 rounded-lg">
                {mangaData.data.status}
              </div>
              <div className="bg-red-600 px-3 py-0.5 rounded-lg">
                {mangaData.data.chapters} chapters
              </div>
              <div className="bg-red-600 px-3 py-0.5 rounded-lg">
                {mangaData.data.volumes} volumes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Genres Section */}
      <div className="relative w-max mx-auto">
        <h2 className="text-center text-2xl text-white w-max px-5 py-2 mx-auto font-bold my-10">
          Genres
        </h2>
        <div className="absolute bottom-0 left-0 right-0 w-1/2 mx-auto h-1 bg-red-600"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {mangaData.data.genres.map((genre) => (
          <div
            key={genre.mal_id}
            className="bg-red-600 px-4 py-1 rounded-lg text-white"
          >
            {genre.name}
          </div>
        ))}
      </div>

      {/* Recommendations Section */}
      <div className="relative w-max mx-auto">
        <h2 className="text-center text-2xl text-white w-max px-5 py-2 mx-auto font-bold my-10">
          Related Manga
        </h2>
        <div className="absolute bottom-0 left-0 right-0 w-1/2 mx-auto h-1 bg-red-600"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 content-center lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {mangaData.data.relations
          .filter((relation) => relation.type === "Adaptation" || relation.type === "Side story" || relation.type === "Spin-off")
          .map((relation) =>
            relation.entry.map((entry) => (
              <Link
                key={entry.mal_id}
                className="relative overflow-hidden w-full rounded-lg aspect-portrait"
                href={entry.type === "manga" ? `/manga/${entry.mal_id}` : `/${entry.mal_id}`}
              >
                <div className="absolute inset-0 transition-all duration-300 ease-out hover:block z-0 bg-black flex flex-col justify-start items-center px-5 py-8 gap-5">
                  <h3 className="text-xl font-bold text-center">{entry.name}</h3>
                  <p className="text-lg font-bold text-red-600">{relation.type}</p>
                </div>
              </Link>
            ))
          )}
      </div>
    </div>
  );
}

export default page;
