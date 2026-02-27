"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (current <= 3) {
    pages.push(2, 3, 4, "ellipsis", total);
  } else if (current >= total - 2) {
    pages.push("ellipsis", total - 3, total - 2, total - 1, total);
  } else {
    pages.push("ellipsis", current - 1, current, current + 1, "ellipsis", total);
  }

  return pages;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  const buttonBase =
    "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-90";

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`${buttonBase} h-10 px-3 border border-gray-30 text-gray-120 hover:bg-teal-10 hover:text-teal-120 hover:border-teal-30 disabled:opacity-40 disabled:pointer-events-none`}
      >
        <ChevronLeftIcon className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Mobile compact: "Page X of Y" */}
      <span className="sm:hidden text-sm text-gray-110 px-3">
        Page {currentPage} of {totalPages}
      </span>

      {/* Desktop page numbers */}
      <div className="hidden sm:flex items-center gap-1">
        {pages.map((page, i) =>
          page === "ellipsis" ? (
            <span key={`ellipsis-${i}`} className="w-10 text-center text-gray-80 select-none">
              &hellip;
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              className={`${buttonBase} h-10 w-10 ${
                page === currentPage
                  ? "bg-purple-140 text-white border border-purple-140"
                  : "border border-gray-30 text-gray-120 hover:bg-teal-10 hover:text-teal-120 hover:border-teal-30"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`${buttonBase} h-10 px-3 border border-gray-30 text-gray-120 hover:bg-teal-10 hover:text-teal-120 hover:border-teal-30 disabled:opacity-40 disabled:pointer-events-none`}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRightIcon className="w-4 h-4 ml-1" />
      </button>
    </nav>
  );
}

function ChevronLeftIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
    </svg>
  );
}

function ChevronRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
  );
}
