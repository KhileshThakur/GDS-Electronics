const Textarea = ({
    label,
    error,
    required = false,
    disabled = false,
    className = "",
    ...props
}) => {

    return (

        <div className="
            w-full
            flex
            flex-col
            gap-2
        ">

            {label && (

                <label className="
                    flex
                    items-center
                    gap-1

                    text-sm
                    font-medium

                    text-[var(--text)]
                ">

                    <span>
                        {label}
                    </span>

                    {required && (

                        <span className="
                            text-[var(--danger)]
                        ">
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

                    min-h-[120px]

                    px-4
                    py-3

                    rounded-[var(--radius-md)]

                    border

                    bg-[var(--surface)]

                    text-sm
                    text-[var(--text)]

                    placeholder:text-[var(--text-muted)]

                    outline-none

                    resize-y

                    transition-all
                    duration-200

                    ${
                        error
                            ? `
                                border-[var(--danger)]

                                focus:border-[var(--danger)]

                                focus:ring-2
                                focus:ring-[var(--danger)]/10
                            `
                            : `
                                border-[var(--border)]

                                hover:border-slate-300

                                focus:border-[var(--primary)]

                                focus:ring-2
                                focus:ring-[var(--primary)]/10
                            `
                    }

                    disabled:
                        cursor-not-allowed

                    disabled:
                        bg-[var(--background)]

                    disabled:
                        opacity-60

                    ${className}
                `}
            />


            {error && (

                <p className="
                    text-xs
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