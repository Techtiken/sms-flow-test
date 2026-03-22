import { exampleActions } from "../flows/example/actions";
import { ActionHandlerMap } from "./types";

export const actionRegistry: ActionHandlerMap = {
  ...exampleActions
};
