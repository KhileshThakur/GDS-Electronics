const EmptyState = ({
    title = "No Data Found",
    description = "",
    action
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <h2 className="text-xl font-semibold">
                {title}
            </h2>

            {description && (
                <p className="text-gray-500 mt-2">
                    {description}
                </p>
            )}

            {action && (
                <div className="mt-6">
                    {action}
                </div>
            )}
        </div>
    );
};

export default EmptyState;