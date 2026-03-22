import { Router } from "express";
import { processIncomingMessage } from "../flow/engine/processIncomingMessage";
import { normalizePhone } from "../lib/normalizePhone";
import { z } from "zod";

const router = Router();

const inboundMessageSchema = z.object({
  provider: z.string().min(1),
  providerMessageId: z.string().min(1).optional().nullable(),
  fromNumber: z.string().min(1),
  toNumber: z.string().min(1),
  body: z.string().min(1),
  rawPayload: z.unknown().optional()
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

    const result = await processIncomingMessage({
      provider: parsed.data.provider.trim(),
      providerMessageId: parsed.data.providerMessageId?.trim() || null,
      fromNumber: normalizePhone(parsed.data.fromNumber),
      toNumber: normalizePhone(parsed.data.toNumber),
      body: parsed.data.body.trim(),
      rawPayload: parsed.data.rawPayload ?? parsed.data
    });

    return res.json({
      ok: true,
      ...result
    });
  } catch (error) {
    console.error("Failed to process inbound SMS", error);

    return res.status(500).json({
      ok: false,
      error: "Internal server error."
    });
  }
});

export default router;
