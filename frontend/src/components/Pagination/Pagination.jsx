const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  const maxVisible = 5;
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <nav
      className="flex items-center justify-center gap-1.5 pt-8 pb-4"
      aria-label="Pagination"
    >
      {/* Previous */}
      <button
        id="pagination-prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium
          text-text-secondary border border-white/[0.08]
          hover:text-text-primary hover:border-white/[0.16] hover:bg-white/[0.04]
          disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent
          transition-all duration-200
        "
        aria-label="Previous page"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* First page + ellipsis */}
      {start > 1 && (
        <>
          <PageButton page={1} current={currentPage} onClick={onPageChange} />
          {start > 2 && <span className="text-text-muted px-1 text-sm">…</span>}
        </>
      )}

      {/* Page numbers */}
      {pages.map((page) => (
        <PageButton key={page} page={page} current={currentPage} onClick={onPageChange} />
      ))}

      {/* Ellipsis + last page */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-text-muted px-1 text-sm">…</span>}
          <PageButton page={totalPages} current={currentPage} onClick={onPageChange} />
        </>
      )}

      {/* Next */}
      <button
        id="pagination-next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
          flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium
          text-text-secondary border border-white/[0.08]
          hover:text-text-primary hover:border-white/[0.16] hover:bg-white/[0.04]
          disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent
          transition-all duration-200
        "
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </nav>
  );
};

const PageButton = ({ page, current, onClick }) => (
  <button
    id={`pagination-page-${page}`}
    onClick={() => onClick(page)}
    aria-current={page === current ? 'page' : undefined}
    className={`
      w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200
      ${page === current
        ? 'bg-brand-gradient text-white shadow-lg shadow-brand-purple/25'
        : 'text-text-secondary border border-white/[0.08] hover:text-text-primary hover:border-white/[0.16] hover:bg-white/[0.04]'
      }
    `}
  >
    {page}
  </button>
);

export default Pagination;
