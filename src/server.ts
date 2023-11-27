import http from "http";
import app from "./app/app";
import mongoose from "mongoose";
import config from "./app/config";

const server = http.createServer(app);

function databaseReboot(url: string) {
    return mongoose.connect(url);
}

databaseReboot(config.database_url as string).then(() => {
    server.listen(config.port, () => {
        console.log(`Server listening port is ${config.port}`);
    });
});
