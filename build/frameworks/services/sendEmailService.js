"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const sendEmailService = () => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: config_1.default.EMAIL_NODE_MAILER,
            pass: config_1.default.PASSWORD_NODE_MAILER,
        },
    });
    const sendEmail = (email, subject, text) => {
        const mailOptions = {
            from: config_1.default.FROM_EMAIL_NODE_MAILER,
            to: email,
            subject: subject,
            text: text,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            }
            else {
                console.log('Email sent:', info.response);
            }
        });
    };
    return {
        sendEmail,
    };
};
exports.sendEmailService = sendEmailService;
