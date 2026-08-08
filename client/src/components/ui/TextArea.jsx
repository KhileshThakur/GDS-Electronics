const Textarea = ({
    label,
    ...props
}) => {

    return (

        <div className="space-y-2">

            {label && (

                <label className="font-medium">

                    {label}

                </label>

            )}

            <textarea

                {...props}

                className="w-full border rounded-lg p-3"

            />

        </div>

    );

};

export default Textarea;