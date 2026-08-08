const LoadingState = ({
    text = "Loading..."
}) => {
    return (
        <div className="flex justify-center items-center py-16">
            <p className="text-gray-500">
                {text}
            </p>
        </div>
    );
};

export default LoadingState;