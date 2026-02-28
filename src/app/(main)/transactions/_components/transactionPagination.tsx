"use client";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function TransactionPagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  const pageGroupSize = 10;
  const currentGroup = Math.floor((page - 1) / pageGroupSize);
  const start = currentGroup * pageGroupSize + 1;
  const end = Math.min(start + pageGroupSize - 1, totalPages);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="flex items-center justify-center gap-1 pt-1">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="w-7 h-7 flex items-center justify-center rounded text-xs cursor-pointer text-gray-500 hover:bg-gray-100"
      >
        ←
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-7 h-7 flex items-center justify-center rounded text-xs cursor-pointer ${
            page === p
              ? "text-gray-700 font-bold"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="w-7 h-7 flex items-center justify-center rounded text-xs cursor-pointer text-gray-500 hover:bg-gray-100"
      >
        →
      </button>
    </div>
  );
}
