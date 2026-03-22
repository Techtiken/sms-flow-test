"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findActiveConversationByPhoneNumber = findActiveConversationByPhoneNumber;
exports.createConversation = createConversation;
exports.updateConversation = updateConversation;
exports.completeConversation = completeConversation;
exports.cancelConversation = cancelConversation;
const client_1 = require("../../generated/prisma/client");
const prisma_1 = __importDefault(require("../lib/prisma"));
async function findActiveConversationByPhoneNumber(phoneNumber) {
    const conversation = await prisma_1.default.conversation.findFirst({
        where: {
            phoneNumber,
            status: client_1.ConversationStatus.active
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    if (!conversation) {
        return null;
    }
    if (conversation.expiresAt && conversation.expiresAt.getTime() <= Date.now()) {
        await prisma_1.default.conversation.update({
            where: {
                id: conversation.id
            },
            data: {
                status: client_1.ConversationStatus.expired
            }
        });
        return null;
    }
    return conversation;
}
async function createConversation(input) {
    return prisma_1.default.conversation.create({
        data: {
            phoneNumber: input.phoneNumber,
            flowId: input.flowId,
            flowVersion: input.flowVersion,
            currentStep: input.currentStep,
            contextJson: input.contextJson,
            startedAt: input.startedAt,
            lastMessageAt: input.lastMessageAt,
            expiresAt: input.expiresAt
        }
    });
}
async function updateConversation(conversationId, data) {
    return prisma_1.default.conversation.update({
        where: {
            id: conversationId
        },
        data
    });
}
async function completeConversation(conversationId, data = {}) {
    return prisma_1.default.conversation.update({
        where: {
            id: conversationId
        },
        data: {
            ...data,
            status: client_1.ConversationStatus.completed,
            completedAt: new Date()
        }
    });
}
async function cancelConversation(conversationId, data = {}) {
    return prisma_1.default.conversation.update({
        where: {
            id: conversationId
        },
        data: {
            ...data,
            status: client_1.ConversationStatus.cancelled,
            completedAt: new Date()
        }
    });
}
