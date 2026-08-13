import { Link } from "react-router-dom";
import Button from "../ui/Button";

const PlusIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4"
    >
        <path
            d="M12 5v14M5 12h14"
            strokeLinecap="round"
        />
    </svg>
);

const PageHeader = ({
    title,
    subtitle = "",
    buttonText = "",
    buttonLink = "",
    children,
    eyebrow = "",
    action,
    className = ""
}) => {
    return (
        <header
            className={`
                mb-5
                flex
                flex-col
                gap-3
                border-b
                border-[var(--border)]
                pb-4
                sm:flex-row
                sm:items-end
                sm:justify-between
                ${className}
            `}
        >
            <div className="min-w-0">
                {eyebrow && (
                    <p className="
                        mb-1
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.12em]
                        text-[var(--primary)]
                    ">
                        {eyebrow}
                    </p>
                )}

                <h1 className="
                    text-xl
                    font-bold
                    tracking-tight
                    text-[var(--text)]
                    sm:text-2xl
                ">
                    {title}
                </h1>

                {subtitle && (
                    <p className="
                        mt-0.5
                        text-xs
                        text-[var(--muted)]
                    ">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="
            flex shrink-0 flex-wrap items-center gap-2
            ">
                {children}

                {action}

                {buttonText && (
                    <Link to={buttonLink}>
                        <Button
                            size="sm"
                            className="gap-1.5"
                        >
                            <PlusIcon />
                            {buttonText}
                        </Button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default PageHeader;