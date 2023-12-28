import Image from "next/image";
import Link from "next/link";
import { FaStar, FaHeart } from "react-icons/fa";

async function page({ params }) {
  const response = await fetch(
    `https://api.jikan.moe/v4/characters/${params.id}/full`
  );
  const charData = await response.json();
  const picres = await fetch(
    `https://api.jikan.moe/v4/characters/${params.id}/pictures`
  );
  const picImages = await picres.json();

  return (
    <div className="container mx-auto my-10">
      <div className="flex  rounded-lg flex-col md:flex-row justify-between items-center  my-14 gap-8">
        <Link
          href={charData.data.url}
          className="relative w-1/2 max-w-96 rounded-lg"
        >
          <Image
            alt={charData.data.name}
            width={150}
            height={300}
            src={charData.data.images.webp.image_url}
            className="w-full rounded-lg"
          />
        </Link>

        <div className="flex flex-col w-2/3 gap-5">
          <div className="bg-red-600 px-3 py-0.5 rounded-lg w-max">
            {charData.data.anime[0].anime.title}
          </div>
          <div className="flex flex-col gap-2 justify-start items-start">
            <h2 className="text-3xl font-bold">{`${charData.data.name}`}</h2>
            <h2 className="text-3xl font-bold"> {charData.data.name_kanji}</h2>
          </div>
          <div className="opacity-70 text-sm font-light">
            {charData.data.about}
          </div>
          <div>
            Role:{" "}
            <span className="font-bold text-red-600">
              {charData.data.anime[0].role}
            </span>
          </div>
          <div>
            Episodes:{" "}
            <span className="font-bold text-red-600">
              {charData.data.episodes}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              year:{" "}
              <span className="font-bold text-red-600">
                {charData.data.year}
              </span>
            </div>
            <div className="flex justify-between items-center gap-2">
              {charData.data.favorites}
              <FaHeart className="text-red-600 text-xl" />
            </div>
          </div>
        </div>
      </div>
      {/* Character Images */}
      <div className="relative w-max mx-auto">
        <h2 className="text-center text-2xl  text-white w-max px-5 py-2 mx-auto font-bold  my-10">
          {`${charData.data.name} Images`}
        </h2>
        <div className="absolute bottom-0 left-0 right-0 w-10 mx-auto h-1 bg-red-600"></div>
      </div>
      <div className="flex justify-between items-center gap-2 flex-wrap">
        {picImages.data.map((item) => (
          <img
            key={item.jpg}
            className="max-w-40 rounded-lg"
            src={item.jpg.image_url}
          />
        ))}
      </div>
      {/* --------------------------- */}
      <div className="relative w-max mx-auto">
        <h2 className="text-center text-2xl  text-white w-max px-5 py-2 mx-auto font-bold  my-10">
          Anime
        </h2>
        <div className="absolute bottom-0 left-0 right-0 w-10 mx-auto h-1 bg-red-600"></div>
      </div>
      {/* trailer */}
      <div className="grid grid-cols-3 gap-10 rounded-lg">
        {charData.data.anime.map((item, index) => (
          <div className="space-y-5">
            <Link href={`/${item.anime.mal_id.toString()}`}>
              <img
                src={item.anime.images.jpg.large_image_url}
                alt={`Image ${index}`}
                className="rounded-lg aspect-[11/16] mx-auto w-full"
              />
            </Link>
            <h2 className="text-center font-semibold">{item.anime.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
