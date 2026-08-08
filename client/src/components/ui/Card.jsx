const Card = ({
    children,
    className = "",
    padding = "md",
    hover = false
}) => {

    const paddings = {

        none: "",

        sm: `
            p-4
        `,

        md: `
            p-5
            sm:p-6
        `,

        lg: `
            p-6
            sm:p-8
        `

    };


    return (

        <div
            className={`
                w-full

                bg-[var(--surface)]

                border
                border-[var(--border)]

                rounded-[var(--radius-lg)]

                shadow-[var(--shadow)]

                ${paddings[padding]}

                ${
                    hover
                        ? `
                            transition-all
                            duration-200
                            ease-out

                            hover:-translate-y-0.5
                            hover:shadow-lg
                            hover:border-[var(--primary)]/20
                        `
                        : ""
                }

                ${className}
            `}
        >

            {children}

        </div>

    );

};

export default Card;