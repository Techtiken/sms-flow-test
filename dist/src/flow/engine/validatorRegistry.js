"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorRegistry = void 0;
const normalizePhone_1 = require("../../lib/normalizePhone");
exports.validatorRegistry = {
    text(input) {
        const value = input.trim();
        if (!value) {
            return { ok: false };
        }
        return {
            ok: true,
            value
        };
    },
    phone(input) {
        const normalized = (0, normalizePhone_1.normalizePhone)(input);
        if (!normalized.startsWith("+") || normalized.length < 11) {
            return { ok: false };
        }
        return {
            ok: true,
            value: normalized
        };
    },
    amount(input) {
        const value = input.trim();
        if (!/^-?\d+(\.\d{1,2})?$/.test(value)) {
            return { ok: false };
        }
        return {
            ok: true,
            value: Number(value)
        };
    },
    integer(input) {
        const value = input.trim();
        if (!/^-?\d+$/.test(value)) {
            return { ok: false };
        }
        return {
            ok: true,
            value: Number(value)
        };
    },
    yesNo(input) {
        const value = input.trim().toLowerCase();
        if (["yes", "y", "1"].includes(value)) {
            return {
                ok: true,
                value: true
            };
        }
        if (["no", "n", "0"].includes(value)) {
            return {
                ok: true,
                value: false
            };
        }
        return { ok: false };
    }
};
