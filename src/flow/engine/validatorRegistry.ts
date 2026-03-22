import { normalizePhone } from "../../lib/normalizePhone";
import { ValidatorFn } from "./types";

export const validatorRegistry: Record<string, ValidatorFn> = {
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
    const normalized = normalizePhone(input);

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
