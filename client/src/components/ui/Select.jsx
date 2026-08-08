const Select = ({
    label,
    name,
    value,
    onChange,
    children,
    error
}) => {

    return (
        <div className="space-y-2">
            {label && (
                <label className="font-medium">
                    {label}
                </label>
            )}

            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border rounded-lg px-3 py-2"
            >
                {children}
            </select>

            {error && (
                <p className="text-red-500 text-sm">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Select;