import Link from "next/link";
import Image from "next/image";

async function News({ params }) {
  // fetching data of anime Info
  const response = await fetch(
    `https://api.jikan.moe/v4/anime/${params.id}/full`
  );
  const animeData = await response.json();

  const newRes = await fetch(
    `https://api.jikan.moe/v4/anime/${params.id}/news`
  );
  const newsData = await newRes.json();

  return (
    <div>
      <div className="relative w-max mx-auto">
        <h2 className="text-center text-2xl text-white w-max px-5 py-2 mx-auto font-bold my-10">
          {animeData.title} News
        </h2>
        <div className="absolute bottom-0 left-0 right-0 w-1/2 mx-auto h-1 bg-red-600"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 content-center lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {newsData.data && Array.isArray(newsData.data) ? (
          newsData.data.map((item) => (
            <Link
              key={item.mal_id}
              className="relative overflow-hidden w-full rounded-lg aspect-portrait"
              href={item.mal_id.toString()}
            >
              <div className="absolute inset-0 transition-all duration-300 ease-out hover:block z-0 bg-black flex flex-col justify-start items-center px-5 py-8 gap-5">
                <h3 className="text-xl font-bold text-center">{item.title}</h3>
                <p className="text-sm overflow-hidden max-h-60 line-clamp-3 md:line-clamp-6">
                  {item.excerpt}
                </p>
              </div>
              <Image
                src={item.images?.jpg?.image_url} // Check if images.jpg is defined
                className="absolute inset-0 opacity-100 hover:opacity-20 rounded-lg aspect-portrait h-full w-full hover:scale-125 hover:rotate-6 z-10 transition-all duration-300 ease-in-out"
                alt={item.title}
                layout="fill"
                objectFit="cover"
              />
            </Link>
          ))
        ) : (
          <div className="text-center col-span-10">No news available</div>
        )}
      </div>
    </div>
  );
}

export default News;
