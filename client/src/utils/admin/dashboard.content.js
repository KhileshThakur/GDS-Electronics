export const adminDashboardContent = {
    periods: [
        { value: "today", label: "Today" },
        { value: "yesterday", label: "Yesterday" },
        { value: "7days", label: "7 Days" },
        { value: "1month", label: "1 Month" },
        { value: "3months", label: "3 Months" },
        { value: "9months", label: "9 Months" },
        { value: "1year", label: "1 Year" }
    ],

    ecommerce: {
        today: {
            revenue: "₹84,999",
            orders: 12,
            customers: 8,
            averageOrderValue: "₹7,083",
            revenueChange: "+8.4%",
            ordersChange: "+12.5%",
            customersChange: "+14.2%"
        },

        yesterday: {
            revenue: "₹1,24,500",
            orders: 18,
            customers: 13,
            averageOrderValue: "₹6,917",
            revenueChange: "+6.2%",
            ordersChange: "+9.1%",
            customersChange: "+10.5%"
        },

        "7days": {
            revenue: "₹6,84,520",
            orders: 96,
            customers: 71,
            averageOrderValue: "₹7,130",
            revenueChange: "+18.6%",
            ordersChange: "+11.4%",
            customersChange: "+14.2%"
        },

        "1month": {
            revenue: "₹28,42,650",
            orders: 428,
            customers: 312,
            averageOrderValue: "₹6,642",
            revenueChange: "+12.8%",
            ordersChange: "+8.4%",
            customersChange: "+14.2%"
        },

        "3months": {
            revenue: "₹78,64,250",
            orders: 1184,
            customers: 824,
            averageOrderValue: "₹6,642",
            revenueChange: "+16.4%",
            ordersChange: "+10.8%",
            customersChange: "+18.2%"
        },

        "9months": {
            revenue: "₹2,18,42,650",
            orders: 3284,
            customers: 2142,
            averageOrderValue: "₹6,648",
            revenueChange: "+21.4%",
            ordersChange: "+16.2%",
            customersChange: "+24.1%"
        },

        "1year": {
            revenue: "₹3,84,82,650",
            orders: 5784,
            customers: 3842,
            averageOrderValue: "₹6,652",
            revenueChange: "+24.8%",
            ordersChange: "+18.4%",
            customersChange: "+28.2%"
        },

        sales: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [18200, 24500, 21800, 32600, 28400, 38600, 30420]
        },

        orderStatus: [
            { label: "Delivered", value: 742, type: "success" },
            { label: "Processing", value: 286, type: "warning" },
            { label: "Shipped", value: 164, type: "primary" },
            { label: "Cancelled", value: 92, type: "danger" }
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
            }
        ]
    },

    inventory: {
        today: {
            totalProducts: 486,
            healthyStock: 348,
            lowStock: 84,
            outOfStock: 54,
            stockValue: "₹28.64L",
            stockChange: "+2.4%",
            lowStockChange: "-6.2%",
            outOfStockChange: "-4.1%"
        },

        yesterday: {
            totalProducts: 484,
            healthyStock: 344,
            lowStock: 86,
            outOfStock: 54,
            stockValue: "₹28.42L",
            stockChange: "+1.8%",
            lowStockChange: "-4.5%",
            outOfStockChange: "-2.2%"
        },

        "7days": {
            totalProducts: 486,
            healthyStock: 348,
            lowStock: 84,
            outOfStock: 54,
            stockValue: "₹28.64L",
            stockChange: "+5.4%",
            lowStockChange: "-8.2%",
            outOfStockChange: "-6.1%"
        },

        "1month": {
            totalProducts: 486,
            healthyStock: 348,
            lowStock: 84,
            outOfStock: 54,
            stockValue: "₹28.64L",
            stockChange: "+8.2%",
            lowStockChange: "-12.4%",
            outOfStockChange: "-9.1%"
        },

        "3months": {
            totalProducts: 486,
            healthyStock: 348,
            lowStock: 84,
            outOfStock: 54,
            stockValue: "₹28.64L",
            stockChange: "+12.4%",
            lowStockChange: "-18.2%",
            outOfStockChange: "-14.6%"
        },

        "9months": {
            totalProducts: 486,
            healthyStock: 348,
            lowStock: 84,
            outOfStock: 54,
            stockValue: "₹28.64L",
            stockChange: "+18.4%",
            lowStockChange: "-24.2%",
            outOfStockChange: "-18.1%"
        },

        "1year": {
            totalProducts: 486,
            healthyStock: 348,
            lowStock: 84,
            outOfStock: 54,
            stockValue: "₹28.64L",
            stockChange: "+24.8%",
            lowStockChange: "-31.4%",
            outOfStockChange: "-22.6%"
        },

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
        ],

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
            }
        ]
    },

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