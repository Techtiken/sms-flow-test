"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlowContext = getFlowContext;
exports.getFlowExpiresAt = getFlowExpiresAt;
function getFlowContext(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        return {};
    }
    return value;
}
function getFlowExpiresAt(flow, now = new Date()) {
    const minutes = flow.settings?.expiresAfterMinutes;
    if (!minutes) {
        return null;
    }
    return new Date(now.getTime() + minutes * 60 * 1000);
}
