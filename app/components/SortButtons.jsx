import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";

export default function SortButtons({
  sort,
  setSort,
  sortOrderDescDate,
  setSortOrderDescDate,
  sortOrderDescTitle,
  setSortOrderDescTitle,
  sortOrderDescFavorite,
  setSortOrderDescFavorite,
}) {
  const activeSortClass = "text-white font-semibold py-2 px-4 bg-blue-500";
  const sortClass = "text-gray-800 font-semibold py-2 px-4";

  return (
    <div className="flex flex-col lg:flex-row bg-gray-200 rounded">
      <button
        className={sort === "title" ? activeSortClass : sortClass}
        onClick={() => {
          setSort("title");
          setSortOrderDescTitle(!sortOrderDescTitle);
        }}
      >
        <div className="flex flex-row gap-x-2 items-center">
          Title
          {sort === "title" ? sortOrderDescTitle ? <BsArrowDownShort /> : <BsArrowUpShort /> : null}
        </div>
      </button>
      <button
        className={sort === "date" ? activeSortClass : sortClass}
        onClick={() => {
          setSort("date");
          setSortOrderDescDate(!sortOrderDescDate);
        }}
      >
        <div className="flex flex-row gap-x-2 items-center">
          Date
          {sort === "date" ? sortOrderDescDate ? <BsArrowDownShort /> : <BsArrowUpShort /> : null}
        </div>
      </button>
      <button
        className={sort === "favorite" ? activeSortClass : sortClass}
        onClick={() => {
          setSort("favorite");
          setSortOrderDescFavorite(!sortOrderDescFavorite);
        }}
      >
        <div className="flex flex-row gap-x-2 items-center">
          Favorite
          {sort === "favorite" ? sortOrderDescFavorite ? <BsArrowDownShort /> : <BsArrowUpShort /> : null}
        </div>
      </button>
    </div>
  );
}
