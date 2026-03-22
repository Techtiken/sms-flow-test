"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpolateTemplate = interpolateTemplate;
function interpolateTemplate(template, context) {
    return template.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, key) => {
        const value = context[key.trim()];
        if (value === undefined || value === null) {
            return "";
        }
        return String(value);
    });
}
