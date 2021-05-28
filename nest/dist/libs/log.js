"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareFailure = exports.emailFailure = exports.emailSuccess = void 0;
const common_1 = require("@nestjs/common");
const errWrapConsole = (message, err) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(message);
        console.log('================================================================');
        console.log(`reason: ${err}`);
        console.log('================================================================');
    }
    return null;
};
const emailSuccess = ({ envelope: { to } }) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`${to[0]} 으로 이메일이 성공적으로 전송되었습니다.`);
    }
};
exports.emailSuccess = emailSuccess;
const emailFailure = (err) => errWrapConsole('Email transfer failed', err);
exports.emailFailure = emailFailure;
const prepareFailure = (err) => {
    errWrapConsole('An Error occurs prepareJoin Controller.', err);
    throw new common_1.HttpException('이메일 전송에 실패 하였습니다.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
};
exports.prepareFailure = prepareFailure;
//# sourceMappingURL=log.js.map