import Image from "next/image";
import Link from "next/link";
import { FaStar, FaHeart } from "react-icons/fa";

async function page({ params }) {
  const response = await fetch(
    `https://api.jikan.moe/v4/manga/${params.mangaid}/full`
  );
    const mangaData = await response.json();

    const newsRes = await fetch(
    `https://api.jikan.moe/v4/manga/${params.mangaid}/news`
  );
    const mangaNewsData = await newsRes.json();

  return (
    <div className="container mx-auto my-10">
      <div className="flex  rounded-lg flex-col md:flex-row justify-between items-center  my-14 gap-8">
        <Link
          href={mangaData.data.url}
          className="relative w-1/2 max-w-96 rounded-lg"
        >
          <Image
            alt={mangaData.data.title}
            width={150}
            height={300}
            src={mangaData.data.images.jpg.large_image_url}
            className="w-full rounded-lg"
          />
        </Link>

        <div className="flex flex-col w-2/3 gap-5">
          <div className="bg-red-600 px-3 py-0.5 rounded-lg w-max">
            {mangaData.data.type}
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">{mangaData.data.title}</h2>
            <div className="flex justify-between items-center gap-2">
              {mangaData.data.score}
              <FaStar className="text-amber-500 text-xl" />
            </div>
          </div>
          <div className="opacity-70 text-sm font-light">
            {mangaData.data.synopsis}
          </div>
          <div>
            popularity:{" "}
            <span className="font-bold text-red-600">
              {mangaData.data.popularity}
            </span>
          </div>
          <div>
            members:{" "}
            <span className="font-bold text-red-600">
              {mangaData.data.members}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              status:{" "}
              <span className="font-bold text-red-600">
                {mangaData.data.status}
              </span>
            </div>
            <div className="flex justify-between items-center gap-2">
              {mangaData.data.favorites}
              <FaHeart className="text-red-600 text-xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-max mx-auto">
        <h2 className="text-center text-2xl  text-white w-max px-5 py-2 mx-auto font-bold  my-10">
          News
        </h2>
        <div className="absolute bottom-0 left-0 right-0 w-10 mx-auto h-1 bg-red-600"></div>
      </div>
      {/* News section */}
      <div className="w-full flex justify-center items-center mx-auto rounded-lg ">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 px-10">
          {mangaNewsData.data.map((newsItem) => (
            <div className="flex flex-col gap-5">
              {newsItem.images.jpg.image_url && <Image
                width={300}
                height={300}
                src={newsItem.images.jpg.image_url}
                className="rounded-lg"
              />}
              
              <h2>{newsItem.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
