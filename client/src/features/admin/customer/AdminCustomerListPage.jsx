import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    toast
} from "react-hot-toast";

import {
    useNavigate
} from "react-router-dom";

import {
    getAdminCustomers
} from "./customer.service";

import {
    PageHeader,
    StatusBadge,
    FilterBar,
    StatCard
} from "../../../components/html";

import ActionButtons
    from "../../../components/html/ActionButtons";

import Table
    from "../../../components/ui/Table";
import { IoMdInformationCircle } from "react-icons/io";


const AdminCustomerListPage = () => {

    const navigate =
        useNavigate();


    const [customers, setCustomers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState("all");

    const [verified, setVerified] =
        useState("all");

    const [matchingCount, setMatchingCount] =
        useState(0);


    /* =================================
       FETCH CUSTOMERS
    ================================= */

    const fetchCustomers = async () => {

        try {

            setLoading(true);

            const response =
                await getAdminCustomers();


            const customerData =
                response?.data?.customers ||
                response?.data ||
                [];


            setCustomers(
                Array.isArray(customerData)
                    ? customerData
                    : []
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch customers"
            );

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchCustomers();

    }, []);


    /* =================================
       CUSTOMER NAME HELPER
    ================================= */

    const getCustomerName = (
        customer
    ) => {

        const fullName =
            `${customer?.firstName || ""} ${customer?.lastName || ""
                }`.trim();


        return (
            customer?.name ||
            fullName ||
            "Unknown Customer"
        );

    };


    /* =================================
       MOBILE HELPER
    ================================= */

    const getCustomerMobile = (
        customer
    ) => {

        return (
            customer?.mobile ||
            customer?.phone?.number ||
            "—"
        );

    };


    /* =================================
       INITIALS
    ================================= */

    const getInitials = (
        customer
    ) => {

        const name =
            getCustomerName(
                customer
            );


        if (
            !name ||
            name === "Unknown Customer"
        ) {
            return "UN";
        }


        const parts =
            name
                .trim()
                .split(/\s+/);


        if (parts.length === 1) {

            return parts[0]
                .slice(0, 2)
                .toUpperCase();

        }


        return (
            `${parts[0][0]}${parts[parts.length - 1][0]}`
        ).toUpperCase();

    };


    /* =================================
       STATS
    ================================= */

    const stats = useMemo(() => {

        const total =
            customers.length;


        const active =
            customers.filter(
                customer =>
                    customer.status?.toLowerCase() ===
                    "active"
            ).length;


        const blocked =
            customers.filter(
                customer =>
                    customer.status?.toLowerCase() ===
                    "blocked"
            ).length;


        return {
            total,
            active,
            blocked
        };

    }, [customers]);


    /* =================================
       STRUCTURAL FILTERS
    ================================= */

    const filteredCustomers =
        useMemo(() => {

            return customers.filter(
                customer => {

                    const customerStatus =
                        customer.status
                            ?.toLowerCase();


                    const matchesStatus =
                        status === "all" ||
                        customerStatus === status;


                    const matchesVerified =
                        verified === "all" ||
                        (
                            verified === "verified" &&
                            customer.isVerified === true
                        ) ||
                        (
                            verified === "unverified" &&
                            customer.isVerified !== true
                        );


                    return (
                        matchesStatus &&
                        matchesVerified
                    );

                }
            );

        }, [
            customers,
            status,
            verified
        ]);


    /* =================================
       COLUMNS
    ================================= */

    const columns = [

        /* =================================
           CUSTOMER
        ================================= */

        {
            id: "customer",

            key: "name",

            label: "Customer",

            minWidth: 280,

            searchValue: customer => {

                const name =
                    getCustomerName(
                        customer
                    );

                const mobile =
                    getCustomerMobile(
                        customer
                    );


                return `
                    ${name}
                    ${customer.email || ""}
                    ${mobile}
                    ${customer.firstName || ""}
                    ${customer.lastName || ""}
                `;

            },

            render: customer => {

                const name =
                    getCustomerName(
                        customer
                    );


                const initials =
                    getInitials(
                        customer
                    );


                return (

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                `/admin/customers/${customer._id}`
                            )
                        }
                        className="
                            flex
                            w-full
                            min-w-0
                            items-center
                            gap-3
                            text-left
                            group
                        "
                    >

                        {/* AVATAR */}

                        <div className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-full
                            border
                            border-[var(--border)]
                            bg-[var(--primary-soft)]
                            text-xs
                            font-bold
                            uppercase
                            text-[var(--primary)]
                        ">

                            {customer.avatar?.url ? (

                                <img
                                    src={
                                        customer.avatar.url
                                    }
                                    alt={name}
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                    "
                                />

                            ) : (

                                initials

                            )}

                        </div>


                        {/* CUSTOMER INFO */}

                        <div className="
                            min-w-0
                        ">

                            <p className="
                                truncate
                                font-semibold
                                text-[var(--text)]
                                group-hover:text-[var(--primary)]
                            ">

                                {name}

                            </p>


                            <p className="
                                truncate
                                text-xs
                                text-[var(--text-muted)]
                            ">

                                {customer.email ||
                                    "—"}

                            </p>

                        </div>

                    </button>

                );

            }

        },


        /* =================================
           PHONE
        ================================= */

        {
            id: "mobile",

            key: "mobile",

            label: "Phone",

            hideBelow: "md",

            render: customer => (

                <span className="
                    text-sm
                    text-[var(--text-light)]
                ">

                    {getCustomerMobile(
                        customer
                    )}

                </span>

            )

        },


        /* =================================
           VERIFICATION
        ================================= */

        {
            id: "verification",

            key: "isVerified",

            label: "Verification",

            hideBelow: "md",

            render: customer => (

                <StatusBadge
                    status={
                        customer.isVerified
                            ? "Verified"
                            : "Unverified"
                    }
                />

            )

        },


        /* =================================
           STATUS
        ================================= */

        {
            id: "status",

            key: "status",

            label: "Status",

            render: customer => (

                <StatusBadge
                    status={
                        customer.status ||
                        "Unknown"
                    }
                />

            )

        },


        /* =================================
           JOINED
        ================================= */

        {
            id: "joined",

            key: "createdAt",

            label: "Joined",

            hideBelow: "lg",

            render: customer => (

                <span className="
                    whitespace-nowrap
                    text-sm
                    text-[var(--text-light)]
                ">

                    {customer.createdAt

                        ? new Date(
                            customer.createdAt
                        ).toLocaleDateString(
                            "en-IN"
                        )

                        : "—"

                    }

                </span>

            )

        }

    ];


    /* =================================
       FILTER STATE
    ================================= */

    const hasActiveFilters =
        Boolean(search) ||
        status !== "all" ||
        verified !== "all";


    /* =================================
       RENDER
    ================================= */

    return (

        <section className="
            w-full
            space-y-3
            px-1
            sm:px-2
        ">


            {/* =================================
                HEADER
            ================================= */}

            <PageHeader
                eyebrow="ADMIN"
                title="Customers"
                subtitle="Manage your customer accounts."
            />


            {/* =================================
                STATS
            ================================= */}

            <div className="
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-3
            ">

                <StatCard
                    label="Total Customers"
                    value={stats.total}
                    accent="blue"
                />

                <StatCard
                    label="Active"
                    value={stats.active}
                    accent="green"
                />

                <StatCard
                    label="Blocked"
                    value={stats.blocked}
                    accent="red"
                />

            </div>


            {/* =================================
                CUSTOMER DIRECTORY
            ================================= */}

            <div className="
                border
                border-[var(--border)]
                bg-[var(--surface)]
            ">


                {/* FILTER BAR */}

                <FilterBar

                    search={{
                        value: search,

                        onChange: setSearch,

                        placeholder:
                            "Search customers..."
                    }}


                    filters={[

                        {
                            key: "status",

                            value: status,

                            onChange: setStatus,

                            placeholder:
                                "All Status",

                            options: [

                                {
                                    value: "active",
                                    label: "Active"
                                },

                                {
                                    value: "blocked",
                                    label: "Blocked"
                                },

                                {
                                    value: "inactive",
                                    label: "Inactive"
                                }

                            ]

                        },


                        {
                            key: "verified",

                            value: verified,

                            onChange: setVerified,

                            placeholder:
                                "All Customers",

                            options: [

                                {
                                    value: "verified",
                                    label: "Verified"
                                },

                                {
                                    value: "unverified",
                                    label: "Unverified"
                                }

                            ]

                        }

                    ]}


                    showClear={
                        hasActiveFilters
                    }


                    onClear={() => {

                        setSearch("");

                        setStatus("all");

                        setVerified("all");

                    }}


                    className="p-3"

                />


                {/* TABLE */}

                <Table

                    columns={columns}

                    data={filteredCustomers}

                    loading={loading}

                    serialNumber

                    rowKey="_id"

                    pageSize={10}

                    persistKey="customers"

                    dense

                    searchable

                    searchValue={search}

                    onFilteredCountChange={
                        setMatchingCount
                    }


                    toolbar={{

                        title:
                            "Customer Directory",

                        description:
                            count =>
                                `${count} ${count === 1
                                    ? "customer"
                                    : "customers"
                                }`

                    }}


                    emptyTitle="No Customers Found"


                    emptyDescription={
                        hasActiveFilters
                            ? "No customer accounts match your current filters."
                            : "No customer accounts found."
                    }


                    renderActions={
                        customer => (

                            <ActionButtons

                                onEdit={() =>
                                    navigate(
                                        `/admin/customers/${customer._id}`
                                    )
                                }

                                onDelete={() => {
                                    toast("You Cannot Delete Customer Account.", {
                                        icon: <IoMdInformationCircle />
                                    });
                                }}

                            />

                        )
                    }

                />

            </div>

        </section>

    );

};


export default AdminCustomerListPage;