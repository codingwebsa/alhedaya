import Book from "./Book";

const Booksec = ({ title, data }) => {
  // console.log(data);
  return (
    <div className="flex flex-col">
      {title ? (
        <h2 className="text-2xl font-bold leading-10 pl-4 py-2">{title}</h2>
      ) : null}
      <div className="grid grid-cols-2 justify-center gap-x-4 gap-y-6 pb-7 px-4">
        {data?.map((book, i) => (
          <Book data={book} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Booksec;
