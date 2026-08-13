const FormCard = ({
    title,
    children
}) => {

    return (

        <div className="bg-white rounded-lg shadow p-6">

            {title && (

                <h2 className="text-xl font-semibold mb-5">
                    {title}
                </h2>

            )}

            {children}

        </div>

    );

};


export default FormCard;