export const validateRequiredFields = (fields) => {

    for (const [key, value] of Object.entries(fields)) {
        if (value === undefined || value === null) {
            return `${key} is required`;
        }

        if (typeof value === "string" && value.trim() === "") {
            return `${key} is required`;
        }
    }

    return null;

};