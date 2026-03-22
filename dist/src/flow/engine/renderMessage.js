"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMessage = renderMessage;
const interpolateTemplate_1 = require("../../lib/interpolateTemplate");
function renderMessage(step, context) {
    if ("messageTemplate" in step && step.messageTemplate) {
        return (0, interpolateTemplate_1.interpolateTemplate)(step.messageTemplate, context);
    }
    if ("message" in step && step.message) {
        return step.message;
    }
    return null;
}
