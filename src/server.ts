import http from "http";
import mongoose from "mongoose";
import app from "./app/app";
import config from "./app/config";

const server = http.createServer(app);

function databaseReboot(url: string) {
    return mongoose.connect(url);
}

databaseReboot(config.database_url as string).then(() => {
    server.listen(config.port, () => {
        // eslint-disable-next-line no-console
        console.log(`Server listening port is ${config.port}`);
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
