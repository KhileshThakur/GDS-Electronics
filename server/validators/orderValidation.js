import {
    validateRequiredFields
} from "../utils/validation.js";

export const validateCreateOrder = (data) => {

    return validateRequiredFields({

        addressId: data.addressId,

        paymentMethod: data.paymentMethod

    });

};