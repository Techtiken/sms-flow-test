"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePhone = normalizePhone;
function normalizePhone(value) {
    const trimmed = value.trim();
    const digits = trimmed.replace(/\D/g, "");
    if (!digits) {
        return trimmed;
    }
    if (digits.length === 10) {
        return `+1${digits}`;
    }
    if (digits.length === 11 && digits.startsWith("1")) {
        return `+${digits}`;
    }
    return `+${digits}`;
}
