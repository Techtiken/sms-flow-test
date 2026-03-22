import { flow as exampleFlow } from "../flows/example/flow";
import { SmsFlow } from "./types";

const flows: SmsFlow[] = [exampleFlow];

export const flowRegistry: Record<string, SmsFlow> = Object.fromEntries(
  flows.map((flow) => [flow.id, flow])
);

function normalizeKeyword(value: string): string {
  return value.trim().toLowerCase();
}

export function getFlowById(flowId: string): SmsFlow | null {
  return flowRegistry[flowId] ?? null;
}

export function findFlowByKeyword(body: string): SmsFlow | null {
  const normalizedBody = normalizeKeyword(body);

  for (const flow of flows) {
    if (
      flow.triggerKeywords.some(
        (keyword) => normalizeKeyword(keyword) === normalizedBody
      )
    ) {
      return flow;
    }
  }

  return null;
}
