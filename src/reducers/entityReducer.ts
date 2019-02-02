import { Entity, Vector } from "../types";

interface Action {
  type: string;
  entity: Entity;
}

interface SimpleAction extends Action {
  type: "add" | "remove";
}

interface MoveAction extends Action {
  type: "move";
  position: Vector;
}

export type EntityAction = SimpleAction | MoveAction;

export function entityReducer(state: Entity[], action: EntityAction): Entity[] {
  switch (action.type) {
    case "add":
      return [...state, action.entity];
    case "move":
      console.log(action.position);
      return [
        ...state.filter(entity => entity !== action.entity),
        { ...action.entity, position: action.position }
      ];
    default:
      return state;
  }
}
