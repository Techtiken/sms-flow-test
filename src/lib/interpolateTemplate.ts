import { FlowContext } from "../flow/engine/types";

export function interpolateTemplate(
  template: string,
  context: FlowContext
): string {
  return template.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, key: string) => {
    const value = context[key.trim()];

    if (value === undefined || value === null) {
      return "";
    }

    return String(value);
  });
}
