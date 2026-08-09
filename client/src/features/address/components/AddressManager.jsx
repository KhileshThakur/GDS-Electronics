import { useEffect, useState } from "react";

import { toast } from "react-hot-toast";

import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
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
  pincode: "",
  type: "home",
};

const AddressManager = ({ mode = "page" }) => {
  const isModal = mode === "modal";

  /* =========================================
       STATE
    ========================================= */

  const [addresses, setAddresses] = useState([]);

  const [formData, setFormData] = useState({
    ...emptyForm,
  });

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const [defaultId, setDefaultId] = useState(null);

  /* =========================================
       FETCH ADDRESSES
    ========================================= */

  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const response = await getAddresses();

      setAddresses(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  /* =========================================
       FORM CHANGE
    ========================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================================
       RESET FORM
    ========================================= */

  const resetForm = () => {
    setFormData({
      ...emptyForm,
    });

    setEditingId(null);
  };

  /* =========================================
       SUBMIT
    ========================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      let response;

      if (editingId) {
        response = await updateAddress(editingId, formData);
      } else {
        response = await createAddress(formData);
      }

      toast.success(response.message || "Address saved successfully");

      resetForm();

      await fetchAddresses();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save address");
    } finally {
      setSaving(false);
    }
  };

  /* =========================================
       EDIT
    ========================================= */

  const handleEdit = (address) => {
    setEditingId(address._id);

    setFormData({
      fullName: address.fullName || "",

      mobile: address.mobile || "",

      addressLine1: address.addressLine1 || "",

      addressLine2: address.addressLine2 || "",

      landmark: address.landmark || "",

      city: address.city || "",

      state: address.state || "",

      country: address.country || "India",

      pincode: address.pincode || "",

      type: address.type || "home",
    });

    if (!isModal) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  /* =========================================
       DELETE
    ========================================= */

  const handleDelete = async (addressId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(addressId);

      const response = await deleteAddress(addressId);

      toast.success(response.message || "Address deleted");

      if (editingId === addressId) {
        resetForm();
      }

      await fetchAddresses();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete address");
    } finally {
      setDeletingId(null);
    }
  };

  /* =========================================
       SET DEFAULT
    ========================================= */

  const handleSetDefault = async (addressId) => {
    try {
      setDefaultId(addressId);

      const response = await setDefaultAddress(addressId);

      toast.success(response.message || "Default address updated");

      await fetchAddresses();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update default address",
      );
    } finally {
      setDefaultId(null);
    }
  };

  /* =========================================
       LOADING
    ========================================= */

  if (loading) {
    return (
      <div className="address-loading">
        <div className="address-spinner" />

        <p>Loading your addresses...</p>
      </div>
    );
  }

  return (
    <div
      className={
        isModal ? "address-manager address-manager--modal" : "address-manager"
      }
    >
      {/* =================================
                FORM
            ================================= */}

      <section className="address-form-card">
        <div className="address-form-card__header">
          <div>
            <span className="address-section-label">
              {editingId ? "UPDATE ADDRESS" : "NEW ADDRESS"}
            </span>

            <h2>
              {editingId ? "Edit your address" : "Add a delivery address"}
            </h2>
          </div>

          <div className="address-form-card__accent" />
        </div>

        <form onSubmit={handleSubmit} className="address-form">
          {/* FULL NAME */}

          <div className="address-field">
            <label>Full Name</label>

            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          {/* MOBILE */}

          <div className="address-field">
            <label>Mobile Number</label>

            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="10 digit mobile number"
              maxLength={10}
              inputMode="numeric"
              required
            />
          </div>

          {/* ADDRESS LINE 1 */}

          <div className="address-field address-field--full">
            <label>Address Line 1</label>

            <input
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              placeholder="House / Flat / Building"
              required
            />
          </div>

          {/* ADDRESS LINE 2 */}

          <div className="address-field address-field--full">
            <label>
              Address Line 2<span>Optional</span>
            </label>

            <input
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              placeholder="Street / Area"
            />
          </div>

          {/* LANDMARK */}

          <div className="address-field">
            <label>
              Landmark
              <span>Optional</span>
            </label>

            <input
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Nearby landmark"
            />
          </div>

          {/* CITY */}

          <div className="address-field">
            <label>City</label>

            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
          </div>

          {/* STATE */}

          <div className="address-field">
            <label>State</label>

            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              required
            />
          </div>

          {/* PINCODE */}

          <div className="address-field">
            <label>Pincode</label>

            <input
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="6 digit pincode"
              maxLength={6}
              inputMode="numeric"
              required
            />
          </div>

          {/* COUNTRY */}

          <div className="address-field">
            <label>Country</label>

            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              required
            />
          </div>

          {/* TYPE */}

          <div className="address-field">
            <label>Address Type</label>

            <div className="address-type-group">
              {[
                {
                  value: "home",
                  label: "Home",
                },
                {
                  value: "office",
                  label: "Office",
                },
                {
                  value: "other",
                  label: "Other",
                },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={
                    formData.type === option.value
                      ? "address-type address-type--active"
                      : "address-type"
                  }
                  onClick={() =>
                    setFormData((previous) => ({
                      ...previous,
                      type: option.value,
                    }))
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* FORM ACTIONS */}

          <div className="address-form__actions">
            <button
              type="submit"
              disabled={saving}
              className="
                                address-button
                                address-button--primary
                            "
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Address"
                  : "Save Address"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="
                                    address-button
                                    address-button--secondary
                                "
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* =================================
                SAVED ADDRESSES
            ================================= */}

      <section className="saved-addresses">
        <div className="saved-addresses__header">
          <div>
            <span className="address-section-label">SAVED LOCATIONS</span>

            <h2>Your addresses</h2>
          </div>
        </div>

        {addresses.length === 0 ? (
          <div className="address-empty">
            <div className="address-empty__icon">+</div>

            <h3>No addresses yet</h3>

            <p>Add your first delivery address using the form above.</p>
          </div>
        ) : (
          <div className="address-grid">
            {addresses.map((address) => (
              <article
                key={address._id}
                className={
                  address.isDefault
                    ? "address-card address-card--default"
                    : "address-card"
                }
              >
                {/* CARD HEADER */}

                <div className="address-card__top">
                  <div className="address-card__identity">
                    <div className="address-card__type-icon">
                      {address.type === "office"
                        ? "O"
                        : address.type === "other"
                          ? "A"
                          : "H"}
                    </div>

                    <div>
                      <h3>{address.fullName}</h3>

                      <span>
                        {address.type?.charAt(0).toUpperCase() +
                          address.type?.slice(1)}
                      </span>
                    </div>
                  </div>

                  {address.isDefault && (
                    <span className="address-default-badge">DEFAULT</span>
                  )}
                </div>

                {/* CONTACT */}

                <div className="address-card__contact">
                  <span>{address.mobile}</span>
                </div>

                {/* ADDRESS */}

                <div className="address-card__body">
                  <p>{address.addressLine1}</p>

                  {address.addressLine2 && <p>{address.addressLine2}</p>}

                  {address.landmark && (
                    <p className="address-card__muted">
                      Near {address.landmark}
                    </p>
                  )}

                  <p>
                    {address.city}

                    {", "}

                    {address.state}

                    {" - "}

                    {address.pincode}
                  </p>

                  <p>{address.country}</p>
                </div>

                {/* ACTIONS */}

                <div className="address-card__actions">
                  <button
                    type="button"
                    onClick={() => handleEdit(address)}
                    className="
                                                address-card-button
                                                address-card-button--edit
                                            "
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    disabled={deletingId === address._id}
                    onClick={() => handleDelete(address._id)}
                    className="
                                                address-card-button
                                                address-card-button--delete
                                            "
                  >
                    {deletingId === address._id ? "Deleting..." : "Delete"}
                  </button>

                  {!address.isDefault && (
                    <button
                      type="button"
                      disabled={defaultId === address._id}
                      onClick={() => handleSetDefault(address._id)}
                      className="
                                                    address-card-button
                                                    address-card-button--default
                                                "
                    >
                      {defaultId === address._id
                        ? "Updating..."
                        : "Set Default"}
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AddressManager;
