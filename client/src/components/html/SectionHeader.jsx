const SectionHeader = ({ title, subtitle, action, className = "" }) => (
    <div
        className={`
            flex flex-wrap items-center justify-between gap-2 border border-[var(--border)]
            border-l-4 border-l-[var(--primary)] bg-[var(--surface)] px-4 py-3
            ${className}
        `}
    >
        <div>
            <h2 className="text-sm font-semibold text-[var(--text)]">{title}</h2>
            {subtitle && <p className="mt-0.5 text-xs text-[var(--muted)]">{subtitle}</p>}
        </div>
        {action}
    </div>
);

export default SectionHeader;