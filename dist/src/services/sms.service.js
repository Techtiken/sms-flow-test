"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSms = sendSms;
async function sendSms(input) {
    console.log("Stub SMS send", input);
    return {
        provider: "stub",
        providerMessageId: null
    };
}
