import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";

import {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
} from "../services/address.service";

const emptyForm = {
    fullName: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    country: "India",
    pincode: ""
};

const AddressPage = () => {

    const [addresses, setAddresses] = useState([]);

    const [formData, setFormData] =
        useState(emptyForm);

    const [editingId, setEditingId] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const fetchAddresses = async () => {

        try {

            setLoading(true);

            const response =
                await getAddresses();

            setAddresses(
                response.data || []
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load addresses"
            );

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchAddresses();

    }, []);

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData(previous => ({
            ...previous,
            [name]: value
        }));

    };

    const resetForm = () => {

        setFormData(emptyForm);

        setEditingId(null);

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);

            let response;

            if (editingId) {

                response =
                    await updateAddress(
                        editingId,
                        formData
                    );

            }
            else {

                response =
                    await createAddress(
                        formData
                    );

            }

            toast.success(
                response.message ||
                "Address saved successfully"
            );

            resetForm();

            await fetchAddresses();

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to save address"
            );

        }
        finally {

            setSaving(false);

        }

    };

    const handleEdit = (address) => {

        setEditingId(address._id);

        setFormData({

            fullName:
                address.fullName || "",

            mobile:
                address.mobile || "",

            addressLine1:
                address.addressLine1 || "",

            addressLine2:
                address.addressLine2 || "",

            landmark:
                address.landmark || "",

            city:
                address.city || "",

            state:
                address.state || "",

            country:
                address.country || "India",

            pincode:
                address.pincode || ""

        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    const handleDelete = async (
        addressId
    ) => {

        try {

            const response =
                await deleteAddress(
                    addressId
                );

            toast.success(
                response.message ||
                "Address deleted"
            );

            if (
                editingId === addressId
            ) {
                resetForm();
            }

            await fetchAddresses();

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete address"
            );

        }

    };

    const handleSetDefault = async (
        addressId
    ) => {

        try {

            const response =
                await setDefaultAddress(
                    addressId
                );

            toast.success(
                response.message ||
                "Default address updated"
            );

            await fetchAddresses();

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update default address"
            );

        }

    };

    if (loading) {

        return (
            <Container>

                <div className="py-16 text-center">
                    Loading addresses...
                </div>

            </Container>
        );

    }

    return (

        <Container>

            <div className="py-10">

                <h1 className="
                    text-3xl
                    font-bold
                    mb-8
                ">
                    My Addresses
                </h1>

                {/* Address Form */}

                <Card className="mb-8">

                    <h2 className="
                        text-xl
                        font-semibold
                        mb-6
                    ">
                        {editingId
                            ? "Edit Address"
                            : "Add Address"
                        }
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-4
                        "
                    >

                        <input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                            className="border rounded-lg px-4 py-3"
                        />

                        <input
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Mobile Number"
                            maxLength={10}
                            required
                            className="border rounded-lg px-4 py-3"
                        />

                        <input
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleChange}
                            placeholder="Address Line 1"
                            required
                            className="
                                border
                                rounded-lg
                                px-4
                                py-3
                                md:col-span-2
                            "
                        />

                        <input
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleChange}
                            placeholder="Address Line 2"
                            className="
                                border
                                rounded-lg
                                px-4
                                py-3
                                md:col-span-2
                            "
                        />

                        <input
                            name="landmark"
                            value={formData.landmark}
                            onChange={handleChange}
                            placeholder="Landmark"
                            className="border rounded-lg px-4 py-3"
                        />

                        <input
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            required
                            className="border rounded-lg px-4 py-3"
                        />

                        <input
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="State"
                            required
                            className="border rounded-lg px-4 py-3"
                        />

                        <input
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Country"
                            required
                            className="border rounded-lg px-4 py-3"
                        />

                        <input
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            placeholder="Pincode"
                            maxLength={6}
                            required
                            className="border rounded-lg px-4 py-3"
                        />

                        <div className="
                            md:col-span-2
                            flex
                            gap-3
                        ">

                            <button
                                type="submit"
                                disabled={saving}
                                className="
                                    bg-black
                                    text-white
                                    px-6
                                    py-3
                                    rounded-lg
                                    disabled:opacity-50
                                "
                            >
                                {saving
                                    ? "Saving..."
                                    : editingId
                                        ? "Update Address"
                                        : "Add Address"
                                }
                            </button>

                            {editingId && (

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="
                                        border
                                        px-6
                                        py-3
                                        rounded-lg
                                    "
                                >
                                    Cancel
                                </button>

                            )}

                        </div>

                    </form>

                </Card>

                {/* Address List */}

                {addresses.length === 0 ? (

                    <Card>

                        <div className="
                            py-12
                            text-center
                            text-gray-500
                        ">
                            No addresses saved yet.
                        </div>

                    </Card>

                ) : (

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-6
                    ">

                        {addresses.map(address => (

                            <Card
                                key={address._id}
                            >

                                <div className="
                                    flex
                                    justify-between
                                    gap-4
                                ">

                                    <div>

                                        <div className="
                                            flex
                                            items-center
                                            gap-2
                                        ">

                                            <h3 className="
                                                font-semibold
                                                text-lg
                                            ">
                                                {address.fullName}
                                            </h3>

                                            {address.isDefault && (

                                                <span className="
                                                    text-xs
                                                    bg-green-100
                                                    text-green-700
                                                    px-2
                                                    py-1
                                                    rounded
                                                ">
                                                    Default
                                                </span>

                                            )}

                                        </div>

                                        <p className="
                                            text-gray-600
                                            mt-2
                                        ">
                                            {address.mobile}
                                        </p>

                                        <p className="
                                            text-gray-600
                                            mt-2
                                        ">
                                            {address.addressLine1}
                                        </p>

                                        {address.addressLine2 && (

                                            <p className="
                                                text-gray-600
                                            ">
                                                {address.addressLine2}
                                            </p>

                                        )}

                                        {address.landmark && (

                                            <p className="
                                                text-gray-600
                                            ">
                                                {address.landmark}
                                            </p>

                                        )}

                                        <p className="
                                            text-gray-600
                                        ">
                                            {address.city},{" "}
                                            {address.state} -{" "}
                                            {address.pincode}
                                        </p>

                                        <p className="
                                            text-gray-600
                                        ">
                                            {address.country}
                                        </p>

                                    </div>

                                </div>

                                <div className="
                                    flex
                                    flex-wrap
                                    gap-3
                                    mt-6
                                ">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleEdit(
                                                address
                                            )
                                        }
                                        className="
                                            border
                                            px-4
                                            py-2
                                            rounded-lg
                                        "
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(
                                                address._id
                                            )
                                        }
                                        className="
                                            border
                                            border-red-300
                                            text-red-600
                                            px-4
                                            py-2
                                            rounded-lg
                                        "
                                    >
                                        Delete
                                    </button>

                                    {!address.isDefault && (

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleSetDefault(
                                                    address._id
                                                )
                                            }
                                            className="
                                                bg-black
                                                text-white
                                                px-4
                                                py-2
                                                rounded-lg
                                            "
                                        >
                                            Set Default
                                        </button>

                                    )}

                                </div>

                            </Card>

                        ))}

                    </div>

                )}

            </div>

        </Container>

    );

};

export default AddressPage;