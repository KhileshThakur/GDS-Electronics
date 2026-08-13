import Button from "../ui/Button";

const ActionButtons = ({
    onEdit,
    onDelete,
    editLabel = "Edit",
    deleteLabel = "Delete"
}) => {

    return (
        <div className="flex gap-2">
            <Button
                type="button"
                onClick={onEdit}
            >
                {editLabel}
            </Button>
            <Button
                type="button"
                variant="danger"
                onClick={onDelete}
            >
                {deleteLabel}
            </Button>
        </div>
    );
};

export default ActionButtons;