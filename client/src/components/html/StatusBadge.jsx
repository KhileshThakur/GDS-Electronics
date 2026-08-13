const STATUS_STYLES = {
    active: {
        label: "Active",
        className:
            "bg-green-50 text-green-700 border-green-200"
    },
    inactive: {
        label: "Inactive",
        className:
            "bg-gray-50 text-gray-600 border-gray-200"
    },
    blocked: {
        label: "Blocked",
        className:
            "bg-red-50 text-red-700 border-red-200"
    },
    pending: {
        label: "Pending",
        className:
            "bg-yellow-50 text-yellow-700 border-yellow-200"
    },
    processing: {
        label: "Processing",
        className:
            "bg-yellow-50 text-yellow-700 border-yellow-200"
    },
    delivered: {
        label: "Delivered",
        className:
            "bg-green-50 text-green-700 border-green-200"
    },
    shipped: {
        label: "Shipped",
        className:
            "bg-blue-50 text-blue-700 border-blue-200"
    },
    cancelled: {
        label: "Cancelled",
        className:
            "bg-red-50 text-red-700 border-red-200"
    },
    draft: {
        label: "Draft",
        className:
            "bg-blue-50 text-blue-700 border-blue-200"
    }
};

const StatusBadge = ({
    status,
    label,
    className = ""
}) => {
    const key = String(status || "")
        .toLowerCase();

    const style =
        STATUS_STYLES[key] || {
            label: status || "Unknown",
            className:
                "bg-gray-50 text-gray-600 border-gray-200"
        };

    return (
        <span
            className={`
                inline-flex
                items-center
                gap-1.5
                border
                px-2
                py-0.5
                text-[10px]
                font-semibold
                uppercase
                tracking-wide
                ${style.className}
                ${className}
            `}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {label || style.label}
        </span>
    );
};

export default StatusBadge;