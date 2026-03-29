const ErrorState = ({ message = 'Something went wrong.', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center fade-up">
      {/* Illustration */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(248,113,113,0.9)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        {/* Decorative rings */}
        <div className="absolute -inset-3 rounded-3xl border border-red-500/10 pointer-events-none" />
        <div className="absolute -inset-6 rounded-3xl border border-red-500/05 pointer-events-none" />
      </div>

      <h2 className="text-xl font-semibold text-text-primary mb-2">Oops! Something went wrong</h2>
      <p className="text-text-secondary text-sm max-w-sm leading-relaxed mb-8">
        {message}
      </p>

      {onRetry && (
        <button
          id="error-retry-btn"
          onClick={onRetry}
          className="
            flex items-center gap-2 px-6 py-2.5 rounded-xl
            bg-brand-gradient text-white text-sm font-medium
            hover:opacity-90 active:scale-95
            transition-all duration-200 shadow-lg
            focus-ring
          "
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
