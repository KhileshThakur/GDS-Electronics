const ACCENTS = {
    blue: "border-l-blue-500",
    green: "border-l-emerald-500",
    amber: "border-l-amber-500",
    red: "border-l-red-500",
    purple: "border-l-violet-500"
};

const StatCard = ({ label, value, accent = "blue" }) => (
    <div
        className={`
            flex items-center justify-between border border-[var(--border)] border-l-4
            bg-[var(--surface)] px-4 py-2.5
            ${ACCENTS[accent] || ACCENTS.blue}
        `}
    >
        <span className="text-xs font-medium text-[var(--muted)]">{label}</span>
        <span className="text-lg font-bold text-[var(--text)]">{value}</span>
    </div>
);

export default StatCard;