import { useEffect, useMemo, useRef, useState } from "react";
import { getNestedValue } from "../html/DataTable/utils";

const PAGE_SIZE_OPTIONS = [10, 25, 50];

const getPageNumbers = (current, total) => {
    const delta = 1;
    const pages = [1];

    for (let i = current - delta; i <= current + delta; i++) {
        if (i > 1 && i < total) pages.push(i);
    }

    if (total > 1) pages.push(total);

    const withGaps = [];
    let prev = 0;

    for (const page of [...new Set(pages)].sort((a, b) => a - b)) {
        if (prev && page - prev > 1) withGaps.push("...");
        withGaps.push(page);
        prev = page;
    }

    return withGaps;
};

const hideClass = (hideBelow) =>
    hideBelow ? `hidden ${hideBelow}:table-cell` : "";

const alignClass = (align) =>
    align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";

// Deterministic color chip for avatar-style renders (name columns etc.)
const CHIP_PALETTE = [
    "bg-blue-50 text-blue-600",
    "bg-amber-50 text-amber-600",
    "bg-emerald-50 text-emerald-600",
    "bg-violet-50 text-violet-600",
    "bg-rose-50 text-rose-600",
    "bg-cyan-50 text-cyan-600"
];

export const chipColorFor = (seed = "") => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    return CHIP_PALETTE[Math.abs(hash) % CHIP_PALETTE.length];
};

const ColumnsMenu = ({ columns, order, hidden, onToggle, onMove }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const byKey = Object.fromEntries(columns.map((c) => [c.key, c]));

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="
                    inline-flex items-center gap-1.5 border border-[var(--border)]
                    px-3 py-1.5 text-xs font-semibold text-[var(--text)]
                    hover:border-[var(--primary)] hover:text-[var(--primary)]
                "
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                    <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
                </svg>
                Columns
            </button>

            {open && (
                <div
                    className="
                        absolute right-0 z-20 mt-1 w-56 border border-[var(--border)]
                        bg-[var(--surface)] py-1 shadow-lg
                    "
                >
                    {order.map((key, index) => {
                        const column = byKey[key];
                        if (!column) return null;
                        const isHidden = hidden.has(key);

                        return (
                            <div
                                key={key}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-[var(--background)]"
                            >
                                <input
                                    type="checkbox"
                                    checked={!isHidden}
                                    onChange={() => onToggle(key)}
                                    className="h-3.5 w-3.5 accent-[var(--primary)]"
                                />
                                <span className={`flex-1 truncate ${isHidden ? "text-[var(--muted)]" : "text-[var(--text)]"}`}>
                                    {column.label}
                                </span>
                                <button
                                    type="button"
                                    disabled={index === 0}
                                    onClick={() => onMove(key, -1)}
                                    className="text-[var(--muted)] hover:text-[var(--primary)] disabled:opacity-30"
                                >
                                    ↑
                                </button>
                                <button
                                    type="button"
                                    disabled={index === order.length - 1}
                                    onClick={() => onMove(key, 1)}
                                    className="text-[var(--muted)] hover:text-[var(--primary)] disabled:opacity-30"
                                >
                                    ↓
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const Table = ({
    columns = [],
    data = [],
    loading = false,
    serialNumber = true,
    emptyTitle = "No Data Found",
    emptyDescription = "",
    renderActions,
    actionsLabel = "Actions",
    rowKey = "_id",
    pageSize: initialPageSize = 10,
    pageSizeOptions = PAGE_SIZE_OPTIONS,
    searchable = false,
    searchValue = "",
    dense = false,
    stickyHeader = false,
    onRowClick,
    customizable = true,
    persistKey,
    toolbar,
    className = ""
}) => {
    const [sort, setSort] = useState({ key: null, direction: "asc" });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const columnKeys = useMemo(() => columns.map((c) => c.key), [columns]);

    const loadPersisted = () => {
        if (!persistKey) return null;
        try {
            const raw = localStorage.getItem(`table-cols:${persistKey}`);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    };

    const [order, setOrder] = useState(() => loadPersisted()?.order || columnKeys);
    const [hidden, setHidden] = useState(
        () => new Set(loadPersisted()?.hidden || columns.filter((c) => c.defaultHidden).map((c) => c.key))
    );

    // Keep order/hidden in sync if the column set itself changes (new page, new schema)
    useEffect(() => {
        setOrder((current) => {
            const known = current.filter((k) => columnKeys.includes(k));
            const missing = columnKeys.filter((k) => !known.includes(k));
            return [...known, ...missing];
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columnKeys.join(",")]);

    useEffect(() => {
        if (!persistKey) return;
        try {
            localStorage.setItem(
                `table-cols:${persistKey}`,
                JSON.stringify({ order, hidden: [...hidden] })
            );
        } catch {
            // ignore storage failures
        }
    }, [order, hidden, persistKey]);

    const toggleColumn = (key) => {
        setHidden((current) => {
            const next = new Set(current);
            next.has(key) ? next.delete(key) : next.add(key);
            return next;
        });
    };

    const moveColumn = (key, direction) => {
        setOrder((current) => {
            const index = current.indexOf(key);
            const swapWith = index + direction;
            if (swapWith < 0 || swapWith >= current.length) return current;
            const next = [...current];
            [next[index], next[swapWith]] = [next[swapWith], next[index]];
            return next;
        });
    };

    const byKey = useMemo(() => Object.fromEntries(columns.map((c) => [c.key, c])), [columns]);
    const visibleColumns = order.filter((k) => !hidden.has(k) && byKey[k]).map((k) => byKey[k]);

    const sortedData = useMemo(() => {
        if (!sort.key) return data;

        return [...data].sort((a, b) => {
            const aValue = getNestedValue(a, sort.key);
            const bValue = getNestedValue(b, sort.key);

            if (aValue == null) return 1;
            if (bValue == null) return -1;

            if (typeof aValue === "number" && typeof bValue === "number") {
                return sort.direction === "asc" ? aValue - bValue : bValue - aValue;
            }

            return sort.direction === "asc"
                ? String(aValue).localeCompare(String(bValue))
                : String(bValue).localeCompare(String(aValue));
        });
    }, [data, sort]);

    const filteredData = useMemo(() => {
        if (!searchable || !searchValue.trim()) return sortedData;
        const query = searchValue.toLowerCase();

        return sortedData.filter((row) =>
            columns.some((column) => {
                const value = column.searchValue ? column.searchValue(row) : getNestedValue(row, column.key);
                return String(value ?? "").toLowerCase().includes(query);
            })
        );
    }, [sortedData, searchValue, searchable, columns]);

    const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const visibleData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleSort = (column) => {
        if (column.sortable === false) return;
        setPage(1);
        setSort((current) => ({
            key: column.key,
            direction: current.key === column.key && current.direction === "asc" ? "desc" : "asc"
        }));
    };

    const cellPadding = dense ? "px-3 py-2" : "px-3 py-3";
    const colCount = visibleColumns.length + (serialNumber ? 1 : 0) + (renderActions ? 1 : 0);

    const columnsMenu = customizable && columns.length > 1 && (
        <ColumnsMenu columns={columns} order={order} hidden={hidden} onToggle={toggleColumn} onMove={moveColumn} />
    );

    return (
        <div className={`border border-[var(--border)] bg-[var(--surface)] ${className}`}>
            {toolbar && (
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-3">
                    <div>
                        {toolbar.title && <h2 className="text-sm font-semibold text-[var(--text)]">{toolbar.title}</h2>}
                        {toolbar.description && (
                            <p className="mt-0.5 text-xs text-[var(--muted)]">{toolbar.description}</p>
                        )}
                    </div>
                    {columnsMenu}
                </div>
            )}

            {!toolbar && columnsMenu && (
                <div className="flex justify-end border-b border-[var(--border)] px-4 py-2">{columnsMenu}</div>
            )}

            {loading ? (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] border-collapse">
                        <tbody>
                            {Array.from({ length: 6 }).map((_, rowIndex) => (
                                <tr key={rowIndex} className="border-b border-[var(--border)] last:border-0">
                                    {Array.from({ length: colCount }).map((__, cellIndex) => (
                                        <td key={cellIndex} className={cellPadding}>
                                            <div className="h-3.5 w-full max-w-[140px] animate-pulse rounded-sm bg-[var(--border)]" />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : !filteredData.length ? (
                <div className="flex min-h-40 flex-col items-center justify-center px-4 text-center">
                    <p className="text-sm font-semibold text-[var(--text)]">{emptyTitle}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                        {searchValue ? "Try changing your search or filters." : emptyDescription}
                    </p>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px] border-collapse">
                            <thead className={stickyHeader ? "sticky top-0 z-10" : ""}>
                                <tr className="border-b-2 border-[var(--primary)]/70 bg-[var(--background)]">
                                    {serialNumber && (
                                        <th className="w-12 px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
                                            #
                                        </th>
                                    )}

                                    {visibleColumns.map((column) => {
                                        const active = sort.key === column.key;

                                        return (
                                            <th
                                                key={column.key}
                                                onClick={() => handleSort(column)}
                                                style={{ width: column.width, minWidth: column.minWidth }}
                                                className={`
                                                    px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]
                                                    ${alignClass(column.align)}
                                                    ${column.sortable !== false ? "cursor-pointer select-none hover:text-[var(--primary)]" : ""}
                                                    ${hideClass(column.hideBelow)}
                                                    ${column.headerClassName || ""}
                                                `}
                                            >
                                                <span className="inline-flex items-center gap-1.5">
                                                    {column.label}
                                                    {column.sortable !== false && (
                                                        <span className={active ? "text-[var(--primary)]" : "text-[9px]"}>
                                                            {active ? (sort.direction === "asc" ? "▲" : "▼") : "↕"}
                                                        </span>
                                                    )}
                                                </span>
                                            </th>
                                        );
                                    })}

                                    {renderActions && (
                                        <th className="px-3 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
                                            {actionsLabel}
                                        </th>
                                    )}
                                </tr>
                            </thead>

                            <tbody>
                                {visibleData.map((row, index) => (
                                    <tr
                                        key={row[rowKey] || index}
                                        onClick={onRowClick ? () => onRowClick(row) : undefined}
                                        className={`
                                            group border-b border-[var(--border)] border-l-2 border-l-transparent
                                            last:border-b-0 transition-colors
                                            ${index % 2 ? "bg-[var(--background)]/40" : ""}
                                            hover:border-l-[var(--primary)] hover:bg-[var(--primary-soft)]
                                            ${onRowClick ? "cursor-pointer" : ""}
                                        `}
                                    >
                                        {serialNumber && (
                                            <td className={`${cellPadding} text-xs text-[var(--muted)]`}>
                                                {(currentPage - 1) * pageSize + index + 1}
                                            </td>
                                        )}

                                        {visibleColumns.map((column) => (
                                            <td
                                                key={column.key}
                                                className={`
                                                    ${cellPadding} text-[13px] text-[var(--text)]
                                                    ${alignClass(column.align)}
                                                    ${hideClass(column.hideBelow)}
                                                    ${column.cellClassName || ""}
                                                `}
                                            >
                                                {column.render ? column.render(row, index) : getNestedValue(row, column.key)}
                                            </td>
                                        ))}

                                        {renderActions && (
                                            <td className={`${cellPadding} text-right`} onClick={(e) => e.stopPropagation()}>
                                                {renderActions(row, index)}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-[var(--border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                            <span>
                                Showing {(currentPage - 1) * pageSize + 1}–
                                {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length}
                            </span>

                            {pageSizeOptions?.length > 0 && (
                                <label className="flex items-center gap-1.5">
                                    <span className="hidden sm:inline">Rows:</span>
                                    <select
                                        value={pageSize}
                                        onChange={(e) => {
                                            setPageSize(Number(e.target.value));
                                            setPage(1);
                                        }}
                                        className="border border-[var(--border)] bg-[var(--surface)] px-1.5 py-1 text-xs outline-none"
                                    >
                                        {pageSizeOptions.map((size) => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                </label>
                            )}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex items-center gap-1 self-end sm:self-auto">
                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() => setPage((p) => p - 1)}
                                    className="border border-[var(--border)] px-2.5 py-1.5 text-xs font-semibold disabled:opacity-40"
                                >
                                    Prev
                                </button>

                                {getPageNumbers(currentPage, totalPages).map((p, i) =>
                                    p === "..." ? (
                                        <span key={`gap-${i}`} className="px-1.5 text-xs text-[var(--muted)]">…</span>
                                    ) : (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => setPage(p)}
                                            className={`
                                                min-w-[28px] border px-2 py-1.5 text-xs font-semibold
                                                ${p === currentPage
                                                    ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                                                    : "border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)]"}
                                            `}
                                        >
                                            {p}
                                        </button>
                                    )
                                )}

                                <button
                                    type="button"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setPage((p) => p + 1)}
                                    className="border border-[var(--border)] px-2.5 py-1.5 text-xs font-semibold disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Table;