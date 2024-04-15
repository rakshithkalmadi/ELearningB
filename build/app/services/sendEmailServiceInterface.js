"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailServiceInterface = void 0;
const sendEmailServiceInterface = (service) => {
    const sendEmail = (email, subject, text) => service.sendEmail(email, subject, text);
    return {
        sendEmail,
    };
};
exports.sendEmailServiceInterface = sendEmailServiceInterface;
