const Button = ({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    onClick,
    className = ""
}) => {
    const variants = {
        primary: `
            bg-[var(--primary)]
            text-white
            hover:bg-[var(--primary-dark)]
        `,
        secondary: `
            bg-[var(--secondary)]
            text-black
            hover:bg-[var(--secondary-dark)]
        `,
        outline: `
            border
            border-[var(--border)]
            bg-[var(--surface)]
            text-[var(--text)]
            hover:border-[var(--primary)]
            hover:text-[var(--primary)]
        `,
        danger: `
            bg-[var(--danger)]
            text-white
            hover:opacity-90
        `,
        ghost: `
            bg-transparent
            text-[var(--text)]
            hover:bg-[var(--background)]
            hover:text-[var(--primary)]
        `
    };

    const sizes = {
        sm: "min-h-9 px-3 text-xs",
        md: "min-h-10 px-4 text-sm",
        lg: "min-h-11 px-5 text-sm"
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`
                inline-flex
                items-center
                justify-center
                gap-2
                border
                border-transparent
                font-semibold
                whitespace-nowrap
                transition-colors
                duration-150
                disabled:cursor-not-allowed
                disabled:opacity-50
                ${sizes[size]}
                ${variants[variant]}
                ${className}
            `}
        >
            {loading && (
                <span className="
                    h-3.5
                    w-3.5
                    animate-spin
                    rounded-full
                    border-2
                    border-current
                    border-t-transparent
                " />
            )}

            {children}
        </button>
    );
};

export default Button;