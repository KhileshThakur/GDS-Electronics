import { validateRequiredFields } from "../utils/validation.js";

export const validateWishlist = (data) => {

    return validateRequiredFields({
        product: data.product
    });

};