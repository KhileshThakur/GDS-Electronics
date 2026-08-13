const EditIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-4 w-4"
    >
        <path
            d="M12 20h9"
            strokeLinecap="round"
        />
        <path
            d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"
            strokeLinejoin="round"
        />
    </svg>
);

const DeleteIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-4 w-4"
    >
        <path
            d="M4 7h16"
            strokeLinecap="round"
        />
        <path
            d="M9 7V4h6v3"
            strokeLinecap="round"
        />
        <path
            d="M7 7l1 13h8l1-13"
            strokeLinejoin="round"
        />
        <path
            d="M10 11v5M14 11v5"
            strokeLinecap="round"
        />
    </svg>
);

const ActionButtons = ({
    onEdit,
    onDelete,
    showEdit = true,
    showDelete = true,
    editLabel = "Edit",
    deleteLabel = "Delete",
    className = ""
}) => {
    return (
        <div
            className={`
                inline-flex
                items-center
                gap-1
                ${className}
            `}
        >
            {showEdit && (
                <button
                    type="button"
                    title={editLabel}
                    onClick={onEdit}
                    className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        border
                        border-[var(--border)]
                        text-[var(--muted)]
                        transition
                        hover:border-[var(--primary)]
                        hover:bg-[var(--primary-soft)]
                        hover:text-[var(--primary)]
                    "
                >
                    <EditIcon />
                </button>
            )}

            {showDelete && (
                <button
                    type="button"
                    title={deleteLabel}
                    onClick={onDelete}
                    className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        border
                        border-[var(--border)]
                        text-[var(--muted)]
                        transition
                        hover:border-[var(--danger)]
                        hover:bg-red-50
                        hover:text-[var(--danger)]
                    "
                >
                    <DeleteIcon />
                </button>
            )}
        </div>
    );
};

export default ActionButtons;