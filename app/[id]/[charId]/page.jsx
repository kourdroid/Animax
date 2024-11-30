import Link from "next/link";
import { FaStar, FaHeart } from "react-icons/fa";

async function page({ params }) {
  const response = await fetch(
    `https://api.jikan.moe/v4/characters/${params.charId}/full`
  );
  const charData = await response.json();

  const imgResponse = await fetch(
    `https://api.jikan.moe/v4/characters/${params.charId}/pictures`
  );
  const imgCharData = await imgResponse.json();
  return (
    <div className="container mx-auto my-10">
      <div className="flex  rounded-lg flex-col md:flex-row justify-between items-center  my-14 gap-8">
        <Link
          href={charData.data.url}
          className="relative w-1/2 max-w-96 rounded-lg"
        >
          <img
            alt={charData.data.name}
            width={150}
            height={300}
            src={charData.data.images.jpg.image_url}
            className="w-full aspect-portrait rounded-xl"
          />
        </Link>

        <div className="flex flex-col w-2/3 gap-5">
          {charData.data.anime && charData.data.anime.length > 0 && (
            <div className="bg-red-600 px-3 py-0.5 rounded-lg w-max">
              {charData.data.anime[0].role}
            </div>
          )}
          <div className="text-4xl font-bold">
            <h2>{charData.data.name}</h2>
            <h2>{charData.data.name_kanji}</h2>
          </div>
          {charData.data.nicknames.length == 0 ? null : (
            <div className="text-red-600 font-semibold">Nicknames:</div>
          )}
          <div className="flex gap-2 opacity-70">
            {charData.data.nicknames.map((item) => (
              <h3 className="" key={item}>{item + ","}</h3>
            ))}
          </div>
          <div className="opacity-70 text-sm font-light">
            {charData.data.about}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex text-xl font-bold justify-between items-center gap-2">
              <FaHeart className="text-red-600 text-2xl" />
              {charData.data.favorites}
            </div>
          </div>
        </div>
      </div>
      {/* Anime Section */}
      <div className="relative w-max mx-auto">
        <h2 className="text-center text-2xl  text-white w-max px-5 py-2 mx-auto font-bold  my-10">
          Anime List
        </h2>
        <div className="absolute bottom-0 left-0 right-0 w-1/2 mx-auto h-1 bg-red-600"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 content-center lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {charData.data.anime.map((item) => (
          <Link
            key={item.anime.mal_id}
            className="relative overflow-hidden w-full rounded-lg aspect-portrait"
            href={`/${item.anime.mal_id}`}
          >
            <div className="absolute inset-0  transition-all duration-300 ease-out hover:block z-0 bg-black flex flex-col justify-start items-center px-5 py-8 gap-5">
              <h3 className="text-xl font-bold text-center">
                {item.anime.title}
              </h3>
              <p className="text-lg font-bold text-red-600 overflow-hidden max-h-60 line-clamp-3 md:line-clamp-6">
                {item.role}
              </p>
            </div>
            <img
              key={item.anime.mal_id}
              src={item.anime.images.webp.large_image_url}
              className="absolute object-cover inset-0 opacity-100 hover:opacity-5 rounded-lg aspect-portrait h-full w-full hover:scale-125 hover:rotate-6 z-10 transition-all duration-300 ease-in-out "
              alt={item.title}
            />
          </Link>
        ))}
      </div>

      {/* Manga List */}

      <div className="relative w-max mx-auto">
        <h2 className="text-center text-2xl  text-white w-max px-5 py-2 mx-auto font-bold  my-10">
          Manga List
        </h2>
        <div className="absolute bottom-0 left-0 right-0 w-1/2 mx-auto h-1 bg-red-600"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 content-center lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {charData.data.manga.map((item) => (
          <Link
            key={item.manga.mal_id}
            className="relative overflow-hidden w-full rounded-lg aspect-portrait"
            href={`/manga/${item.manga.mal_id}`}
          >
            <div className="absolute inset-0  transition-all duration-300 ease-out hover:block z-0 bg-black flex flex-col justify-start items-center px-5 py-8 gap-5">
              <h3 className="text-xl font-bold text-center">
                {item.manga.title}
              </h3>
              <p className="text-lg font-bold text-red-600 overflow-hidden max-h-60 line-clamp-3 md:line-clamp-6">
                {item.role}
              </p>
            </div>
            <img
              src={item.manga.images.webp.large_image_url}
              className="absolute inset-0 object-cover opacity-100 hover:opacity-5 rounded-lg aspect-portrait h-full w-full hover:scale-125 hover:rotate-6 z-10 transition-all duration-300 ease-in-out "
              alt={item.title}
            />
          </Link>
        ))}
      </div>
      {/* character Pictures */}
      <div className="relative w-max mx-auto">
        <h2 className="text-center text-2xl  text-white w-max px-5 py-2 mx-auto font-bold  my-10">
          {charData.data.name} Pictures
        </h2>
        <div className="absolute bottom-0 left-0 right-0 w-1/2 mx-auto h-1 bg-red-600"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 content-center lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {imgCharData.data.map((item) => (
          <div
            key={item.jpg.image_url}
            className="relative overflow-hidden w-full rounded-lg aspect-portrait"
          >
            <div className="absolute inset-0  transition-all duration-300 ease-out hover:block z-0 bg-black flex flex-col justify-start items-center px-5 py-8 gap-5">
              <h3 className="text-xl font-bold text-center">
                {charData.data.name}
              </h3>
              <p className="text-lg font-bold text-red-600 overflow-hidden max-h-60 line-clamp-3 md:line-clamp-6">
                {charData.data.anime && charData.data.anime.length > 0 ? charData.data.anime[0].role : ""}
              </p>
            </div>
            <img
              src={item.jpg.image_url}
              className="absolute inset-0 object-cover opacity-100 hover:opacity-5 rounded-lg aspect-portrait h-full w-full hover:scale-125 hover:rotate-6 z-10 transition-all duration-300 ease-in-out "
              alt={charData.data.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
