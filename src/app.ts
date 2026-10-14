import express, { Express } from "express";
import morgan from "morgan";

// initialize the express application
const app: Express = express();

// Health check response structure
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

