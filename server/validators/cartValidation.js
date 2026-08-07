import { validateRequiredFields } from "../utils/validation.js";

export const validateCartItem = (data) => {

    let error = validateRequiredFields({
        product: data.product,
        quantity: data.quantity
    });

    if (error) {
        return error;
    }

    if (data.quantity < 1) {
        return "Quantity must be at least 1";
    }

    return null;

};