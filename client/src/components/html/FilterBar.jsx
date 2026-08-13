const FilterBar = ({
    search,
    filters = [],
    onClear,
    showClear = false,
    className = ""
}) => {
    return (
        <div
            className={`
                grid grid-cols-1 gap-3 border-b border-[var(--border)] p-4
                sm:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]
                ${className}
            `}
        >
            {search && (
                <input
                    type="text"
                    value={search.value}
                    onChange={(e) => search.onChange(e.target.value)}
                    placeholder={search.placeholder || "Search..."}
                    className="
                        h-10 min-w-0 border border-[var(--border)] bg-[var(--background)]
                        px-3 text-sm outline-none focus:border-[var(--primary)]
                        sm:col-span-2 lg:col-span-1
                    "
                />
            )}

            {filters.map((filter) => (
                <select
                    key={filter.key}
                    value={filter.value}
                    onChange={(e) => filter.onChange(e.target.value)}
                    className="h-10 min-w-0 border border-[var(--border)] bg-[var(--surface)] px-3 text-sm outline-none"
                >
                    <option value="all">{filter.placeholder}</option>
                    {filter.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ))}

            {showClear && (
                <button
                    type="button"
                    onClick={onClear}
                    className="h-10 whitespace-nowrap text-xs font-semibold text-[var(--primary)] hover:underline sm:justify-self-start lg:justify-self-end"
                >
                    Clear filters
                </button>
            )}
        </div>
    );
};

export default FilterBar;