type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (currentPage: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      <ul className="flex">
        {pageNumbers.map((page) => (
          <button onClick={() => onPageChange(page)}>
            <li
              key={page}
              className={`px-3 py-2 mx-1 rounded-full cursor-pointer ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {page}
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
