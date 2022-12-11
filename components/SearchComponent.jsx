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
          <input
            type="text"
            className="border border-slate-500 outline-baseGreen hover:border-baseGreen w-full py-3 rounded-full pl-4 pr-14"
            placeholder="Search আল-হেদায়া"
            ref={inpRef}
          />
          <button
            type="submit"
            className="absolute right-0 bg-baseGreen p-3 shadow-lg shadow-[#00c9a763] text-light rounded-full cursor-pointer active:scale-[.95]"
            onClick={handleSearch}
          >
            <CgSearch size={30} />
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchComponent;
