import {
    validateRequiredFields
} from "../utils/validation.js";

export const validateAddress = (data) => {

    const error = validateRequiredFields({

        fullName: data.fullName,
        mobile: data.mobile,
        addressLine1: data.addressLine1,
        city: data.city,
        state: data.state,
        pincode: data.pincode

    });

    if (error) {
        return error;
    }

    if (!/^\d{10}$/.test(data.mobile)) {
        return "Mobile number must be 10 digits";
    }

    if (!/^\d{6}$/.test(data.pincode)) {
        return "Pincode must be 6 digits";
    }

    return null;

};