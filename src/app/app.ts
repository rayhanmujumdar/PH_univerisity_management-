import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// health route
app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "app router health is good",
    });
});

export default app;
