import express, { Express } from "express";
import morgan from "morgan";
import ticketRoutes from "./api/v1/routes/ticketRoutes";

// initialize the express application
const app: Express = express();

// Health check response structure
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

// Logging middleware
app.use(morgan("combined"));

// JSON body parser
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.send("Hello, world");
});

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData);
});

app.use("/api/v1/tickets", ticketRoutes);

export default app;