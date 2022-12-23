// icons
import { useRouter } from "next/router";
import { useRef } from "react";
import { CgSearch } from "react-icons/cg";

const SearchComponent = () => {
  const router = useRouter();
  const inpRef = useRef();

  function handleSearch(e) {
    e.preventDefault();
    if (!inpRef.current.value) {
      router.push("/search");
      return;
    }
    router.push(`/search?q=${inpRef.current.value}`);
  }
  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="relative flex my-4 mx-4 items-center">
          <form className="relative mx-auto flex w-full max-w-2xl items-center justify-between rounded-md border shadow-lg">
            <svg
              className="absolute left-2 block h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" className=""></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
            </svg>
            <input
              type="name"
              name="search"
              className="h-14 w-full rounded-md py-4 pr-40 pl-12 outline-none focus:ring-2"
              placeholder="City, Address, Zip :"
            />
            <button
              type="submit"
              className="absolute right-0 mr-1 inline-flex h-12 items-center justify-center rounded-lg bg-gray-900 px-10 font-medium text-white focus:ring-4 hover:bg-gray-700"
            >
              Search
            </button>
          </form>
        </div>
      </form>
    </>
  );
};

export default SearchComponent;
