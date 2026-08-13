const Textarea = ({
    label,
    error,
    required = false,
    disabled = false,
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

            <textarea
                {...props}
                required={required}
                disabled={disabled}

                className={`
                    w-full

                    ${
                        compact
                            ? `
                                min-h-[82px]
                                px-3
                                py-2.5
                                rounded-[var(--radius-sm)]
                                text-sm
                            `
                            : `
                                min-h-[120px]
                                px-4
                                py-3
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

                    resize-y

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


export default Textarea;