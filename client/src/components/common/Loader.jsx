const Loader = ({
    fullScreen = true,
    text = "Loading..."
}) => {

    return (
        <div
            className={`
                w-full
                flex
                flex-col
                items-center
                justify-center
                gap-3
                ${
                    fullScreen
                        ? "min-h-screen"
                        : "py-12"
                }
            `}
        >
            {/* Spinner */}

            <div className="
                w-9
                h-9
                rounded-full
                border-[3px]
                border-[var(--primary-soft)]
                border-t-[var(--primary)]
                animate-spin
            " />

            {/* Loading text */}

            {text && (
                <p className="
                    text-sm
                    font-medium
                    text-[var(--text-light)]
                ">
                    {text}
                </p>
            )}
        </div>
    );
};

export default Loader;