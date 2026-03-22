"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOptOutByPhoneNumber = findOptOutByPhoneNumber;
exports.createOrUpdateOptOut = createOrUpdateOptOut;
const prisma_1 = __importDefault(require("../prisma/prisma"));
async function findOptOutByPhoneNumber(phoneNumber) {
    return prisma_1.default.optOut.findUnique({
        where: {
            phoneNumber
        }
    });
}
async function createOrUpdateOptOut(phoneNumber, reason) {
    return prisma_1.default.optOut.upsert({
        where: {
            phoneNumber
        },
        update: {
            reason
        },
        create: {
            phoneNumber,
            reason
        }
    });
}
