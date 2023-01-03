// next
import { useRouter } from "next/router";
// components
import SearchComponent from "../components/SearchComponent";
import Booksec from "../components/Booksec";
import Header from "../components/Header";
// fuse.js
import Fuse from "fuse.js";
// data
import { data as booksData } from "../data/booksData";

const Search = () => {
  console.log(booksData);
  const modifiedData = [];
  const router = useRouter();
  const query = router.query.q;

  const fuse = new Fuse(booksData, {
    keys: ["title", "acf.author.title", "acf.author.name", "tags.nodes.name"],
    includeScore: true,
  });

  const fuseData = fuse.search(query || "");
  fuseData.forEach((data) => modifiedData.push(booksData[data.refIndex]));

  // console.log(modifiedData);

  return (
    <>
      <div>
        <Header />
        <SearchComponent />
        <Booksec data={modifiedData} />
        {/* conditions */}
        {!query && (
          <h1 className="text-xl text-center">Please search something!</h1>
        )}
        {query && modifiedData.length == 0 ? (
          <h1 className="text-xl text-center">No Matching Result!</h1>
        ) : null}
      </div>
    </>
  );
};

export default Search;
