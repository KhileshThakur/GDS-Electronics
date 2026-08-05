const Button = ({
    children,
    type = "button",
    variant = "primary",
    disabled = false,
    onClick,
    className = ""
}) => {

    const variants = {
        primary:
            "bg-[var(--primary)] text-white hover:opacity-90",
        secondary:
            "bg-[var(--secondary)] text-black hover:opacity-90",
        outline:
            "border border-[var(--primary)] text-[var(--primary)] bg-white",
        danger:
            "bg-[var(--danger)] text-white"
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`
                px-5
                py-3
                rounded-lg
                font-medium
                transition
                duration-200
                disabled:opacity-50
                ${variants[variant]}
                ${className}
            `}
        >
            {children}
        </button>
    );
};

export default Button;