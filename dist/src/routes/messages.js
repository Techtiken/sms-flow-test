"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const processIncomingMessage_1 = require("../flow/engine/processIncomingMessage");
const normalizePhone_1 = require("../lib/normalizePhone");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const inboundMessageSchema = zod_1.z.object({
    provider: zod_1.z.string().min(1),
    providerMessageId: zod_1.z.string().min(1).optional().nullable(),
    fromNumber: zod_1.z.string().min(1),
    toNumber: zod_1.z.string().min(1),
    body: zod_1.z.string().min(1),
    rawPayload: zod_1.z.unknown().optional()
});
router.post("/inbound", async (req, res) => {
    try {
        const parsed = inboundMessageSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                ok: false,
                error: "Invalid request body.",
                issues: parsed.error.flatten()
            });
        }
        if (!parsed.data.body.trim()) {
            return res.status(400).json({
                ok: false,
                error: "Message body cannot be empty."
            });
        }
        const result = await (0, processIncomingMessage_1.processIncomingMessage)({
            provider: parsed.data.provider.trim(),
            providerMessageId: parsed.data.providerMessageId?.trim() || null,
            fromNumber: (0, normalizePhone_1.normalizePhone)(parsed.data.fromNumber),
            toNumber: (0, normalizePhone_1.normalizePhone)(parsed.data.toNumber),
            body: parsed.data.body.trim(),
            rawPayload: parsed.data.rawPayload ?? parsed.data
        });
        return res.json({
            ok: true,
            ...result
        });
    }
    catch (error) {
        console.error("Failed to process inbound SMS", error);
        return res.status(500).json({
            ok: false,
            error: "Internal server error."
        });
    }
});
exports.default = router;
