export const sanitizeUser = (user) => {
    const { password, __v, ...userData } = user.toObject();
    return userData;
};