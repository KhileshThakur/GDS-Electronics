import {
    pass,
    fail
} from "./logger.js";

export const test = async (
    title,
    callback
) => {

    try {

        await callback();

        pass(title);

    }

    catch (error) {

        fail(
            title,
            error.message
        );

    }

};