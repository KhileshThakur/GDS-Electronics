export const getNestedValue = (
    object,
    path
) => {
    return path
        .split(".")
        .reduce(
            (value, key) => value?.[key],
            object
        );
};