"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const globalErrorHandler_1 = require("./ErrorBoundary/globalErrorHandler");
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
// middleware
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(morgan_1.default("dev"));
// health route
app.get("/health", (_req, res) => {
    Promise.reject();
    res.status(200).json({
        success: true,
        message: "app router health is good",
    });
});
// routes
app.use("/api/v1", routes_1.default);
// error boundary
app.use(globalErrorHandler_1.notFoundError);
app.use(globalErrorHandler_1.errorHandler);
exports.default = app;
