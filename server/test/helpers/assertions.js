export const expectStatus = (
    response,
    expectedStatus
) => {

    if (response.status !== expectedStatus) {

        throw new Error(
            `Expected ${expectedStatus} but received ${response.status}`
        );

    }

};

export const expect = (
    condition,
    message
) => {

    if (!condition) {

        throw new Error(message);

    }

};

export const expectEqual = (
    actual,
    expected,
    message = ""
) => {

    if (actual !== expected) {

        throw new Error(
            message ||
            `Expected ${expected} but received ${actual}`
        );

    }

};

export const expectArray = (
    array,
    message
) => {

    if (!Array.isArray(array)) {

        throw new Error(message);

    }

};

export const expectLength = (
    array,
    length,
    message = ""
) => {

    if (array.length !== length) {

        throw new Error(
            message ||
            `Expected length ${length} but received ${array.length}`
        );

    }

};