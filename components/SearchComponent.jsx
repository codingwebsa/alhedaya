// icons
import { CgSearch } from "react-icons/cg";

const SearchComponent = () => {
  return (
    <>
      <div className="relative flex my-4 mx-4 items-center">
        <input
          type="text"
          className="border border-slate-500 outline-baseGreen hover:border-baseGreen w-full py-3 rounded-full pl-4 pr-14"
          placeholder="Search আল-হেদায়া"
        />
        <span className="absolute right-0 bg-baseGreen p-3 shadow-lg shadow-[#00c9a763] text-light rounded-full cursor-pointer active:scale-[.95]">
          <CgSearch size={30} />
        </span>
      </div>
    </>
  );
};

export default SearchComponent;
