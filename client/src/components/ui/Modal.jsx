import { useEffect, useId } from "react";

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size = "medium"
}) => {

    const titleId = useId();


    useEffect(() => {

        if (!isOpen) {
            return;
        }


        const handleEscape = (event) => {

            if (event.key === "Escape") {
                onClose();
            }

        };


        document.addEventListener(
            "keydown",
            handleEscape
        );

        document.body.style.overflow = "hidden";


        return () => {

            document.removeEventListener(
                "keydown",
                handleEscape
            );

            document.body.style.overflow = "";

        };

    }, [
        isOpen,
        onClose
    ]);


    if (!isOpen) {
        return null;
    }


    const handleOverlayClick = (event) => {

        if (
            event.target === event.currentTarget
        ) {
            onClose();
        }

    };


    const sizeClasses = {

        small: "max-w-[420px]",

        medium: "max-w-[650px]",

        large: "max-w-[900px]"

    };


    return (

        <div
            className="
                fixed inset-0 z-[1000]

                flex
                items-center
                justify-center

                p-6

                bg-[rgba(10,15,68,0.55)]
                backdrop-blur-[5px]

                max-[600px]:items-end
                max-[600px]:p-0
            "
            onMouseDown={handleOverlayClick}
        >

            <div
                className={`
                    w-full
                    ${sizeClasses[size] || sizeClasses.medium}

                    max-h-[calc(100vh-48px)]

                    flex
                    flex-col

                    overflow-hidden

                    border
                    border-[var(--border)]

                    rounded-[var(--radius-lg)]

                    bg-[var(--surface)]

                    shadow-[0_24px_70px_rgba(10,15,68,0.2)]

                    max-[600px]:max-h-[92vh]
                    max-[600px]:rounded-t-[var(--radius-lg)]
                    max-[600px]:rounded-b-none
                `}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
            >

                {/* HEADER */}

                <div
                    className="
                        flex
                        items-center
                        justify-between

                        gap-5

                        px-6
                        py-5

                        shrink-0

                        border-b
                        border-[var(--border)]
                    "
                >

                    <h2
                        id={titleId}
                        className="
                            m-0

                            text-xl
                            leading-[1.3]

                            font-bold

                            text-[var(--text)]
                        "
                    >
                        {title}
                    </h2>


                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="
                            w-9
                            h-9

                            shrink-0

                            inline-flex
                            items-center
                            justify-center

                            p-0

                            border-0

                            rounded-[var(--radius-sm)]

                            bg-transparent

                            text-[var(--text-light)]

                            text-[25px]
                            leading-none

                            cursor-pointer

                            transition-colors
                            duration-200

                            hover:bg-[var(--background)]
                            hover:text-[var(--text)]

                            focus:outline-none
                            focus:ring-2
                            focus:ring-[var(--primary)]
                            focus:ring-offset-1
                        "
                    >
                        ×
                    </button>

                </div>


                {/* BODY */}

                <div
                    className="
                        min-h-0

                        overflow-y-auto

                        px-6
                        py-6

                        max-[600px]:px-5
                        max-[600px]:py-5
                    "
                >
                    {children}
                </div>

            </div>

        </div>

    );

};

export default Modal;