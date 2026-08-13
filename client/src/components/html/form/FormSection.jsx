const FormSection = ({
    children,
    columns = 2
}) => {

    const gridClass =
        columns === 1
            ? "grid-cols-1"
            : columns === 3
                ? "md:grid-cols-3"
                : columns === 4
                    ? "md:grid-cols-4"
                    : columns === 5
                        ? "md:grid-cols-5"
                        : "md:grid-cols-2";


    return (

        <div
            className={`grid gap-4 ${gridClass}`}
        >
            {children}
        </div>

    );

};


export default FormSection;