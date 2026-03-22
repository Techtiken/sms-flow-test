import { Conversation } from "../../../generated/prisma/client";
import { getFlowById } from "./flowRegistry";
import { runStep } from "./runStep";
import { RunStepResult, getFlowContext } from "./types";

type ContinueFlowInput = {
  conversation: Conversation;
  inboundBody: string;
};

export async function continueFlow(
  input: ContinueFlowInput
): Promise<RunStepResult> {
  const flow = getFlowById(input.conversation.flowId);

  if (!flow) {
    throw new Error(`Flow "${input.conversation.flowId}" is not registered.`);
  }

  return runStep({
    flow,
    conversationId: input.conversation.id,
    currentStep: input.conversation.currentStep,
    context: getFlowContext(input.conversation.contextJson),
    inboundBody: input.inboundBody
  });
}
