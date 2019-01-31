import { Entity } from "../types";

export interface EntityAction {
  type: "add" | "remove";
  entity: Entity;
}

export function entityReducer(state: Entity[], action: EntityAction): Entity[] {
  switch (action.type) {
    case "add":
      return [...state, action.entity];
    default:
      return state;
  }
}
