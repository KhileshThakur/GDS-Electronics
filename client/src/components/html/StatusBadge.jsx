const STATUS_STYLES = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-700",
    blocked: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
    draft: "bg-blue-100 text-blue-700"
};

const StatusBadge = ({ status }) => {
    const badgeClass =
        STATUS_STYLES[status?.toLowerCase()] ||
        "bg-gray-100 text-gray-700";
    return (

        <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${badgeClass}`}
        >
            {status}
        </span>
    );
};

export default StatusBadge;