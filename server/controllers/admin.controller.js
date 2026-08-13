const dashboardData = {
    ecommerce: {
        today: {
            summary: {
                revenue: 28450,
                orders: 18,
                customers: 12,
                averageOrderValue: 1580
            },
            sales: {
                labels: ["Today"],
                values: [28450]
            },
            orders: {
                total: 18,
                statuses: {
                    delivered: 8,
                    processing: 5,
                    shipped: 3,
                    cancelled: 2
                }
            },
            topProducts: [
                {
                    name: "Apple MacBook Air M3",
                    units: 4,
                    revenue: 399996
                },
                {
                    name: "Samsung Galaxy S24",
                    units: 3,
                    revenue: 209997
                },
                {
                    name: "Sony WH-1000XM5",
                    units: 2,
                    revenue: 59998
                }
            ],
            recentOrders: [
                {
                    id: "#GDS-10482",
                    customer: "Aarav Sharma",
                    amount: 84999,
                    status: "Delivered"
                },
                {
                    id: "#GDS-10481",
                    customer: "Priya Mehta",
                    amount: 42500,
                    status: "Processing"
                }
            ]
        },

        "7days": {
            summary: {
                revenue: 184520,
                orders: 128,
                customers: 94,
                averageOrderValue: 1442
            },
            sales: {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                values: [
                    18200,
                    24500,
                    21800,
                    32600,
                    28400,
                    38600,
                    30420
                ]
            },
            orders: {
                total: 128,
                statuses: {
                    delivered: 74,
                    processing: 28,
                    shipped: 16,
                    cancelled: 10
                }
            },
            topProducts: [
                {
                    name: "Apple MacBook Air M3",
                    units: 18,
                    revenue: 899982
                },
                {
                    name: "Samsung Galaxy S24",
                    units: 15,
                    revenue: 749985
                },
                {
                    name: "Dell UltraSharp U2723QE",
                    units: 11,
                    revenue: 417989
                }
            ],
            recentOrders: [
                {
                    id: "#GDS-10482",
                    customer: "Aarav Sharma",
                    amount: 84999,
                    status: "Delivered"
                },
                {
                    id: "#GDS-10481",
                    customer: "Priya Mehta",
                    amount: 42500,
                    status: "Processing"
                },
                {
                    id: "#GDS-10480",
                    customer: "Rahul Verma",
                    amount: 124999,
                    status: "Shipped"
                },
                {
                    id: "#GDS-10479",
                    customer: "Neha Patel",
                    amount: 18499,
                    status: "Processing"
                }
            ]
        },

        "1month": {
            summary: {
                revenue: 482650,
                orders: 1284,
                customers: 3842,
                averageOrderValue: 1379
            },
            sales: {
                labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                values: [
                    108400,
                    124600,
                    116250,
                    133400
                ]
            },
            orders: {
                total: 1284,
                statuses: {
                    delivered: 742,
                    processing: 286,
                    shipped: 164,
                    cancelled: 92
                }
            },
            topProducts: [
                {
                    name: "Apple MacBook Air M3",
                    units: 84,
                    revenue: 4200000
                },
                {
                    name: "Samsung Galaxy S24",
                    units: 72,
                    revenue: 3600000
                },
                {
                    name: "Dell UltraSharp U2723QE",
                    units: 58,
                    revenue: 2204000
                }
            ],
            recentOrders: [
                {
                    id: "#GDS-10482",
                    customer: "Aarav Sharma",
                    amount: 84999,
                    status: "Delivered"
                },
                {
                    id: "#GDS-10481",
                    customer: "Priya Mehta",
                    amount: 42500,
                    status: "Processing"
                }
            ]
        }
    },

    inventory: {
        today: {
            summary: {
                totalProducts: 486,
                healthyStock: 348,
                lowStock: 84,
                outOfStock: 54,
                stockValue: 2864000
            },
            stockDistribution: {
                healthy: 348,
                low: 84,
                outOfStock: 54
            },
            lowStockProducts: [
                {
                    name: "Logitech MX Master 3S",
                    sku: "GDS-MX3S",
                    stock: 4,
                    threshold: 10,
                    status: "Critical"
                },
                {
                    name: "Sony WH-1000XM5",
                    sku: "GDS-XM5",
                    stock: 3,
                    threshold: 10,
                    status: "Critical"
                }
            ],
            categories: [
                {
                    name: "Laptops",
                    products: 82,
                    stock: 428
                },
                {
                    name: "Smartphones",
                    products: 96,
                    stock: 516
                },
                {
                    name: "Accessories",
                    products: 138,
                    stock: 824
                }
            ]
        },

        "7days": {
            summary: {
                totalProducts: 486,
                healthyStock: 348,
                lowStock: 84,
                outOfStock: 54,
                stockValue: 2864000
            },
            stockDistribution: {
                healthy: 348,
                low: 84,
                outOfStock: 54
            },
            lowStockProducts: [
                {
                    name: "Logitech MX Master 3S",
                    sku: "GDS-MX3S",
                    stock: 4,
                    threshold: 10,
                    status: "Critical"
                },
                {
                    name: "Dell UltraSharp U2723QE",
                    sku: "GDS-U2723",
                    stock: 7,
                    threshold: 15,
                    status: "Low"
                },
                {
                    name: "Samsung 990 Pro 1TB",
                    sku: "GDS-990P1",
                    stock: 9,
                    threshold: 12,
                    status: "Low"
                },
                {
                    name: "Sony WH-1000XM5",
                    sku: "GDS-XM5",
                    stock: 3,
                    threshold: 10,
                    status: "Critical"
                }
            ],
            categories: [
                {
                    name: "Laptops",
                    products: 82,
                    stock: 428
                },
                {
                    name: "Smartphones",
                    products: 96,
                    stock: 516
                },
                {
                    name: "Accessories",
                    products: 138,
                    stock: 824
                },
                {
                    name: "Monitors",
                    products: 54,
                    stock: 196
                },
                {
                    name: "Components",
                    products: 72,
                    stock: 384
                }
            ]
        },

        "1month": {
            summary: {
                totalProducts: 486,
                healthyStock: 348,
                lowStock: 84,
                outOfStock: 54,
                stockValue: 2864000
            },
            stockDistribution: {
                healthy: 348,
                low: 84,
                outOfStock: 54
            },
            lowStockProducts: [
                {
                    name: "Logitech MX Master 3S",
                    sku: "GDS-MX3S",
                    stock: 4,
                    threshold: 10,
                    status: "Critical"
                },
                {
                    name: "Dell UltraSharp U2723QE",
                    sku: "GDS-U2723",
                    stock: 7,
                    threshold: 15,
                    status: "Low"
                },
                {
                    name: "Sony WH-1000XM5",
                    sku: "GDS-XM5",
                    stock: 3,
                    threshold: 10,
                    status: "Critical"
                }
            ],
            categories: [
                {
                    name: "Laptops",
                    products: 82,
                    stock: 428
                },
                {
                    name: "Smartphones",
                    products: 96,
                    stock: 516
                },
                {
                    name: "Accessories",
                    products: 138,
                    stock: 824
                },
                {
                    name: "Monitors",
                    products: 54,
                    stock: 196
                },
                {
                    name: "Components",
                    products: 72,
                    stock: 384
                }
            ]
        }
    }
};

export const getAdminDashboard = (req, res) => {
    const mode = req.query.mode || "ecommerce";
    const period = req.query.period || "7days";

    if (!["ecommerce", "inventory"].includes(mode)) {
        return res.status(400).json({
            success: false,
            message: "Invalid dashboard mode"
        });
    }

    if (!dashboardData[mode]?.[period]) {
        return res.status(400).json({
            success: false,
            message: "Invalid dashboard period"
        });
    }

    return res.status(200).json({
        success: true,
        mode,
        period,
        data: dashboardData[mode][period]
    });
};
