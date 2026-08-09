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
            shadow-sm
            hover:shadow-md
        `,
        secondary: `
            bg-[var(--secondary)]
            text-black
            hover:bg-[var(--secondary-dark)]
            shadow-sm
        `,
        outline: `
            bg-white
            text-[var(--primary)]
            border
            border-[var(--primary)]
            hover:bg-[var(--primary-soft)]
        `,
        danger: `
            bg-[var(--danger)]
            text-white
            hover:opacity-90
            shadow-sm
        `,
        ghost: `
            bg-transparent
            text-[var(--text)]
            hover:bg-[var(--background)]
            hover:text-[var(--primary)]
        `
    };


    const sizes = {
        sm: `
            min-h-9
            px-3.5
            text-sm
            rounded-[var(--radius-sm)]
        `,
        md: `
            min-h-11
            px-5
            text-sm
            rounded-[var(--radius-md)]
        `,
        lg: `
            min-h-12
            px-6
            text-base
            rounded-[var(--radius-md)]
        `
    };


    return (
        <button
            type={type}
            disabled={
                disabled || loading
            }
            onClick={onClick}
            className={`
                inline-flex
                items-center
                justify-center
                gap-2
                font-semibold
                whitespace-nowrap
                transition-all
                duration-200
                ease-out
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-50
                disabled:pointer-events-none
                ${sizes[size]}
                ${variants[variant]}
                ${className}
            `}
        >
            {loading && (
                <span className="
                    w-4
                    h-4
                    rounded-full
                    border-2
                    border-current
                    border-t-transparent
                    animate-spin
                " />

            )}
            {children}
        </button>
    );
};

export default Button;