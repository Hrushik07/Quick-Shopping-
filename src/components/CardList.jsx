import { useState } from "react";
import useFetchData from "../hooks/useFetchData";
import Card from "./Card";
import Loading from "./Loading";

function CardList() {
  const { items, status, error } = useFetchData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 8;

  const totalPage = Math.ceil(items.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemPerPage);

  if (status === "loading") return <Loading/>;
  if (status === "failed")
    return (
      <div className="flex items-center justify-center h-screen">
        <h4 className="text-lg font-semibold text-red-600">{error}</h4>
      </div>
    );
  //  sm:px-2
  return (
    <div className="mx-auto max-w-full px-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
      {/* displaying cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 py-6">
        {currentItems.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      {/* pagination */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          className={`px-4 py-2 rounded-lg transition ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </button>
        <span className="text-lg font-medium">{`${currentPage} of ${totalPage}`}</span>
        <button
          className={`px-4 py-2 rounded-lg transition ${
            currentPage === totalPage
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={currentPage === totalPage}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CardList;
