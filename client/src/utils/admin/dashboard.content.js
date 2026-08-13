export const adminDashboardContent = {
    overview: {
        revenue: {
            value: "₹4,82,650",
            change: "+12.8%",
            trend: "up",
            label: "vs last month"
        },
        orders: {
            value: "1,284",
            change: "+8.4%",
            trend: "up",
            label: "vs last month"
        },
        customers: {
            value: "3,842",
            change: "+14.2%",
            trend: "up",
            label: "vs last month"
        },
        products: {
            value: "486",
            change: "-2.1%",
            trend: "down",
            label: "vs last month"
        }
    },

    salesOverview: {
        title: "Sales Overview",
        subtitle: "Revenue performance over the last 7 days",
        total: "₹1,84,520",
        change: "+18.6%",
        labels: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ],
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

    orderSummary: {
        total: 1284,
        statuses: [
            {
                label: "Delivered",
                value: 742,
                percentage: 58,
                type: "success"
            },
            {
                label: "Processing",
                value: 286,
                percentage: 22,
                type: "warning"
            },
            {
                label: "Shipped",
                value: 164,
                percentage: 13,
                type: "primary"
            },
            {
                label: "Cancelled",
                value: 92,
                percentage: 7,
                type: "danger"
            }
        ]
    },

    inventory: {
        totalProducts: 486,
        healthyStock: 348,
        lowStock: 84,
        outOfStock: 54,
        stockValue: "₹28.64L",
        categories: [
            {
                name: "Laptops",
                products: 82,
                stock: 428,
                percentage: 82
            },
            {
                name: "Smartphones",
                products: 96,
                stock: 516,
                percentage: 91
            },
            {
                name: "Accessories",
                products: 138,
                stock: 824,
                percentage: 74
            },
            {
                name: "Monitors",
                products: 54,
                stock: 196,
                percentage: 63
            },
            {
                name: "Components",
                products: 72,
                stock: 384,
                percentage: 57
            }
        ]
    },

    lowStockProducts: [
        {
            id: 1,
            name: "Logitech MX Master 3S",
            sku: "GDS-MX3S",
            category: "Accessories",
            stock: 4,
            threshold: 10,
            status: "Critical"
        },
        {
            id: 2,
            name: "Dell UltraSharp U2723QE",
            sku: "GDS-U2723",
            category: "Monitors",
            stock: 7,
            threshold: 15,
            status: "Low"
        },
        {
            id: 3,
            name: "Samsung 990 Pro 1TB",
            sku: "GDS-990P1",
            category: "Components",
            stock: 9,
            threshold: 12,
            status: "Low"
        },
        {
            id: 4,
            name: "Sony WH-1000XM5",
            sku: "GDS-XM5",
            category: "Accessories",
            stock: 3,
            threshold: 10,
            status: "Critical"
        },
        {
            id: 5,
            name: "Kingston Fury 32GB",
            sku: "GDS-KF32",
            category: "Components",
            stock: 11,
            threshold: 20,
            status: "Low"
        }
    ],

    topProducts: [
        {
            rank: 1,
            name: "Apple MacBook Air M3",
            category: "Laptops",
            units: 84,
            revenue: "₹84,00,000"
        },
        {
            rank: 2,
            name: "Samsung Galaxy S24",
            category: "Smartphones",
            units: 72,
            revenue: "₹50,40,000"
        },
        {
            rank: 3,
            name: "Dell UltraSharp U2723QE",
            category: "Monitors",
            units: 58,
            revenue: "₹22,04,000"
        },
        {
            rank: 4,
            name: "Sony WH-1000XM5",
            category: "Accessories",
            units: 51,
            revenue: "₹16,83,000"
        },
        {
            rank: 5,
            name: "Logitech MX Master 3S",
            category: "Accessories",
            units: 46,
            revenue: "₹4,59,000"
        }
    ],

    recentOrders: [
        {
            id: "#GDS-10482",
            customer: "Aarav Sharma",
            amount: "₹84,999",
            items: 2,
            status: "Delivered",
            time: "12 min ago"
        },
        {
            id: "#GDS-10481",
            customer: "Priya Mehta",
            amount: "₹42,500",
            items: 1,
            status: "Processing",
            time: "28 min ago"
        },
        {
            id: "#GDS-10480",
            customer: "Rahul Verma",
            amount: "₹1,24,999",
            items: 3,
            status: "Shipped",
            time: "41 min ago"
        },
        {
            id: "#GDS-10479",
            customer: "Neha Patel",
            amount: "₹18,499",
            items: 2,
            status: "Processing",
            time: "1 hr ago"
        },
        {
            id: "#GDS-10478",
            customer: "Vikram Singh",
            amount: "₹9,999",
            items: 1,
            status: "Cancelled",
            time: "2 hrs ago"
        }
    ],

    activity: [
        {
            title: "New order received",
            description: "Order #GDS-10482 was placed.",
            time: "12 min ago",
            type: "order"
        },
        {
            title: "Low stock alert",
            description: "Sony WH-1000XM5 has only 3 units left.",
            time: "24 min ago",
            type: "inventory"
        },
        {
            title: "Product updated",
            description: "MacBook Air M3 inventory was updated.",
            time: "48 min ago",
            type: "product"
        },
        {
            title: "New customer registered",
            description: "A new customer joined GDS Electronics.",
            time: "1 hr ago",
            type: "customer"
        }
    ]
};