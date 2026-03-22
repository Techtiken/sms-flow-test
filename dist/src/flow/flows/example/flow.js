"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flow = void 0;
exports.flow = {
    id: "example",
    version: 1,
    triggerKeywords: ["start", "hello"],
    startStep: "welcome",
    settings: {
        expiresAfterMinutes: 60
    },
    steps: {
        welcome: {
            type: "message",
            message: "Welcome. Reply with your name.",
            next: "getName"
        },
        getName: {
            type: "input",
            message: "Please reply with your name.",
            saveAs: "name",
            validate: "text",
            next: "confirmName",
            invalidMessage: "Please enter a valid name."
        },
        confirmName: {
            type: "choice",
            messageTemplate: "You entered {{name}}. Reply 1 to confirm or 2 to re-enter.",
            saveAs: "nameConfirmed",
            options: [
                { input: "1", next: "notifyExampleAdmin", value: true },
                { input: "2", next: "getName", value: false }
            ],
            invalidMessage: "Reply 1 or 2."
        },
        notifyExampleAdmin: {
            type: "action",
            action: "notifyExampleAdmin",
            onSuccess: "done",
            onFail: "done"
        },
        done: {
            type: "end",
            messageTemplate: "Thanks, {{name}}. Your name has been saved."
        }
    }
};
