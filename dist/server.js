"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app/app"));
const config_1 = __importDefault(require("./app/config"));
const server = http_1.default.createServer(app_1.default);
function databaseReboot(url) {
    return mongoose_1.default.connect(url);
}
databaseReboot(config_1.default.database_url).then(() => {
    server.listen(config_1.default.port, () => {
        // eslint-disable-next-line no-console
        console.log(`Server listening port is ${config_1.default.port}`);
    });
});
process.on("unhandledRejection", () => {
    console.log("UnhandledPromiseRejection is detected,shutdown ...");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("uncaughtException", () => {
    console.log("uncaughtException is detected,shutdown ...");
    process.exit(1);
});
