"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowRegistry = void 0;
exports.getFlowById = getFlowById;
exports.findFlowByKeyword = findFlowByKeyword;
const flow_1 = require("../flows/example/flow");
const flows = [flow_1.flow];
exports.flowRegistry = Object.fromEntries(flows.map((flow) => [flow.id, flow]));
function normalizeKeyword(value) {
    return value.trim().toLowerCase();
}
function getFlowById(flowId) {
    return exports.flowRegistry[flowId] ?? null;
}
function findFlowByKeyword(body) {
    const normalizedBody = normalizeKeyword(body);
    for (const flow of flows) {
        if (flow.triggerKeywords.some((keyword) => normalizeKeyword(keyword) === normalizedBody)) {
            return flow;
        }
    }
    return null;
}
