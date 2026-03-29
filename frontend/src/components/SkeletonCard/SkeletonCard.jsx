/* ── Grid Skeleton ─────────────────────────────────────────────────── */
const GridSkeleton = () => (
  <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-bg-card">
    {/* Poster placeholder */}
    <div className="aspect-[2/3] skeleton" />
    {/* Content */}
    <div className="p-4 space-y-3">
      <div className="skeleton h-4 rounded-md w-4/5" />
      <div className="skeleton h-3 rounded-md w-1/3" />
      <div className="flex gap-1.5">
        <div className="skeleton h-5 rounded-md w-14" />
        <div className="skeleton h-5 rounded-md w-12" />
      </div>
      <div className="space-y-1.5">
        <div className="skeleton h-3 rounded-md w-full" />
        <div className="skeleton h-3 rounded-md w-4/5" />
      </div>
    </div>
  </div>
);

/* ── List Skeleton ─────────────────────────────────────────────────── */
const ListSkeleton = () => (
  <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-bg-card flex">
    <div className="w-20 sm:w-28 flex-shrink-0 skeleton aspect-[2/3]" />
    <div className="flex-1 p-4 space-y-3">
      <div className="skeleton h-4 rounded-md w-3/5" />
      <div className="skeleton h-3 rounded-md w-1/4" />
      <div className="space-y-1.5 hidden sm:block">
        <div className="skeleton h-3 rounded-md w-full" />
        <div className="skeleton h-3 rounded-md w-4/5" />
      </div>
      <div className="flex gap-1.5 mt-auto pt-2">
        <div className="skeleton h-5 rounded-md w-14" />
        <div className="skeleton h-5 rounded-md w-16" />
      </div>
    </div>
  </div>
);

const SkeletonCard = ({ viewMode = 'grid' }) => {
  return viewMode === 'list' ? <ListSkeleton /> : <GridSkeleton />;
};

export default SkeletonCard;
