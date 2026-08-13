import Button from "../../ui/Button";


const FormActions = ({
    loading = false,
    submitText = "Save",
    cancelText = "Cancel",
    onCancel
}) => {

    return (

        <div className="flex justify-end gap-3 pt-2 pb-4">

            <Button
                type="button"
                onClick={onCancel}
            >
                {cancelText}
            </Button>

            <Button
                type="submit"
                disabled={loading}
            >
                {loading
                    ? "Saving..."
                    : submitText}
            </Button>

        </div>

    );

};


export default FormActions;