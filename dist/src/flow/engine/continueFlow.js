"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.continueFlow = continueFlow;
const flowRegistry_1 = require("./flowRegistry");
const runStep_1 = require("./runStep");
const types_1 = require("./types");
async function continueFlow(input) {
    const flow = (0, flowRegistry_1.getFlowById)(input.conversation.flowId);
    if (!flow) {
        throw new Error(`Flow "${input.conversation.flowId}" is not registered.`);
    }
    return (0, runStep_1.runStep)({
        flow,
        conversationId: input.conversation.id,
        currentStep: input.conversation.currentStep,
        context: (0, types_1.getFlowContext)(input.conversation.contextJson),
        inboundBody: input.inboundBody
    });
}
