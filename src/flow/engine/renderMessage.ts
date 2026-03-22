import { interpolateTemplate } from "../../lib/interpolateTemplate";
import { FlowContext, FlowStep } from "./types";

export function renderMessage(step: FlowStep, context: FlowContext): string | null {
  if ("messageTemplate" in step && step.messageTemplate) {
    return interpolateTemplate(step.messageTemplate, context);
  }

  if ("message" in step && step.message) {
    return step.message;
  }

  return null;
}
