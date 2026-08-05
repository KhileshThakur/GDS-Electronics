const Input = ({
    label,
    className = "",
    ...props
}) => {

    return (

        <div className="flex flex-col gap-2">

            {label && (

                <label
                    className="text-sm font-medium text-[var(--text)]"
                >
                    {label}
                </label>

            )}

            <input
                {...props}
                className={`
                    w-full
                    px-4
                    py-3
                    border
                    border-[var(--border)]
                    rounded-lg
                    bg-white
                    text-[var(--text)]
                    outline-none
                    transition
                    duration-200
                    focus:border-[var(--primary)]
                    focus:ring-2
                    focus:ring-[var(--primary)]
                    ${className}
                `}
            />

        </div>

    );

};

export default Input;