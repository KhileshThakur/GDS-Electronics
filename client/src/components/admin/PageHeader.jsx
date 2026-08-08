import { Link } from "react-router-dom";

import Button from "../ui/Button";

const PageHeader = ({
    title,
    subtitle = "",
    buttonText = "",
    buttonLink = "",
    children
}) => {
    return (
        <div className="flex items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-3xl font-bold">
                    {title}
                </h1>

                {subtitle && (
                    <p className="text-gray-500 mt-1">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-3">
                {children}
                {buttonText && (
                    <Link to={buttonLink}>
                        <Button>
                            {buttonText}
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default PageHeader;