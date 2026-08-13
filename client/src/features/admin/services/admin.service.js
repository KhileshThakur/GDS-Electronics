import api from "../../../services/api";

export const getAdminDashboard = async (
    mode = "ecommerce",
    period = "7days"
) => {
    const response = await api.get(
        "/admin/dashboard",
        {
            params: {
                mode,
                period
            }
        }
    );

    return response.data;
};