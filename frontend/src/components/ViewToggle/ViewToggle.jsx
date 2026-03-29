import { useAppContext } from '../../context/AppContext';

const ViewToggle = () => {
  const { viewMode, setViewMode } = useAppContext();

  return (
    <div
      className="flex items-center gap-1 p-1 rounded-xl bg-bg-elevated border border-white/[0.08]"
      role="group"
      aria-label="View mode toggle"
    >
      {/* Grid view */}
      <button
        id="view-grid-btn"
        onClick={() => setViewMode('grid')}
        aria-pressed={viewMode === 'grid'}
        title="Grid view"
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
          transition-all duration-200
          ${viewMode === 'grid'
            ? 'bg-brand-gradient text-white shadow-lg'
            : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.05]'
          }
        `}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        <span className="hidden sm:inline">Grid</span>
      </button>

      {/* List view */}
      <button
        id="view-list-btn"
        onClick={() => setViewMode('list')}
        aria-pressed={viewMode === 'list'}
        title="List view"
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
          transition-all duration-200
          ${viewMode === 'list'
            ? 'bg-brand-gradient text-white shadow-lg'
            : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.05]'
          }
        `}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
        <span className="hidden sm:inline">List</span>
      </button>
    </div>
  );
};

export default ViewToggle;
