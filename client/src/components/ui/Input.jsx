const Input = ({
    label,
    error,
    required = false,
    compact = false,
    className = "",
    ...props
}) => {

    return (
        <div className="w-full flex flex-col gap-1">

            {label && (
                <label
                    className={`
                        flex
                        items-center
                        gap-1
                        font-medium
                        text-[var(--text)]
                        ${compact
                            ? "text-[13px]"
                            : "text-sm"
                        }
                    `}
                >
                    <span>
                        {label}
                    </span>

                    {required && (
                        <span className="text-[var(--danger)]">
                            *
                        </span>
                    )}
                </label>
            )}

            <input
                {...props}
                required={required}
                className={`
                    w-full

                    ${
                        compact
                            ? `
                                h-10
                                px-3
                                rounded-[var(--radius-sm)]
                                text-sm
                            `
                            : `
                                h-11
                                px-4
                                rounded-[var(--radius-md)]
                                text-sm
                            `
                    }

                    border
                    border-[var(--border)]

                    bg-white

                    text-[var(--text)]

                    placeholder:text-[var(--text-muted)]

                    outline-none

                    transition-all
                    duration-150

                    hover:border-slate-300

                    focus:border-[var(--primary)]

                    focus:ring-2
                    focus:ring-[var(--primary)]/10

                    disabled:cursor-not-allowed
                    disabled:bg-[var(--background)]
                    disabled:opacity-60

                    ${
                        error
                            ? `
                                border-[var(--danger)]
                                focus:border-[var(--danger)]
                                focus:ring-[var(--danger)]/10
                            `
                            : ""
                    }

                    ${className}
                `}
            />

            {error && (
                <p className="
                    text-[11px]
                    font-medium
                    text-[var(--danger)]
                ">
                    {error}
                </p>
            )}

        </div>
    );
};

export default Input;