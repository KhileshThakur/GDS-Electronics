import api from "../../../services/api";


/* =========================================
   GET ALL CUSTOMERS
========================================= */

export const getAdminCustomers = async (
    params = {}
) => {

    const response =
        await api.get(
            "/admin/customers",
            {
                params
            }
        );

    return response.data;
};


/* =========================================
   GET SINGLE CUSTOMER
========================================= */

export const getAdminCustomer = async (
    id
) => {

    const response =
        await api.get(
            `/admin/customers/${id}`
        );

    return response.data;
};


/* =========================================
   UPDATE CUSTOMER STATUS
========================================= */

export const updateAdminCustomerStatus =
    async (
        id,
        status
    ) => {

        const response =
            await api.patch(
                `/admin/customers/${id}/status`,
                {
                    status
                }
            );

        return response.data;
    };