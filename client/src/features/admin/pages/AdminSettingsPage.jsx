import {
    useMemo,
    useState
} from "react";

import {
    PageHeader
} from "../../../components/html";


// =====================================================
// Settings Sections
// =====================================================

const settingsSections = [

    {
        value: "general",
        label: "General",
        description: "Basic website information and store status."
    },

    {
        value: "store",
        label: "Store",
        description: "Store behaviour and shopping preferences."
    },

    {
        value: "checkout",
        label: "Checkout",
        description: "Checkout and order configuration."
    },

    {
        value: "shipping",
        label: "Shipping",
        description: "Delivery and shipping configuration."
    },

    {
        value: "payments",
        label: "Payments",
        description: "Payment methods and payment behaviour."
    },

    {
        value: "notifications",
        label: "Notifications",
        description: "Customer and admin notifications."
    },

    {
        value: "appearance",
        label: "Appearance",
        description: "Branding and visual configuration."
    },

    {
        value: "content",
        label: "Content",
        description: "Manage website content and sections."
    }

];


// =====================================================
// Small UI Helpers
// =====================================================

const SettingField = ({
    label,
    description,
    children
}) => (

    <div className="
        grid
        gap-2
        border-b
        border-[var(--border)]
        pb-3
        last:border-b-0
        last:pb-0
        sm:grid-cols-[180px_minmax(0,1fr)]
        sm:gap-5
    ">

        <div>

            <p className="
                text-xs
                font-semibold
                text-[var(--text)]
            ">
                {label}
            </p>

            {description && (

                <p className="
                    mt-0.5
                    text-[11px]
                    leading-4
                    text-[var(--text-muted)]
                ">
                    {description}
                </p>

            )}

        </div>

        <div>
            {children}
        </div>

    </div>

);


const Input = ({
    ...props
}) => (

    <input
        {...props}
        className="
            h-9
            w-full
            rounded
            border
            border-[var(--border)]
            bg-[var(--surface)]
            px-3
            text-sm
            text-[var(--text)]
            outline-none
            transition
            placeholder:text-[var(--text-muted)]
            focus:border-[var(--primary)]
            focus:ring-1
            focus:ring-[var(--primary)]
        "
    />

);


const Textarea = ({
    ...props
}) => (

    <textarea
        {...props}
        className="
            min-h-[72px]
            w-full
            resize-none
            rounded
            border
            border-[var(--border)]
            bg-[var(--surface)]
            px-3
            py-2
            text-sm
            text-[var(--text)]
            outline-none
            transition
            placeholder:text-[var(--text-muted)]
            focus:border-[var(--primary)]
            focus:ring-1
            focus:ring-[var(--primary)]
        "
    />

);


// =====================================================
// General Settings
// =====================================================

const GeneralSettings = () => (

    <div className="space-y-4">

        <div className="
            grid
            gap-3
            sm:grid-cols-2
        ">

            <SettingField
                label="Website Name"
                description="Name displayed across the website."
            >
                <Input
                    defaultValue="GDS Electronics"
                    placeholder="Website name"
                />
            </SettingField>


            <SettingField
                label="Store Name"
                description="Business or store name."
            >
                <Input
                    defaultValue="GDS Electronics"
                    placeholder="Store name"
                />
            </SettingField>

        </div>


        <SettingField
            label="Support Email"
            description="Email customers can use for support."
        >
            <Input
                type="email"
                placeholder="support@example.com"
            />
        </SettingField>


        <SettingField
            label="Support Phone"
            description="Customer support contact number."
        >
            <Input
                type="text"
                placeholder="+91 XXXXX XXXXX"
            />
        </SettingField>


        <SettingField
            label="Website Description"
            description="Short description used by the website."
        >
            <Textarea
                placeholder="Short description of your store..."
            />
        </SettingField>


        <SettingField
            label="Store Status"
            description="Control whether customers can access the store."
        >

            <label className="
                inline-flex
                h-9
                cursor-pointer
                items-center
                gap-2
                rounded
                border
                border-[var(--border)]
                px-3
            ">

                <input
                    type="checkbox"
                    defaultChecked
                    className="
                        h-4
                        w-4
                        accent-[var(--primary)]
                    "
                />

                <span className="
                    text-xs
                    font-semibold
                    text-[var(--text)]
                ">
                    Store Active
                </span>

            </label>

        </SettingField>

    </div>

);


// =====================================================
// Store Settings
// =====================================================

const StoreSettings = () => (

    <div className="space-y-4">

        <SettingField
            label="Currency"
            description="Currency used for product prices."
        >

            <select className="
                h-9
                w-full
                rounded
                border
                border-[var(--border)]
                bg-[var(--surface)]
                px-3
                text-sm
                text-[var(--text)]
                outline-none
                focus:border-[var(--primary)]
            ">

                <option>INR — Indian Rupee</option>
                <option>USD — US Dollar</option>
                <option>EUR — Euro</option>

            </select>

        </SettingField>


        <SettingField
            label="Tax"
            description="Default tax behaviour for products."
        >

            <div className="
                flex
                items-center
                gap-2
            ">

                <Input
                    type="number"
                    min="0"
                    defaultValue="18"
                />

                <span className="
                    text-xs
                    font-semibold
                    text-[var(--text-muted)]
                ">
                    %
                </span>

            </div>

        </SettingField>


        <SettingField
            label="Guest Checkout"
            description="Allow customers to place orders without an account."
        >

            <label className="
                inline-flex
                h-9
                cursor-pointer
                items-center
                gap-2
            ">

                <input
                    type="checkbox"
                    defaultChecked
                    className="
                        h-4
                        w-4
                        accent-[var(--primary)]
                    "
                />

                <span className="
                    text-xs
                    font-medium
                    text-[var(--text)]
                ">
                    Allow guest checkout
                </span>

            </label>

        </SettingField>

    </div>

);


// =====================================================
// Checkout Settings
// =====================================================

const CheckoutSettings = () => (

    <div className="space-y-4">

        <SettingField
            label="Minimum Order"
            description="Minimum cart value required to place an order."
        >
            <Input
                type="number"
                min="0"
                placeholder="0"
            />
        </SettingField>


        <SettingField
            label="Order Confirmation"
            description="Automatically confirm successfully placed orders."
        >

            <input
                type="checkbox"
                defaultChecked
                className="
                    h-4
                    w-4
                    accent-[var(--primary)]
                "
            />

        </SettingField>

    </div>

);


// =====================================================
// Appearance Settings
// =====================================================

const AppearanceSettings = () => (

    <div className="space-y-4">

        <SettingField
            label="Primary Color"
            description="Main brand colour used across the website."
        >

            <div className="
                flex
                items-center
                gap-2
            ">

                <input
                    type="color"
                    defaultValue="#2563eb"
                    className="
                        h-9
                        w-12
                        cursor-pointer
                        rounded
                        border
                        border-[var(--border)]
                        bg-[var(--surface)]
                        p-1
                    "
                />

                <span className="
                    text-xs
                    font-mono
                    text-[var(--text-muted)]
                ">
                    #2563EB
                </span>

            </div>

        </SettingField>


        <SettingField
            label="Logo"
            description="Website logo displayed in the storefront."
        >

            <button
                type="button"
                className="
                    h-9
                    rounded
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    px-3
                    text-xs
                    font-semibold
                    text-[var(--text)]
                    transition
                    hover:border-[var(--primary)]
                    hover:text-[var(--primary)]
                "
            >
                Upload Logo
            </button>

        </SettingField>


        <SettingField
            label="Favicon"
            description="Small icon displayed in the browser tab."
        >

            <button
                type="button"
                className="
                    h-9
                    rounded
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    px-3
                    text-xs
                    font-semibold
                    text-[var(--text)]
                    transition
                    hover:border-[var(--primary)]
                    hover:text-[var(--primary)]
                "
            >
                Upload Favicon
            </button>

        </SettingField>

    </div>

);


// =====================================================
// Placeholder Settings
// =====================================================

const PlaceholderSettings = ({
    section
}) => (

    <div className="
        flex
        min-h-[180px]
        items-center
        justify-center
        text-center
    ">

        <div>

            <div className="
                mx-auto
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded
                bg-[var(--primary-soft)]
                text-sm
                font-bold
                text-[var(--primary)]
            ">
                {section.label.slice(0, 1)}
            </div>

            <p className="
                mt-3
                text-sm
                font-semibold
                text-[var(--text)]
            ">
                {section.label} Settings
            </p>

            <p className="
                mt-1
                max-w-sm
                text-xs
                leading-5
                text-[var(--text-muted)]
            ">
                {section.description}
            </p>

        </div>

    </div>

);


// =====================================================
// Component
// =====================================================

const AdminSettings = () => {

    const [
        activeSection,
        setActiveSection
    ] = useState("general");


    const currentSection =
        useMemo(
            () =>
                settingsSections.find(
                    section =>
                        section.value === activeSection
                ),
            [activeSection]
        );


    const renderSettings =
        () => {

            switch (activeSection) {

                case "general":
                    return <GeneralSettings />;

                case "store":
                    return <StoreSettings />;

                case "checkout":
                    return <CheckoutSettings />;

                case "appearance":
                    return <AppearanceSettings />;

                default:
                    return (
                        <PlaceholderSettings
                            section={currentSection}
                        />
                    );

            }

        };


    return (

        <section className="
            w-full
            space-y-3
            px-1
            sm:px-2
        ">

            {/* =========================================
                HEADER
            ========================================= */}

            <PageHeader
                eyebrow="ADMIN"
                title="Settings"
                subtitle={
                    currentSection?.description
                }
                action={

                    <select
                        value={activeSection}
                        onChange={event =>
                            setActiveSection(
                                event.target.value
                            )
                        }
                        className="
                            h-9
                            min-w-[150px]
                            rounded
                            border
                            border-[var(--border)]
                            bg-[var(--surface)]
                            px-3
                            text-xs
                            font-semibold
                            text-[var(--text)]
                            outline-none
                            transition
                            focus:border-[var(--primary)]
                            focus:ring-1
                            focus:ring-[var(--primary)]
                        "
                    >

                        {settingsSections.map(
                            section => (

                                <option
                                    key={section.value}
                                    value={section.value}
                                >
                                    {section.label}
                                </option>

                            )
                        )}

                    </select>

                }
            />


            {/* =========================================
                SETTINGS PANEL
            ========================================= */}

            <div className="
                border
                border-[var(--border)]
                bg-[var(--surface)]
            ">

                {/* PANEL HEADER */}

                <div className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    border-b
                    border-[var(--border)]
                    px-4
                    py-3
                ">

                    <div>

                        <h2 className="
                            text-sm
                            font-semibold
                            text-[var(--text)]
                        ">
                            {currentSection?.label}
                        </h2>

                        <p className="
                            mt-0.5
                            text-[11px]
                            text-[var(--text-muted)]
                        ">
                            {currentSection?.description}
                        </p>

                    </div>


                    <span className="
                        hidden
                        rounded
                        bg-[var(--primary-soft)]
                        px-2
                        py-1
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-wide
                        text-[var(--primary)]
                        sm:inline-flex
                    ">
                        Settings
                    </span>

                </div>


                {/* CONTENT */}

                <div className="p-4">

                    {renderSettings()}

                </div>


                {/* FOOTER */}

                <div className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    border-t
                    border-[var(--border)]
                    bg-[var(--surface-hover)]
                    px-4
                    py-2.5
                ">

                    <p className="
                        text-[11px]
                        text-[var(--text-muted)]
                    ">
                        Changes are not saved yet.
                    </p>


                    <button
                        type="button"
                        className="
                            h-8
                            rounded
                            bg-[var(--primary)]
                            px-4
                            text-xs
                            font-semibold
                            text-white
                            transition
                            hover:opacity-90
                        "
                    >
                        Save Changes
                    </button>

                </div>

            </div>

        </section>

    );

};


export default AdminSettings;