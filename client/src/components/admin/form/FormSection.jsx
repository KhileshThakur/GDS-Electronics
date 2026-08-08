const FormSection = ({
    children,
    columns = 2
}) => {

    return (

        <div
            className={`grid gap-4 ${
                columns === 1
                    ? "grid-cols-1"
                    : "md:grid-cols-2"
            }`}
        >

            {children}

        </div>

    );

};

export default FormSection;