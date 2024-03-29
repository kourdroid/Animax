import News from '@/components/pages/News'
import Link from "next/link";
import { FaStar, FaHeart, FaSadTear } from "react-icons/fa";


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

  return (
    <div className="container relative z-10 mx-auto my-10">
      <div className="flex  rounded-lg flex-col md:flex-row justify-between items-center  my-14 gap-8">
        <Link
          href={animeData.data.url}
          className="relative w-1/2 max-w-96 rounded-lg"
        >
          <img
            alt={animeData.data.title}
            width={150}
            height={300}
            src={animeData.data.images.jpg.large_image_url}
            className="w-full rounded-lg"
          />
        </Link>

        <div className="flex flex-col w-2/3 gap-5">
          <div className="bg-red-600 px-3 py-0.5 rounded-lg w-max">
            {animeData.data.type}
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">{animeData.data.title}</h2>
            <div className="flex justify-between items-center gap-2">
              {animeData.data.score}
              <FaStar className="text-amber-500 text-xl" />
            </div>
          </div>
          <div className="opacity-70 text-sm font-light">
            {animeData.data.synopsis}
          </div>
          <div>
            source:{" "}
            <span className="font-bold text-red-600">
              {animeData.data.source}
            </span>
          </div>
          <div>
            Episodes:{" "}
            <span className="font-bold text-red-600">
              {animeData.data.episodes}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              year:{" "}
              <span className="font-bold text-red-600">
                {animeData.data.year}
              </span>
            </div>
            <div className="flex justify-between items-center gap-2">
              {animeData.data.favorites}
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
        {animeData.data.trailer.embed_url == null ? (
          <div className="w-full aspect-video bg-gradient-to-tr from-[#ffffff17] to-[#ffffff08] rounded-lg flex justify-center items-center text-xl">
            <div className="flex flex-col justify-center items-center gap-5">
              <FaSadTear className="text-6xl " />
              <div className="text-3xl font-bold">There is no Trailer</div>
            </div>
          </div>
        ) : (
          <div className="aspect-video w-full">
            <iframe
              width="560"
              height="315"
              src={`${animeData.data.trailer.embed_url}?rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; "
              allowFullScreen
              className="w-full h-full aspect-video rounded-lg"
            ></iframe>
          </div>
        )}
      </div>
      {/* Anime News Section */}
      <News params={params} />
      {/* Main char Section */}
      <div className="relative w-max mx-auto">
        <h2 className="text-center text-2xl  text-white w-max px-5 py-2 mx-auto font-bold  my-10">
          Main Characters
        </h2>
        <div className="absolute bottom-0 left-0 right-0 w-1/2 mx-auto h-1 bg-red-600"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 content-center lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {charData.data.map((item) => (
          <Link
            key={item.mal_id}
            className="relative overflow-hidden w-full rounded-lg aspect-portrait"
            href={`${params.id}/${item.character.mal_id.toString()}`}
          >
            <div className="absolute inset-0  transition-all duration-300 ease-out hover:block z-0 bg-black flex flex-col justify-center items-center px-5 py-8 gap-2">
              <h3 className="text-2xl font-bold text-center">
                {item.character.name}
              </h3>
              <p className="text-lg font-bold text-red-600 overflow-hidden max-h-60 line-clamp-3 md:line-clamp-6">
                {item.role}
              </p>
              <div className="flex justify-between items-center gap-2 text-xl">
                <FaHeart className="text-xl text-red-600" />
                <p>{item.favorites}</p>
              </div>
            </div>
            <img
              src={item.character.images.jpg.image_url}
              className="absolute object-fill inset-0 opacity-100 hover:opacity-5 rounded-lg aspect-portrait h-full w-full hover:scale-125 hover:rotate-6 z-10 transition-all duration-300 ease-in-out "
              alt={item.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default page;
