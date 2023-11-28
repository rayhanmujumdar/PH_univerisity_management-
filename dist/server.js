"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app/app"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./app/config"));
const server = http_1.default.createServer(app_1.default);
function databaseReboot(url) {
    return mongoose_1.default.connect(url);
}
databaseReboot(config_1.default.database_url).then(() => {
    server.listen(config_1.default.port, () => {
        console.log(`Server listening port is ${config_1.default.port}`);
    });
});
