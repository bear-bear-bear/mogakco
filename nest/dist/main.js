"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app_module_1 = __importDefault(require("./modules/app.module"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.default);
    app.use(cookie_parser_1.default());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    await app.listen(parseInt(process.env.SERVER_PORT, 10) || 8001);
}
bootstrap();
//# sourceMappingURL=main.js.map