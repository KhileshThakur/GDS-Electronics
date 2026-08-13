import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path"; // <-- ADDED THIS
import { fileURLToPath } from "url"; // <-- ADDED THIS

import routes from "./routes/index.js";

// <-- ADDED THIS: Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Changed variable name to make more sense
    credentials: true
}));

// <-- UPDATED THIS: Helmet's default Content Security Policy will often block React/Vite scripts from loading on Render.
app.use(helmet({
    contentSecurityPolicy: false,
}));

app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
    const clientPath = path.join(__dirname, "../client/dist");

    app.use(express.static(clientPath));

    app.get("/*splat", (req, res) => {
        res.sendFile(path.join(clientPath, "index.html"));
    });
}

export default app;