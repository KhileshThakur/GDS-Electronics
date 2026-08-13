import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(helmet());

app.use(morgan("dev"));

app.use(cookieParser());

app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
    const clientPath = path.join(__dirname, "../client/dist");
    
    app.use(express.static(clientPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(clientPath, "index.html"));
    });
}

export default app;