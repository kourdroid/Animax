import Image from "next/image";
import { FaSadTear } from "react-icons/fa";

export default async function page() {
  const getRatingContent = (rating) => {
    return rating == null ? "Not yet Rated" : rating;
  };

  const res = await fetch("https://api.jikan.moe/v4/seasons/upcoming");
  const updata = await res.json();
  return (
    <div className="container mx-auto my-10">
      <div className="grid grid-cols-1 ">
        {updata.data.map((item) => (
          <div
            key={item.mal_id}
            className="relative flex flex-col md:flex-row items-start justify-between gap-10 py-10"
          >
            <div className="absolute inset-0 bg-white h-0.5 opacity-10"></div>
            <div className="w-full md:w-1/2 mx-auto md:max-w-1/3 ">
            <Image
              className="object-cover w-full aspect-square md:aspect-portrait rounded-lg"
              src={item.images.webp.large_image_url}
              alt=""
              width={300}
              height={300}
            />

            </div>
            <div className="w-full flex-col space-y-2">
              <div className="bg-red-600 w-max px-2 py-0.5 rounded">
                {item.type}
              </div>
              <h2 className=" font-bold text-2xl">{item.title}</h2>
              <p className="text-sm opacity-70">{item.synopsis}</p>
              <div className="flex flex-wrap gap-2">
                <div className="bg-white bg-opacity-10 rounded w-max px-2 py-0.5">
                  Source:{" "}
                  <span className="font-semibold text-red-600">
                    {item.source}
                  </span>
                </div>
                <div className="bg-white bg-opacity-10 rounded w-max px-2 py-0.5">
                  Status:{" "}
                  <span className="font-semibold text-red-600">
                    {item.status}
                  </span>
                </div>
                <div className="bg-white bg-opacity-10 rounded w-max px-2 py-0.5">
                  Rating:{" "}
                  <span className="font-semibold text-red-600">
                    {getRatingContent(item.rating)}
                  </span>
                </div>

                <div className="bg-white bg-opacity-10 rounded w-max px-2 py-0.5">
                  Popularity:{" "}
                  <span className="font-semibold text-red-600">
                    {item.popularity}
                  </span>
                </div>
              </div>
              {/* trailer */}
              <div className="my-2 aspect-video w-full">
                {item.trailer.embed_url == null ? (
                  <div className="w-full aspect-video bg-white bg-opacity-10  rounded-lg flex justify-center items-center text-xl">
                    <div className="flex flex-col justify-center items-center gap-5">
                      <FaSadTear className="text-6xl " />
                      <div>there is noe trailer yet</div>
                    </div>
                  </div>
                ) : (
                  <iframe
                    className="rounded-lg w-full md:max-w-1/2 aspect-video"
                    src={`${item.trailer.embed_url}?rel=0`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
