import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.join(__dirname, ".env")
});

const { default: app } = await import("./server/app.js");
const { default: connectDB } = await import("./server/config/db.js");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(
                `🚀 Server running on PORT:${PORT}`
            );
        });
    } catch (error) {
        console.error("Application failed to start.");
        process.exit(1);
    }
};

startServer();