import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import morgan from "morgan";
import {
    errorHandler,
    notFoundError,
} from "./ErrorBoundary/globalErrorHandler";
import rootRoutes from "./routes";
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(morgan("dev"));

// health route
app.get("/health", (_req: Request, res: Response) => {
    Promise.reject();
    res.status(200).json({
        success: true,
        message: "app router health is good",
    });
});

// routes
app.use("/api/v1", rootRoutes);

// error boundary
app.use(notFoundError);
app.use(errorHandler);

export default app;
