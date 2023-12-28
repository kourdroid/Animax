
function search() {
  return (
    <div className="relative w-2/3 mx-auto flex ">
        <button className="absolute z-10 right-0 top-0 bottom-0 px-4 cursor-pointer bg-gradient-to-tr from-red-600 to-red-800 rounded-full m-1.5 w-max">
            Submit
        </button>
      <input
        type="text"
        placeholder="Naruto Shippudden"
        className="h-12 w-full text-sm md:text-lg text-center text-white  bg-black bg-opacity-50 rounded-full outline-none border border-white border-opacity-10"
      />
    </div>
  );
}

export default search;
